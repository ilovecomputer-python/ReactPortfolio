# AI Prompt Iterations — QA Documentation (CRISPE Framework)

Dokumentasi ini mencatat iterasi prompt yang digunakan selama pengembangan
fitur **ProjectsPage** (halaman projek dengan filter dan carousel) pada
website portfolio React + TypeScript ini. Setiap prompt dianalisis
menggunakan framework **CRISPE**:

| Elemen | Arti |
|---|---|
| **C**ontext | Deskripsi codebase dan tech stack |
| **R**ole | Persona yang diberikan ke AI ("You are a senior React developer...") |
| **I**nstruction | Tugas spesifik yang harus dikerjakan |
| **S**cope | Batasan dan constraint |
| **P**recision | Format output yang diinginkan |
| **E**xample | Contoh/referensi jika diperlukan |

**Contoh prompt buruk:** "Make a login form"

**Contoh prompt baik:** "You are a senior React developer. I have a
TypeScript React app using TailwindCSS and Zod for validation. Create a
login form component that: accepts email and password, validates with Zod
(email format, password min 8 chars), shows inline error messages, calls
`onSubmit(data: LoginFormData)` prop on valid submit, and is fully
accessible with proper ARIA labels."

---

## Iteration 1 — Prompt Awal (Terlalu Umum)

**Prompt asli:**

> "Create a projects page for my React website."

### Analisis CRISPE

| Elemen | Ada? | Isi |
|---|---|---|
| Context | Sebagian | Hanya "React website" — tanpa TypeScript, struktur folder, atau design system |
| Role | Tidak ada | — |
| Instruction | Terlalu umum | "Create a projects page" — tanpa layout atau fitur |
| Scope | Tidak ada | Tidak ada batasan; AI bebas menghapus/mengubah apa pun |
| Precision | Tidak ada | Tidak jelas: satu file? banyak komponen? styling apa? |
| Example | Tidak ada | — |

**Output yang dihasilkan:**
Halaman statis satu kolom, tanpa filter, tanpa interaksi, dengan styling
generik yang tidak konsisten dengan design system website (teal `#0f766e`,
kartu rounded, font yang sudah ada).

**Pelajaran:** Dengan 5 dari 6 elemen CRISPE kosong, AI mengisi kekosongan
dengan asumsi default — hasilnya "aman tapi membosankan".

### Versi CRISPE yang lebih baik

> **[Context]** I have a TypeScript React (Vite) portfolio website with plain
> CSS in `App.css`, a teal `#0f766e` design system, and existing pages in
> `src/pages/`. **[Role]** You are a senior React developer. **[Instruction]**
> Create a `ProjectsPage` component that lists my projects. **[Scope]** Reuse
> the existing `ProjectCard` component and design tokens; do not add new
> dependencies. **[Precision]** One `ProjectsPage.tsx` file in `src/pages/`,
> typed with a `Project` interface. **[Example]** Follow the layout style of
> the existing `AboutPage.tsx`.

---

## Iteration 2 — Role + Context + Fitur Spesifik

**Prompt asli:**

> "Imagine you are a senior React developer, I have a TypeScript React
> website, please create a ProjectsPage component with a grid layout and
> filters and integrate it with my TypeScript React website. Make it
> carousel model and keep it the 'Lihat Detail' that connect to project links."

### Analisis CRISPE

| Elemen | Ada? | Isi |
|---|---|---|
| Context | Ada | "TypeScript React website" |
| Role | Ada | "senior React developer" |
| Instruction | Ada | Buat `ProjectsPage` dengan grid, filter, carousel, lalu integrasikan |
| Scope | Ada | "keep the 'Lihat Detail' that connect to project links" — constraint preservasi |
| Precision | Sebagian | Nama komponen jelas (`ProjectsPage`), tapi "carousel model" ambigu |
| Example | Tidak ada | — |

**Output yang dihasilkan:**
- `ProjectsPage.tsx` dengan filter kategori (Semua / Web / Game)
- Carousel satu slide per tampilan dengan panah dan dot navigation
- Tipe `Project` diperluas dengan field `category`
- "Lihat Detail" tetap terhubung ke repositori GitHub
- Styling mengikuti token desain di `App.css`

