# Latihan Modul 3 — Build UI Mobile Banking

> **Target**: di akhir latihan, Anda punya **web app Tabungan Haji** dengan UI mobile-friendly yang terhubung ke API dari Modul 2. Bisa login, lihat tabungan, setor saldo, dan cek mutasi — semua dari browser.
>
> **Durasi estimasi**: 5–7 jam.
>
> **Tool**: Claude Code (Desktop + CLI) + Node.js 20+ + browser modern + Thunder Client (untuk debug).
>
> **Prasyarat**: API Tabungan Haji dari latihan Modul 2 sudah jalan di `http://localhost:3000`.

---

## Persiapan Sebelum Mulai

### Cek API Backend Masih Jalan

```bash
curl http://localhost:3000/health
```

Output harus: `{"data":{"status":"ok"}, ...}`. Kalau belum, balik ke latihan Modul 2 → start container PostgreSQL & API.

### Cek Tool

```bash
node --version       # 20.x+
npm --version        # 10.x+
claude --version     # Claude Code CLI
```

### Persiapan Folder

Buat project di folder berbeda dari API supaya tidak konflik:

```bash
cd ~/odp
# Folder API tetap di ~/odp/tabungan-haji-api
# Web app baru:
```

---

## Langkah 1 — Init Next.js Project (10 menit)

**Tujuan**: skeleton Next.js dengan TypeScript + Tailwind + App Router siap pakai.

### 1.1 Create Next App

```bash
npx create-next-app@latest tabungan-haji-web
```

Saat ditanya:
- TypeScript: **Yes**
- ESLint: **Yes**
- Tailwind CSS: **Yes**
- `src/` directory: **Yes**
- App Router: **Yes**
- Turbopack: **No** (untuk stabilitas)
- Import alias: **No** (default `@/`)

### 1.2 Test Run

```bash
cd tabungan-haji-web
npm run dev
```

Buka `http://localhost:3001`. Kenapa port 3001? Karena 3000 sudah dipakai API. Set via env:

`.env.local`:
```
PORT=3001
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
```

Update `package.json`:
```json
{
  "scripts": {
    "dev": "next dev -p 3001",
    "build": "next build",
    "start": "next start -p 3001",
    "lint": "next lint"
  }
}
```

Restart dev server: `npm run dev`. Buka `http://localhost:3001`.

**Checkpoint**: halaman default Next.js muncul di port 3001. ✅

---

## Langkah 2 — Setup shadcn/ui (15 menit)

**Tujuan**: punya component library siap pakai (Button, Input, Card, dll).

### 2.1 Init shadcn

```bash
npx shadcn@latest init
```

Saat ditanya:
- Style: **New York**
- Base color: **Slate**
- CSS variables: **Yes**

### 2.2 Install Component yang Dibutuhkan

```bash
npx shadcn@latest add button input label card dialog form sonner badge separator
```

### 2.3 Test Component

Edit `src/app/page.tsx`:

```tsx
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="container mx-auto p-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Tabungan Haji</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">UI Mobile Banking — Latihan Modul 3</p>
          <Button>Mulai</Button>
        </CardContent>
      </Card>
    </main>
  );
}
```

Reload `http://localhost:3001` → harus muncul Card dengan tombol.

**Checkpoint**: shadcn component ter-install, Card + Button tampil. ✅

---

## Langkah 3 — Setup TanStack Query (15 menit)

**Tujuan**: state management untuk API call (caching, loading, error).

### 3.1 Install

```bash
npm install @tanstack/react-query
npm install -D @tanstack/react-query-devtools
```

### 3.2 Bikin Provider

Bikin `src/components/providers.tsx`:

```tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30_000,           // 30 detik
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

### 3.3 Mount di Root Layout

Edit `src/app/layout.tsx`:

```tsx
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
```

**Checkpoint**: app reload tanpa error. ✅

---

## Langkah 4 — API Client (15 menit)

**Tujuan**: helper untuk fetch API yang konsisten format-nya.

### 4.1 Type untuk Response Format

Bikin `src/lib/api-types.ts`:

```typescript
export type ApiResponse<T> = {
  data: T | null;
  error: { code: string; message: string; details?: unknown } | null;
  meta?: { timestamp: string; pagination?: PaginationMeta };
};

