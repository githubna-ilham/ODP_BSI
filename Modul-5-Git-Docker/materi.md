# Modul 5 — Git Flow & Dockerizing Apps

> **Hari ke-5 ODP BSI IT Development — hari terakhir Fase 1**. Setelah Anda punya kode yang bersih & ter-test (Modul 4), saatnya pikirkan **bagaimana kode itu dikelola oleh tim** (Git workflow) dan **bagaimana di-deploy** (containerization dengan Docker). Setelah modul ini, aplikasi Tabungan Haji Anda siap **dijalankan di server manapun**.

> Setelah modul ini Anda harus bisa: (a) menerapkan Git Flow branching model dengan benar, (b) menulis pull request yang baik dan melakukan code review, (c) memahami konsep container vs VM, (d) menulis Dockerfile production-ready untuk backend & frontend, (e) menjalankan multi-container app dengan Docker Compose.

---

## 1. Pengantar — Dari Kode Lokal ke Production

```mermaid
flowchart LR
    Dev["Kode di laptop<br/>(Modul 1-4)"] --> Git["Git workflow<br/>(Modul 5 - hari ini)"]:::today
    Git --> Docker["Docker<br/>(Modul 5 - hari ini)"]:::today
    Docker --> Server["Server / Cloud<br/>(future)"]
    Server --> User["Nasabah BSI"]

    classDef today fill:#dbeafe,stroke:#3b82f6,stroke-width:3px
```

Tanpa Modul 5, kode Anda hanya jalan di laptop. Setelah Modul 5:
- Tim bisa **kolaborasi** tanpa konflik.
- Setiap perubahan **terdokumentasi & review-able**.
- Kode bisa **dijalankan di mana saja** tanpa "works on my machine".

---

## 2. Git — Refresher Singkat

### 2.1 Konsep Inti

| Konsep | Singkat |
|---|---|
| **Repository** | Folder + history perubahan (`.git/`) |
| **Commit** | Snapshot kode pada satu titik waktu |
| **Branch** | Garis perubahan paralel |
| **Merge** | Gabungkan branch satu ke yang lain |
| **Remote** | Repo di server (GitHub, GitLab) |
| **Push / Pull** | Upload/download commit dari remote |

### 2.2 Command Sehari-hari

```bash
# Setup
git init                              # mulai repo baru
git clone <url>                       # clone dari remote

# Workflow harian
git status                            # cek apa yang berubah
git diff                              # lihat detail perubahan
git add <file>                        # stage file untuk commit
git add .                             # stage semua (hati-hati)
git commit -m "pesan"                 # commit
git log --oneline -10                 # lihat 10 commit terakhir

# Branch
git branch                            # list branch
git checkout -b feature/setor-qris    # bikin & pindah ke branch baru
git checkout main                     # pindah ke branch lain
git merge feature/setor-qris          # gabungkan branch lain ke current

# Remote
git push origin main                  # upload ke remote
git pull origin main                  # download dari remote
git fetch                             # download tanpa merge
```

### 2.3 Commit yang Baik

| ❌ Buruk | ✓ Baik |
|---|---|
| `"update"` | `"feat: tambah endpoint setor tabungan haji"` |
| `"fix bug"` | `"fix: cegah double-setor saat referensi sama"` |
| `"asdsada"` | `"refactor: pecah tabungan.service jadi helper kecil"` |
| `"wip"` | `"wip: implementasi validasi nominal min Rp 100rb"` |

**Konvensi populer — Conventional Commits**:

```
<tipe>(<scope opsional>): <pesan singkat>

[body opsional]

[footer opsional]
```

| Tipe | Contoh |
|---|---|
| `feat` | Fitur baru |
| `fix` | Bug fix |
| `refactor` | Refactor tanpa ubah behavior |
| `test` | Tambah/ubah test |
| `docs` | Dokumentasi |
| `chore` | Maintenance (dependency, config) |
| `perf` | Performance improvement |
| `style` | Format/lint (tidak ubah logic) |

