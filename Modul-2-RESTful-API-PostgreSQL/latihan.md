# Latihan Modul 2 — RESTful API & Database Modeling

> **Target**: di akhir latihan, Anda punya REST API Tabungan Haji yang jalan di `http://localhost:3000`, ter-validasi, ter-audit, terhubung ke PostgreSQL, dan punya autentikasi JWT.
>
> **Durasi estimasi**: 4–6 jam.
>
> **Tool**: Claude Code CLI + Node.js 20+ + Docker Desktop + Postman.

---

## Persiapan Sebelum Mulai

### Cek Tool yang Dibutuhkan

Jalankan di terminal:

```bash
node --version       # harus 20.x atau lebih baru
npm --version        # harus 10.x atau lebih baru
docker --version     # harus 20.x atau lebih baru
claude --version     # Claude Code CLI sudah ter-install (dari Modul 1)
```

Kalau salah satu belum ada, install dulu sebelum lanjut.

### Persiapan Folder

```bash
cd ~/odp
mkdir tabungan-haji-api
cd tabungan-haji-api
```

> Semua command selanjutnya dijalankan dari folder `tabungan-haji-api/` ini.

---

## Langkah 1 — Setup PostgreSQL via Docker (15 menit)

**Tujuan**: punya database PostgreSQL yang jalan di local, siap dipakai dari kode.

### 1.1 Jalankan Container PostgreSQL

```bash
docker run --name pg-tabungan-haji \
  -e POSTGRES_USER=bsi_user \
  -e POSTGRES_PASSWORD=rahasia123 \
  -e POSTGRES_DB=tabungan_haji \
  -p 5432:5432 \
  -d postgres:16-alpine
```

### 1.2 Verifikasi Container Jalan

```bash
docker ps | grep pg-tabungan-haji
```

Harus muncul container `pg-tabungan-haji` dengan status `Up`.

### 1.3 Test Connect ke Database

```bash
docker exec -it pg-tabungan-haji psql -U bsi_user -d tabungan_haji
```

Di prompt `psql` ketik:

```sql
SELECT version();
```

Output harus menampilkan versi PostgreSQL 16.x. Ketik `\q` untuk keluar.

**Checkpoint**: PostgreSQL jalan, bisa di-connect, versi 16. ✅

---

## Langkah 2 — Init Project Node.js + TypeScript (10 menit)

**Tujuan**: project skeleton dengan TypeScript, ESLint, dan struktur folder.

### 2.1 Init Project

```bash
npm init -y
```

### 2.2 Install Dependencies

```bash
npm install express cors helmet zod dotenv jsonwebtoken bcrypt
npm install -D typescript @types/express @types/node @types/cors @types/jsonwebtoken @types/bcrypt ts-node nodemon
```

### 2.3 Init TypeScript Config

```bash
npx tsc --init
```

Edit `tsconfig.json` — set option penting:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### 2.4 Bikin Struktur Folder Awal

```bash
mkdir -p src/{config,modules,middleware,lib}
mkdir -p src/modules/{nasabah,tabungan-haji,auth}
```

### 2.5 Tambah Script di `package.json`

```json
{
  "scripts": {
    "dev": "nodemon --watch src --ext ts --exec ts-node src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  }
}
```

### 2.6 Bikin `.env` & `.gitignore`

`.env`:
```
DATABASE_URL="postgresql://bsi_user:rahasia123@localhost:5432/tabungan_haji"
JWT_SECRET="rahasia_jwt_minimal_32_karakter_panjang_random"
PORT=3000
```

`.gitignore`:
```
node_modules
dist
.env
.env.*
*.log
```

**Checkpoint**: folder & dependency siap. ✅

---

## Langkah 3 — Setup Prisma + Migration (30 menit)

**Tujuan**: schema database ter-version dengan Prisma, table-table terbentuk di Postgres.

### 3.1 Install Prisma

```bash
npm install -D prisma
npm install @prisma/client
npx prisma init
```

### 3.2 Tulis `prisma/schema.prisma`

Buka file `prisma/schema.prisma` lalu replace isinya dengan:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Nasabah {
  id            String         @id @default(uuid())
  nik           String         @unique @db.VarChar(16)
  nama          String         @db.VarChar(100)
  email         String         @unique @db.VarChar(150)
  passwordHash  String         @map("password_hash") @db.VarChar(255)
  nomorHp       String         @map("nomor_hp") @db.VarChar(20)
  tabungan      TabunganHaji[]
  createdAt     DateTime       @default(now()) @map("created_at")
  updatedAt     DateTime       @updatedAt @map("updated_at")

  @@map("nasabah")
}

