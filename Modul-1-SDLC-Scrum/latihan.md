# Latihan Modul 1 — Membuat Artifact Scrum

> **Target**: di akhir latihan, Anda punya **set Scrum artifact lengkap** untuk satu produk (Product Backlog, Sprint Backlog, DoR, DoD, User Story dengan AC, Planning Poker estimation, Sprint Review & Retrospective).
>
> **Durasi estimasi**: 2–3 jam.
>
> **Tool**: dokumen text/markdown (atau pakai Notion/Jira/Trello kalau familiar). **Tidak perlu coding** — latihan ini fokus ke skill **planning & dokumentasi** sebagai Product Owner / Scrum Master / Developer.

---

## Skenario Latihan

Anda dan tim baru saja dibentuk untuk mengembangkan fitur baru:

> **Tabungan Haji Online di Aplikasi Mobile**
>
> Memungkinkan nasabah daftar, setor saldo, lihat saldo, dan terima notifikasi dari aplikasi mobile — tanpa harus ke cabang.

Tim Anda terdiri dari:
- **1 Product Owner** (mewakili bisnis & nasabah)
- **1 Scrum Master**
- **5 Developers** (mix backend, frontend, QA)

Sprint length disepakati **2 minggu**.

Latihan ini mengikuti **alur Sprint pertama dari nol** sampai selesai — termasuk artifact yang dihasilkan di setiap tahap.

---

## Langkah 1 — Tulis Product Goal & Product Vision (15 menit)

**Tujuan**: tim sepakati arah produk yang akan dibangun, jadi acuan semua prioritisasi backlog.

### 1.1 Template Product Vision

Isi template berikut:

```
## Product Vision: [Nama Produk]

### Untuk siapa produk ini?
[Target user dengan profil spesifik]

### Masalah apa yang dipecahkan?
[Pain point yang dialami target user saat ini]

### Solusi singkat
[1-2 kalimat yang gambarkan apa produk ini]

### Beda dari alternatif yang ada?
[Differensiasi vs cara existing / kompetitor]

### Indikator sukses
[Metric yang akan diukur untuk validasi]
```

### 1.2 Contoh Diisi

```
## Product Vision: Tabungan Haji Online (BSI Mobile)

### Untuk siapa produk ini?
Calon jamaah haji usia 25-55 tahun yang sudah punya aplikasi BSI Mobile,
mau menabung untuk haji secara reguler tapi malas/repot ke cabang.

### Masalah apa yang dipecahkan?
Saat ini buka tabungan haji & setor saldo harus ke cabang.
Antri lama, jam terbatas (08.00-15.00), tidak fleksibel untuk yang kerja.

### Solusi singkat
Fitur tabungan haji terintegrasi di BSI Mobile — daftar, setor (via QRIS/transfer),
lihat saldo, terima notifikasi, semua dari HP.

### Beda dari alternatif yang ada?
- Bank konvensional: tidak ada produk haji.
- Bank syariah lain: masih offline / sebagian online tapi terpisah dari mobile banking.
- BSI sekarang: kompetitif dengan integrasi penuh di 1 aplikasi.

### Indikator sukses
- Bulan 1: 5.000 nasabah daftar via mobile.
- Bulan 3: 60% transaksi setor terjadi via mobile (vs cabang).
- Rating fitur di app: ≥ 4.5/5.
- Penurunan 30% antrian cabang untuk transaksi haji.
```

### 1.3 Latihan Anda

Buat file `01-product-vision.md`. Isi template untuk fitur Tabungan Haji Online.

**Checkpoint**: Product Vision punya 5 section terisi jelas, bisa dijelaskan ke orang awam dalam 1 menit. ✅

---

## Langkah 2 — Bikin Product Backlog Awal (30 menit)

**Tujuan**: kumpulan kebutuhan dalam format user story, terprioritaskan.

### 2.1 Format User Story (INVEST)

Konsistenkan format:

```
**Sebagai** [persona/peran],
**Saya ingin** [fungsi/aksi],
**Sehingga** [nilai bisnis yang didapat].
```

Cek tiap story dengan checklist **INVEST**:
- **I**ndependent — bisa dikerjakan & rilis sendiri.
- **N**egotiable — detail bisa didiskusikan.
- **V**aluable — punya nilai bisnis.
- **E**stimable — bisa diestimasi.
- **S**mall — cukup kecil untuk 1 Sprint.
- **T**estable — punya kriteria yang bisa diuji.