export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
};

// Domain types
export type Nasabah = {
  id: string;
  nik: string;
  nama: string;
  email: string;
  nomor_hp: string;
};

export type TabunganHaji = {
  id: string;
  nasabah_id: string;
  nomor_rekening: string;
  saldo: string;            // BigInt as string
  status: "AKTIF" | "BEKU" | "TUTUP";
  dibuka_at: string;
};

export type Transaksi = {
  id: string;
  jenis: "SETOR" | "TARIK";
  nominal: string;
  saldo_sebelum: string;
  saldo_sesudah: string;
  metode: string;
  waktu: string;
};
```

### 4.2 Fetch Client

Bikin `src/lib/api.ts`:

```typescript
import { ApiResponse } from "./api-types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1";

class ApiError extends Error {
  constructor(public code: string, message: string, public status: number) {
    super(message);
  }
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = typeof window !== "undefined"
    ? localStorage.getItem("token")
    : null;

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const json: ApiResponse<T> = await res.json();

  if (!res.ok || json.error) {
    throw new ApiError(
      json.error?.code || "UNKNOWN",
      json.error?.message || "Request gagal",
      res.status
    );
  }

  return json.data as T;
}

export const api = {
  get: <T>(endpoint: string) => request<T>(endpoint),
  post: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, { method: "POST", body: JSON.stringify(body) }),
  patch: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, { method: "PATCH", body: JSON.stringify(body) }),
  delete: <T>(endpoint: string) => request<T>(endpoint, { method: "DELETE" }),
};

export { ApiError };
```

### 4.3 Util Format Rupiah

Bikin `src/lib/format.ts`:

```typescript
export function formatRupiah(nominal: string | number | bigint): string {
  const angka = typeof nominal === "string" ? BigInt(nominal) : BigInt(nominal);
  return "Rp " + angka.toLocaleString("id-ID");
}