model TabunganHaji {
  id             String      @id @default(uuid())
  nasabahId      String      @map("nasabah_id")
  nasabah        Nasabah     @relation(fields: [nasabahId], references: [id])
  nomorRekening  String      @unique @map("nomor_rekening") @db.VarChar(20)
  saldo          BigInt      @default(0)
  status         String      @default("AKTIF") @db.VarChar(20)
  dibukaAt       DateTime    @default(now()) @map("dibuka_at")
  transaksi      Transaksi[]

  @@map("tabungan_haji")
}

model Transaksi {
  id            String       @id @default(uuid())
  tabunganId    String       @map("tabungan_id")
  tabungan      TabunganHaji @relation(fields: [tabunganId], references: [id])
  jenis         String       @db.VarChar(20)
  nominal       BigInt
  saldoSebelum  BigInt       @map("saldo_sebelum")
  saldoSesudah  BigInt       @map("saldo_sesudah")
  referensi     String       @unique @db.VarChar(50)
  metode        String?      @db.VarChar(20)
  waktu         DateTime     @default(now())

  @@index([tabunganId, waktu(sort: Desc)])
  @@map("transaksi")
}

model AuditLog {
  id         String   @id @default(uuid())
  actorId    String?  @map("actor_id")
  action     String   @db.VarChar(50)
  entity     String   @db.VarChar(50)
  entityId   String?  @map("entity_id")
  metadata   Json?
  waktu      DateTime @default(now())

  @@index([waktu(sort: Desc)])
  @@map("audit_log")
}
```

### 3.3 Generate & Apply Migration

```bash
npx prisma migrate dev --name init
```

Output yang diharapkan:
- File migration dibuat di `prisma/migrations/.../migration.sql`.
- Prisma apply migration ke Postgres.
- Prisma Client di-generate.

### 3.4 Verifikasi Table di Database

```bash
docker exec -it pg-tabungan-haji psql -U bsi_user -d tabungan_haji -c "\dt"
```

Harus muncul 5 table: `nasabah`, `tabungan_haji`, `transaksi`, `audit_log`, `_prisma_migrations`.

**Checkpoint**: 4 table domain + migration table tersedia di Postgres. ✅

---

## Langkah 4 — Prisma Client Singleton + Bootstrap Express (15 menit)

**Tujuan**: setup connection pool Prisma + Express app yang minimal jalan.

### 4.1 Prisma Client Singleton

Buat `src/lib/prisma.ts`:

```typescript
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query", "error", "warn"]
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

### 4.2 Env Validation

Buat `src/config/env.ts`:

```typescript
import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  PORT: z.string().default("3000")
});

export const env = envSchema.parse(process.env);
```

### 4.3 Helper Response

Buat `src/lib/response.ts`:

```typescript
import { Response } from "express";

export function sukses(res: Response, data: unknown, status = 200) {
  return res.status(status).json({
    data,
    error: null,
    meta: { timestamp: new Date().toISOString() }
  });
}

export function gagal(
  res: Response,
  status: number,
  code: string,
  message: string,
  details?: unknown
) {
  return res.status(status).json({
    data: null,
    error: { code, message, ...(details ? { details } : {}) },
    meta: { timestamp: new Date().toISOString() }
  });
}
```

### 4.4 Bikin `src/index.ts`

```typescript
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./config/env";
import { sukses } from "./lib/response";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (req, res) => sukses(res, { status: "ok" }));

app.listen(env.PORT, () => {
  console.log(`🚀 API jalan di http://localhost:${env.PORT}`);
});
```

### 4.5 Run & Test

```bash
npm run dev
```

Buka browser atau curl:

```bash
curl http://localhost:3000/health
```

Output yang diharapkan:
```json
{"data":{"status":"ok"},"error":null,"meta":{"timestamp":"..."}}
```

**Checkpoint**: server Express jalan, health check responsif, response format konsisten. ✅

---

## Langkah 5 — Module Nasabah (CRUD Lengkap) (45 menit)

**Tujuan**: 5 endpoint untuk manage nasabah dengan validasi & error handling.

### 5.1 Bikin Schema Validation

`src/modules/nasabah/nasabah.schema.ts`:

```typescript
import { z } from "zod";

export const createNasabahSchema = z.object({
  nik: z.string().length(16, "NIK harus 16 digit"),
  nama: z.string().min(3, "Nama minimal 3 karakter"),
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(8, "Password minimal 8 karakter"),
  nomor_hp: z.string().regex(/^08\d{8,12}$/, "Format nomor HP Indonesia (08xxxx)")
});

export const updateNasabahSchema = createNasabahSchema.partial().omit({ password: true });