Contoh lengkap:
```
feat(tabungan): tambah endpoint setor via QRIS

- POST /api/v1/tabungan-haji/{id}/setor
- Idempotent via header Idempotency-Key
- Validasi nominal min Rp 100rb (Zod)
- Audit log untuk compliance OJK

Closes BSI-123
```

---

## 3. Git Flow Branching Model

**Git Flow** adalah branching strategy yang paling banyak dipakai di tim banking & enterprise. Diusulkan oleh Vincent Driessen tahun 2010.

### 3.1 Lima Tipe Branch

```mermaid
flowchart LR
    main["main / master<br/>(production)"]:::prod
    develop["develop<br/>(integration)"]:::dev
    feature["feature/*<br/>(fitur baru)"]:::feat
    release["release/*<br/>(persiapan rilis)"]:::rel
    hotfix["hotfix/*<br/>(fix urgent di prod)"]:::hf

    feature --> develop
    develop --> release
    release --> main
    release --> develop
    main --> hotfix
    hotfix --> main
    hotfix --> develop

    classDef prod fill:#dcfce7,stroke:#16a34a,stroke-width:3px
    classDef dev fill:#dbeafe,stroke:#3b82f6,stroke-width:2px
    classDef feat fill:#fef3c7,stroke:#f59e0b
    classDef rel fill:#fce7f3,stroke:#ec4899
    classDef hf fill:#fee2e2,stroke:#dc2626,stroke-width:2px
```

| Branch | Lifespan | Tujuan | Source | Merge to |
|---|---|---|---|---|
| `main` | Selamanya | Kode production | — | — |
| `develop` | Selamanya | Integrasi fitur sebelum rilis | `main` (sekali, awal) | — |
| `feature/*` | Sementara | Pengembangan 1 fitur | `develop` | `develop` |
| `release/*` | Sementara | Persiapan rilis (bugfix kecil, versioning) | `develop` | `main` + `develop` |
| `hotfix/*` | Sementara | Bug urgent di prod | `main` | `main` + `develop` |

### 3.2 Workflow Step-by-Step

**Mulai fitur baru** (mis. setor QRIS):

```bash
git checkout develop
git pull origin develop
git checkout -b feature/setor-qris
# ... kerjakan, commit beberapa kali
git push origin feature/setor-qris
# buka Pull Request di GitHub: feature/setor-qris → develop
# setelah PR di-approve & merged, hapus branch
git checkout develop
git pull origin develop
git branch -d feature/setor-qris
```

**Persiapan rilis v1.2.0**:

```bash
git checkout develop
git checkout -b release/v1.2.0
# Test rigorous, fix bug kecil, update CHANGELOG, bump version
git push origin release/v1.2.0
# Setelah QA pass:
git checkout main
git merge --no-ff release/v1.2.0
git tag -a v1.2.0 -m "Release v1.2.0 — fitur setor QRIS"
git push origin main --tags
# Merge balik ke develop juga supaya develop selalu paling baru
git checkout develop
git merge --no-ff release/v1.2.0
git push origin develop
git branch -d release/v1.2.0
```

**Hotfix urgent — bug saldo negatif di production**:

```bash
git checkout main
git checkout -b hotfix/saldo-negatif
# Fix bug, test
git push origin hotfix/saldo-negatif
# PR: hotfix/saldo-negatif → main (urgent review)
# Setelah merged, tag patch version:
git tag -a v1.2.1 -m "Hotfix: cegah saldo jadi negatif"
# Merge balik ke develop
git checkout develop
git merge --no-ff hotfix/saldo-negatif
```

### 3.3 Aturan Penting Git Flow

1. **JANGAN commit langsung ke `main` atau `develop`** — selalu via PR dari feature branch.
2. **`main` harus selalu deployable** — kapan saja bisa rilis.
3. **1 feature = 1 branch = 1 PR** — jangan campur 2 fitur dalam 1 branch.
4. **PR kecil, sering** > PR besar, jarang.
5. **Hapus branch setelah merged** supaya tidak menumpuk.

