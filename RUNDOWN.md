# RUNDOWN BOOTCAMP — ODP BSI IT Development

**Program**: Officer Development Program — Fase 1 IT Development
**Durasi**: 5 hari (H1–H5)
**Format**: Onsite/hybrid, full day (08.00–16.00)
**Audiens**: Peserta ODP track IT BSI
**Tool utama**: Claude Code Pro (Desktop + CLI), Node.js, PostgreSQL, Docker, Git

---

## Ringkasan Program

Fase ini berfokus pada **penguatan konsep fundamental** dan **hands-on lab** secara intensif. Tiap hari menghasilkan output konkret yang dipakai di hari berikutnya — peserta membangun **aplikasi Tabungan Haji end-to-end** dari nol selama 5 hari.

| Hari | Modul | Topik Utama | AI Tool |
|---|---|---|---|
| H1 | Modul 1 | SDLC, Agile, Scrum, Setup Claude Code, Prompt Engineering | Claude Code Pro |
| H2 | Modul 2 | RESTful API & Database Modeling (PostgreSQL) | Claude Code CLI |
| H3 | Modul 3 | React/Next.js & Integrasi API | Claude Desktop + CLI |
| H4 | Modul 4 | SOLID, Clean Code & Automated Unit Testing | Claude Code CLI |
| H5 | Modul 5 | Git Flow & Dockerizing Apps | – |

---

## Hari 1: SDLC, Agile & Setup Claude Code

**Target**: peserta paham fondasi SDLC + Scrum, Claude Code Pro ter-install, dan mampu komunikasi efektif dengan AI lewat prompt engineering.

| Waktu | Aktivitas Pembelajaran | Metode & Tools |
|---|---|---|
| 08.00 – 09.00 | Pembukaan resmi, **pre-test**, pengenalan bootcamp & target *Operational Artifacts*. | Briefing |
| 09.00 – 10.30 | Konsep **SDLC** (Waterfall, Iterative, Agile, DevOps) + **Manifesto Agile** (4 nilai + 12 prinsip). | Teori / Diskusi |
| 10.30 – 12.00 | **Scrum Framework**: 3 akuntabilitas (PO/SM/Dev), 5 events (Planning, Daily, Review, Retro, Sprint), 3 artifacts (Backlog, Increment). | Teori / Diskusi |
| 12.00 – 13.00 | *ISHOMA* | – |
| 13.00 – 14.30 | Setup **Claude Code Pro** (Desktop + CLI), install Node.js, Docker. Konfigurasi `CLAUDE.md` + `.claudeignore`. | Praktik mandiri |
| 14.30 – 16.00 | Latihan **Bikin Artifact Scrum** untuk fitur Tabungan Haji: Product Vision → Backlog → Acceptance Criteria → Sprint Plan. **Recap & Q&A**. | Lab + diskusi tim |

**Output Hari 1**: tooling ready + Product Backlog & Sprint Plan untuk fitur Tabungan Haji.

---

## Hari 2: RESTful API & Database Modeling (PostgreSQL)

**Target**: peserta bisa rancang skema database + bangun REST API CRUD lengkap dengan validasi, JWT auth, idempotency, dan audit log.

| Waktu | Aktivitas Pembelajaran | Metode & Tools |
|---|---|---|
| 09.00 – 10.30 | Konsep **REST** (6 prinsip, HTTP methods, status codes), **API Response Contract** `{ data, error, meta }` sebagai kesepakatan dengan frontend. | Teori |
| 10.30 – 12.00 | **Database Modeling**: ERD, normalisasi, constraint, index. Setup **PostgreSQL via Docker**. Schema design Tabungan Haji (4 tabel). | Lab (Docker, psql) |
| 12.00 – 13.00 | *ISHOMA* | – |
| 13.00 – 14.30 | Setup project **Node.js + Express + TypeScript + Prisma**. Migration awal. Pola **Controller-Service-Schema**. | Lab (Claude Code CLI) |
| 14.30 – 16.00 | Implementasi module **Nasabah** (CRUD 5 endpoint) + endpoint **Setor saldo** (idempotency + DB transaction + audit log). JWT auth + middleware. **Test via Thunder Client**. | Lab (Claude Code CLI) |