export type CreateNasabahInput = z.infer<typeof createNasabahSchema>;
export type UpdateNasabahInput = z.infer<typeof updateNasabahSchema>;
```

### 5.2 Bikin Service Layer

`src/modules/nasabah/nasabah.service.ts`:

```typescript
import bcrypt from "bcrypt";
import { prisma } from "../../lib/prisma";
import { CreateNasabahInput, UpdateNasabahInput } from "./nasabah.schema";

export async function findAll() {
  return prisma.nasabah.findMany({
    select: { id: true, nik: true, nama: true, email: true, nomorHp: true, createdAt: true }
  });
}

export async function findById(id: string) {
  return prisma.nasabah.findUnique({
    where: { id },
    select: { id: true, nik: true, nama: true, email: true, nomorHp: true, createdAt: true }
  });
}

export async function create(input: CreateNasabahInput) {
  const passwordHash = await bcrypt.hash(input.password, 10);
  return prisma.nasabah.create({
    data: {
      nik: input.nik,
      nama: input.nama,
      email: input.email,
      passwordHash,
      nomorHp: input.nomor_hp
    },
    select: { id: true, nik: true, nama: true, email: true, nomorHp: true }
  });
}

export async function update(id: string, input: UpdateNasabahInput) {
  return prisma.nasabah.update({
    where: { id },
    data: {
      ...(input.nik && { nik: input.nik }),
      ...(input.nama && { nama: input.nama }),
      ...(input.email && { email: input.email }),
      ...(input.nomor_hp && { nomorHp: input.nomor_hp })
    },
    select: { id: true, nik: true, nama: true, email: true, nomorHp: true }
  });
}

export async function remove(id: string) {
  return prisma.nasabah.delete({ where: { id } });
}
```

### 5.3 Bikin Controller

`src/modules/nasabah/nasabah.controller.ts`:

```typescript
import { Request, Response, NextFunction } from "express";
import { createNasabahSchema, updateNasabahSchema } from "./nasabah.schema";
import * as service from "./nasabah.service";
import { sukses, gagal } from "../../lib/response";

export async function listAll(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await service.findAll();
    return sukses(res, data);
  } catch (err) { next(err); }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const nasabah = await service.findById(req.params.id);
    if (!nasabah) return gagal(res, 404, "NOT_FOUND", "Nasabah tidak ditemukan");
    return sukses(res, nasabah);
  } catch (err) { next(err); }
}

export async function daftar(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = createNasabahSchema.safeParse(req.body);
    if (!parsed.success) {
      return gagal(res, 422, "VALIDATION_ERROR", "Validasi gagal", parsed.error.errors);
    }
    const nasabah = await service.create(parsed.data);
    return sukses(res, nasabah, 201);
  } catch (err: any) {
    if (err.code === "P2002") {
      return gagal(res, 409, "DUPLICATE", "Email atau NIK sudah terdaftar");
    }
    next(err);
  }
}

export async function ubah(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = updateNasabahSchema.safeParse(req.body);
    if (!parsed.success) {
      return gagal(res, 422, "VALIDATION_ERROR", "Validasi gagal", parsed.error.errors);
    }
    const nasabah = await service.update(req.params.id, parsed.data);
    return sukses(res, nasabah);
  } catch (err) { next(err); }
}

export async function hapus(req: Request, res: Response, next: NextFunction) {
  try {
    await service.remove(req.params.id);
    return res.status(204).send();
  } catch (err) { next(err); }
}
```

### 5.4 Bikin Routes

`src/modules/nasabah/nasabah.routes.ts`:

```typescript
import { Router } from "express";
import * as ctrl from "./nasabah.controller";

const router = Router();

router.get("/", ctrl.listAll);
router.get("/:id", ctrl.getById);
router.post("/", ctrl.daftar);
router.patch("/:id", ctrl.ubah);
router.delete("/:id", ctrl.hapus);

export default router;
```

### 5.5 Mount Routes di `index.ts`

Update `src/index.ts`:

```typescript
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./config/env";
import { sukses } from "./lib/response";
import nasabahRoutes from "./modules/nasabah/nasabah.routes";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => sukses(res, { status: "ok" }));
app.use("/api/v1/nasabah", nasabahRoutes);

app.listen(env.PORT, () => {
  console.log(`🚀 API jalan di http://localhost:${env.PORT}`);
});
```

### 5.6 Test 5 Endpoint

```bash
# 1. POST — daftar nasabah baru
curl -X POST http://localhost:3000/api/v1/nasabah \
  -H "Content-Type: application/json" \
  -d '{"nik":"3173052501800001","nama":"Sari Wulan","email":"sari@email.com","password":"rahasia12345","nomor_hp":"081234567890"}'