---

## 4. Alternative Workflows

Git Flow bukan satu-satunya. Pilihan lain:

### 4.1 GitHub Flow (Lebih Simple)

Hanya 2 jenis branch:
- `main` — production-ready.
- `feature/*` — semua perubahan via feature branch ke main.

Tidak ada `develop`, `release`, `hotfix`. Cocok untuk **continuous deployment** — tiap merge ke main langsung deploy ke production.

```
main ──●──●──●──●──●──→
        \   \    \
        f1   f2   f3
```

### 4.2 Trunk-Based Development

Tim besar dengan deployment sering (Google, Facebook scale):
- Semua commit ke `main` (trunk).
- Branch hidup **maksimal 1-2 hari**.
- Fitur belum jadi tetap di-merge, ditutup pakai **feature flag**.

### 4.3 Kapan Pilih Mana?

| Workflow | Cocok untuk |
|---|---|
| **Git Flow** | Enterprise/banking dengan versi rilis terjadwal (mingguan/bulanan), regulasi ketat |
| **GitHub Flow** | Web app dengan continuous deployment, tim kecil-menengah |
| **Trunk-Based** | Tim sangat besar, deployment harian/jam-jaman |

Untuk **BSI** umumnya **Git Flow** lebih cocok karena ada release schedule, regulator audit, dan butuh hotfix branch terpisah.

---

## 5. Pull Request Best Practices

PR adalah **gerbang utama code review**. PR yang baik = merge yang mulus.

### 5.1 Anatomi PR yang Baik

**Judul**: konvensional commit format
```
feat(tabungan): tambah endpoint setor via QRIS
```

**Body** (template):

```markdown
## Apa yang diubah?
Tambah endpoint `POST /api/v1/tabungan-haji/{id}/setor` untuk
memproses setor saldo via QRIS, ATM, atau Teller.

## Kenapa?
Sesuai BSI-123 — nasabah perlu bisa setor tanpa ke cabang
untuk mendukung program nabung haji online.

## Cara test
1. `npm test` — semua unit test pass.
2. Run server, hit endpoint:
   ```
   curl -X POST localhost:3000/api/v1/tabungan-haji/PSTH-001/setor \
     -H "Idempotency-Key: test-1" \
     -d '{"nominal":500000,"metode":"QRIS"}'
   ```
3. Cek tabel `transaksi` — baru ada baris.
4. Cek tabel `audit_log` — entry SETOR_TABUNGAN tercatat.

## Checklist
- [x] Unit test added (coverage > 80%)
- [x] Validasi input dengan Zod
- [x] Audit log untuk compliance
- [x] OpenAPI docs di-update
- [x] No breaking change ke endpoint existing

## Screenshot / Output
(N/A untuk backend)

## Pertimbangan
Limit nominal maksimal belum di-set — confirm dengan tim Risk
sebelum rilis ke prod (set di config, bukan hardcode).
```

### 5.2 PR Size — Kecil & Fokus

| Size | Lines changed | Acceptable? |
|---|---|---|
| XS | < 50 | ✓ Mudah review |
| S | 50–250 | ✓ Standard |
| M | 250–500 | ⚠️ Mulai berat |
| L | 500–1000 | ⚠️ Pecah kalau bisa |
| XL | > 1000 | ❌ Tolak — reviewer tidak fokus |

> Better: 5 PR x 100 line daripada 1 PR x 500 line.

### 5.3 Branch Protection di GitHub

Setup di `Settings → Branches → Add rule` untuk `main`:

- ✅ Require pull request before merging
- ✅ Require approvals (minimal 1, idealnya 2)
- ✅ Dismiss stale PR approvals when new commits pushed
- ✅ Require status checks (CI tests must pass)
- ✅ Require branches up to date
- ✅ Include administrators (admin tidak boleh bypass)

Setup yang sama untuk `develop`.

---

## 6. CI/CD — Singkat