**Mengapa lebih baik dari Iteration 1:**
1. **Role** mendorong best practice: pemisahan komponen, tipe TypeScript
   benar, aksesibilitas (aria-label, role tablist).
2. **Context** memastikan AI membaca kode yang ada dan mengintegrasikan,
   bukan membuat dari nol.
3. **Scope (constraint preservasi)** mencegah AI menghapus fungsionalitas
   yang sudah ada.

**Kelemahan tersisa:** Elemen **Example** kosong dan **Precision** lemah —
"carousel model" bisa berarti puluhan jenis carousel, sehingga AI memilih
model satu-slide-penuh yang kurang menarik secara visual.

### Versi CRISPE yang lebih baik

> **[Context]** My TypeScript React portfolio has a `ProjectCard` component
> and an `App.css` design system (teal primary, rounded cards).
> **[Role]** You are a senior React developer. **[Instruction]** Build a
> `ProjectsPage` with category filter chips and a carousel that shows one
> project at a time with prev/next arrows and dot pagination. **[Scope]**
> Keep the existing "Lihat Detail" links to each GitHub repo; no new
> libraries. **[Precision]** Extend the `Project` interface with a
> `category: string` field; filters must reset the carousel to slide 1.
> **[Example]** Filter chips like GitHub's topic pills; carousel like a
> standard single-slide hero slider.

---

## Iteration 3 — Menambahkan Example Visual (Screenshot)

**Prompt asli:**

> "Imagine you are a senior React developer and want to fix the project
> component to this kind of carousel model" + **[screenshot landing page
> BrandLyft dengan carousel filmstrip]**

### Analisis CRISPE

| Elemen | Ada? | Isi |
|---|---|---|
| Context | Implisit | Terbangun dari percakapan sebelumnya (komponen dan file sudah dikenal) |
| Role | Ada | "senior React developer" |
| Instruction | Ada | "fix the project component to this kind of carousel model" |
| Scope | Implisit | "fix" menandakan revisi, bukan rebuild — filter & "Lihat Detail" dipertahankan |
| Precision | Via gambar | Orientasi potret, sudut membulat, kartu berjajar rapat |
| Example | **Ada (kunci!)** | Screenshot referensi BrandLyft |

**Output yang dihasilkan:**
- Carousel **filmstrip**: kartu potret tinggi, sudut membulat besar,
  beberapa kartu terlihat sekaligus
- Kartu image-forward: cover, badge kategori, teks + tombol overlay di atas
  gradient gelap
- Gambar cover projek dibuat khusus

**Mengapa lebih baik dari Iteration 2:**
1. **Elemen Example (visual) adalah lompatan kualitas terbesar.** Kata
   "carousel" ambigu; satu screenshot langsung mengunci orientasi kartu,
   kepadatan, radius sudut, dan proporsi (rasio 3:4).
2. AI mengekstrak detail implisit dari gambar (kartu terpotong di tepi
   viewport, jarak antar kartu) yang hampir mustahil dideskripsikan teks.
3. Kata "fix" pada **Instruction** memperjelas ini revisi — **Scope**
   preservasi terbawa otomatis tanpa diulang.

**Pelajaran:** Untuk permintaan desain UI, elemen **E**xample berupa gambar
referensi jauh lebih efektif daripada deskripsi verbal terpanjang sekalipun.

---

## Iteration 4 — Iterasi Singkat di Atas Konteks yang Terbangun

**Prompt asli:**

> "What if I want to make it to this kind of model" + **[screenshot carousel
> coverflow: kartu aktif besar di tengah, tetangga kecil dan redup,
> counter '06/12', dash pagination]**

### Analisis CRISPE

| Elemen | Ada? | Isi |
|---|---|---|
| Context | Implisit penuh | Seluruh komponen, data, dan styling sudah ada dalam percakapan |
| Role | Terbawa | Persona "senior React developer" dari giliran sebelumnya |
| Instruction | Ada | Ubah carousel ke model pada gambar |
| Scope | Implisit | Hanya model carousel yang berubah; fitur lain tetap |
| Precision | Via gambar | Scale kartu aktif vs tetangga, format counter, bentuk pagination |
| Example | Ada | Screenshot coverflow |

**Output yang dihasilkan:**
- Carousel **coverflow**: slide aktif scale 1.0 di tengah; tetangga scale
  0.78, opacity 0.55, desaturasi