# 2. GET — list semua
curl http://localhost:3000/api/v1/nasabah

# 3. GET — detail (ganti {id} dengan ID dari response POST)
curl http://localhost:3000/api/v1/nasabah/{id}

# 4. PATCH — update
curl -X PATCH http://localhost:3000/api/v1/nasabah/{id} \
  -H "Content-Type: application/json" \
  -d '{"nama":"Sari Wulandari"}'

# 5. DELETE
curl -X DELETE http://localhost:3000/api/v1/nasabah/{id}
```

**Checkpoint**: 5 endpoint Nasabah jalan, validasi Zod aktif, error format konsisten. ✅

---

## Langkah 6 — Module Tabungan Haji + Endpoint Setor (60 menit)

**Tujuan**: endpoint buka tabungan + setor saldo dengan idempotency & DB transaction.

### 6.1 Schema Validation

`src/modules/tabungan-haji/tabungan.schema.ts`:

```typescript
import { z } from "zod";

export const bukaTabunganSchema = z.object({
  nasabah_id: z.string().uuid("ID nasabah harus UUID valid")
});

export const setorSchema = z.object({
  nominal: z.number().int().min(100000, "Setoran minimum Rp 100.000"),
  metode: z.enum(["QRIS", "ATM", "TELLER", "TRANSFER"]),
  referensi: z.string().min(8, "Referensi minimal 8 karakter (idempotency key)")
});

export type SetorInput = z.infer<typeof setorSchema>;
```

### 6.2 Service dengan DB Transaction

`src/modules/tabungan-haji/tabungan.service.ts`:

```typescript
import { prisma } from "../../lib/prisma";
import { SetorInput } from "./tabungan.schema";

function generateNomorRekening(): string {
  const random = Math.floor(Math.random() * 100000000).toString().padStart(8, "0");
  return `7011${random}`;
}

export async function buka(nasabahId: string) {
  return prisma.tabunganHaji.create({
    data: {
      nasabahId,
      nomorRekening: generateNomorRekening()
    }
  });
}

export async function findById(id: string) {
  const t = await prisma.tabunganHaji.findUnique({
    where: { id },
    include: { nasabah: { select: { nama: true, email: true } } }
  });
  if (!t) return null;
  return { ...t, saldo: t.saldo.toString() };  // BigInt → string supaya safe untuk JSON
}

export async function mutasi(tabunganId: string) {
  const list = await prisma.transaksi.findMany({
    where: { tabunganId },
    orderBy: { waktu: "desc" },
    take: 50
  });
  return list.map((t) => ({
    ...t,
    nominal: t.nominal.toString(),
    saldoSebelum: t.saldoSebelum.toString(),
    saldoSesudah: t.saldoSesudah.toString()
  }));
}

export async function setor(tabunganId: string, input: SetorInput, actorId?: string) {
  // Idempotency check
  const existing = await prisma.transaksi.findUnique({
    where: { referensi: input.referensi }
  });
  if (existing) {
    return {
      ...existing,
      nominal: existing.nominal.toString(),
      saldoSebelum: existing.saldoSebelum.toString(),
      saldoSesudah: existing.saldoSesudah.toString()
    };
  }

  // Transaction: update saldo + insert transaksi + audit log
  return prisma.$transaction(async (tx) => {
    const tabungan = await tx.tabunganHaji.findUnique({ where: { id: tabunganId } });
    if (!tabungan) throw new Error("TABUNGAN_NOT_FOUND");
    if (tabungan.status !== "AKTIF") throw new Error("TABUNGAN_TIDAK_AKTIF");

    const saldoSebelum = tabungan.saldo;
    const saldoSesudah = saldoSebelum + BigInt(input.nominal);

    await tx.tabunganHaji.update({
      where: { id: tabunganId },
      data: { saldo: saldoSesudah }
    });

    const transaksi = await tx.transaksi.create({
      data: {
        tabunganId,
        jenis: "SETOR",
        nominal: BigInt(input.nominal),
        saldoSebelum,
        saldoSesudah,
        referensi: input.referensi,
        metode: input.metode
      }
    });

    await tx.auditLog.create({
      data: {
        actorId,
        action: "SETOR_TABUNGAN",
        entity: "tabungan_haji",
        entityId: tabunganId,
        metadata: { nominal: input.nominal, metode: input.metode }
      }
    });

    return {
      ...transaksi,
      nominal: transaksi.nominal.toString(),
      saldoSebelum: transaksi.saldoSebelum.toString(),
      saldoSesudah: transaksi.saldoSesudah.toString()
    };
  });
}
```

### 6.3 Controller + Routes

`src/modules/tabungan-haji/tabungan.controller.ts`:

```typescript
import { Request, Response, NextFunction } from "express";
import { bukaTabunganSchema, setorSchema } from "./tabungan.schema";
import * as service from "./tabungan.service";
import { sukses, gagal } from "../../lib/response";