### 2.2 Brainstorm Story untuk Tabungan Haji Online

Mulai dengan **EPIC** (item besar) lalu pecah jadi **Story** (item Sprint-sized).

Contoh:

```
EPIC: Onboarding Nasabah Tabungan Haji
  - Story 1: Sebagai nasabah, saya ingin daftar tabungan haji dari mobile app,
             sehingga saya tidak perlu datang ke cabang.
  - Story 2: Sebagai nasabah, saya ingin upload foto KTP saat daftar,
             sehingga validasi KYC bisa dilakukan otomatis.
  - Story 3: Sebagai nasabah, saya ingin pilih jangka waktu menabung (5/10/15 tahun),
             sehingga aplikasi bisa hitung target setoran bulanan.

EPIC: Setor Saldo
  - Story 4: Sebagai nasabah, saya ingin setor saldo via QRIS,
             sehingga proses cepat tanpa transfer manual.
  - Story 5: Sebagai nasabah, saya ingin setor saldo via transfer dari rekening BSI lain,
             sehingga bisa pakai dana yang sudah ada.
  - Story 6: Sebagai nasabah, saya ingin set autodebit bulanan,
             sehingga setoran berjalan rutin tanpa saya inisiasi tiap bulan.

EPIC: Monitoring Tabungan
  - Story 7: Sebagai nasabah, saya ingin lihat saldo & target tabungan haji,
             sehingga saya tahu progress menuju biaya haji.
  - Story 8: Sebagai nasabah, saya ingin lihat mutasi 30 hari terakhir,
             sehingga saya bisa cek riwayat transaksi.
  - Story 9: Sebagai nasabah, saya ingin notifikasi setiap kali ada setoran masuk,
             sehingga saya yakin transaksi sukses.

EPIC: Admin & Reporting
  - Story 10: Sebagai admin cabang, saya ingin lihat daftar nasabah haji aktif,
              sehingga bisa follow-up untuk produk lain.
  - Story 11: Sebagai compliance officer, saya ingin export audit log bulanan,
              sehingga bisa report ke OJK Syariah.
```

### 2.3 Prioritisasi (MoSCoW)

Klasifikasikan tiap story:

| Prioritas | Arti | Contoh |
|---|---|---|
| **M**ust have | Tanpa ini, produk tidak bisa rilis | Story 1, 4, 7 (daftar, setor, lihat saldo) |
| **S**hould have | Penting tapi bisa di-delay 1-2 Sprint | Story 2, 8, 9 |
| **C**ould have | Nice to have | Story 3, 5, 6 (autodebit, dll) |
| **W**on't have (this release) | Out of scope sekarang | Story 10, 11 (akan di-rilis berikutnya) |

### 2.4 Latihan Anda

Buat file `02-product-backlog.md`. Susun **minimal 15 story** terbagi dalam **4 epic**, lalu kasih MoSCoW priority ke masing-masing.

**Checkpoint**: minimal 15 story, semua format INVEST valid, MoSCoW jelas. ✅

---

## Langkah 3 — Tulis Acceptance Criteria (30 menit)

**Tujuan**: tiap story punya kriteria objektif untuk dianggap "Done".

### 3.1 Format Given/When/Then (Gherkin)

```
**Story**: [recap singkat story]

**AC 1 — [nama kasus]**:
  Given [kondisi awal]
  When [aksi yang dilakukan]
  Then [hasil yang diharapkan]
  And [konsekuensi tambahan]
```

### 3.2 Contoh Lengkap