**Output Hari 2**: REST API Tabungan Haji jalan di `localhost:3000`, ter-validasi Zod, ter-autentikasi JWT.

---

## Hari 3: React/Next.js & Integrasi API

**Target**: peserta bisa bangun web app mobile-friendly yang konsumsi API dari Hari 2, dengan UI profesional pakai shadcn/ui + Claude (Desktop + CLI).

| Waktu | Aktivitas Pembelajaran | Metode & Tools |
|---|---|---|
| 09.00 – 10.30 | **React fundamentals** (component, props, state, hooks) + **Next.js App Router** (Server vs Client Components, routing). | Teori |
| 10.30 – 12.00 | Setup **Next.js + Tailwind + shadcn/ui + TanStack Query + React Hook Form**. Halaman **Login** dengan JWT auth flow. | Lab (Claude Code CLI) |
| 12.00 – 13.00 | *ISHOMA* | – |
| 13.00 – 14.30 | Build halaman **Dashboard** (KartuTabungan list) + **Detail Tabungan**. Workflow iterate UI pakai **Claude Desktop (Artifacts)** → apply ke project via **Claude Code CLI**. | Lab (Claude Desktop + CLI) |
| 14.30 – 16.00 | Build **Form Setor** (2-step confirmation) + **Halaman Mutasi** + Protected Route. Polish: loading skeleton, responsive, auto-logout 401. | Lab (Claude Code CLI) |

**Output Hari 3**: web app Tabungan Haji jalan di `localhost:3001`, full-integrate dengan API Hari 2.

---

## Hari 4: SOLID, Clean Code & Automated Testing

**Target**: peserta bisa identifikasi & refactor code smells, apply prinsip SOLID, dan capai test coverage > 80% di kode dari Hari 2-3.

| Waktu | Aktivitas Pembelajaran | Metode & Tools |
|---|---|---|
| 09.00 – 10.30 | **Clean Code** (naming, function size, magic numbers) + **5 Prinsip SOLID** dengan contoh banking + **8 jenis Code Smells** umum. | Teori |
| 10.30 – 12.00 | **Test Pyramid**, pattern **AAA**, setup **Vitest** + mocking. Tulis unit test pertama untuk service. | Lab (Vitest) |
| 12.00 – 13.00 | *ISHOMA* | – |
| 13.00 – 14.30 | **Refactor** `tabungan.service.ts`: pisah jadi helper kecil (SRP), inject dependency (DIP), fix smells. Generate test dari kode existing dengan Claude. | Lab (Claude Code CLI) |
| 14.30 – 16.00 | Capai **test coverage ≥ 80%** untuk module service. Setup **ESLint + Prettier**. **Code review berpasangan**. | Lab + pair review |

**Output Hari 4**: kode kualitas production — clean, ter-test, lint-clean.

---

## Hari 5: Git Flow & Dockerizing Apps

**Target**: peserta bisa apply Git Flow workflow, setup CI/CD dasar, dan bungkus app jadi container yang siap deploy.