export async function bukaTabungan(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = bukaTabunganSchema.safeParse(req.body);
    if (!parsed.success) return gagal(res, 422, "VALIDATION_ERROR", "Validasi gagal", parsed.error.errors);
    const t = await service.buka(parsed.data.nasabah_id);
    return sukses(res, { ...t, saldo: t.saldo.toString() }, 201);
  } catch (err) { next(err); }
}

export async function detail(req: Request, res: Response, next: NextFunction) {
  try {
    const t = await service.findById(req.params.id);
    if (!t) return gagal(res, 404, "NOT_FOUND", "Tabungan tidak ditemukan");
    return sukses(res, t);
  } catch (err) { next(err); }
}

export async function getMutasi(req: Request, res: Response, next: NextFunction) {
  try {
    const list = await service.mutasi(req.params.id);
    return sukses(res, list);
  } catch (err) { next(err); }
}

export async function setor(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = setorSchema.safeParse(req.body);
    if (!parsed.success) return gagal(res, 422, "VALIDATION_ERROR", "Validasi gagal", parsed.error.errors);
    const t = await service.setor(req.params.id, parsed.data);
    return sukses(res, t, 201);
  } catch (err: any) {
    if (err.message === "TABUNGAN_NOT_FOUND") return gagal(res, 404, "NOT_FOUND", "Tabungan tidak ditemukan");
    if (err.message === "TABUNGAN_TIDAK_AKTIF") return gagal(res, 409, "TABUNGAN_TIDAK_AKTIF", "Tabungan tidak aktif");
    next(err);
  }
}
```

`src/modules/tabungan-haji/tabungan.routes.ts`:

```typescript
import { Router } from "express";
import * as ctrl from "./tabungan.controller";

const router = Router();

router.post("/", ctrl.bukaTabungan);
router.get("/:id", ctrl.detail);
router.get("/:id/mutasi", ctrl.getMutasi);
router.post("/:id/setor", ctrl.setor);

export default router;
```

### 6.4 Mount di `index.ts`

Tambah baris:
```typescript
import tabunganRoutes from "./modules/tabungan-haji/tabungan.routes";
// ...
app.use("/api/v1/tabungan-haji", tabunganRoutes);
```

### 6.5 Test End-to-End

```bash
# 1. Daftar nasabah baru (catat ID-nya)
curl -X POST http://localhost:3000/api/v1/nasabah \
  -H "Content-Type: application/json" \
  -d '{"nik":"3173052501800002","nama":"Budi Pratama","email":"budi@email.com","password":"rahasia12345","nomor_hp":"081234567891"}'

# 2. Buka tabungan untuk nasabah ini
curl -X POST http://localhost:3000/api/v1/tabungan-haji \
  -H "Content-Type: application/json" \
  -d '{"nasabah_id":"<ID_NASABAH>"}'

# 3. Setor pertama (catat ID tabungan)
curl -X POST http://localhost:3000/api/v1/tabungan-haji/<ID_TABUNGAN>/setor \
  -H "Content-Type: application/json" \
  -d '{"nominal":500000,"metode":"QRIS","referensi":"TRX-001"}'

# 4. Setor dengan referensi sama (idempotent test) — harus return transaksi yang sama, saldo tidak nambah
curl -X POST http://localhost:3000/api/v1/tabungan-haji/<ID_TABUNGAN>/setor \
  -H "Content-Type: application/json" \
  -d '{"nominal":500000,"metode":"QRIS","referensi":"TRX-001"}'

# 5. Lihat mutasi
curl http://localhost:3000/api/v1/tabungan-haji/<ID_TABUNGAN>/mutasi

# 6. Cek detail tabungan (saldo harus 500.000, bukan 1.000.000)
curl http://localhost:3000/api/v1/tabungan-haji/<ID_TABUNGAN>
```

**Checkpoint**:
- Setor pertama sukses, saldo = 500.000.
- Setor dengan referensi sama tidak nambah saldo (idempotent ✓).
- Mutasi muncul di tabel `transaksi`.
- Audit log tercatat di tabel `audit_log` (cek via psql).
✅

---

## Langkah 7 — Authentication JWT (45 menit)

**Tujuan**: endpoint login + middleware yang protect endpoint sensitif.

### 7.1 Schema & Service Auth

`src/modules/auth/auth.schema.ts`:

```typescript
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

