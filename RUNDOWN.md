# IT Development Bootcamp Rundown — ODP BSI

**Program**: Officer Development Program — Fase 1 IT Development
**Durasi**: 5 hari (H1–H5)
**Format**: Onsite/hybrid, full day (08.00–17.00)
**Audiens**: Peserta ODP track IT BSI
**Tool utama**: Claude Code Pro (Desktop + CLI), Node.js, PostgreSQL, Docker, Git, Postman

---

## 🗓️ Hari 1: Introduction to AI & Productivity Tools

| Waktu | Durasi | Materi / Aktivitas | Detail & Metode |
|---|---|---|---|
| 08.00 – 09.00 | 60 Menit | **Opening Session** | Pembukaan kegiatan, sambutan penyelenggara, perkenalan trainer dan peserta, penyampaian agenda pelatihan serta tujuan pembelajaran bootcamp. |
| 09.00 – 10.00 | 60 Menit | **Kick-Off Program** | Pemaparan alur pelatihan, ekspektasi peserta, mekanisme pembelajaran, serta diskusi interaktif mengenai tantangan transformasi digital dan keamanan informasi. |
| 10.00 – 10.15 | 15 Menit | *Coffee Break* | Istirahat sejenak. |
| 10.15 – 12.00 | 105 Menit | **Introduction to Artificial Intelligence (AI)** | Pengenalan konsep Artificial Intelligence (AI), Machine Learning, dan Generative AI serta implementasinya dalam industri modern melalui studi kasus dan diskusi interaktif. |
| 12.00 – 13.00 | 60 Menit | *Istirahat & Makan Siang (ISHOMA)* | – |
| 13.00 – 14.30 | 90 Menit | **Hands-On AI Productivity Tools** | Praktik penggunaan tools AI untuk meningkatkan produktivitas kerja seperti otomasi pembuatan konten, analisis data, dokumentasi, dan task management. Pengenalan **Claude Desktop** & **Claude Code CLI** sebagai AI coding assistant utama. |
| 14.30 – 14.45 | 15 Menit | *Coffee Break* | Istirahat sejenak. |
| 14.45 – 16.00 | 75 Menit | **AI for IT Security & Cybersecurity** | Pembahasan pemanfaatan AI dalam Cybersecurity meliputi threat detection, security monitoring, phishing analysis, serta automasi incident response. |
| 16.00 – 17.00 | 60 Menit | **Workshop Discussion & Closing Session — Pre-Test** | Studi kasus implementasi AI, sesi tanya jawab, diskusi interaktif, evaluasi workshop, serta penutupan kegiatan hari pertama. **Pre-Test** untuk mengetahui kemampuan awal peserta sebelum pembelajaran teknis dimulai. |

---

## 🗓️ Hari 2: SDLC, Agile, Scrum & RESTful API + Database (PostgreSQL)

> **Catatan**: hari ini menggabungkan fondasi metodologi (SDLC + Scrum) dan implementasi backend (REST API + PostgreSQL) — dipadatkan karena Hari 1 sudah cover tooling AI yang dipakai sepanjang bootcamp.

| Waktu | Durasi | Materi / Aktivitas | Detail & Metode |
|---|---|---|---|
| 08.00 – 09.30 | 90 Menit | **SDLC & Agile Manifesto** | Konsep Software Development Life Cycle (Waterfall, Iterative, Agile, DevOps). Pembahasan 4 Nilai & 12 Prinsip Manifesto Agile, mindset shift dari Waterfall ke Agile. |
| 09.30 – 10.30 | 60 Menit | **Scrum Framework** | 3 akuntabilitas (Product Owner, Scrum Master, Developers), 5 events (Sprint Planning, Daily Scrum, Sprint Review, Retrospective, Sprint), 3 artifacts (Product Backlog, Sprint Backlog, Increment). Latihan tulis User Story format INVEST. |
| 10.30 – 10.45 | 15 Menit | *Coffee Break* | Istirahat sejenak. |
| 10.45 – 12.00 | 75 Menit | **RESTful API & Database Modeling** | Konsep REST (6 prinsip, HTTP methods, status codes), API Response Contract `{ data, error, meta }` sebagai kesepakatan dengan frontend. Database modeling: ERD, normalisasi, constraint, index. Schema design sesuai *studi kasus*. |
| 12.00 – 13.00 | 60 Menit | *Istirahat & Makan Siang (ISHOMA)* | – |
| 13.00 – 14.30 | 90 Menit | **Setup PostgreSQL + Prisma + Express** | Setup PostgreSQL via Docker, init project Node.js + TypeScript + Express + Prisma. Migration awal untuk 4 tabel (nasabah, tabungan, transaksi, audit_log). Pola Controller-Service-Schema. |
| 14.30 – 14.45 | 15 Menit | *Coffee Break* | Istirahat sejenak. |
| 14.45 – 16.00 | 75 Menit | **Implementasi Module Nasabah (CRUD)** | Build 5 endpoint CRUD lengkap untuk module Nasabah dengan validasi Zod, error handling konsisten, format response standard. Test manual via **Postman**. |
| 16.00 – 17.00 | 60 Menit | **Hands-On — Tabungan + Setor + JWT Auth** | Endpoint buka tabungan + setor saldo (dengan idempotency + DB transaction + audit log). Implementasi JWT authentication + middleware. Q&A. |