- Counter "01/02" dengan zero-padding di kanan atas
- Pagination dash menggantikan dot
- Kartu samping dapat diklik; navigasi wrap-around jarak terpendek

**Mengapa efektif meski sangat singkat:**
1. **Prompt 10 kata cukup karena Context sudah terakumulasi.** Dalam
   percakapan berkelanjutan, elemen C, R, dan S tidak perlu diulang —
   cukup I (instruksi baru) dan E (referensi baru).
2. Screenshot kedua kembali menyampaikan detail non-verbal: hierarki
   z-index, angka counter tebal, dash pagination — direplikasi tanpa
   diminta eksplisit.
3. **Iterasi bertahap lebih baik daripada satu prompt raksasa.** Grid →
   carousel → filmstrip → coverflow dalam beberapa giliran membuat setiap
   perubahan mudah diverifikasi dan di-rollback.

---

## Iteration 5 — Meta-Prompt QA / Dokumentasi

**Prompt asli:**

> "Now you are the quality assurance team, and I want you to create an
> ai-prompts.md file documenting at least 5 prompt iterations and an
> analysis of why certain revisions produced better output."

### Analisis CRISPE

| Elemen | Ada? | Isi |
|---|---|---|
| Context | Implisit | Riwayat seluruh iterasi prompt ada di percakapan |
| Role | Ada | "you are the quality assurance team" — mengubah mode dari koding ke analisis |
| Instruction | Ada | Buat dokumentasi iterasi prompt beserta analisis |
| Scope | Ada | "at least 5 prompt iterations" — kriteria minimum terukur |
| Precision | Ada | "an ai-prompts.md file" — format output eksplisit (file Markdown) |
| Example | Tidak perlu | Struktur dokumen analisis sudah umum dipahami |

**Output yang dihasilkan:** Dokumen ini (lalu direvisi ke format CRISPE
pada iterasi berikutnya).

**Mengapa efektif:**
1. **Role switch eksplisit** mengubah mode output dari menulis kode menjadi
   menulis analisis QA.
2. **Scope terukur** ("at least 5") membuat hasil dapat diverifikasi.
3. **Precision** ("ai-prompts.md file") menghilangkan keraguan apakah
   jawaban berupa file, chat, atau komentar kode.

**Catatan revisi:** Prompt lanjutan "adjust the ai prompt md with the style
of CRISPE framework each prompt" menambahkan elemen **Example** (definisi
CRISPE + contoh prompt buruk/baik) — dan menghasilkan restrukturisasi
dokumen yang jauh lebih presisi karena format targetnya kini eksplisit.

---

## Ringkasan Analisis QA

| # | Elemen CRISPE yang terisi | Dampak pada Kualitas Output |
|---|---------------------------|------------------------------|
| 1 | C (sebagian) | Output generik, tidak terintegrasi |
| 2 | C, R, I, S | Fungsional dan terintegrasi, tapi desain ambigu (P lemah, E kosong) |
| 3 | C, R, I, S, P, **E (visual)** | Lompatan kualitas terbesar; detail desain terkunci |
| 4 | I, E baru; C, R, S terbawa konteks | Perubahan presisi dengan effort prompt minimal |
| 5 | R, I, S, P | Dokumentasi terstruktur dan dapat diverifikasi |

### Temuan Utama

1. **Semakin banyak elemen CRISPE terisi, semakin baik output.** Setiap
   elemen kosong akan diisi AI dengan asumsi default.
2. **Example visual > deskripsi verbal untuk desain UI.** Screenshot
   referensi (Iteration 3 & 4) adalah elemen CRISPE dengan dampak terbesar
   dalam proyek ini.
3. **Scope (constraint preservasi) wajib disebut.** "Keep the 'Lihat
   Detail'" mencegah regresi fungsionalitas saat desain dirombak.
4. **Context terakumulasi dalam percakapan.** Setelah C, R, dan S
   terbangun, prompt lanjutan cukup berisi I dan E yang baru.
5. **Verifikasi tiap iterasi.** Setiap revisi diuji langsung di browser
   (filter, navigasi panah, klik kartu samping) sebelum dianggap selesai —
   praktik QA yang mencegah bug menumpuk antar iterasi.