export type LoginInput = z.infer<typeof loginSchema>;
```

`src/modules/auth/auth.service.ts`:

```typescript
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../lib/prisma";
import { env } from "../../config/env";
import { LoginInput } from "./auth.schema";

export async function login(input: LoginInput) {
  const nasabah = await prisma.nasabah.findUnique({ where: { email: input.email } });
  if (!nasabah) throw new Error("INVALID_CREDENTIALS");

  const valid = await bcrypt.compare(input.password, nasabah.passwordHash);
  if (!valid) throw new Error("INVALID_CREDENTIALS");

  const token = jwt.sign(
    { id: nasabah.id, email: nasabah.email },
    env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return { token, user: { id: nasabah.id, nama: nasabah.nama, email: nasabah.email } };
}
```

### 7.2 Middleware Auth

`src/middleware/auth.ts`:

```typescript
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { gagal } from "../lib/response";

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; email: string };
    }
  }
}

export function authJwt(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return gagal(res, 401, "UNAUTHORIZED", "Token tidak ada");
  }

  try {
    const token = header.slice(7);
    const decoded = jwt.verify(token, env.JWT_SECRET) as { id: string; email: string };
    req.user = decoded;
    next();
  } catch {
    gagal(res, 401, "INVALID_TOKEN", "Token tidak valid atau expired");
  }
}
```

### 7.3 Routes Auth

`src/modules/auth/auth.routes.ts`:

```typescript
import { Router, Request, Response } from "express";
import { loginSchema } from "./auth.schema";
import * as service from "./auth.service";
import { sukses, gagal } from "../../lib/response";

const router = Router();

router.post("/login", async (req: Request, res: Response, next) => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) return gagal(res, 422, "VALIDATION_ERROR", "Validasi gagal", parsed.error.errors);
    const result = await service.login(parsed.data);
    return sukses(res, result);
  } catch (err: any) {
    if (err.message === "INVALID_CREDENTIALS") return gagal(res, 401, "UNAUTHORIZED", "Email atau password salah");
    next(err);
  }
});

export default router;
```

### 7.4 Mount + Proteksi Endpoint Sensitif

Update `src/index.ts`:

```typescript
import authRoutes from "./modules/auth/auth.routes";
import { authJwt } from "./middleware/auth";

// ... existing code

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/nasabah", nasabahRoutes);
app.use("/api/v1/tabungan-haji", authJwt, tabunganRoutes);  // ← protect tabungan
```

### 7.5 Test Login Flow

```bash
# 1. Login
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"budi@email.com","password":"rahasia12345"}'

# Catat token dari response.data.token

# 2. Akses tabungan tanpa token (harus 401)
curl http://localhost:3000/api/v1/tabungan-haji/<ID>

# 3. Akses tabungan dengan token
curl http://localhost:3000/api/v1/tabungan-haji/<ID> \
  -H "Authorization: Bearer <TOKEN>"