export function formatTanggal(iso: string): string {
  return new Date(iso).toLocaleString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function maskRekening(nomor: string): string {
  if (nomor.length < 8) return nomor;
  return nomor.slice(0, 4) + "****" + nomor.slice(-4);
}
```

**Checkpoint**: 3 file helper siap (`api-types.ts`, `api.ts`, `format.ts`). ✅

---

## Langkah 5 — Halaman Login (45 menit)

**Tujuan**: form login yang terhubung ke API + simpan token.

### 5.1 Bikin Halaman Login

`src/app/login/page.tsx`:

```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { api, ApiError } from "@/lib/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

type LoginResponse = {
  token: string;
  user: { id: string; nama: string; email: string };
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useMutation({
    mutationFn: () =>
      api.post<LoginResponse>("/auth/login", { email, password }),
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success(`Selamat datang, ${data.user.nama}`);
      router.push("/dashboard");
    },
    onError: (err: ApiError) => {
      toast.error(err.message);
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Email dan password wajib diisi");
      return;
    }
    loginMutation.mutate();
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Tabungan Haji</CardTitle>
          <CardDescription>Login ke akun Anda</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loginMutation.isPending}>
              {loginMutation.isPending ? "Loading..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
```

### 5.2 Test Login

1. Pastikan API jalan di port 3000 + minimal 1 nasabah sudah terdaftar.
2. Buka `http://localhost:3001/login`.
3. Login dengan kredensial yang valid → harus redirect ke `/dashboard` (belum ada — error not found OK untuk sekarang).
4. Cek di Browser DevTools → Application → Local Storage → ada `token` & `user`.

**Checkpoint**: login sukses, token tersimpan di localStorage, redirect ke dashboard. ✅

---

## Langkah 6 — Halaman Dashboard (60 menit)

**Tujuan**: tampil daftar tabungan haji dengan kartu yang clickable.

### 6.1 Komponen KartuTabungan

`src/components/kartu-tabungan.tsx`:

```tsx
"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TabunganHaji } from "@/lib/api-types";
import { formatRupiah, maskRekening } from "@/lib/format";

export function KartuTabungan({ tabungan }: { tabungan: TabunganHaji }) {
  const statusColor = {
    AKTIF: "default",
    BEKU: "secondary",
    TUTUP: "destructive",
  } as const;

  return (
    <Link href={`/tabungan/${tabungan.id}`}>
      <Card className="hover:shadow-md transition cursor-pointer">
        <CardContent className="p-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Tabungan Haji</span>
            <Badge variant={statusColor[tabungan.status]}>{tabungan.status}</Badge>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Saldo</div>
            <div className="text-2xl font-bold">{formatRupiah(tabungan.saldo)}</div>
          </div>
          <div className="text-sm font-mono text-muted-foreground">
            {maskRekening(tabungan.nomor_rekening)}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
```

### 6.2 Hook untuk Fetch Daftar Tabungan

Buat endpoint baru di backend kalau belum ada — atau pakai endpoint detail yang sudah ada.

Asumsi backend punya endpoint `GET /api/v1/tabungan-haji?nasabah_id=xxx`. Kalau belum, **catat** sebagai todo untuk update Modul 2.

`src/hooks/use-tabungan.ts`:

```typescript
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { TabunganHaji } from "@/lib/api-types";

export function useTabunganList() {
  return useQuery({
    queryKey: ["tabungan"],
    queryFn: () => api.get<TabunganHaji[]>("/tabungan-haji"),
  });
}

export function useTabunganDetail(id: string) {
  return useQuery({
    queryKey: ["tabungan", id],
    queryFn: () => api.get<TabunganHaji>(`/tabungan-haji/${id}`),
    enabled: !!id,
  });
}
```

### 6.3 Halaman Dashboard

`src/app/dashboard/page.tsx`:

```tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTabunganList } from "@/hooks/use-tabungan";
import { KartuTabungan } from "@/components/kartu-tabungan";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function DashboardPage() {
  const router = useRouter();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setUserName(user.nama || "Nasabah");
  }, [router]);

  const { data, isLoading, error } = useTabunganList();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logout berhasil");
    router.push("/login");
  }

  return (
    <main className="container mx-auto p-4 max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Halo, {userName}</h1>
          <p className="text-sm text-muted-foreground">Selamat datang kembali</p>
        </div>
        <Button variant="outline" size="sm" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-3">Tabungan Haji Anda</h2>

        {isLoading && <p className="text-muted-foreground">Memuat...</p>}
        {error && <p className="text-destructive">Gagal memuat: {(error as Error).message}</p>}

        {data && data.length === 0 && (
          <p className="text-muted-foreground">Anda belum punya tabungan haji.</p>
        )}

        {data && data.length > 0 && (
          <div className="space-y-3">
            {data.map((t) => (
              <KartuTabungan key={t.id} tabungan={t} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
```

### 6.4 Test

1. Pastikan ada minimal 1 tabungan di backend (kalau perlu, daftar nasabah baru via Thunder Client + buka tabungan).
2. Login → harus redirect ke `/dashboard`.
3. Lihat kartu tabungan tampil dengan saldo formatted Rp, nomor rekening masked.

**Checkpoint**: dashboard tampil dengan daftar tabungan + tombol logout. ✅

---

## Langkah 7 — Halaman Detail Tabungan (30 menit)

**Tujuan**: detail tabungan + tombol aksi (Setor, Mutasi).

### 7.1 Halaman Detail

`src/app/tabungan/[id]/page.tsx`:

```tsx
"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useTabunganDetail } from "@/hooks/use-tabungan";
import { formatRupiah, maskRekening, formatTanggal } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function DetailTabunganPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { data, isLoading, error } = useTabunganDetail(params.id);

  if (isLoading) return <p className="p-4">Memuat...</p>;
  if (error) return <p className="p-4 text-destructive">Error: {(error as Error).message}</p>;
  if (!data) return null;

  return (
    <main className="container mx-auto p-4 max-w-2xl space-y-6">
      <button onClick={() => router.back()} className="text-sm text-muted-foreground">
        ← Kembali
      </button>

      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold">Tabungan Haji</h1>
            <Badge>{data.status}</Badge>
          </div>

          <div>
            <div className="text-xs text-muted-foreground mb-1">Saldo</div>
            <div className="text-4xl font-bold">{formatRupiah(data.saldo)}</div>
          </div>

          <div className="space-y-1 text-sm border-t pt-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Nomor Rekening</span>
              <span className="font-mono">{maskRekening(data.nomor_rekening)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Dibuka pada</span>
              <span>{formatTanggal(data.dibuka_at)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <Link href={`/tabungan/${data.id}/setor`}>
          <Button className="w-full" size="lg">Setor</Button>
        </Link>
        <Link href={`/tabungan/${data.id}/mutasi`}>
          <Button className="w-full" size="lg" variant="outline">Mutasi</Button>
        </Link>
      </div>
    </main>
  );
}
```

**Checkpoint**: klik kartu di dashboard → masuk halaman detail tabungan dengan 2 tombol aksi. ✅

---

## Langkah 8 — Halaman Setor Saldo (60 menit)

**Tujuan**: form setor dengan validasi + konfirmasi 2-step.

### 8.1 Install Form Library

```bash
npm install react-hook-form @hookform/resolvers zod
```

### 8.2 Halaman Setor

`src/app/tabungan/[id]/setor/page.tsx`:

```tsx
"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { api, ApiError } from "@/lib/api";
import { toast } from "sonner";
import { formatRupiah } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const setorSchema = z.object({
  nominal: z.number({ message: "Nominal harus angka" }).int().min(100000, "Minimum Rp 100.000"),
  metode: z.enum(["QRIS", "ATM", "TELLER", "TRANSFER"]),
});

type SetorForm = z.infer<typeof setorSchema>;

export default function SetorPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [step, setStep] = useState<"form" | "konfirmasi">("form");

  const { register, handleSubmit, formState: { errors }, watch, getValues } = useForm<SetorForm>({
    resolver: zodResolver(setorSchema),
    defaultValues: { metode: "QRIS" },
  });

  const setorMutation = useMutation({
    mutationFn: () => {
      const data = getValues();
      return api.post(`/tabungan-haji/${params.id}/setor`, {
        ...data,
        referensi: `TRX-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      });
    },
    onSuccess: () => {
      toast.success("Setor berhasil!");
      queryClient.invalidateQueries({ queryKey: ["tabungan"] });
      router.push(`/tabungan/${params.id}`);
    },
    onError: (err: ApiError) => {
      toast.error(err.message);
    },
  });

  function onSubmit() {
    setStep("konfirmasi");   // pindah ke step konfirmasi
  }

  if (step === "konfirmasi") {
    const data = getValues();
    return (
      <main className="container mx-auto p-4 max-w-md space-y-6">
        <h1 className="text-xl font-bold">Konfirmasi Setor</h1>
        <Card>
          <CardContent className="p-6 space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Nominal</span>
              <span className="font-bold">{formatRupiah(data.nominal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Metode</span>
              <span>{data.metode}</span>
            </div>
          </CardContent>
        </Card>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" onClick={() => setStep("form")}>Kembali</Button>
          <Button onClick={() => setorMutation.mutate()} disabled={setorMutation.isPending}>
            {setorMutation.isPending ? "Memproses..." : "Konfirmasi"}
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto p-4 max-w-md space-y-6">
      <button onClick={() => router.back()} className="text-sm text-muted-foreground">
        ← Kembali
      </button>

      <Card>
        <CardHeader>
          <CardTitle>Setor Saldo</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nominal">Nominal (Rp)</Label>
              <Input
                id="nominal"
                type="number"
                min={100000}
                {...register("nominal", { valueAsNumber: true })}
                placeholder="100000"
              />
              {errors.nominal && (
                <p className="text-sm text-destructive">{errors.nominal.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="metode">Metode</Label>
              <select
                id="metode"
                {...register("metode")}
                className="w-full h-10 px-3 rounded-md border bg-background"
              >
                <option value="QRIS">QRIS</option>
                <option value="ATM">ATM</option>
                <option value="TELLER">Teller</option>
                <option value="TRANSFER">Transfer</option>
              </select>
            </div>

            <Button type="submit" className="w-full" size="lg">
              Lanjut
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
```

### 8.3 Test

1. Buka detail tabungan → klik **Setor**.
2. Input nominal `50000` → klik Lanjut → muncul error "Minimum Rp 100.000".
3. Input nominal `500000` → Lanjut → masuk konfirmasi.
4. Klik **Konfirmasi** → toast sukses, redirect ke detail tabungan, saldo bertambah.

**Checkpoint**: setor sukses dengan 2-step confirmation. ✅

---

## Langkah 9 — Halaman Mutasi (30 menit)

**Tujuan**: tampil riwayat transaksi tabungan.

### 9.1 Hook & Halaman

`src/hooks/use-mutasi.ts`:

```typescript
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Transaksi } from "@/lib/api-types";

export function useMutasi(tabunganId: string) {
  return useQuery({
    queryKey: ["mutasi", tabunganId],
    queryFn: () => api.get<Transaksi[]>(`/tabungan-haji/${tabunganId}/mutasi`),
    enabled: !!tabunganId,
  });
}
```

`src/app/tabungan/[id]/mutasi/page.tsx`:

```tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import { useMutasi } from "@/hooks/use-mutasi";
import { formatRupiah, formatTanggal } from "@/lib/format";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function MutasiPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { data, isLoading, error } = useMutasi(params.id);

  return (
    <main className="container mx-auto p-4 max-w-2xl space-y-4">
      <button onClick={() => router.back()} className="text-sm text-muted-foreground">
        ← Kembali
      </button>

      <h1 className="text-xl font-bold">Mutasi Tabungan</h1>

      {isLoading && <p className="text-muted-foreground">Memuat...</p>}
      {error && <p className="text-destructive">Error: {(error as Error).message}</p>}

      {data && data.length === 0 && (
        <p className="text-muted-foreground">Belum ada transaksi.</p>
      )}

      {data && data.length > 0 && (
        <Card>
          <CardContent className="p-0">
            {data.map((t, i) => (
              <div key={t.id}>
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <div className="font-medium">
                      {t.jenis === "SETOR" ? "Setor" : "Tarik"} via {t.metode}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatTanggal(t.waktu)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-semibold ${t.jenis === "SETOR" ? "text-emerald-600" : "text-destructive"}`}>
                      {t.jenis === "SETOR" ? "+" : "-"} {formatRupiah(t.nominal)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Saldo: {formatRupiah(t.saldo_sesudah)}
                    </div>
                  </div>
                </div>
                {i < data.length - 1 && <Separator />}
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </main>
  );
}
```

**Checkpoint**: mutasi tampil list transaksi dengan format Rupiah konsisten. ✅

---

## Langkah 10 — Middleware untuk Protected Route (15 menit)

**Tujuan**: redirect ke `/login` kalau user tidak punya token.

### 10.1 Bikin Middleware

`src/middleware.ts` (di root `src/`, sejajar dengan `app/`):

```typescript
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Catatan: middleware Next.js tidak bisa akses localStorage (client-only).
  // Untuk demo cepat, kita biarkan client-side check di tiap protected page.
  // Production: pakai cookie httpOnly (lihat catatan §10.3 di materi).
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/tabungan/:path*"],
};
```

### 10.2 Client-Side Guard Component

`src/components/auth-guard.tsx`:

```tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      setAuthorized(true);
    }
  }, [router]);

  if (!authorized) return null;
  return <>{children}</>;
}
```

### 10.3 Pasang di Layout

`src/app/(authed)/layout.tsx` — atau wrap manual di tiap protected page.

Cara cepat: edit `src/app/dashboard/page.tsx` & `src/app/tabungan/[id]/page.tsx` — wrap dengan `<AuthGuard>`.

```tsx
import { AuthGuard } from "@/components/auth-guard";

export default function DashboardPage() {
  return (
    <AuthGuard>
      {/* ... content existing */}
    </AuthGuard>
  );
}
```

**Checkpoint**: akses `/dashboard` tanpa login → redirect ke `/login`. ✅

---

## Langkah 11 — Polish & Final Touch (30 menit)

**Tujuan**: rapikan UX, error state, loading state, responsive.

### 11.1 Loading Skeleton

Bikin `src/components/skeleton-kartu.tsx`:

```tsx
import { Card, CardContent } from "@/components/ui/card";

export function SkeletonKartu() {
  return (
    <Card>
      <CardContent className="p-6 space-y-3 animate-pulse">
        <div className="h-4 w-24 bg-muted rounded" />
        <div className="h-8 w-40 bg-muted rounded" />
        <div className="h-4 w-32 bg-muted rounded" />
      </CardContent>
    </Card>
  );
}
```

Pakai di dashboard saat loading:

```tsx
{isLoading && (
  <div className="space-y-3">
    <SkeletonKartu />
    <SkeletonKartu />
  </div>
)}
```

### 11.2 Empty State yang Lebih Baik

Daripada plain text "Belum ada transaksi", bikin component empty state dengan icon.

### 11.3 Mobile Responsive

Pastikan tampilan bagus di lebar 375px (iPhone SE). Test pakai Chrome DevTools → toggle device toolbar.

Tweaks:
- `max-w-md` untuk container login.
- `max-w-2xl` untuk dashboard.
- Padding `p-4` (mobile) → `md:p-8` (desktop).

### 11.4 Auto-logout saat Token Expired

Edit `src/lib/api.ts`, tambah handler untuk 401:

```typescript
async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  // ... existing code

  if (res.status === 401 && typeof window !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
    throw new ApiError("UNAUTHORIZED", "Sesi habis, silakan login ulang", 401);
  }

  // ... rest
}
```

**Checkpoint**: UI feels polished — loading state, error state, mobile responsive, auto-logout. ✅

---

## Langkah 12 — (Opsional) Generate Component Baru dengan Claude (30 menit)

**Tujuan**: praktekkan workflow Claude Desktop + Code untuk UI.

### 12.1 Workflow: Desktop untuk Iterate, CLI untuk Apply

**Di Claude Desktop**: minta generate component baru via Artifacts. Iterate desain sampai sesuai selera.

Contoh prompt:

```
Bikin component React "<CardSetoranRutin />" yang menampilkan info setoran rutin
otomatis bulanan. Pakai Tailwind + shadcn/ui (Card, Switch, Badge).

Props:
- isActive: boolean
- nominalBulanan: number (Rupiah)
- tanggalSetorBerikutnya: string (ISO date)
- onToggle: () => void

Layout:
- Card dengan padding 6.
- Switch on/off di kanan atas + label "Auto-debit aktif".
- Nominal Rupiah besar di tengah.
- Info "Setor berikutnya: tgl X" di bawah, dengan icon kalender.
- Kalau isActive=false, opacity card jadi 50%.

Style: clean, banking-friendly, accent color emerald-600.
```

Iterate di Desktop sampai puas.

### 12.2 Apply ke Project via Claude Code CLI

Buka terminal di project root:

```bash
cd ~/odp/tabungan-haji-web
claude
```

Prompt:

```
Bikin file src/components/card-setoran-rutin.tsx dengan kode berikut:
[paste kode dari Claude Desktop Artifact]

Pastikan import shadcn yang dipakai sudah ter-install. Kalau belum, jalankan
`npx shadcn@latest add <component>` untuk install yang missing.

Setelah file dibuat, import di src/app/tabungan/[id]/page.tsx dan render
di bawah Card detail tabungan dengan dummy props (nominalBulanan: 500000,
tanggalSetorBerikutnya: "2026-06-15", isActive: true).
```

Claude akan eksekusi semuanya.

**Checkpoint**: punya 1 component baru hasil workflow Desktop + CLI. ✅

---

## Tugas Lanjutan

Pilih minimal 2:

### A. Halaman Buka Tabungan Baru

Form daftar tabungan untuk nasabah existing. Endpoint backend: `POST /api/v1/tabungan-haji` body `{nasabah_id}`. Setelah buka, redirect ke detail.

### B. Filter & Search di Mutasi

Tambah dropdown filter (Semua / Setor / Tarik) dan input search by nominal di halaman mutasi. Filter client-side dengan `useMemo`.

### C. Dark Mode

Pakai `next-themes` + Tailwind dark variant. Bikin toggle di header.

### D. Generate Doc Sertifikat (lanjutan Modul 7)

Tambah tombol "Download Sertifikat" yang call API endpoint `/sertifikat` (yang akan dibikin di Modul 7).

### E. Real-time Notification

Pakai polling (`refetchInterval` di TanStack Query) untuk auto-update saldo tiap 30 detik di halaman detail.

---

## Troubleshooting

| Masalah | Solusi |
|---|---|
| CORS error saat fetch API | Pastikan backend pakai `cors()` middleware (sudah ada di latihan Modul 2). Cek `Access-Control-Allow-Origin`. |
| `localStorage is not defined` di SSR | Cek `typeof window !== "undefined"` sebelum akses localStorage. Atau wrap component dengan `"use client"`. |
| Tailwind class tidak apply | Cek `content` di `tailwind.config.ts` include semua path yang relevan. |
| Component shadcn tidak ditemukan | Run `npx shadcn@latest add [nama]`. |
| Login berhasil tapi dashboard kosong | Cek Network tab — apakah `Authorization: Bearer xxx` ter-attach? Cek API logs. |
| BigInt saldo error di JSON | Backend sudah convert ke string di service. Frontend treat as string, jangan `parseInt` (overflow). |

---

## Checklist Akhir Latihan

Sebelum lanjut Modul 4, pastikan:

- [ ] Project Next.js + Tailwind + shadcn ter-setup.
- [ ] TanStack Query provider terpasang.
- [ ] API client helper jalan dengan token auth.
- [ ] Halaman login + simpan token di localStorage.
- [ ] Dashboard tampil daftar tabungan dengan KartuTabungan.
- [ ] Halaman detail tabungan dengan tombol Setor & Mutasi.
- [ ] Form setor dengan validasi Zod + 2-step confirmation.
- [ ] Halaman mutasi list transaksi.
- [ ] Protected route — redirect ke login kalau tanpa token.
- [ ] Auto-logout saat 401.
- [ ] Loading skeleton + empty state.
- [ ] Mobile responsive (test di 375px).
- [ ] Format Rupiah konsisten di semua tempat.
- [ ] (Opsional) 1 component baru di-generate via Claude Desktop + CLI workflow.

---

## Sumber & Referensi

- **Next.js App Router Docs**: [nextjs.org/docs/app](https://nextjs.org/docs/app)
- **TanStack Query Docs**: [tanstack.com/query](https://tanstack.com/query/latest)
- **shadcn/ui**: [ui.shadcn.com](https://ui.shadcn.com)
- **React Hook Form**: [react-hook-form.com](https://react-hook-form.com)
- **Tailwind CSS**: [tailwindcss.com/docs](https://tailwindcss.com/docs)

---

**Sudah semua tercentang?** Anda sekarang punya **full-stack web app** untuk Tabungan Haji — UI di port 3001, API di port 3000, terhubung via REST + JWT. Selanjutnya: **Modul 4 — SOLID, Clean Code & Testing**, di mana kode dari Modul 2 & 3 akan di-refactor & ter-cover oleh automated test.
