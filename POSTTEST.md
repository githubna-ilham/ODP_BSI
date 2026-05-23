# POSTTEST – ODP BSI IT Development (Fase 1)

**Durasi**: 30 menit
**Total Soal**: 20 Pilihan Ganda
**Bobot**: 5 poin per soal (Total 100)
**Tujuan**: Mengukur penguasaan peserta setelah mengikuti 5 modul pelatihan (H1–H5). Konteks: studi kasus **Tabungan Haji BSI** yang dibangun sepanjang pelatihan.

---

## Identitas Peserta

- Nama        : ____________________________
- Email       : ____________________________
- Unit Kerja  : ____________________________
- Tanggal     : ____________________________
- Skor Pretest (jika ingat): ______

---

## Petunjuk
1. Pilih **satu** jawaban paling tepat dengan melingkari huruf A/B/C.
2. Kerjakan secara mandiri, tanpa membuka internet, dokumentasi, atau catatan modul.
3. Jika tidak yakin, pilih jawaban terbaik menurut Anda (tidak ada pengurangan nilai).

---

## BAGIAN A — SDLC, Scrum, Cursor IDE & Prompt Engineering (Soal 1–4)

**1. Dalam Scrum, "Sprint Goal" ditetapkan saat …**
- A. Sprint Planning, di awal Sprint sebagai komitmen tim
- B. Daily Scrum, setiap hari oleh masing-masing developer
- C. Sprint Retrospective, setelah Sprint selesai sebagai dokumentasi

**2. Untuk fitur QRIS Tabungan Haji yang sudah ditentukan & regulasi-nya ketat, **branching strategy** yang paling cocok untuk tim BSI adalah …**
- A. Trunk-Based Development dengan commit langsung ke `main`
- B. Tidak pakai branching, semua kerja di file yang sama
- C. Git Flow dengan branch `main`, `develop`, `feature/*`, `release/*`, `hotfix/*`

**3. Saat memakai Cursor IDE untuk proyek banking, fitur yang **wajib diaktifkan** supaya kode tidak ke-collect untuk training AI adalah …**
- A. Privacy Mode
- B. Composer Mode
- C. Tab Autocomplete

**4. Pola prompt **RCTF** yang dipelajari di Modul 1 adalah singkatan dari …**
- A. Refactor, Compile, Test, Format
- B. Role, Context, Task, Format
- C. React, Components, Tailwind, Functions

---

## BAGIAN B — RESTful API & PostgreSQL (Soal 5–8)

**5. Endpoint REST yang paling tepat untuk **setor saldo** ke tabungan haji adalah …**
- A. `POST /api/v1/tabungan-haji/PSTH-001/setor`
- B. `GET /api/v1/setor?id=PSTH-001&nominal=500000`
- C. `POST /api/v1/setorTabunganHaji`

**6. Pola **idempotency** di endpoint setor saldo penting karena …**
- A. Supaya nasabah bisa setor saldo sebanyak mungkin tanpa limit
- B. Supaya kalau request di-retry karena timeout, saldo tidak bertambah ganda
- C. Supaya endpoint bisa di-cache di browser

**7. Untuk menyimpan **saldo dalam Rupiah** di PostgreSQL, tipe data yang paling tepat adalah …**
- A. `FLOAT` atau `DOUBLE` karena bisa menyimpan desimal
- B. `BIGINT` atau `NUMERIC` karena presisi akurat (tidak ada error pembulatan)
- C. `VARCHAR` karena bisa disimpan dengan format "Rp 1.000.000"

**8. Saat memproses setor saldo (update tabel `tabungan_haji` + insert ke `transaksi` + insert `audit_log`), keseluruhan operasi harus dibungkus dalam …**
- A. Multiple `try/catch` terpisah agar bisa partial success
- B. Single function tanpa proteksi khusus
- C. Database transaction (`prisma.$transaction(...)`) agar atomik — semua atau tidak sama sekali

---

## BAGIAN C — React/Next.js (Soal 9–12)

**9. Di Next.js dengan App Router, file yang merepresentasikan halaman di route `/tabungan` adalah …**
- A. `pages/tabungan.js`
- B. `app/tabungan/page.tsx`
- C. `routes/tabungan.tsx`

**10. Untuk membuat component yang memakai `useState` dan event handler `onClick`, di Next.js App Router perlu menambahkan directive …**
- A. `"use server"` di atas file
- B. `"use strict"` di atas file
- C. `"use client"` di atas file

**11. Library yang dipakai di Modul 3 untuk **caching, refetch, dan mutation** API dari React adalah …**
- A. TanStack Query (React Query)
- B. Lodash
- C. Redux Saga

**12. Untuk **format Rupiah konsisten** di seluruh aplikasi (mis. "Rp 5.000.000"), pendekatan yang paling tepat adalah …**
- A. Pakai helper function dengan `Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" })`
- B. Concat string manual: `"Rp " + nominal`
- C. Pakai `toFixed(2)` lalu tambahkan "Rp" di depan

---

## BAGIAN D — SOLID, Clean Code & Testing (Soal 13–16)

**13. Prinsip **Single Responsibility (SRP)** menyatakan bahwa …**
- A. Function harus selalu return single value
- B. Class harus punya satu alasan untuk berubah (satu tanggung jawab)
- C. Project hanya boleh punya satu repository