| Waktu | Aktivitas Pembelajaran | Metode & Tools |
|---|---|---|
| 09.00 – 10.30 | **Git Flow** branching model (main, develop, feature/*, release/*, hotfix/*), **Conventional Commits**, PR best practice. | Teori |
| 10.30 – 12.00 | Push project ke **GitHub**, setup **branch protection** + **GitHub Actions CI** (lint, typecheck, test). | Lab (Git, GitHub) |
| 12.00 – 13.00 | *ISHOMA* | – |
| 13.00 – 14.00 | **Docker** konsep (container vs VM), tulis **Dockerfile multi-stage** untuk API (Node) + Web (Next.js). Optimasi image size. | Lab (Docker) |
| 14.00 – 15.00 | **Docker Compose** untuk full stack (PostgreSQL + API + Web). Environment & secret management, health check. | Lab (Docker Compose) |
| 15.00 – 15.30 | **Post-test** — evaluasi penguasaan materi 5 modul (PRETEST vs POSTTEST). | Assessment |
| 15.30 – 16.00 | **Feedback session**, penyerahan **sertifikat**, foto bersama & penutupan bootcamp. | Closing |

**Output Hari 5**: aplikasi Tabungan Haji bisa dijalankan via `docker compose up` di mana saja — siap deploy. Skor post-test tercatat.

---

## Operational Artifacts yang Dihasilkan

Daftar artifact konkret yang **wajib di-deliver** di akhir bootcamp:

| Artifact | Hari | Deskripsi |
|---|---|---|
| **Product Vision + Product Backlog** | H1 | 5 section vision + 15+ user story format INVEST dengan MoSCoW priority |
| **Sprint Plan** | H1 | Sprint Goal + Sprint Backlog dengan estimasi Fibonacci |
| **Database Schema** | H2 | ERD + migration files (`prisma/migrations/`) — 4 tabel domain |
| **REST API + OpenAPI Spec** | H2 | Endpoint CRUD nasabah + tabungan + transaksi + audit log |
| **Frontend Mobile-Friendly** | H3 | Login, dashboard, detail tabungan, setor, mutasi |
| **Unit Test (coverage > 80%)** | H4 | `*.test.ts` per modul + coverage report |
| **Git Repository (GitHub)** | H5 | Branch `main`/`develop`/`feature/*`, PR history, CI workflows hijau |
| **Docker Compose Stack** | H5 | `docker-compose.yml` lengkap dengan DB + API + Web siap deploy |

---

## Materi & Latihan Pendukung

| Modul | Materi | Latihan |
|---|---|---|
| Modul 1 | `Modul-1-SDLC-Scrum/materi.md` | `Modul-1-SDLC-Scrum/latihan.md` |
| Modul 2 | `Modul-2-RESTful-API-PostgreSQL/materi.md` | `Modul-2-RESTful-API-PostgreSQL/latihan.md` |
| Modul 3 | `Modul-3-React-NextJS/materi.md` | `Modul-3-React-NextJS/latihan.md` |
| Modul 4 | `Modul-4-SOLID-Clean-Code-Testing/materi.md` | _(akan disusun)_ |
| Modul 5 | `Modul-5-Git-Docker/materi.md` | _(akan disusun)_ |

---

## Penilaian Bootcamp

| Komponen | Bobot |
|---|---|
| Pre-test (baseline — tidak dinilai) | 0% |
| Daily participation & quiz harian | 20% |
| Hands-on lab tiap hari (artifact deliverables) | 40% |
| Capstone Project (aplikasi end-to-end Hari 5) | 30% |
| Post-test (penguasaan materi) | 10% |
| **TOTAL** | **100%** |

**Kriteria kelulusan**: nilai akhir ≥ 70 + post-test ≥ 50.

---

## Catatan Operasional

- Peserta wajib bawa **laptop** dengan minimum 8GB RAM, prosesor i5/M1 atau setara.
- **Akses internet** stabil diperlukan (download tooling + Claude API).
- **Akun GitHub** dan langganan **Claude Pro/Max** disediakan oleh institusi.
- **Pre-test** dikerjakan H–1 (sehari sebelum Hari 1) via Google Form.
- **Post-test** dikerjakan di sesi akhir Hari 5.
- Materi setiap modul **tetap bisa diakses** via repository GitHub pasca-pelatihan untuk self-study lanjutan.

---

**PT Lifelong Learning | Multimatics — Turn Knowledge Into Performance**