```
**Story 4**: Sebagai nasabah, saya ingin setor saldo via QRIS,
             sehingga proses cepat tanpa transfer manual.

**AC 1 — Setor sukses dengan saldo cukup**:
  Given saya login sebagai nasabah dengan tabungan haji aktif
  And saldo rekening sumber Rp 10.000.000
  When saya scan QRIS merchant haji dan input nominal Rp 500.000
  And klik tombol "Setor"
  Then saldo tabungan haji bertambah Rp 500.000
  And saldo rekening sumber berkurang Rp 500.000
  And muncul notifikasi "Setor sukses"
  And transaksi tercatat di mutasi dengan jenis "Setor QRIS"

**AC 2 — Saldo tidak cukup**:
  Given saldo rekening sumber Rp 100.000
  When saya scan QRIS dan input nominal Rp 500.000
  Then sistem tampilkan error "Saldo tidak mencukupi"
  And transaksi dibatalkan
  And saldo rekening sumber tidak berubah

**AC 3 — Nominal di bawah minimum**:
  Given saya scan QRIS
  When saya input nominal Rp 50.000
  Then sistem tampilkan error "Setoran minimum Rp 100.000"
  And tombol "Setor" disable

**AC 4 — Tabungan sedang dibekukan**:
  Given tabungan haji saya status BEKU
  When saya scan QRIS
  Then sistem tampilkan error "Tabungan sedang dibekukan, hubungi customer service"
  And transaksi tidak diproses
```

### 3.3 Latihan Anda

Buat file `03-acceptance-criteria.md`. Tulis AC lengkap untuk **3 story Must-have** dari Langkah 2.

Tiap story minimum punya:
- 1 AC happy path
- 2 AC edge case / error case

**Checkpoint**: minimal 9 AC total (3 story × 3 AC), semua format Given/When/Then. ✅

---

## Langkah 4 — Definition of Ready (DoR) & Definition of Done (DoD) (15 menit)

**Tujuan**: tim sepakati kriteria kualitas untuk story siap di-Sprint & siap dianggap selesai.

### 4.1 Template DoR

```
# Definition of Ready

Sebuah story siap masuk Sprint kalau MEMENUHI SEMUA berikut:

- [ ] Format INVEST valid (Sebagai... Saya ingin... Sehingga...).
- [ ] Acceptance criteria minimum 1 happy path + 1 error case.
- [ ] [Tambah kriteria lain sesuai konteks tim Anda]
```

### 4.2 Contoh Diisi

```
# Definition of Ready — Tim Tabungan Haji Mobile

Sebuah story siap masuk Sprint kalau MEMENUHI SEMUA:

- [ ] Format INVEST valid.
- [ ] Acceptance criteria minimum 1 happy path + 2 error case.
- [ ] Sudah di-estimate oleh tim (story points Fibonacci).
- [ ] Dependency ke tim/sistem lain teridentifikasi.
- [ ] Untuk story dengan UI: ada mockup/wireframe dari Designer.
- [ ] Untuk story dengan API baru: contoh request/response sudah disepakati.
- [ ] Sudah review compliance/security (mandatory untuk story yang touch saldo nasabah).
- [ ] Test data tersedia di environment staging.
```

### 4.3 Template DoD

```
# Definition of Done

Sebuah story dianggap Done kalau MEMENUHI SEMUA berikut:

- [ ] Code complete sesuai acceptance criteria.
- [ ] Unit test passed dengan coverage [target%].
- [ ] Code review approved oleh minimal [N] reviewer.
- [ ] [Kriteria lain]
```

### 4.4 Contoh DoD Lengkap

```
# Definition of Done — Tim Tabungan Haji Mobile

Story dianggap Done kalau:

- [ ] Code complete sesuai semua acceptance criteria.
- [ ] Unit test passed (coverage > 80% untuk service & business logic).
- [ ] Integration test passed di staging.
- [ ] Code review approved oleh minimal 2 reviewer (1 backend + 1 frontend kalau touch keduanya).
- [ ] Tidak ada critical/high bug yang belum di-fix.
- [ ] Dokumentasi API ter-update di OpenAPI spec.
- [ ] Tested di device: Android 10+ dan iOS 14+.
- [ ] Tested oleh QA team dan approved.
- [ ] Approved oleh Product Owner.
- [ ] Security scan passed (SAST tools).
- [ ] Performance test passed (response time < 2 detik p95).
- [ ] Audit log tercatat untuk operasi yang ubah saldo.
- [ ] Deployed ke staging dan tested by 1 internal user.
```

### 4.5 Latihan Anda

Buat file `04-dor-dod.md`. Tulis DoR dan DoD spesifik untuk tim Anda.

**Checkpoint**: DoR minimum 7 item, DoD minimum 10 item, semuanya relevan untuk konteks banking. ✅

---

## Langkah 5 — Estimasi dengan Planning Poker (30 menit)

**Tujuan**: tim estimate story points untuk top stories di backlog.

