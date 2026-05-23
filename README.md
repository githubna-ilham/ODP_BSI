# ODP BSI — IT Development Program (Fase 1)

Materi pelatihan **Officer Development Program — Fase 1 IT Development** Bank Syariah Indonesia. Roadmap 5 hari dari konsep dasar SDLC sampai aplikasi production-ready yang ter-dockerize.

---

## Roadmap 5 Hari

| Hari | Modul | Topik | AI Tool |
|---|---|---|---|
| H1 | [Modul 1](./Modul-1-SDLC-Scrum/materi.md) | **SDLC, Agile & Setup Cursor IDE + Prompt Engineering** | Cursor IDE |
| H2 | [Modul 2](./Modul-2-RESTful-API-PostgreSQL/materi.md) | **RESTful API & Database Modeling (PostgreSQL)** | Cursor IDE — auto-generate endpoint |
| H3 | [Modul 3](./Modul-3-React-NextJS/materi.md) | **React/Next.js & Integrasi API** | Claude Sonnet — asistensi UI Component |
| H4 | [Modul 4](./Modul-4-SOLID-Clean-Code-Testing/materi.md) | **Prinsip SOLID & Clean Code + Automated Unit Testing** | Cursor IDE — refactoring kode |
| H5 | [Modul 5](./Modul-5-Git-Docker/materi.md) | **Git Flow & Dockerizing Apps** | — |

---

## Capstone Project

Sepanjang 5 hari, peserta membangun aplikasi **Tabungan Haji BSI Mini** end-to-end:

```
H1: Design (SDLC + Scrum planning)
       ↓
H2: Backend REST API + PostgreSQL
       ↓
H3: Frontend Next.js + integrasi API
       ↓
H4: Refactor SOLID + automated test (coverage 80%+)
       ↓
H5: Git Flow + Dockerize → siap deploy
```

Hasil akhir: aplikasi web Tabungan Haji yang bisa daftar nasabah, buka rekening, setor saldo, lihat mutasi — dengan kualitas production-ready.

---

## Audience & Prerequisite

- **Audiens**: peserta ODP IT track BSI (calon staff IT) + officer non-IT yang akan berinteraksi dengan tim pengembangan.
- **Prerequisite**: pemahaman dasar JavaScript / TypeScript membantu, tapi materi disusun progresif dari fondasi.
- **Hardware**: laptop dengan minimal 8GB RAM, akses internet, browser modern.
- **Software**: Node.js 20+, Docker Desktop, Cursor IDE, akun GitHub.

---

## Struktur File per Modul

Tiap modul punya format konsisten:

```
Modul-X-Topik/
└── materi.md          ← bahasan utama (~600-800 baris)
```

Materi mengikuti pola:
1. Pengantar + studi kasus berkelanjutan (Tabungan Haji)
2. Konsep dasar
3. Implementasi praktis
4. Studi kasus (tabungan-haji)
5. Penutup + checklist + roadmap navigasi

---

## Konvensi

- **Studi kasus konsisten**: Tabungan Haji BSI dipakai sepanjang 5 modul.
- **Bahasa**: Indonesia (campur istilah teknis Inggris).
- **Diagram**: Mermaid (render otomatis di GitHub).
- **Konteks BSI**: regulasi OJK Syariah, prinsip syariah, audit trail mandatory.