```

**Checkpoint**:
- Login return token JWT.
- Akses `/tabungan-haji/*` tanpa token = 401.
- Akses dengan token valid = sukses.
✅

---

## Langkah 8 — Test Manual dengan Postman (20 menit)

**Tujuan**: punya koleksi test yang bisa di-reuse & share ke tim.

### 8.1 Install Postman

Download dari [postman.com/downloads](https://www.postman.com/downloads/). Pilih sesuai OS:
- macOS (Intel/Apple Silicon)
- Windows (64-bit)
- Linux (`.deb` / `.rpm` / Snap)

Install seperti aplikasi biasa, lalu **Sign in** (atau Skip kalau mau pakai tanpa akun — disarankan sign in supaya collection ter-sync ke cloud).

### 8.2 Bikin Workspace + Collection

1. Buka Postman → **Workspaces** → **Create Workspace** → nama: `ODP-Tabungan-Haji`.
2. Di workspace itu, klik **Collections** → **+** → nama: `Tabungan Haji API`.
3. Klik **Environments** → **+** → bikin 3 environment: `local`, `staging`, `production`.
4. Di environment `local`, tambah variable:
   - `baseUrl` → `http://localhost:3000`
   - `token` → (kosong dulu, akan diisi setelah login)
   - `nasabah_id` → (kosong)
   - `tabungan_id` → (kosong)
5. Klik **Set active** untuk environment `local` (icon mata di kanan atas).

### 8.3 Bikin Request

Bikin request berikut di Collection `Tabungan Haji API`. Untuk grouping, bikin **folder** (`Auth`, `Nasabah`, `Tabungan`).

| Folder | Method | URL |
|---|---|---|
| Auth | POST | `{{baseUrl}}/api/v1/auth/login` |
| Nasabah | GET | `{{baseUrl}}/api/v1/nasabah` |
| Nasabah | POST | `{{baseUrl}}/api/v1/nasabah` |
| Nasabah | GET | `{{baseUrl}}/api/v1/nasabah/{{nasabah_id}}` |
| Nasabah | PATCH | `{{baseUrl}}/api/v1/nasabah/{{nasabah_id}}` |
| Tabungan | POST | `{{baseUrl}}/api/v1/tabungan-haji` |
| Tabungan | GET | `{{baseUrl}}/api/v1/tabungan-haji/{{tabungan_id}}` |
| Tabungan | POST | `{{baseUrl}}/api/v1/tabungan-haji/{{tabungan_id}}/setor` |
| Tabungan | GET | `{{baseUrl}}/api/v1/tabungan-haji/{{tabungan_id}}/mutasi` |

Untuk endpoint yang perlu auth, di tab **Authorization** pilih **Type: Bearer Token** → **Token: `{{token}}`** (Postman auto-resolve dari environment).

### 8.4 Bikin Body Request (untuk POST/PATCH)

Untuk request POST/PATCH, di tab **Body** pilih **raw → JSON**:

```json
// POST /auth/login
{ "email": "budi@email.com", "password": "rahasia12345" }

// POST /nasabah
{
  "nik": "3173052501800002",
  "nama": "Budi Pratama",
  "email": "budi@email.com",
  "password": "rahasia12345",
  "nomor_hp": "081234567891"
}

// POST /tabungan-haji
{ "nasabah_id": "{{nasabah_id}}" }

// POST /tabungan-haji/{id}/setor
{ "nominal": 500000, "metode": "QRIS", "referensi": "TRX-001" }
```

### 8.5 Auto-extract Token Setelah Login (Tips Pro)

Di request **POST /auth/login**, tab **Tests**, tulis script ini:

```javascript
const response = pm.response.json();
if (response.data && response.data.token) {
  pm.environment.set("token", response.data.token);
  console.log("Token saved to environment");
}
```

Sekarang setiap kali login sukses, `{{token}}` otomatis ter-update — tidak perlu copy-paste manual.

### 8.6 Test Flow End-to-End

Jalankan urut:
1. **POST /nasabah** — daftar nasabah baru. Copy `id` dari response → set ke environment variable `nasabah_id`.
2. **POST /auth/login** — login dengan email/password yang baru didaftarkan → token auto-saved (lihat 8.5).
3. **POST /tabungan-haji** — buka tabungan. Copy `id` → set ke `tabungan_id`.
4. **POST /tabungan-haji/{id}/setor** — setor saldo 500.000.
5. **GET /tabungan-haji/{id}/mutasi** — harus muncul 1 transaksi.

### 8.7 Export Collection

Untuk share ke tim:
1. Klik kanan Collection → **Export** → pilih **Collection v2.1** → save file `.json`.
2. Kirim ke tim atau commit ke repo (`postman/Tabungan-Haji-API.postman_collection.json`).
3. Tim lain bisa **Import** file ini di Postman mereka.

**Checkpoint**: Postman collection siap pakai, semua endpoint ter-test, bisa di-export & share. ✅

---

## Langkah 9 — (Opsional) Auto-Generate dengan Claude Code (30 menit)

**Tujuan**: praktekkan skill prompt engineering yang dipelajari di Modul 1.

### 9.1 Generate Module Baru

Misal kita mau tambah module **Produk** (master data produk tabungan/deposito). Buka terminal di root project:

```bash
claude
```

Lalu prompt:

```
Baca file src/modules/nasabah/nasabah.service.ts dan src/modules/nasabah/nasabah.controller.ts
sebagai contoh pattern Controller-Service-Schema yang dipakai di project ini.

Tugas: bikin module baru "produk" dengan struktur sama:
- src/modules/produk/produk.schema.ts (Zod schema untuk Create & Update)
- src/modules/produk/produk.service.ts (5 function: findAll, findById, create, update, remove)
- src/modules/produk/produk.controller.ts (5 handler: listAll, getById, daftar, ubah, hapus)
- src/modules/produk/produk.routes.ts (5 route REST)

Model "Produk" di Prisma schema (akan saya tambah dulu):
- id: UUID
- kode: string unique (mis. "TAB-HAJI", "DEPOSITO-SYR")
- nama: string
- deskripsi: string (optional)
- bagi_hasil_min: number (decimal, %)
- bagi_hasil_max: number (decimal, %)
- aktif: boolean default true

Pakai response format sukses()/gagal() dari src/lib/response.ts.
Setelah generate, mount di src/index.ts.
```

Claude akan baca file existing, generate 4 file baru, dan update `index.ts`. Anda tinggal:
1. Review tiap file (jangan blindly approve).
2. Tambah model `Produk` ke `prisma/schema.prisma`.
3. Run `npx prisma migrate dev --name add_produk`.
4. Test endpoint baru.

### 9.2 Generate Dokumentasi

```
Bikin file API.md di root project yang dokumentasikan semua endpoint REST yang ada
di project ini. Format: per endpoint cantumkan method, URL, request body schema,
response example (sukses + error), dan example curl.

Baca semua file routes di src/modules/*/[a-z]*.routes.ts untuk daftar endpoint.
```

**Checkpoint**: punya 1 module baru di-generate AI + dokumentasi auto. ✅

---

## Tugas Lanjutan (Untuk Latihan Mandiri)

Pilih minimal 2 dari berikut:

### A. Implementasi Tarik Saldo

Tambah endpoint `POST /api/v1/tabungan-haji/:id/tarik` dengan:
- Validasi: nominal min Rp 50.000.
- Cek saldo cukup (kalau kurang, return 422 `SALDO_TIDAK_CUKUP`).
- Idempotency via referensi.
- Audit log dengan action `TARIK_TABUNGAN`.

### B. Pagination & Filter di List Endpoint

Tambah query parameter di `GET /nasabah`:
- `?page=1&limit=20` — pagination.
- `?search=sari` — search by nama.
- Response include `meta.pagination` (lihat §2.6.4 di materi).

### C. Soft Delete

Tambah kolom `deletedAt` di model Nasabah. Endpoint DELETE jangan hapus row, tapi set `deletedAt = NOW()`. List endpoint filter out yang `deletedAt != null`.

### D. Rate Limiting

Pakai `express-rate-limit` — max 100 request/menit per IP di endpoint `/api/v1/*`. Return 429 dengan format error standard.

### E. Seed Data

Bikin `prisma/seed.ts` yang insert 5 nasabah + 5 tabungan + 10 transaksi dummy untuk testing. Run via `npx prisma db seed`.

---

## Troubleshooting

| Masalah | Solusi |
|---|---|
| `Cannot connect to database` | Cek `docker ps` — pastikan container `pg-tabungan-haji` jalan. Restart: `docker start pg-tabungan-haji`. |
| `Migration failed` | Reset database: `npx prisma migrate reset` (hati-hati: hapus semua data). |
| `EADDRINUSE: port 3000` | Port 3000 dipakai. Ganti `PORT` di `.env` atau kill process: `lsof -ti :3000 \| xargs kill`. |
| `BigInt cannot be serialized` | Sudah di-handle di service (BigInt → string). Kalau muncul, cek apakah ada field yang lupa di-convert. |
| `Invalid token` saat akses protected endpoint | Token expired (max 1 hari) — login ulang. Atau format header salah — harus `Authorization: Bearer xxx`. |
| TypeScript error import Prisma | Run `npx prisma generate` ulang. |

---

## Checklist Akhir Latihan

Sebelum lanjut ke Modul 3, pastikan:

- [ ] PostgreSQL jalan di Docker, bisa di-connect.
- [ ] 4 table terbuat: `nasabah`, `tabungan_haji`, `transaksi`, `audit_log`.
- [ ] Express server jalan di port 3000.
- [ ] Endpoint `/health` return response format standard `{ data, error, meta }`.
- [ ] 5 endpoint Nasabah berfungsi (CRUD).
- [ ] Endpoint buka tabungan, setor, mutasi, detail berfungsi.
- [ ] Idempotency test passed (setor 2x dengan referensi sama = saldo tidak ganda).
- [ ] DB transaction kerja (audit log tercatat saat setor sukses).
- [ ] Login endpoint return JWT token.
- [ ] Middleware JWT protect endpoint tabungan.
- [ ] Format response konsisten (sukses & error) sesuai §2.6 materi.
- [ ] Postman collection siap pakai (bisa di-export & share).

**Sudah semua tercentang?** Anda siap masuk **Modul 3 — React/Next.js & Integrasi API**, di mana API ini akan dipakai untuk membangun UI mobile banking.

---

## Sumber & Referensi

- Source code lengkap (referensi solusi): _akan disediakan instruktur._
- Materi konseptual: `materi.md` di folder yang sama.
- Prisma Docs: [prisma.io/docs](https://www.prisma.io/docs)
- Express + TypeScript Guide: [express.com/typescript](https://expressjs.com/en/advanced/best-practice-typescript.html)
- Postman Learning Center: [learning.postman.com](https://learning.postman.com/)