### 5.1 Skala Fibonacci

| Story Points | Kompleksitas | Indikator |
|---|---|---|
| 1 | Sangat sederhana | Ubah text label, css minor |
| 2 | Sederhana | Tambah field di form, query DB simple |
| 3 | Standar | Endpoint CRUD baru, integrasi 1 layer |
| 5 | Cukup kompleks | Feature multi-step, integrasi 2-3 layer |
| 8 | Kompleks | Multi-service, banyak edge case |
| 13 | Sangat kompleks | **Coba pecah jadi smaller stories** |
| 21+ | Terlalu besar | **WAJIB pecah** |

### 5.2 Cara Main Planning Poker

1. PO baca 1 story.
2. Tim diskusi singkat (5 menit max) — bertanya kalau ada ambiguitas.
3. Tiap developer **pilih kartu story point bersamaan** (jangan dipengaruhi yang lain).
4. Reveal kartu → diskusi yang outlier (highest & lowest jelaskan reasoning).
5. Vote ulang sampai konsensus (max 3 putaran).

### 5.3 Simulasi Latihan

Untuk latihan ini, **Anda main solo** — bayangkan reasoning tiap perspektif. Estimate **10 story** dari backlog Anda.

Template file `05-estimasi.md`:

```
# Estimasi Story Points

## Story 1: [judul]
- Estimasi: [angka] points
- Reasoning:
  - Backend: [pertimbangan]
  - Frontend: [pertimbangan]
  - Risk: [unknown / dependency]

## Story 2: ...
```

### 5.4 Contoh Diisi

```
## Story 1: Daftar tabungan haji dari mobile
- Estimasi: 8 points
- Reasoning:
  - Backend: endpoint POST nasabah + auto-buka tabungan, validasi KYC dasar. ~5 points.
  - Frontend: form daftar multi-step (data diri, KTP upload, konfirmasi). ~5 points.
  - Risk: integrasi dukcapil untuk validasi NIK belum jelas SLA-nya.
  - Total kompleks → 8 points.

## Story 4: Setor via QRIS
- Estimasi: 13 → PECAH
- Reasoning awal: integrasi QRIS gateway, validasi, mutasi, notifikasi → terlalu besar.
- Pecah jadi:
  - 4a: Integrasi gateway QRIS — generate QR (3 points)
  - 4b: Webhook handler setor sukses → update saldo (5 points)
  - 4c: Notifikasi push & update mutasi (3 points)
```

### 5.5 Latihan Anda

Estimate **10 story** dari Backlog Langkah 2. Untuk story 13+, pecah jadi sub-stories yang lebih kecil.

**Checkpoint**: 10 story ter-estimate, tidak ada > 8 points (atau sudah dipecah). ✅

---

## Langkah 6 — Sprint Planning: Tetapkan Sprint Goal & Sprint Backlog (30 menit)

**Tujuan**: definisikan apa yang akan dikerjakan di Sprint 1 (2 minggu).

### 6.1 Tiga Pertanyaan Sprint Planning

| Pertanyaan | Output |
|---|---|
| **Why** — kenapa Sprint ini bernilai? | **Sprint Goal** |
| **What** — apa yang bisa dikerjakan? | **Sprint Backlog (top items)** |
| **How** — bagaimana mengerjakannya? | **Plan teknis singkat** |

### 6.2 Tentukan Sprint Goal

Sprint Goal = **kalimat single yang gambarkan outcome utama Sprint ini**. Bukan list task.

Contoh **buruk**:
> "Selesaikan story 1, 2, 4, 7."

Contoh **baik**:
> "Nasabah bisa daftar tabungan haji dari mobile dan lakukan setor pertama (minimum viable flow), siap untuk pilot 10 cabang."

### 6.3 Pilih Story untuk Sprint Backlog

Aturan:
- Velocity tim diestimasi (Sprint pertama biasanya tebakan, ~20-25 points untuk tim 5 orang).
- Pilih story dari atas backlog (prioritas Must) yang **mendukung Sprint Goal**.
- Total points = velocity, tidak lebih.

### 6.4 Template Sprint Planning Output

File `06-sprint-1-planning.md`:

