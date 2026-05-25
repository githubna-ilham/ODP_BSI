# Latihan Modul 1 (Versi Jira) — Membuat Artifact Scrum di Jira

> **Target**: di akhir latihan, Anda punya **Jira Project lengkap** dengan semua Scrum artifact yang ter-track secara digital — Product Backlog, Sprint Backlog, Burndown chart auto-generated, Daily Scrum logging, Sprint Review & Retrospective documentation.
>
> **Durasi estimasi**: 2,5–3 jam.
>
> **Skenario**: sama dengan `latihan.md` versi dokumen — fitur **Tabungan Haji Online di Aplikasi Mobile**. Bedanya, sekarang Anda kerjakan di **Jira** (tool standar industri) bukan markdown file.
>
> **Tool**: Jira Software (Cloud, gratis untuk team ≤ 10 orang) + browser.

---

## Kenapa Pakai Jira?

Versi `latihan.md` membuat Anda paham **konsep** artifact Scrum. Versi `latihan-jira.md` ini ngajarin **cara real** tim engineering mengelola Scrum di tool industri.

| Aspek | Versi `latihan.md` (Markdown) | Versi `latihan-jira.md` (Jira) |
|---|---|---|
| **Tool** | Text editor (VS Code, Obsidian) | Jira Software Cloud |
| **Backlog format** | List di markdown | Issue dengan tipe Story/Task/Epic |
| **Estimasi** | Manual catat di file | Story Points field di issue |
| **Burndown** | Manual hitung & gambar | **Auto-generated** dari status issue |
| **Daily Scrum** | Log di file | Pakai Board (Kanban view) — drag card |
| **Sprint Review** | Tulis di markdown | Lihat di Sprint Report (auto-generated) |
| **Cocok untuk** | Belajar konsep | Kerja real di tim |

**Recommendation**: kerjakan dua-duanya untuk pengalaman lengkap — konsep dulu (markdown), lalu real-world (Jira).

---

## Persiapan: Setup Akun Jira (10 menit)

### 1. Bikin Akun Jira Cloud