**Continuous Integration**: tiap push, otomatis run test & lint.
**Continuous Deployment**: tiap merge ke main, otomatis deploy.

### 6.1 GitHub Actions — Contoh Pipeline

`.github/workflows/ci.yml`:

```yaml
name: CI

on:
  pull_request:
    branches: [main, develop]
  push:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Type check
        run: npm run typecheck

      - name: Unit tests
        run: npm run test:run

      - name: Build
        run: npm run build
```

Setelah file ini di-commit, tiap PR akan otomatis jalankan pipeline. Hijau ✓ baru bisa merge.

---

## 7. Docker — Container vs Virtual Machine

### 7.1 Kenapa Container?

| Masalah klasik | Solusi container |
|---|---|
| "Jalan di laptop saya, tapi tidak di server" | Container bawa semua dependency-nya |
| Setup environment per developer makan waktu | `docker run` selesai dalam menit |
| Update Node.js di server = drama panjang | Container = unit immutable, easy swap |
| Scaling = bikin VM baru (boot 5 menit) | Container start dalam detik |

### 7.2 Container vs VM

```
┌─────────────────────────┐    ┌─────────────────────────┐
│     VIRTUAL MACHINE     │    │       CONTAINER         │
├─────────────────────────┤    ├─────────────────────────┤
│  App                    │    │  App                    │
│  Bins/Libs              │    │  Bins/Libs              │
│  Guest OS (Linux/Win)   │    │                         │
│  ─────────────────────  │    │  ─────────────────────  │
│  Hypervisor             │    │  Docker Engine          │
│  Host OS                │    │  Host OS                │
│  Hardware               │    │  Hardware               │
└─────────────────────────┘    └─────────────────────────┘
   Berat (GB), boot menit         Ringan (MB), boot detik
```

VM = simulasi komputer lengkap. Container = isolasi proses yang share kernel host.

### 7.3 Konsep Inti Docker

| Konsep | Penjelasan |
|---|---|
| **Image** | Template read-only (mis. `node:20`, `postgres:16`) |
| **Container** | Instance yang jalan dari image |
| **Dockerfile** | Resep untuk build image |
| **Volume** | Persistent storage di luar container |
| **Network** | Komunikasi antar container |
| **Registry** | Tempat simpan image (Docker Hub, ECR, GitHub Container Registry) |

Analogi: **Image** = blueprint rumah. **Container** = rumah yang sudah dibangun dari blueprint itu. Bisa ada banyak rumah (container) dari satu blueprint (image).

### 7.4 Setup Docker