```
# Sprint 1 — Planning

**Periode**: [tanggal mulai] – [tanggal selesai] (2 minggu)
**Velocity Target**: 22 points

## Sprint Goal
[Kalimat outcome utama]

## Sprint Backlog

| # | Story | Points | Pemilik utama |
|---|---|---|---|
| 1 | [judul story] | 8 | Backend lead |
| 2 | [judul story] | 5 | Frontend lead |
| ... | | | |
| **Total** | | **22** | |

## Sprint Plan Teknis (singkat)

### Week 1
- Day 1-2: Setup infra + DB schema.
- Day 3-5: Implementasi backend nasabah + tabungan.

### Week 2
- Day 6-8: Frontend daftar + setor.
- Day 9: Integration test.
- Day 10: Demo + Retro.

## Risiko & Dependency
- [Risk 1]: ...
- [Dependency 1]: tim core banking siapkan endpoint X di Day 3.
```

### 6.5 Latihan Anda

Buat file `06-sprint-1-planning.md`. Tetapkan Sprint Goal yang konkret + pilih ~5-6 story untuk Sprint 1.

**Checkpoint**: Sprint Goal jelas 1 kalimat, total points sesuai velocity (~22). ✅

---

## Langkah 7 — Simulasi Daily Scrum (15 menit)

**Tujuan**: praktik format Daily Scrum 3 pertanyaan.

### 7.1 Format Daily Scrum

15 menit, **jam sama tiap hari**, **tempat sama**, **standing-up** (literally).

Tiap developer share:
1. Apa yang **saya kerjakan kemarin** yang membantu Sprint Goal?
2. Apa yang **akan saya kerjakan hari ini**?
3. Apa **impediment** yang menghalangi saya/tim?

### 7.2 Latihan: Simulasi 3 Hari

Buat file `07-daily-scrum.md`. Simulasikan Daily Scrum 3 hari berurutan untuk Sprint 1 Anda.

Contoh:

```
# Daily Scrum Log

## Day 1 — Senin, 1 Juni 2026, 09:00

**Sari (Backend Lead)**
- Kemarin: kickoff, setup repo baru, install Prisma.
- Hari ini: bikin migration nasabah + tabungan_haji table.
- Impediment: belum dapat akses ke dev database — request ke DBA.

**Budi (Frontend Lead)**
- Kemarin: review spec UI dari designer.
- Hari ini: setup Next.js project + Tailwind.
- Impediment: belum dapat Figma access — request ke designer.

**Tina (Backend Dev)**
- Kemarin: --
- Hari ini: assist Sari di migration, mulai validasi Zod untuk endpoint nasabah.
- Impediment: tidak ada.

**Pak Budi (Scrum Master)**
- Action: follow up DBA & designer untuk akses Sari & Budi.

---

## Day 2 — Selasa, 2 Juni 2026, 09:00
[isi sama format-nya]

---

## Day 3 — Rabu, 3 Juni 2026, 09:00
[isi sama format-nya]
```

**Checkpoint**: 3 hari Daily Scrum ter-log, ada minimal 1 impediment per hari yang di-handle Scrum Master. ✅

---

## Langkah 8 — Sprint Review (20 menit)

**Tujuan**: praktik dokumentasi Sprint Review — demo + feedback.

### 8.1 Format Sprint Review

Sprint Review **bukan presentasi formal** — lebih ke **working session** dengan stakeholder.

Agenda umum (2 jam):
1. PO sambutan singkat (5 min).
2. Tim **demo increment** yang sudah Done (45 min).
3. Diskusi & feedback dari stakeholder (45 min).
4. PO update Product Backlog berdasar feedback (15 min).
5. Tentukan **fokus Sprint berikutnya** (10 min).

### 8.2 Template Sprint Review

File `08-sprint-1-review.md`:

