# AI Prompt Iterations — QA Documentation

Dokumentasi ini mencatat iterasi prompt yang digunakan selama pengembangan
fitur **ProjectsPage** (halaman projek dengan filter dan carousel) pada
website portfolio React + TypeScript ini, beserta analisis QA tentang mengapa
revisi tertentu menghasilkan output yang lebih baik.

---

## Iteration 1 — Prompt Awal (Terlalu Umum)

**Prompt:**

> "Create a projects page for my React website."

**Output yang dihasilkan:**
Halaman statis sederhana dengan daftar projek dalam layout satu kolom, tanpa
filter, tanpa interaksi, dan styling generik yang tidak konsisten dengan
design system website (warna teal `#0f766e`, kartu rounded, font yang sudah ada).

**Masalah:**
- Tidak menyebutkan struktur layout yang diinginkan (grid? list? carousel?)
- Tidak menyebutkan fitur (filter, link detail)
- Tidak memberi konteks tech stack (TypeScript, komponen yang sudah ada)
- AI harus menebak terlalu banyak, sehingga hasilnya "aman tapi membosankan"

**Pelajaran:** Prompt tanpa spesifikasi layout dan fitur menghasilkan output
generik. AI mengisi kekosongan dengan asumsi default.

---

## Iteration 2 — Menambahkan Peran, Konteks Stack, dan Fitur Spesifik

**Prompt:**

> "Imagine you are a senior React developer, I have a TypeScript React
> website, please create a ProjectsPage component with a grid layout and
> filters and integrate it with my TypeScript React website. Make it
> carousel model and keep it the 'Lihat Detail' that connect to project links."

**Output yang dihasilkan:**
- `ProjectsPage.tsx` dengan filter kategori (Semua / Web / Game)
- Carousel satu slide per tampilan dengan tombol panah dan dot navigation
- Tipe `Project` diperluas dengan field `category`
- Tombol "Lihat Detail" tetap terhubung ke link repositori GitHub
- Styling mengikuti token desain yang sudah ada di `App.css`

**Mengapa lebih baik:**
1. **Role prompting** ("senior React developer") mendorong output yang
   mengikuti best practice: pemisahan komponen, tipe TypeScript yang benar,
   aksesibilitas (aria-label, role tablist).
2. **Konteks stack** ("TypeScript React website") memastikan AI membaca
   kode yang sudah ada dan mengintegrasikan, bukan membuat dari nol.
3. **Fitur eksplisit** ("filters", "carousel", "Lihat Detail") menghilangkan
   ambiguitas tentang apa yang harus dibangun.
4. **Constraint preservasi** ("keep the 'Lihat Detail'") mencegah AI
   menghapus fungsionalitas yang sudah ada — constraint negatif/preservasi
   sama pentingnya dengan permintaan fitur baru.

**Kelemahan yang tersisa:** "Carousel model" masih ambigu — ada banyak jenis
carousel. AI memilih model satu-slide-penuh, yang secara visual kurang menarik.

---

## Iteration 3 — Menambahkan Referensi Visual (Screenshot)

**Prompt:**

> "Imagine you are a senior React developer and want to fix the project
> component to this kind of carousel model" + **[lampiran screenshot
> landing page BrandLyft dengan carousel filmstrip]**

**Output yang dihasilkan:**
- Carousel berubah menjadi model **filmstrip**: kartu potret tinggi dengan
  sudut membulat besar, berjajar rapat, beberapa kartu terlihat sekaligus
- Kartu menjadi image-forward: gambar cover, badge kategori, teks dan tombol
  overlay di atas gradient gelap
- Gambar cover projek dibuat khusus agar kartu tidak kosong

**Mengapa lebih baik:**
1. **Referensi visual mengalahkan deskripsi verbal.** Kata "carousel" pada
   Iteration 2 bisa berarti puluhan model berbeda. Satu screenshot langsung
   mengunci: orientasi kartu (potret), kepadatan (rapat), radius sudut,
   dan proporsi.
2. AI dapat mengekstrak detail implisit dari gambar (kartu terpotong di
   tepi viewport, rasio aspek 3:4, jarak antar kartu) yang hampir mustahil
   dideskripsikan lengkap dengan teks.
3. Frasa "fix it to this kind of model" memperjelas bahwa ini **revisi**,
   bukan pembuatan ulang — filter dan "Lihat Detail" dipertahankan tanpa
   perlu diminta ulang.