Download **Docker Desktop** dari [docker.com](https://www.docker.com/products/docker-desktop) (Windows/Mac) atau install via package manager (Linux).

Verify:
```bash
docker --version
docker run hello-world
```

---

## 8. Dockerfile — Resep Container

### 8.1 Instruksi Dasar

| Instruksi | Fungsi |
|---|---|
| `FROM` | Base image |
| `WORKDIR` | Set working directory di container |
| `COPY` | Copy file dari host ke container |
| `RUN` | Eksekusi command saat build |
| `ENV` | Set environment variable |
| `EXPOSE` | Dokumentasi port yang dipakai |
| `CMD` | Command default saat container start |
| `ENTRYPOINT` | Command yang selalu jalan (CMD jadi argumen) |

### 8.2 Dockerfile untuk Backend Node.js (Modul 2)

`Dockerfile`:

```dockerfile
# ============ Stage 1: Build ============
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files dulu — supaya layer ini di-cache kalau tidak berubah
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Generate Prisma client + build TypeScript
RUN npx prisma generate
RUN npm run build

# ============ Stage 2: Production ============
FROM node:20-alpine

WORKDIR /app

# Copy hanya yang dibutuhkan production
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY package*.json ./

# Non-root user untuk security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S apiuser -u 1001
USER apiuser

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "dist/index.js"]
```

**Yang penting di sini**:

| Konsep | Penjelasan |
|---|---|
| `node:20-alpine` | Alpine Linux = image ringan (~50 MB vs 350 MB untuk Debian) |
| **Multi-stage build** | Stage 1 build, stage 2 hanya bawa hasil — image final lebih ramping |
| `npm ci` (bukan `install`) | Reproducible install dari `package-lock.json`, lebih cepat |
| Copy `package*.json` dulu | Layer caching: kalau dependency tidak berubah, npm install di-skip |
| `USER apiuser` | Jangan run as root — security best practice |

### 8.3 `.dockerignore`

Sama seperti `.gitignore`, tapi untuk Docker — file yang tidak ikut COPY:

```
node_modules
dist
.git
.env*
*.log
.DS_Store
README.md
```

### 8.4 Build & Run

```bash
# Build image
docker build -t tabungan-haji-api:1.0 .

# Run container
docker run -d \
  --name tabungan-api \
  -p 3000:3000 \
  -e DATABASE_URL="postgresql://..." \
  -e JWT_SECRET="rahasia" \
  tabungan-haji-api:1.0

# Lihat log
docker logs -f tabungan-api

# Stop & cleanup
docker stop tabungan-api
docker rm tabungan-api
```

### 8.5 Dockerfile untuk Frontend Next.js (Modul 3)

```dockerfile
# ============ Stage 1: Build ============
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ============ Stage 2: Run ============
FROM node:20-alpine

WORKDIR /app
ENV NODE_ENV=production

# Next.js standalone output (set di next.config.js)
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["node", "server.js"]
```

Setting di `next.config.js`:
```javascript
module.exports = {
  output: "standalone"   // generate minimal bundle untuk Docker
};
```

---

## 9. Docker Compose — Multi-Container Apps

Tabungan Haji butuh **3 service**: API + Frontend + Database. Jalankan semua dengan satu command pakai **Docker Compose**.

### 9.1 `docker-compose.yml`

```yaml
version: "3.9"

services:
  postgres:
    image: postgres:16-alpine
    container_name: bsi-postgres
    environment:
      POSTGRES_DB: tabungan_haji
      POSTGRES_USER: bsi_user
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - pgdata:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U bsi_user -d tabungan_haji"]
      interval: 10s
      timeout: 5s
      retries: 5

  api:
    build:
      context: ./api
      dockerfile: Dockerfile
    container_name: bsi-api
    depends_on:
      postgres:
        condition: service_healthy
    environment:
      DATABASE_URL: postgresql://bsi_user:${DB_PASSWORD}@postgres:5432/tabungan_haji
      JWT_SECRET: ${JWT_SECRET}
      NODE_ENV: production
    ports:
      - "3000:3000"
    restart: unless-stopped

  web:
    build:
      context: ./web
      dockerfile: Dockerfile
    container_name: bsi-web
    depends_on:
      - api
    environment:
      NEXT_PUBLIC_API_URL: http://localhost:3000/api/v1
    ports:
      - "3001:3000"
    restart: unless-stopped

volumes:
  pgdata:
```

### 9.2 File `.env` (Tidak Commit ke Git!)

```
DB_PASSWORD=rahasia_db_bsi_2026
JWT_SECRET=jwt_secret_yang_panjang_random
```

Tambahkan ke `.gitignore`:
```
.env
.env.*
!.env.example
```

### 9.3 Run Semua Service

```bash
# Start
docker compose up -d

# Lihat log semua service
docker compose logs -f

# Lihat log service spesifik
docker compose logs -f api

# Stop
docker compose down

# Stop + hapus volume (BERHATI-HATI — data PostgreSQL hilang)
docker compose down -v
```

### 9.4 Network Antar Container

Container dalam Compose otomatis bisa saling akses via **service name** sebagai hostname:

- API connect ke DB pakai host `postgres` (bukan `localhost`).
- Web connect ke API pakai host `api` (kalau internal call) atau `localhost:3000` (kalau via browser).

---

## 10. Deployment Considerations

### 10.1 Environment Variables — Tidak Boleh Hardcoded

| ❌ Salah | ✓ Benar |
|---|---|
| `const JWT = "rahasia123"` di kode | `const JWT = process.env.JWT_SECRET` |
| Commit `.env` ke git | `.env` di gitignore, share template `.env.example` |
| Password di Dockerfile | Pass lewat `-e` atau `compose env_file` |

### 10.2 Secret Management

| Untuk... | Pakai |
|---|---|
| Local dev | `.env` file (di gitignore) |
| CI/CD | GitHub Secrets / GitLab CI Variables |
| Production | Secret manager (AWS Secrets, HashiCorp Vault, Azure Key Vault) |
| **JANGAN** | Hardcode di kode, log ke console, commit ke Git |

### 10.3 Image Size — Pelihara Kecil

Image gede = slow pull = slow deploy.

| Optimasi | Hasil |
|---|---|
| Base image Alpine | -200 MB |
| Multi-stage build | -100 MB (tidak bawa devDependencies) |
| `.dockerignore` ketat | -50 MB |
| Layer caching efisien | Build lebih cepat (bukan size) |

Cek size: `docker images tabungan-haji-api`

### 10.4 Health Check

Container yang "jalan" belum tentu sehat. Tambah endpoint health check di API:

```typescript
app.get("/health", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;   // ping DB
    res.json({ status: "ok", timestamp: new Date() });
  } catch (err) {
    res.status(503).json({ status: "unhealthy", error: err.message });
  }
});
```

Di Dockerfile:
```dockerfile
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --spider -q http://localhost:3000/health || exit 1
```

Docker akan auto-restart container yang unhealthy.

### 10.5 Logging Production

| ❌ Buruk | ✓ Baik |
|---|---|
| `console.log` semua | Pakai struktur logger (pino, winston) |
| Log password / token | Pakai log redaction |
| Log ke file | Log ke stdout (container best practice) — orchestrator yang collect |

```typescript
import pino from "pino";
const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  redact: ["password", "token", "authorization"]   // sensor field sensitif
});

logger.info({ userId: "U1", action: "SETOR" }, "Setor sukses");
```

---

## 11. Studi Kasus — Deploy Tabungan Haji ke Docker

Hari ke-5: bawa semua dari Modul 1-4 ke **container production-ready**.

### 11.1 Workflow Lengkap

| Step | Aktivitas | File output |
|---|---|---|
| 1 | Init Git repo + commit semua kode Modul 1-4 | `.git/` |
| 2 | Setup Git Flow: bikin branch `develop` | branches |
| 3 | Push ke GitHub, setup branch protection | repo online |
| 4 | Bikin GitHub Actions CI workflow | `.github/workflows/ci.yml` |
| 5 | Bikin `Dockerfile` untuk API | `api/Dockerfile` |
| 6 | Bikin `.dockerignore` | `api/.dockerignore` |
| 7 | Bikin `Dockerfile` untuk Web | `web/Dockerfile` |
| 8 | Bikin `docker-compose.yml` di root | `docker-compose.yml` |
| 9 | Bikin `.env.example` (tanpa value asli) | `.env.example` |
| 10 | `docker compose up -d` — test stack lokal | (semua jalan) |
| 11 | Akses `localhost:3001` (web) → daftar nasabah, buka tabungan, setor saldo via UI | demo end-to-end |
| 12 | Tambah health check endpoint + Dockerfile HEALTHCHECK | health pass |
| 13 | Push final commit ke GitHub via PR | PR closed |
| 14 | Tag rilis `v1.0.0` | tag di GitHub |

### 11.2 Struktur Folder Final

```
tabungan-haji-fase1/
├── .git/
├── .github/
│   └── workflows/
│       └── ci.yml
├── .gitignore
├── .env.example
├── docker-compose.yml
├── README.md
│
├── api/                              ← dari Modul 2 + 4
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── package.json
│   ├── prisma/
│   ├── src/
│   └── tests/
│
└── web/                              ← dari Modul 3 + 4
    ├── Dockerfile
    ├── .dockerignore
    ├── next.config.js
    ├── package.json
    ├── app/
    ├── components/
    └── tests/
```

### 11.3 Demo Day — Akhir Hari 5

Setiap peserta presentasi 5-10 menit:
1. **Tunjukkan struktur Git** — branch develop, feature branches, tag rilis.
2. **Show & tell PR history** — code review yang sehat.
3. **`docker compose up` live demo** — semua service jalan.
4. **Walkthrough fitur**: daftar nasabah → buka tabungan → setor → cek mutasi.
5. **Coverage report** — coverage > 80%.
6. **Refleksi**: apa yang dipelajari, apa yang akan diperdalam selanjutnya.

---

## 12. Penutup — Selamat, Anda Sudah Melewati Fase 1

### Yang Anda Kuasai Setelah 5 Hari

**Modul 1 — SDLC, Agile, Cursor IDE, Prompt Engineering**
- Konsep SDLC + Scrum framework
- Setup AI-powered IDE
- Komunikasi efektif dengan AI

**Modul 2 — RESTful API & PostgreSQL**
- Database modeling + Prisma migration
- REST API best practices
- Auto-generate endpoint dengan Cursor

**Modul 3 — React/Next.js**
- Modern frontend dengan Next.js
- Integrasi API + state management
- UI component dengan Claude Sonnet

**Modul 4 — SOLID, Clean Code, Testing**
- Refactor mindset & SOLID principles
- Automated testing dengan Vitest
- AI-assisted refactoring

**Modul 5 — Git Flow & Docker** ← Anda di sini
- [ ] Git Flow branching model & workflow harian.
- [ ] Conventional commits + PR yang baik.
- [ ] CI/CD setup di GitHub Actions.
- [ ] Konsep container vs VM.
- [ ] Dockerfile production-ready (multi-stage, non-root, .dockerignore).
- [ ] Docker Compose untuk multi-service app.
- [ ] Environment & secret management.
- [ ] Health check & logging production.

### Capstone Project Fase 1 (selesai)

Aplikasi **Tabungan Haji BSI Mini** end-to-end:
- Backend Node.js + Express + Prisma + PostgreSQL
- Frontend Next.js + Tailwind + TanStack Query
- Validasi Zod, JWT auth, audit log
- Coverage > 80%, ESLint clean
- Git Flow dengan PR & CI
- Docker compose stack ready-to-deploy

---

### Roadmap 5 Hari ODP BSI — Lengkap

| Hari | Modul | Status |
|---|---|---|
| H1 | Modul 1 — SDLC, Agile & Cursor IDE | ✓ Selesai |
| H2 | Modul 2 — RESTful API & PostgreSQL | ✓ Selesai |
| H3 | Modul 3 — React/Next.js & Integrasi API | ✓ Selesai |
| H4 | Modul 4 — SOLID, Clean Code & Testing | ✓ Selesai |
| **H5** ← Anda di sini | **Modul 5 — Git Flow & Dockerizing Apps** | **✓ Selesai** |

### Selanjutnya Setelah Fase 1?

| Topik kandidat untuk Fase 2 | Detail |
|---|---|
| Cloud Deployment (AWS/Azure/GCP) | Deploy Docker container ke cloud (ECS, App Service, Cloud Run) |
| Microservices Architecture | Pecah monolith jadi service-service kecil |
| Event-Driven Architecture | Message queue (RabbitMQ, Kafka) |
| Observability | Logging, metrics, tracing (ELK, Grafana, Jaeger) |
| Security Deep Dive | OWASP Top 10, penetration testing, secret rotation |
| Performance & Load Testing | Stress test, profiling, caching strategy |
| GraphQL | Alternative ke REST |
| Mobile Native (React Native / Flutter) | Build mobile app dari skill React yang sudah ada |

**Selamat menyelesaikan Fase 1 IT Development ODP BSI!** Anda sekarang punya fondasi solid untuk berkontribusi di tim engineering BSI — dari design API sampai deployment production.
