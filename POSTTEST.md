# POSTTEST – ODP BSI IT Development (Fase 1)

**Durasi**: 30 menit
**Total Soal**: 20 Pilihan Ganda
**Bobot**: 5 poin per soal (Total 100)
**Tujuan**: Mengukur penguasaan peserta setelah mengikuti 5 modul pelatihan (H1–H5).

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

**2. Dalam Scrum, akuntabilitas **Scrum Master** berfungsi sebagai …**
- A. Pengambil keputusan teknis paling akhir
- B. Servant-leader yang membantu tim menjalankan Scrum efektif, menghilangkan impediment, dan coaching
- C. Pengganti project manager yang memberi perintah ke developer

**3. Fitur yang **wajib diaktifkan** di Cursor IDE supaya kode tidak ke-collect untuk training AI adalah …**
- A. Privacy Mode
- B. Composer Mode
- C. Tab Autocomplete

**4. Pola prompt **RCTF** yang dipelajari di Modul 1 adalah singkatan dari …**
- A. Refactor, Compile, Test, Format
- B. Role, Context, Task, Format
- C. React, Components, Tailwind, Functions

---

## BAGIAN B — RESTful API & PostgreSQL (Soal 5–8)

**5. Untuk operasi **create resource baru** di REST API, kombinasi HTTP method dan format URL yang paling tepat adalah …**
- A. `POST /api/v1/users`
- B. `GET /api/v1/createUser?nama=...`
- C. `POST /api/v1/createUser`

**6. Pola **idempotency** dalam REST API penting karena …**
- A. Supaya endpoint bisa di-cache di browser
- B. Supaya request yang di-retry (karena timeout/jaringan) tidak menghasilkan efek samping ganda
- C. Supaya client bisa melakukan request sebanyak mungkin tanpa limit

**7. Untuk menyimpan **nilai uang** (dalam satuan Rupiah penuh) di PostgreSQL, tipe data yang paling tepat adalah …**
- A. `FLOAT` atau `DOUBLE` karena bisa menyimpan desimal
- B. `BIGINT` atau `NUMERIC` karena presisi akurat (tidak ada error pembulatan)
- C. `VARCHAR` karena bisa disimpan dengan format "Rp 1.000.000"

**8. Saat memproses operasi yang melibatkan **update beberapa tabel sekaligus** (mis. update saldo + insert transaksi + insert audit log), keseluruhan operasi harus dibungkus dalam …**
- A. Multiple `try/catch` terpisah agar bisa partial success
- B. Single function tanpa proteksi khusus
- C. Database transaction agar atomik — semua atau tidak sama sekali

---

## BAGIAN C — React/Next.js (Soal 9–12)

**9. Di Next.js dengan **App Router**, file yang merepresentasikan halaman di route `/produk` adalah …**
- A. `pages/produk.js`
- B. `app/produk/page.tsx`
- C. `routes/produk.tsx`

**10. Untuk membuat component yang memakai `useState` dan event handler `onClick`, di Next.js App Router perlu menambahkan directive …**
- A. `"use server"` di atas file
- B. `"use strict"` di atas file
- C. `"use client"` di atas file

**11. Library yang dipakai di Modul 3 untuk **caching, refetch otomatis, dan mutation** API dari React adalah …**
- A. TanStack Query (React Query)
- B. Lodash
- C. Redux Saga

**12. Untuk **format angka konsisten** sesuai locale Indonesia (mis. 5000000 → "5.000.000"), pendekatan yang paling tepat adalah …**
- A. Pakai `Intl.NumberFormat("id-ID", ...)` sebagai helper bersama
- B. Concat string manual dengan pemisah titik di tiap 3 digit
- C. Pakai `toFixed(2)` lalu tambahkan separator manual

---

## BAGIAN D — SOLID, Clean Code & Testing (Soal 13–16)

**13. Prinsip **Single Responsibility (SRP)** menyatakan bahwa …**
- A. Function harus selalu return single value
- B. Class harus punya satu alasan untuk berubah (satu tanggung jawab)
- C. Project hanya boleh punya satu repository

**14. Manakah dari berikut yang termasuk **code smell** yang perlu di-refactor?**
- A. Function dengan nama deskriptif yang panjang seperti `hitungBagiHasilBulanan`
- B. Pemakaian konstanta seperti `const MIN_NOMINAL = 100_000`
- C. Magic number di kode seperti `if (nominal < 100000) { ... }` tanpa konstanta dengan nama

**15. Pattern AAA dalam unit test adalah …**
- A. Arrange → Act → Assert
- B. Authentication → Authorization → Audit
- C. Add → Append → Apply

**16. Saat melakukan refactor kode existing, pendekatan yang **paling efektif** memakai Cursor IDE adalah …**
- A. Hapus semua kode lama lalu minta AI bikin ulang dari nol
- B. Highlight kode lalu Cmd+K untuk minta refactor spesifik (mis. "extract function", "fix SRP violation")
- C. Copy kode ke ChatGPT browser, paste hasilnya kembali

---

## BAGIAN E — Git Flow & Docker (Soal 17–20)

**17. Saat ada **bug urgent di production**, branch yang harus dibuat menurut Git Flow adalah …**
- A. `feature/*` dari `develop`
- B. `hotfix/*` dari `main` (lalu merge balik ke `main` dan `develop`)
- C. Langsung commit ke `main` tanpa branch

**18. Format **Conventional Commit** yang benar untuk perubahan menambahkan fitur baru adalah …**
- A. `update some files`
- B. `add new feature`
- C. `feat(modul): tambah fitur X untuk Y`

**19. Dalam Dockerfile, alasan utama memakai **multi-stage build** adalah …**
- A. Supaya image final lebih kecil karena hanya bawa hasil build, tidak bawa devDependencies & source code
- B. Supaya image build lebih lama dan teliti
- C. Supaya Dockerfile lebih panjang dan terlihat profesional

**20. Di `docker-compose.yml` dengan beberapa service (mis. `api`, `web`, `postgres`), cara service `api` mengakses `postgres` adalah dengan menulis hostname …**
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
- 76 – 90  : **Baik** — siap kontribusi di tim pengembangan
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
| 2  | **B** | 4  | **B** |

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