**Pelajaran:** Untuk permintaan desain UI, lampirkan gambar referensi.
Ini adalah peningkatan kualitas output terbesar dalam seluruh iterasi.

---

## Iteration 4 — Iterasi Desain dengan Referensi Baru

**Prompt:**

> "What if I want to make it to this kind of model" + **[lampiran
> screenshot carousel coverflow bertema bunga: kartu aktif besar di tengah,
> kartu tetangga kecil dan redup di sisi, counter '06/12', dash pagination]**

**Output yang dihasilkan:**
- Carousel **coverflow**: slide aktif membesar di tengah (scale 1.0),
  tetangga mengecil (scale 0.78), redup (opacity 0.55) dan desaturasi
- Counter "01/02" dengan padding nol di kanan atas
- Pagination berubah dari dot bulat menjadi dash (strip pendek)
- Kartu samping bisa diklik untuk langsung fokus
- Logika wrap-around agar navigasi melingkar dengan jarak terpendek

**Mengapa lebih baik:**
1. **Prompt singkat bekerja jika konteks sudah terbangun.** "What if I want
   this kind of model" hanya 10 kata, tetapi karena percakapan sebelumnya
   sudah menetapkan komponen, data, dan constraint, AI hanya perlu mengubah
   satu dimensi: model carousel-nya.
2. Screenshot kedua kembali menyampaikan detail non-verbal: hierarki
   z-index, format counter dengan angka tebal, bentuk pagination dash —
   semuanya direplikasi tanpa diminta secara eksplisit.
3. **Iterasi bertahap lebih baik daripada satu prompt raksasa.** Memecah
   grid → carousel → filmstrip → coverflow menjadi beberapa giliran membuat
   setiap perubahan mudah diverifikasi dan mudah di-rollback.

---

## Iteration 5 — Prompt QA / Dokumentasi (Meta-Prompt)

**Prompt:**

> "Now you are the quality assurance team, and I want you to create an
> ai-prompts.md file documenting at least 5 prompt iterations and an
> analysis of why certain revisions produced better output."

**Output yang dihasilkan:** Dokumen ini.

**Mengapa efektif:**
1. **Pergantian peran eksplisit** ("now you are the QA team") mengubah mode
   output dari menulis kode menjadi menulis analisis.
2. **Kriteria keberhasilan terukur** ("at least 5 prompt iterations",
   "analysis of why") memberi struktur dokumen yang jelas dan bisa
   diverifikasi.
3. **Format output disebutkan** ("ai-prompts.md file") menghilangkan
   keraguan apakah jawaban berupa file, chat, atau komentar kode.

---

## Ringkasan Analisis QA

| # | Teknik Prompt | Dampak pada Kualitas Output |
|---|---------------|------------------------------|
| 1 | Prompt umum tanpa spesifikasi | Output generik, tidak terintegrasi |
| 2 | Role + konteks stack + fitur eksplisit + constraint preservasi | Fungsional dan terintegrasi, tapi desain masih ambigu |
| 3 | Referensi visual (screenshot) | Lompatan kualitas terbesar; detail desain terkunci |
| 4 | Iterasi singkat di atas konteks yang sudah ada | Perubahan presisi dengan effort prompt minimal |
| 5 | Meta-prompt dengan peran, kriteria, dan format output | Dokumentasi terstruktur dan dapat diverifikasi |

### Temuan Utama

1. **Spesifisitas berbanding lurus dengan kualitas.** Setiap detail yang
   tidak disebutkan akan diisi AI dengan asumsi default.
2. **Gambar > kata-kata untuk desain UI.** Screenshot referensi menghasilkan
   replikasi yang jauh lebih akurat daripada deskripsi verbal terpanjang
   sekalipun.
3. **Constraint preservasi wajib disebut.** "Keep the 'Lihat Detail'"
   mencegah regresi fungsionalitas saat desain dirombak.
4. **Konteks percakapan adalah aset.** Setelah konteks terbangun, prompt
   lanjutan bisa sangat singkat namun tetap presisi.
5. **Verifikasi tiap iterasi.** Setiap revisi diuji langsung di browser
   (filter, navigasi panah, klik kartu samping) sebelum dianggap selesai —
   praktik QA yang mencegah bug menumpuk antar iterasi.