---

## 🗓️ Hari 3: React/Next.js & Integrasi API

| Waktu | Durasi | Materi / Aktivitas | Detail & Metode |
|---|---|---|---|
| 08.00 – 09.30 | 90 Menit | **React & Next.js Fundamentals** | React fundamentals (component, props, state, hooks). Next.js App Router (file-based routing, Server vs Client Components, rendering strategies). |
| 09.30 – 10.30 | 60 Menit | **Setup Next.js + Tailwind + shadcn/ui** | Setup project Next.js dengan TypeScript + Tailwind + shadcn/ui + TanStack Query + React Hook Form. Konfigurasi environment & API client helper. |
| 10.30 – 10.45 | 15 Menit | *Coffee Break* | Istirahat sejenak. |
| 10.45 – 12.00 | 75 Menit | **Halaman Login & Auth Flow** | Build halaman login dengan validasi form, integrasi ke endpoint JWT, simpan token, redirect ke dashboard, auto-logout saat 401. |
| 12.00 – 13.00 | 60 Menit | *Istirahat & Makan Siang (ISHOMA)* | – |
| 13.00 – 14.30 | 90 Menit | **Dashboard + Detail Resource** | Build halaman dashboard (list kartu) + detail resource. Workflow iterate UI pakai **Claude Desktop (Artifacts)** → apply ke project via **Claude Code CLI**. |
| 14.30 – 14.45 | 15 Menit | *Coffee Break* | Istirahat sejenak. |
| 14.45 – 16.00 | 75 Menit | **Form Transaksi & Halaman Riwayat** | Build form transaksi dengan 2-step confirmation (validasi → konfirmasi → submit). Halaman riwayat transaksi dengan format Rupiah & tanggal konsisten. |
| 16.00 – 17.00 | 60 Menit | **Polish & Protected Route** | Loading skeleton, empty state, responsive design (mobile-first), protected route via middleware/AuthGuard. Q&A. |

---

## 🗓️ Hari 4: SOLID, Clean Code & Automated Unit Testing

| Waktu | Durasi | Materi / Aktivitas | Detail & Metode |
|---|---|---|---|
| 08.00 – 09.30 | 90 Menit | **Clean Code & SOLID Principles** | Clean Code (naming, function size, magic numbers, comments). 5 prinsip SOLID dengan contoh konkret di kode backend. |
| 09.30 – 10.30 | 60 Menit | **Code Smells & Refactoring Patterns** | 8 jenis code smell umum (Long Method, God Object, Duplicate Code, dll) + refactoring pattern. Etika code review. |
| 10.30 – 10.45 | 15 Menit | *Coffee Break* | Istirahat sejenak. |
| 10.45 – 12.00 | 75 Menit | **Test Pyramid & Setup Vitest** | Test pyramid (unit/integration/E2E), pattern AAA (Arrange-Act-Assert). Setup Vitest + mocking dependency. Tulis unit test pertama untuk service. |
| 12.00 – 13.00 | 60 Menit | *Istirahat & Makan Siang (ISHOMA)* | – |
| 13.00 – 14.30 | 90 Menit | **Refactor Service dengan AI** | Refactor service utama project: pisah jadi helper kecil (SRP), inject dependency (DIP), fix code smells. Generate test dari kode existing dengan **Claude Code CLI**. |
| 14.30 – 14.45 | 15 Menit | *Coffee Break* | Istirahat sejenak. |
| 14.45 – 16.00 | 75 Menit | **Capai Test Coverage ≥ 80%** | Lengkapi unit test untuk seluruh module service. Generate coverage report. Setup ESLint + Prettier + Husky pre-commit hook. |
| 16.00 – 17.00 | 60 Menit | **Code Review Session & Q&A** | Pair code review antar peserta dengan checklist (functionality, naming, SOLID, security, audit log). Diskusi best practice. |

---

## 🗓️ Hari 5: Git Flow & Dockerizing Apps + Demo Day