```
# Sprint 1 Review

**Tanggal**: [tanggal] 14:00-16:00
**Hadir**: PO, SM, tim Dev (5 orang), stakeholder (Tim Risk, Tim Compliance, Kepala Bisnis Haji)

## Sprint Goal — Achieved?
- Goal: "[Sprint goal Anda]"
- Status: ✅ Achieved / ⚠️ Partial / ❌ Not achieved
- Catatan: [Apa yang capai, apa yang slip]

## Demo Items

### Story 1: [judul]
- Status: ✅ Done
- Demo: [siapa demo, apa yang ditunjukkan]
- Feedback:
  - [stakeholder X]: "..."
  - [stakeholder Y]: "..."

### Story 2: ...

## Items Not Done
- Story [X]: alasan tidak selesai, replan ke Sprint berikutnya.

## Feedback Stakeholder — Action Items

| # | Feedback | Action | Owner | Sprint |
|---|---|---|---|---|
| 1 | Tim Risk minta tambahan audit trail untuk transaksi > Rp 10jt | Add ke backlog | PO | Sprint 2 |
| 2 | Compliance minta export CSV bulanan | Add ke backlog | PO | Sprint 3 |

## Next Sprint Focus
[Tema/goal Sprint 2 — masih kasar, akan refine di Planning]
```

### 8.3 Latihan Anda

Buat file `08-sprint-1-review.md`. Asumsikan **3-4 story dari Sprint 1 sudah Done** dan **1 slip**. Tulis Sprint Review-nya.

**Checkpoint**: Status Sprint Goal, demo per story, action items hasil feedback ada. ✅

---

## Langkah 9 — Sprint Retrospective (15 menit)

**Tujuan**: tim refleksi cara kerja, sepakati improvement actionable.

### 9.1 Format Klasik — "3 Pertanyaan"

1. **Apa yang berjalan baik?** (What went well?)
2. **Apa yang bisa diperbaiki?** (What could be improved?)
3. **Action item konkret untuk Sprint berikutnya** — siapa, apa, kapan.

### 9.2 Format Alternatif — "Start, Stop, Continue"

| Start (mulai lakukan) | Stop (hentikan) | Continue (lanjutkan) |
|---|---|---|
| Code review buddy harian | Meeting setelah jam 16.00 | Daily Scrum on time |

### 9.3 Template Retrospective

File `09-sprint-1-retrospective.md`:

```
# Sprint 1 Retrospective

**Tanggal**: [tanggal] 16:30-18:00
**Hadir**: Tim Scrum saja (tanpa stakeholder)
**Fasilitator**: Scrum Master

## Sprint Stats
- Velocity: 22 / 22 points (target tercapai)
- Story selesai: 5 dari 6
- Bug ditemukan saat UAT: 2 (1 critical, 1 minor)

## Yang Berjalan Baik
- Daily Scrum efektif — semua hadir tepat waktu.
- Backend-Frontend sync lewat OpenAPI spec sangat membantu.
- Pair programming Sari-Tina untuk audit log mempercepat delivery.

## Yang Bisa Diperbaiki
- Dependency ke tim core banking memperlambat di Day 3-5.
- Test coverage masih 70% (target 80%).
- Story acceptance criteria kadang terlalu vague — perlu refine di refinement.

## Action Items untuk Sprint 2

| # | Action | Owner | Deadline |
|---|---|---|---|
| 1 | Setup mock API untuk core banking — buffer dependency | Sari | Day 1 Sprint 2 |
| 2 | Tambah test coverage minimum di DoD | Tim | Sprint Planning |
| 3 | Refinement session 2 jam/minggu | SM | Mulai Sprint 2 |
```

### 9.4 Latihan Anda

Buat file `09-sprint-1-retrospective.md`. Tulis 3-4 hal di tiap kategori + 2-3 action items konkret.

**Checkpoint**: minimum 3 "berjalan baik", 3 "bisa diperbaiki", 2 action items dengan owner & deadline. ✅

---

## Langkah 10 — (Bonus) Visualisasi Velocity & Burn-down (15 menit)

**Tujuan**: praktik track progress dengan tools visual.

### 10.1 Velocity Chart

Setelah beberapa Sprint, plot velocity:

```
Sprint   Velocity
1        22 points  ← Sprint Anda
2        25 points
3        24 points
4        26 points
─────────────────
Average:  24 points
```

Velocity = prediktor kapasitas Sprint berikutnya.

### 10.2 Burn-down Chart Sprint 1

Y-axis = sisa story points, X-axis = hari Sprint.

```
Points
  ^
22│●
  │  ╲
18│   ●
  │    ╲
14│      ●●  (Day 3-4: slow karena dependency)
  │       ╲
10│         ●
  │          ╲
 6│            ●
  │             ╲
 2│              ●
  │               ╲
 0│────────────────●─────→ Hari
  1  2  3  4  5  6  7  8  9 10
                          ↑ Sprint selesai
```