**14. Manakah dari berikut yang termasuk **code smell** yang perlu di-refactor?**
- A. Function dengan nama deskriptif yang panjang seperti `hitungBagiHasilSyariah`
- B. Pemakaian konstanta seperti `const MIN_SALDO = 100_000`
- C. Magic number di kode seperti `if (saldo < 100000) { ... }` tanpa konstanta dengan nama

**15. Pattern AAA dalam unit test adalah …**
- A. Arrange → Act → Assert
- B. Authentication → Authorization → Audit
- C. Add → Append → Apply

**16. Saat refactor `tabungan.service.ts` (Modul 4), pendekatan yang **paling efektif** memakai Cursor IDE adalah …**
- A. Hapus semua kode lama lalu minta AI bikin ulang dari nol
- B. Highlight kode lalu Cmd+K untuk minta refactor spesifik (mis. "extract function", "fix SRP violation")
- C. Copy kode ke ChatGPT browser, paste hasilnya kembali

---

## BAGIAN E — Git Flow & Docker (Soal 17–20)

**17. Saat ada bug urgent di production (saldo bisa jadi negatif), branch yang harus dibuat adalah …**
- A. `feature/fix-saldo-negatif` dari `develop`
- B. `hotfix/saldo-negatif` dari `main` (lalu merge balik ke `main` dan `develop`)
- C. Langsung commit ke `main` tanpa branch

**18. Format **Conventional Commit** yang benar untuk perubahan menambahkan endpoint setor adalah …**
- A. `update some files`
- B. `add setor endpoint to tabungan`
- C. `feat(tabungan): tambah endpoint setor via QRIS`

**19. Dalam Dockerfile, alasan utama memakai **multi-stage build** adalah …**
- A. Supaya image final lebih kecil karena hanya bawa hasil build, tidak bawa devDependencies & source code
- B. Supaya image build lebih lama dan teliti
- C. Supaya Dockerfile lebih panjang dan terlihat profesional

**20. Di `docker-compose.yml` untuk stack Tabungan Haji (API + Web + PostgreSQL), cara API mengakses database adalah dengan menulis hostname …**
- A. `localhost` (karena semua jalan di satu mesin)
- B. `127.0.0.1` (loopback)
- C. `postgres` (nama service di compose — auto-resolve via Docker network)

---

## Penilaian

| Bagian | Topik | Jumlah Soal | Poin |
| ------ | ----- | ----------- | ---- |
| A | SDLC, Scrum, Cursor IDE & Prompt Engineering (Modul 1) | 4 | 20 |
| B | RESTful API & PostgreSQL (Modul 2)                     | 4 | 20 |
| C | React/Next.js (Modul 3)                                | 4 | 20 |
| D | SOLID, Clean Code & Testing (Modul 4)                  | 4 | 20 |
| E | Git Flow & Docker (Modul 5)                            | 4 | 20 |
| **TOTAL** | | **20** | **100** |

**Interpretasi skor:**
- 0 – 50   : **Perlu pendampingan lanjutan** — review materi inti, ulang lab modul yang lemah
- 51 – 75  : **Cukup baik** — bisa lanjut ke project mandiri dengan supervisi
- 76 – 90  : **Baik** — siap kontribusi di tim pengembangan BSI
- 91 – 100 : **Sangat baik** — kandidat peer mentor / lead developer junior

**Perbandingan dengan Pretest** (evaluasi efektivitas pelatihan):
- Selisih < 20 poin: pelatihan kurang efektif untuk peserta ini — perlu sesi remedial.
- Selisih 20–40 poin: peningkatan baik, sesuai ekspektasi pelatihan 5 hari.
- Selisih > 40 poin: peningkatan luar biasa — peserta menyerap materi sangat baik.

---

## Kunci Jawaban (Halaman Instruktur — sembunyikan untuk peserta)

<details>
<summary>Klik untuk membuka kunci jawaban</summary>

### Bagian A — SDLC, Scrum, Cursor IDE & Prompt Engineering
| No | Jwb | No | Jwb |
| -- | --- | -- | --- |
| 1  | **A** | 3  | **A** |
| 2  | **C** | 4  | **B** |

### Bagian B — RESTful API & PostgreSQL
| No | Jwb | No | Jwb |
| -- | --- | -- | --- |
| 5  | **A** | 7  | **B** |
| 6  | **B** | 8  | **C** |

### Bagian C — React/Next.js
| No | Jwb | No | Jwb |
| -- | --- | -- | --- |
| 9  | **B** | 11 | **A** |
| 10 | **C** | 12 | **A** |

### Bagian D — SOLID, Clean Code & Testing
| No | Jwb | No | Jwb |
| -- | --- | -- | --- |
| 13 | **B** | 15 | **A** |
| 14 | **C** | 16 | **B** |

### Bagian E — Git Flow & Docker
| No | Jwb | No | Jwb |
| -- | --- | -- | --- |
| 17 | **B** | 19 | **A** |
| 18 | **C** | 20 | **C** |

### Distribusi jawaban
- A = 7 soal · B = 7 soal · C = 6 soal

</details>