| Waktu | Durasi | Materi / Aktivitas | Detail & Metode |
|---|---|---|---|
| 08.00 – 09.30 | 90 Menit | **Git Flow & PR Best Practices** | Git Flow branching model (main, develop, feature/*, release/*, hotfix/*). Conventional Commits format. Pull Request anatomy & code review etika. |
| 09.30 – 10.30 | 60 Menit | **GitHub Setup + CI/CD** | Push project ke GitHub, setup branch protection, **GitHub Actions CI** (lint + typecheck + test). Tag rilis dengan semantic versioning. |
| 10.30 – 10.45 | 15 Menit | *Coffee Break* | Istirahat sejenak. |
| 10.45 – 12.00 | 75 Menit | **Docker Concept + Dockerfile** | Docker konsep (container vs VM, image, layer). Tulis Dockerfile multi-stage untuk API (Node.js) + Web (Next.js). Optimasi image size dengan Alpine + non-root user. |
| 12.00 – 13.00 | 60 Menit | *Istirahat & Makan Siang (ISHOMA)* | – |
| 13.00 – 14.30 | 90 Menit | **Docker Compose Full Stack** | Setup `docker-compose.yml` untuk full stack (PostgreSQL + API + Web). Environment & secret management, health check, networking antar service. Test `docker compose up` end-to-end. |
| 14.30 – 14.45 | 15 Menit | *Coffee Break* | Istirahat sejenak. |
| 14.45 – 16.00 | 75 Menit | **Demo Day** | Tiap peserta/tim presentasi 10-15 menit: walkthrough kode, demo aplikasi `docker compose up` live, show GitHub repo dengan CI hijau & PR history. Penilaian stakeholder. |
| 16.00 – 17.00 | 60 Menit | **Post-Test + Closing Session** | **Post-Test** untuk evaluasi penguasaan materi (PRETEST vs POSTTEST). Feedback session, penyerahan sertifikat, foto bersama, penutupan bootcamp. |

---

## Operational Artifacts yang Dihasilkan

Daftar artifact konkret yang **wajib di-deliver** di akhir bootcamp:

| Artifact | Dibuat di Hari | Deskripsi |
|---|---|---|
| **Pre-Test Score** | H1 | Baseline kemampuan awal peserta |
| **Product Vision + Product Backlog** | H2 | Vision 5 section + 15+ user story format INVEST + MoSCoW priority |
| **Database Schema** | H2 | ERD + Prisma migration files (4 tabel domain) |
| **REST API + Postman Collection** | H2 | Endpoint CRUD untuk entitas sesuai *studi kasus* + audit log + collection siap share |
| **Frontend Mobile-Friendly** | H3 | Login, dashboard, detail resource, form transaksi, riwayat |
| **Unit Test (coverage > 80%)** | H4 | `*.test.ts` per module + coverage report |
| **Git Repository (GitHub)** | H5 | Branch `main`/`develop`/`feature/*`, PR history, CI workflows hijau |
| **Docker Compose Stack** | H5 | `docker-compose.yml` lengkap (DB + API + Web) — `docker compose up` jalan end-to-end |
| **Post-Test Score** | H5 | Evaluasi penguasaan materi 5 hari |

---

## Materi & Latihan Pendukung

| Modul | Materi | Latihan |
|---|---|---|
| Modul 1 — SDLC, Agile, Scrum | `Modul-1-SDLC-Scrum/materi.md` | `Modul-1-SDLC-Scrum/latihan.md` |
| Modul 2 — REST API & PostgreSQL | `Modul-2-RESTful-API-PostgreSQL/materi.md` | `Modul-2-RESTful-API-PostgreSQL/latihan.md` |
| Modul 3 — React/Next.js | `Modul-3-React-NextJS/materi.md` | `Modul-3-React-NextJS/latihan.md` |
| Modul 4 — SOLID, Clean Code, Testing | `Modul-4-SOLID-Clean-Code-Testing/materi.md` | _(akan disusun)_ |
| Modul 5 — Git Flow & Docker | `Modul-5-Git-Docker/materi.md` | _(akan disusun)_ |

> **Catatan**: Hari 1 (Introduction to AI) tidak memerlukan modul terpisah — materi disampaikan dalam bentuk slide & studi kasus interaktif.

---

## Penilaian Bootcamp

| Komponen | Bobot |
|---|---|
| Pre-Test (baseline — tidak dinilai) | 0% |
| Daily participation & quiz harian | 20% |
| Hands-on lab tiap hari (artifact deliverables) | 40% |
| Capstone Project (aplikasi end-to-end Hari 5) | 30% |
| Post-Test (penguasaan materi) | 10% |
| **TOTAL** | **100%** |

**Kriteria kelulusan**: nilai akhir ≥ 70 + post-test ≥ 50.

---

## Catatan Operasional

- Peserta wajib bawa **laptop** dengan minimum 8GB RAM, prosesor i5/M1 atau setara.
- **Akses internet** stabil diperlukan (download tooling + Claude API).
- **Akun GitHub** dan langganan **Claude Pro/Max** disediakan oleh institusi.
- **Pre-Test** dikerjakan di sesi akhir Hari 1 (16.00-17.00) bersamaan dengan workshop discussion.
- **Post-Test** dikerjakan di sesi akhir Hari 5 (16.00-17.00) bersamaan dengan closing session.
- Materi setiap modul **tetap bisa diakses** via repository GitHub pasca-pelatihan untuk self-study lanjutan.

---

**PT Lifelong Learning | Multimatics — Turn Knowledge Into Performance**