### 10.3 Latihan Anda

Buat file `10-velocity-burndown.md`. Gambar burn-down chart Sprint 1 Anda (boleh ASCII art atau screenshot dari Google Sheets / Excel).

**Checkpoint**: burn-down tergambar, ada interpretasi shape (smooth / flat di tengah / curam di akhir). ✅

---

## Struktur Folder Latihan Anda

Setelah selesai, folder hasil latihan harus berisi:

```
latihan-modul-1/
├── 01-product-vision.md
├── 02-product-backlog.md
├── 03-acceptance-criteria.md
├── 04-dor-dod.md
├── 05-estimasi.md
├── 06-sprint-1-planning.md
├── 07-daily-scrum.md
├── 08-sprint-1-review.md
├── 09-sprint-1-retrospective.md
└── 10-velocity-burndown.md
```

10 dokumen ini = **set artifact Scrum lengkap** untuk 1 Sprint cycle.

---

## Tugas Lanjutan (Untuk Eksplorasi Mandiri)

Pilih minimal 2:

### A. User Story Mapping
Visualkan **journey nasabah** dari onboarding sampai setor saldo dalam **story map** (horizontal timeline + vertical priority). Tools: Miro, Mural, atau sticky notes fisik.

### B. Refinement Session Simulation
Asumsikan tim ada di tengah Sprint 1 dan butuh refine 5 story untuk Sprint 2. Tulis simulasi 30-menit session: PO paparkan story, tim ajukan pertanyaan, estimate, sepakati.

### C. Risk Register
Untuk product Tabungan Haji, identifikasi 10 risiko (teknis, bisnis, regulasi) dan kategorikan: likelihood (low/med/high) × impact (low/med/high). Plot di matrix 3x3.

### D. Stakeholder Map
Identifikasi semua stakeholder produk Tabungan Haji Online. Klasifikasikan: power (high/low) × interest (high/low). Buat strategi engagement untuk tiap kuadran.

### E. Multi-Sprint Planning
Plan 3 Sprint berturut-turut (Sprint 2 & 3) berdasar feedback Sprint Review. Buat **Release Plan** untuk fitur lengkap (target Release 1 di akhir Sprint 3).

---

## Self-Assessment

Centang kemampuan yang sudah Anda kuasai:

**Backlog & Story:**
- [ ] Bisa tulis Product Vision dengan 5 section.
- [ ] Bisa identify epic vs story.
- [ ] Bisa tulis user story format INVEST.
- [ ] Bisa apply MoSCoW priority.

**Refinement:**
- [ ] Bisa tulis Acceptance Criteria Given/When/Then.
- [ ] Bisa estimate story points dengan Fibonacci.
- [ ] Tahu kapan story harus dipecah (> 8 points).

**Sprint Mechanics:**
- [ ] Bisa tetapkan Sprint Goal yang outcome-based.
- [ ] Bisa pilih Sprint Backlog yang realistic (sesuai velocity).
- [ ] Familiar dengan format Daily Scrum 15 menit.
- [ ] Tahu agenda Sprint Review (demo + feedback).
- [ ] Tahu format Retrospective (3 questions / Start-Stop-Continue).

**Tracking & Quality:**
- [ ] Bisa tulis DoR dengan kriteria spesifik.
- [ ] Bisa tulis DoD untuk konteks banking.
- [ ] Bisa baca burn-down chart.
- [ ] Tahu konsep velocity.

---

## Sumber & Referensi

- **Scrum Guide 2020** (~13 halaman, wajib baca): [scrumguides.org](https://scrumguides.org)
- **User Story Mapping** — Jeff Patton (buku)
- **Mountain Goat Software** — Mike Cohn (artikel & video Scrum)
- **Atlassian Agile Coach**: [atlassian.com/agile/scrum](https://www.atlassian.com/agile/scrum)
- Template Confluence/Jira: tersedia di Atlassian Marketplace, banyak gratis.

---

**Selesai latihan ini?** Anda sudah punya **fondasi praktis Scrum** — siap berpartisipasi sebagai Product Owner, Scrum Master, atau Developer di tim BSI. Selanjutnya: **Modul 2 — RESTful API & Database Modeling**, di mana story-story dari backlog Anda mulai di-implement jadi kode.