1. Buka [jira.atlassian.com](https://www.atlassian.com/software/jira) → klik **Get it free**.
2. Daftar pakai email kerja atau Gmail. Pilih option **Jira Software**.
3. Bikin nama site, mis. `odp-bsi-anda`. URL: `odp-bsi-anda.atlassian.net`.
4. Pilih plan **Free** (cukup untuk latihan, sampai 10 user).

### 2. Bikin Project

1. **Projects** → **Create project** → template **Scrum**.
2. Nama project: `Tabungan Haji Online` (key: `THO`).
3. Default board: **Scrum Board** (akan kita pakai di Langkah 6 ke depan).

### 3. Set Profile

Edit profile Anda: nama lengkap, role (Developer / Scrum Master / PO). Berguna saat assign issue.

**Checkpoint**: Jira site & project `THO` siap, board kosong dapat dibuka. ✅

---

## Langkah 1 — Tulis Product Vision di Project Description (10 menit)

Untuk latihan ini, kita pakai **Project Description** — cara paling cepat & langsung tanpa setup tambahan (no Confluence, no extra issue). Cukup untuk Vision ringkas yang sering dirujuk.

### 1.1 Buka Project Settings

```
┌─────────────────────────────────────────────────────────┐
│ Sidebar kiri Jira                                       │
├─────────────────────────────────────────────────────────┤
│ ⌂ Home                                                  │
│ 📊 Projects                                             │
│  └ Tabungan Haji Online       ← klik project Anda      │
│    └ Summary                                            │
│    └ Backlog                                            │
│    └ Board                                              │
│    └ Reports                                            │
│  ...                                                    │
│                                                         │
│  ⚙️ Project settings           ← KLIK INI               │
│     (scroll sidebar PALING BAWAH)                       │
└─────────────────────────────────────────────────────────┘
```

1. Buka project `THO` di sidebar kiri.
2. **Scroll ke paling bawah sidebar kiri** → klik ⚙️ **Project settings**.
   *(Kalau tidak nampak, klik **More actions (•••)** di kanan atas project → **Project settings**.)*
3. Tab **Details** (default selected) sudah terbuka.

### 1.2 Isi Field Description

1. Cari field **Description** → klik area kosongnya → muncul text editor.
2. Paste teks Product Vision di bawah ini:

```
Fitur Tabungan Haji Online di BSI Mobile untuk calon jamaah haji
usia 25-55 tahun. Memungkinkan daftar, setor (QRIS/transfer), dan
monitoring tabungan dari mobile app — tanpa perlu ke cabang.

Masalah: buka tabungan haji & setor saldo harus ke cabang. Antri lama,
jam terbatas (08.00-15.00), tidak fleksibel untuk yang kerja.

Indikator sukses:
- Bulan 1: 5.000 nasabah daftar via mobile
- Bulan 3: 60% transaksi setor terjadi via mobile (vs cabang)
- Rating fitur di app: ≥ 4.5/5
- Penurunan 30% antrian cabang untuk transaksi haji
```

3. Scroll bawah → klik **Save**.

### 1.3 Verifikasi

Balik ke project (klik project name di breadcrumb atau sidebar) → buka tab **Summary**. Description tampil di bagian atas — dan akan muncul untuk semua tim member yang akses project.

### Tip

- Saat **Sprint Planning**, buka Description ini sebagai pengingat: pastikan story baru aligned dengan Vision.
- Vision boleh di-update seiring product berkembang, tapi jangan terlalu sering (ini "north star", bukan task list).
- Kalau nanti workspace Anda diaktifkan Confluence (untuk project real di kantor), pindahkan Vision ke Confluence page untuk versi lebih lengkap.

**Checkpoint**: Project Description sudah terisi Vision + bisa diakses dari tab Summary project. ✅

---

## Langkah 2 — Bikin Product Backlog dengan Epic & Story (45 menit)

> **Integrasi penting**: Story-story di langkah ini **akan diimplementasi jadi kode di Modul 2**. Tiap Story = 1 endpoint API yang akan Anda bikin. Jadi pikirkan Story bukan sebagai "ide abstrak" tapi sebagai "kontrak kerja konkret untuk minggu depan".

### 2.1 Setup Issue Type

Jira Scrum project default punya issue type: **Epic, Story, Task, Bug, Sub-task**. Verifikasi tersedia:
- **Project Settings** → **Issue types** → cek 5 type di atas ada.

### 2.2 Bikin Epic Dulu (5 Epic)

Klik **Backlog** di sidebar. Klik **+ Create epic** di kolom Epic (sidebar kiri Backlog view).

Bikin 5 epic berikut — 1 epic teknis + 4 epic user-facing:

| Epic Key | Summary | Color | Modul 2 Coverage |
|---|---|---|---|
| THO-1 | Infrastruktur Backend | Grey | Langkah 1-4 (DB, project setup, Express bootstrap) |
| THO-2 | Onboarding Nasabah | Purple | Langkah 5 (CRUD Nasabah) |
| THO-3 | Tabungan Haji & Transaksi | Blue | Langkah 6 (Tabungan + Setor) |
| THO-4 | Keamanan & Auth | Red | Langkah 7 (JWT, middleware) |
| THO-5 | Monitoring & Admin (Future) | Green | (Tidak dicover Modul 2, tugas lanjutan) |

Set color tiap epic biar mudah dibedakan di board nanti.

### 2.3 Bikin Story di Tiap Epic — Nyambung ke Modul 2

Klik **+ Create** (tombol biru di header) → pilih **Story** → isi:
- **Summary**: ringkasan story
- **Epic Link**: pilih epic parent
- **Description**: format INVEST + endpoint API yang akan dibikin di Modul 2

#### Story untuk THO-1 (Infrastruktur Backend)

| Story | Endpoint / Output Modul 2 |
|---|---|
| Setup database PostgreSQL lokal | DB `tabungan_haji` siap di `localhost:5432` |
| Init project Node.js + TypeScript | `package.json`, `tsconfig.json`, struktur folder |
| Schema database dengan Prisma | `prisma/schema.prisma` + migration apply |
| Bootstrap Express server | `GET /health` returns 200 |

#### Story untuk THO-2 (Onboarding Nasabah)

| Story | Endpoint Modul 2 |
|---|---|
| Daftar nasabah baru | `POST /api/nasabah` |
| Lihat list semua nasabah | `GET /api/nasabah` |
| Lihat detail 1 nasabah | `GET /api/nasabah/:id` |
| Update data nasabah | `PATCH /api/nasabah/:id` |
| Hapus nasabah | `DELETE /api/nasabah/:id` |

#### Story untuk THO-3 (Tabungan Haji & Transaksi)

| Story | Endpoint Modul 2 |
|---|---|
| Buka rekening tabungan haji | `POST /api/tabungan` |
| Setor saldo (idempotent + DB transaction) | `POST /api/tabungan/:id/setor` |
| Lihat saldo & detail tabungan | `GET /api/tabungan/:id` |
| Lihat mutasi transaksi | `GET /api/tabungan/:id/mutasi` |

#### Story untuk THO-4 (Keamanan & Auth)

| Story | Endpoint Modul 2 |
|---|---|
| Login user dengan JWT | `POST /api/auth/login` |
| Proteksi endpoint sensitif dengan middleware | `requireAuth` middleware |
| Logout (token invalidation) | `POST /api/auth/logout` |

#### Contoh Format Description (INVEST + Modul 2 Link)

```markdown
**User Story:**
Sebagai nasabah, saya ingin daftar tabungan haji dari mobile app,
sehingga saya tidak perlu datang ke cabang.

**Endpoint (Modul 2):**
POST /api/nasabah

**Reference:**
Modul-2-RESTful-API-PostgreSQL/latihan.md → Langkah 5
```

Target: bikin **minimal 15 Story** total (4 + 5 + 4 + 3 = 16 dari mapping di atas). Bikin tambahan story Future di THO-5 (mis. "Lihat estimasi tahun berangkat haji", "Export laporan bulanan") supaya backlog terlihat hidup.

### 2.4 Set Priority (MoSCoW)

Jira default punya priority: **Highest, High, Medium, Low, Lowest**. Mapping ke MoSCoW:

| MoSCoW | Jira Priority |
|---|---|
| **Must have** | Highest |
| **Should have** | High |
| **Could have** | Medium |
| **Won't have (this release)** | Low |

Update priority tiap story dengan klik issue → field Priority → pilih.

### 2.5 Bonus: Add Labels untuk Grouping

Tambah label seperti `tipe:UI`, `tipe:Backend`, `compliance` di issue untuk filter & grouping.

**Checkpoint**: 4 epic + minimal 15 story di backlog, semua punya priority + epic link + description format INVEST. ✅

---

## Langkah 3 — Tulis Acceptance Criteria di Story (30 menit)

Jira tidak punya "Acceptance Criteria" field built-in (kecuali di plan Premium). Workaround paling umum:

**Pakai Description field dengan section terpisah.**

### 3.1 Format Description Lengkap

Edit story top-priority (3 story Must-have). Update description-nya:

```markdown
**User Story:**
Sebagai nasabah, saya ingin setor saldo via QRIS,
sehingga proses cepat tanpa transfer manual.

---

**Acceptance Criteria:**

**AC 1 — Setor sukses dengan saldo cukup**
- Given saya login sebagai nasabah dengan tabungan haji aktif
- And saldo rekening sumber Rp 10.000.000
- When saya scan QRIS merchant haji dan input nominal Rp 500.000
- And klik tombol "Setor"
- Then saldo tabungan haji bertambah Rp 500.000
- And saldo rekening sumber berkurang Rp 500.000
- And muncul notifikasi "Setor sukses"
- And transaksi tercatat di mutasi dengan jenis "Setor QRIS"

**AC 2 — Saldo tidak cukup**
- Given saldo rekening sumber Rp 100.000
- When saya scan QRIS dan input nominal Rp 500.000
- Then sistem tampilkan error "Saldo tidak mencukupi"
- And transaksi dibatalkan

**AC 3 — Nominal di bawah minimum**
- Given saya scan QRIS
- When saya input nominal Rp 50.000
- Then sistem tampilkan error "Setoran minimum Rp 100.000"
- And tombol "Setor" disable

---

**Definition of Done:**
- [ ] Code complete sesuai semua AC
- [ ] Unit test passed (coverage > 80%)
- [ ] Integration test passed
- [ ] Audit log tercatat
- [ ] Approved oleh PO
```

### 3.2 (Opsional) Custom Field "Acceptance Criteria"

Untuk admin Jira yang punya akses Field Configuration:
1. **Project Settings** → **Fields** → **Actions** → **Create field**.
2. Field name: `Acceptance Criteria`, type: **Paragraph (multi-line text)**.
3. Add ke screen Story.

Sekarang AC bisa di-input di field terpisah, lebih rapi.

### 3.3 Pakai Checklist Plugin (Optional)

Marketplace plugin populer: **Smart Checklist for Jira** atau **Issue Checklist Free**.
- Install dari Atlassian Marketplace.
- Tiap AC jadi checklist item yang bisa di-check saat done.

**Checkpoint**: minimal 3 story top-priority punya AC lengkap format Given/When/Then + DoD di description. ✅

---

## Langkah 4 — Definition of Ready & Definition of Done (15 menit)

DoR & DoD = **kesepakatan tim**, ditaruh di tempat yang mudah diakses.

### 4.1 Bikin Issue Tipe "Documentation"

Cara cepat: bikin 2 issue khusus untuk dokumentasi.

```
Type: Task
Summary: [DOC] Definition of Ready
Description: (isi DoR lengkap)
Label: documentation
Priority: Highest
```

```
Type: Task
Summary: [DOC] Definition of Done
Description: (isi DoD lengkap)
Label: documentation
Priority: Highest
```

Pin di top backlog supaya selalu kelihatan.

### 4.2 (Recommended) Bikin di Confluence

DoR & DoD lebih cocok di **Confluence page** (kalau available) karena:
- Bisa di-edit kolaboratif
- Versioned
- Bisa di-comment
- Searchable

Buat page `Team Working Agreement` di Confluence space, isi:

```
# Team Working Agreement — Tabungan Haji

## Definition of Ready (DoR)
Story siap masuk Sprint kalau MEMENUHI SEMUA:
- [ ] Format INVEST valid.
- [ ] AC minimum 1 happy path + 2 error case.
- [ ] Sudah di-estimate (story points Fibonacci).
- [ ] Dependency teridentifikasi.
- [ ] Untuk UI: ada mockup/wireframe.
- [ ] Untuk API: contoh request/response disepakati.
- [ ] Sudah review compliance/security (mandatory untuk touch saldo).

## Definition of Done (DoD)
Story dianggap Done kalau:
- [ ] Code complete sesuai semua AC.
- [ ] Unit test passed (coverage > 80%).
- [ ] Integration test passed.
- [ ] Code review approved oleh minimal 2 reviewer.
- [ ] Tidak ada critical/high bug.
- [ ] OpenAPI spec ter-update.
- [ ] Tested di Android 10+ dan iOS 14+.
- [ ] Approved oleh QA.
- [ ] Approved oleh Product Owner.
- [ ] Security scan passed.
- [ ] Performance test passed (response time < 2 detik p95).
- [ ] Audit log tercatat untuk operasi yang ubah saldo.
- [ ] Deployed ke staging dan tested by 1 internal user.
```

Link Confluence page ke project Jira (Project Settings → Apps → Confluence).

**Checkpoint**: DoR & DoD ter-dokumentasi & visible untuk semua tim member. ✅

---

## Langkah 5 — Estimasi dengan Story Points (30 menit)

Jira built-in support story points — tinggal aktifkan.

### 5.1 Enable Story Points Field

Default sudah aktif. Verifikasi:
- Klik 1 story → cari field **Story point estimate** di sidebar kanan.
- Kalau tidak ada: **Project Settings** → **Issue layout** → drag field **Story point estimate** ke screen.

### 5.2 Estimate Story

Klik tiap story → set Story point estimate dengan **Fibonacci** (1, 2, 3, 5, 8, 13).

Aturan:
- ≤ 3 points: sederhana
- 5 points: kompleksitas sedang
- 8 points: kompleks
- 13+ points: **wajib pecah** jadi smaller story

Contoh:
- `Daftar tabungan haji dari mobile` → **8 points** (backend + frontend + KYC integration)
- `Tampilkan saldo di kartu dashboard` → **3 points** (simple display)
- `Setor via QRIS end-to-end` → **13 points** → pecah jadi:
  - `Integrasi QRIS gateway` (3 points)
  - `Webhook handler update saldo` (5 points)
  - `Notifikasi push + mutasi` (3 points)

### 5.3 Cara Pecah Story Besar di Jira

1. Klik story 13+ points → **Actions** → **Convert to epic** (kalau perlu).
2. Atau bikin **sub-task** baru di dalam story:
   - Buka story → **+ Create subtask** → isi summary + estimate.
3. Atau bikin story baru → set Epic Link ke epic yang sama.

### 5.4 Lihat Total Story Points per Epic

Di view **Backlog**: hover ke epic name → muncul total points dari semua story di epic itu.

Atau pakai **Issue Navigator**: `epic = THO-1` → group by status → lihat total.

**Checkpoint**: minimal 10 story ter-estimate, tidak ada > 8 points (atau sudah dipecah). ✅

---

## Langkah 6 — Sprint Planning di Jira (30 menit)

Jira punya **Sprint** sebagai first-class concept.

### 6.1 Bikin Sprint Baru

Di view **Backlog**:
1. Scroll ke atas → klik **Create sprint** (atau tombol **+** di area Sprint).
2. Klik **Edit sprint** di sprint baru:
   - **Sprint name**: `Sprint 1 — MVP Setor QRIS`
   - **Duration**: 2 weeks
   - **Start date**: tanggal mulai
   - **End date**: auto-calculated
   - **Sprint goal**: "Nasabah bisa daftar tabungan haji dari mobile dan lakukan setor pertama (minimum viable flow), siap untuk pilot 10 cabang."

### 6.2 Pilih Story untuk Sprint 1 — Sesuai Materi Modul 2

Drag-and-drop story dari **Backlog** ke **Sprint 1**:
- Pilih dari priority **Highest** (Must-have).
- Target velocity: 22 points (Sprint pertama tebakan kasar).
- Pastikan story yang dipilih support Sprint Goal.

**Rekomendasi isi Sprint 1** (sesuai urutan latihan Modul 2):

| Order | Story | Epic | Modul 2 Langkah |
|---|---|---|---|
| 1 | Setup database PostgreSQL lokal | THO-1 | Langkah 1 |
| 2 | Init project Node.js + TypeScript | THO-1 | Langkah 2 |
| 3 | Schema database dengan Prisma | THO-1 | Langkah 3 |
| 4 | Bootstrap Express server | THO-1 | Langkah 4 |
| 5 | Daftar nasabah baru | THO-2 | Langkah 5 |
| 6 | Buka rekening tabungan haji | THO-3 | Langkah 6.1-6.3 |
| 7 | Setor saldo (idempotent) | THO-3 | Langkah 6.4-6.5 |
| 8 | Login user dengan JWT | THO-4 | Langkah 7 |

Cek total points di header Sprint — pastikan sesuai velocity target.

### 6.3 Start Sprint

Klik **Start sprint** → konfirmasi durasi, goal, dan tanggal. Sprint sekarang aktif di **Board**.

### 6.4 Bikin Sub-task per Story (Optional)

Tiap story bisa dipecah jadi technical task. Klik story → **+ Add subtask**:
```
Subtask 1: Bikin endpoint POST /nasabah (backend)
Subtask 2: Bikin halaman daftar (frontend)
Subtask 3: Integrasi dukcapil untuk validasi NIK
Subtask 4: Unit test untuk validasi
Subtask 5: E2E test happy path
```

Assign subtask ke developer yang relevan (Sari = backend, Budi = frontend).

**Checkpoint**: Sprint 1 aktif dengan Sprint Goal, 5-6 story di sprint (~22 points), beberapa story sudah dipecah jadi subtask. ✅

---

## Langkah 7 — Daily Scrum dengan Board (15 menit)

Di Sprint aktif, **Board** Jira adalah tool utama Daily Scrum.

### 7.1 Pahami Board Columns

Default Scrum Board punya 3 kolom: **To Do, In Progress, Done**.

Bisa di-extend lewat **Board Settings** → **Columns**:
- To Do
- In Progress
- In Review (kalau pakai code review formal)
- Testing
- Done

### 7.2 Workflow Daily Scrum

Setiap hari jam 09.00 (15 menit), tim ngumpul (online/offline):

1. Buka **Board** project di layar bersama.
2. Mulai dari **kolom paling kanan (Done)** → bahas dari sisi paling matang.
3. Tiap developer:
   - Highlight card yang dia kerjakan kemarin.
   - **Drag card** ke kolom baru kalau ada progress (Doing → Review, dll).
   - Sebut impediment kalau ada → log di Slack/chat.

### 7.3 Update Status via Mobile (Tip)

Jira punya **mobile app** (iOS/Android). Dev bisa update status saat commute atau di lapangan. Sangat membantu untuk Daily Scrum yang efektif.

### 7.4 Simulasi 3 Hari

Untuk latihan, simulasikan 3 hari sprint:

**Day 1 (Senin)**:
- Sari: drag `POST /nasabah` dari To Do → In Progress.
- Budi: drag `Setup Next.js project` dari To Do → In Progress.
- Tina: drag `Migration nasabah table` dari To Do → In Progress.

**Day 2 (Selasa)**:
- Sari: drag `POST /nasabah` dari In Progress → In Review.
- Budi: drag `Setup Next.js` dari In Progress → Done.
- Tina: drag `Migration` dari In Progress → Done, ambil card baru: `Migration tabungan_haji`.

**Day 3 (Rabu)**:
- Sari: drag `POST /nasabah` In Review → Done, ambil card `POST /tabungan-haji`.
- Budi: ambil card `Halaman daftar nasabah` → In Progress.
- Tina: card baru `Migration transaksi` → In Progress.

### 7.5 Add Comment di Issue

Saat update status, dev tambah comment di issue:
- "Done — endpoint sudah tested via Postman, 5 test case pass."
- "Blocked — nunggu spec dari PO untuk format error code."

Comment ini jadi **audit trail** untuk Sprint Review nanti.

**Checkpoint**: board ter-update untuk 3 hari simulasi, ada comment di minimal 3 issue. ✅

---

## Langkah 8 — Sprint Review via Sprint Report (20 menit)

Jira **auto-generate Sprint Report** di akhir sprint — tidak perlu tulis manual.

### 8.1 Akses Sprint Report

Selama sprint aktif atau setelah selesai:
1. **Reports** di sidebar project → pilih **Sprint Report**.
2. Pilih sprint yang mau di-review (mis. Sprint 1).

Sprint Report otomatis tampilkan:
- **Sprint goal** (yang Anda set di Langkah 6).
- **Completed issues** (yang masuk kolom Done).
- **Incomplete issues** (yang tidak selesai, di-flag untuk re-plan).
- **Issues removed from sprint** (kalau ada).
- **Burndown chart** otomatis.

### 8.2 Simulasi Complete Sprint

Untuk latihan, simulasikan akhir sprint:

1. **End sprint** (klik button di Backlog atau Board).
2. Jira akan tanya: issues yang belum done mau dimasukkan ke sprint mana? Pilih:
   - **Move to top of backlog** (akan di-prioritize di Sprint 2)
   - **Move to a specific sprint**

3. Buka Sprint Report — review hasil.

### 8.3 Dokumentasi Sprint Review

Sprint Report adalah **data**. Untuk **narasi feedback stakeholder**, tambah comment di **Confluence page**:

```markdown
# Sprint 1 Review — Tabungan Haji

**Tanggal**: 2026-06-12, 14.00-16.00
**Hadir**: PO, SM, tim Dev (5), Tim Risk, Tim Compliance, Kepala Bisnis Haji

## Sprint Goal — Status
Goal: "MVP Setor QRIS untuk pilot 10 cabang"
Status: ✅ Achieved (5/6 story done, 1 slip)

## Demo Items
1. **Daftar nasabah dari mobile** (Sari demo) — feedback: tambah validasi nomor KTP duplikat.
2. **Buka tabungan haji** (Budi demo) — feedback: notifikasi push perlu di-style ulang.
3. **Setor via QRIS** (Tina demo) — feedback positif, siap pilot.

## Items Not Done
- Story `Setor via VA Bank Lain` — slip, replan ke Sprint 2.

## Action Items
| Feedback | Action | Owner | Sprint |
|---|---|---|---|
| Tambah audit trail untuk transaksi > Rp 10jt | Tambah ke backlog | PO | Sprint 2 |
| Tim Compliance minta export CSV bulanan | Tambah ke backlog | PO | Sprint 3 |

## Next Sprint Focus
- Selesaikan story slip + feedback dari stakeholder.
```

**Checkpoint**: Sprint Report ter-generate, dokumentasi review di Confluence/issue. ✅

---

## Langkah 9 — Sprint Retrospective (15 menit)

Jira tidak punya **Retrospective tool built-in** di plan Free. Workaround:

### 9.1 Opsi 1: Confluence Template

1. Confluence space → **Create page** → template **Retrospective**.
2. Default template ada 3 section: **What went well, What could be improved, Action items**.
3. Tiap tim member tulis insight masing-masing.
4. Saat retro meeting, group similar insights, voting untuk top action items.

### 9.2 Opsi 2: Tools Lain (Free)

Banyak tools retrospective free yang integrate dengan Jira:
- **EasyRetro** ([easyretro.io](https://easyretro.io)) — free untuk team kecil.
- **Parabol** ([parabol.co](https://parabol.co)) — async-friendly retrospective.
- **FunRetro** / **Metro Retro** — visual retro board.

Action items dari retro **bisa di-create jadi Jira issue otomatis** (kalau pakai EasyRetro/Parabol — ada integrasi).

### 9.3 Opsi 3: Quick Retro di Jira Issue

Cara paling simple — bikin issue khusus:

```
Type: Task
Summary: [RETRO] Sprint 1 Retrospective
Description:

## Apa yang berjalan baik?
- Daily Scrum on time tiap hari.
- OpenAPI spec sangat membantu sync backend-frontend.
- Pair programming Sari-Tina mempercepat.

## Apa yang bisa diperbaiki?
- Dependency vendor QRIS sandbox bottleneck Day 3-5.
- Test coverage masih 70% (target 80%).
- AC kadang vague — perlu refine session.

## Action Items
- [ ] [Sari] Setup mock API vendor — Sprint 2 Day 1
- [ ] [Tim] Tambah coverage minimum di DoD — sebelum Sprint Planning
- [ ] [SM] Schedule refinement session 2x/minggu — mulai Sprint 2
```

Convert action items jadi **sub-task** atau **new Story** di backlog untuk traceability.

**Checkpoint**: retro ter-dokumentasi, 2-3 action items concrete di-track di Jira. ✅

---

## Langkah 10 — Velocity & Burndown Chart (Auto-Generated) (15 menit)

Tidak perlu hitung manual — Jira auto-generate.

### 10.1 Burndown Chart

Selama Sprint aktif:
- **Reports** → **Burndown Chart** → pilih sprint.
- Chart menampilkan **sisa story points per hari** vs **ideal trend line**.

Interpretasi:
- **Curve di bawah ideal**: tim ahead of schedule.
- **Curve di atas ideal**: tim behind schedule — perlu intervensi.
- **Flat line di tengah**: tim stuck di task tertentu — investigate impediment.

### 10.2 Velocity Chart

Setelah 2+ sprint:
- **Reports** → **Velocity Chart**.
- Bar chart tampilkan **commitment vs completed** tiap sprint.
- Average velocity = prediktor kapasitas Sprint berikutnya.

### 10.3 Sprint Health Check

Setelah 3-4 sprint, analisis:
- **Predictability**: variance commitment vs completed kecil = tim predictable.
- **Trend**: velocity naik / stabil / turun?
- **Carry-over rate**: berapa % story carry over ke sprint berikutnya? Target < 10%.

### 10.4 (Bonus) Custom Dashboard

Jira punya **Dashboards** untuk visualisasi custom:
1. **Dashboards** → **Create dashboard** → nama: `Tabungan Haji Sprint Metrics`.
2. Add gadgets:
   - **Burndown gadget** — current sprint
   - **Sprint Health gadget**
   - **Created vs Resolved** chart
   - **Pie chart** by priority
   - **Filter Results** (top 10 oldest issue)

Share dashboard ke seluruh tim & stakeholder.

**Checkpoint**: Burndown chart visible, paham cara baca chart. ✅

---

## Struktur Project Jira Anda — Recap

Setelah selesai, project `THO` Anda harus berisi:

| Item | Jumlah |
|---|---|
| **Epic** | 4 (Onboarding, Setor, Monitoring, Admin) |
| **Story di Backlog** | 15+ dengan priority + Story Points |
| **Story dengan AC lengkap** | Minimal 3 (Must-have priority) |
| **Sprint aktif/closed** | 1 (Sprint 1) dengan Sprint Goal |
| **Issue dokumentasi** | DoR, DoD, Retrospective |
| **Sprint Report** | Auto-generated untuk Sprint 1 |
| **Burndown & Velocity chart** | Auto-generated |
| **Action items dari Retro** | 2-3 issue di backlog |

---

## Comparison: Jira vs Markdown Workflow

Setelah selesai dua-duanya, refleksikan:

| Aktivitas | Markdown lebih cocok kalau | Jira lebih cocok kalau |
|---|---|---|
| Brainstorm awal product vision | ✅ (cepat, fokus content) | (overhead UI) |
| Backlog management | (manual sort) | ✅ (drag, filter, search) |
| Estimasi | (manual) | ✅ (story points field) |
| Daily Scrum sync | (susah real-time) | ✅ (board visual) |
| Burndown & velocity | (manual hitung) | ✅ (auto-generated) |
| Cross-team visibility | (susah share) | ✅ (URL share, permission) |
| Documentation deep | ✅ (rich markdown) | (description terbatas) — pakai Confluence |

Di real-world tim BSI: pakai **kombinasi** — Confluence untuk deep doc + planning artifact, Jira untuk daily execution.

---

## Tugas Lanjutan

### A. Setup Jira Automation
Pakai **Automation rules** (free tier 100 runs/bulan):
- Saat issue masuk Done → auto-update Story Points di Epic.
- Saat Sprint dimulai → notify Slack channel.
- Saat issue di-comment → email PO.

### B. Sprint 2 Planning
Lakukan planning Sprint 2 dengan **feedback dari Retro & Stakeholder** Sprint 1. Bandingkan velocity (target = average Sprint 1).

### C. Custom Field & Workflow
- Tambah custom field "Compliance Reviewed" (boolean).
- Modify workflow: issue dengan label `compliance` harus di-approve Tim Compliance sebelum bisa masuk **Done**.

### D. Integrasi dengan GitHub (Smart Commit) — Penting untuk Modul 2 & 5

Saat mulai koding di Modul 2, hubungkan Jira ↔ GitHub supaya tiap commit otomatis nampak di issue Jira.

**Setup (sekali):**
1. **Project Settings** → **Apps** → install **GitHub for Jira** dari Marketplace (free).
2. Authorize Atlassian app ke GitHub account/org.
3. Pilih repo: `ODP_BSI` (atau repo Anda).

**Konvensi naming:**

| Item | Format | Contoh |
|---|---|---|
| Branch | `feat/<KEY>-<short-desc>` | `feat/THO-7-setor-idempotent` |
| Commit | `<KEY> <message>` | `THO-7 implement idempotent setor endpoint` |
| PR title | `[<KEY>] <description>` | `[THO-7] Setor saldo dengan DB transaction` |

**Smart Commit syntax** (di commit message):

```bash
# Tambah comment ke issue
git commit -m "THO-7 #comment Endpoint setor sudah lulus Postman test"

# Update time tracking
git commit -m "THO-7 #time 2h Implementasi service layer"

# Transition status
git commit -m "THO-7 #close Ready for review"
```

Setelah setup, di issue Jira muncul tab **Development** yang nampilin: branches, commits, dan PRs yang related. Bagus untuk Sprint Review demo.

### E. JQL Query Practice
Belajar **Jira Query Language** untuk filter:
```jql
project = THO AND sprint in openSprints() AND assignee = currentUser()
project = THO AND status = "Done" AND updated >= -7d
project = THO AND priority = Highest AND status != Done
```

---

## Troubleshooting

| Masalah | Solusi |
|---|---|
| Tidak ada "Story" issue type | Project bukan Scrum template. Bikin baru dengan template Scrum. |
| Tidak bisa drag ke sprint | Pastikan sprint sudah di-create. Klik **Create sprint** di Backlog dulu. |
| Story Points field tidak muncul | Project Settings → Issue layout → drag field ke screen. |
| Burndown chart kosong | Sprint belum start. Klik **Start sprint** dulu. |
| Tidak bisa edit description Issue | Cek permission — minimal "Edit issue" permission di project. |
| Email notification banjir | Settings → Personal Settings → Email preferences → adjust. |

---

## Checklist Akhir Latihan

Sebelum lanjut Modul 2, pastikan:

- [ ] Akun Jira Cloud aktif + project `THO` ter-setup.
- [ ] Product Vision tersimpan di Project Description atau Confluence.
- [ ] 4 Epic dengan color berbeda.
- [ ] 15+ Story dengan epic link, priority (MoSCoW), dan format INVEST.
- [ ] Minimal 3 story Must-have punya AC lengkap (Given/When/Then) + DoD.
- [ ] DoR & DoD ter-dokumentasi (issue khusus atau Confluence page).
- [ ] Minimal 10 story ter-estimate dengan Story Points Fibonacci.
- [ ] Sprint 1 aktif dengan Sprint Goal jelas + 5-6 story di sprint.
- [ ] Beberapa story dipecah jadi sub-task & assigned ke developer.
- [ ] Board ter-update untuk 3 hari simulasi Daily Scrum.
- [ ] Sprint Report ter-generate (atau bisa di-akses setelah end sprint).
- [ ] Sprint Review terdokumentasi di Confluence atau comment issue.
- [ ] Retrospective dengan 3-2-3 (3 good, 2 improve, 3 actions) di-track.
- [ ] Burndown & Velocity chart bisa di-akses & di-interpretasi.

---

## Sumber & Referensi

- **Jira Software Documentation** — [atlassian.com/software/jira/guides](https://www.atlassian.com/software/jira/guides)
- **Atlassian Agile Coach** — [atlassian.com/agile](https://www.atlassian.com/agile) (gratis, banyak template)
- **Jira Tutorial for Beginners** — YouTube playlist resmi Atlassian
- **Scrum Guide 2020** — [scrumguides.org](https://scrumguides.org)
- **Confluence Templates Library** — built-in di Confluence
- **EasyRetro** — [easyretro.io](https://easyretro.io)
- **Atlassian Marketplace** — plugins free & paid untuk Jira

---

**Selesai latihan ini?** Anda sekarang punya **pengalaman real-world Scrum execution** di tool industri-standard — siap berpartisipasi di tim engineering BSI yang pakai Jira sehari-hari. Selanjutnya: **Modul 2 — RESTful API & Database Modeling**, di mana story-story dari Jira backlog akan mulai di-implement jadi kode.
