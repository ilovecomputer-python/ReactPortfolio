# React + Vite Portfolio

Project ini telah dikembangkan dengan Vite + React + TypeScript dan dilengkapi dengan dua bonus yang diminta.

 Bonus 1 — Custom Hook

Aplikasi ini menggunakan custom hook generik `useLocalStorage<T>` yang berada di [src/hooks/useLocalStorage.ts](src/hooks/useLocalStorage.ts). Hook ini menyimpan nilai ke `localStorage` dan memberi akses typed state yang aman. Alasan penggunaannya adalah untuk menjaga data navigasi seperti halaman terakhir yang dikunjungi tetap konsisten saat halaman direload tanpa perlu menulis ulang logika storage di banyak komponen.

Bonus 2 — TailwindCSS Integration

Styling seluruh halaman telah dipindahkan dari file CSS klasik ke utility class Tailwind. Migrasi ini dilakukan karena Tailwind memungkinkan styling yang lebih cepat, konsisten, dan mudah dipelihara, terutama saat antarmuka berbasis komponen seperti portfolio ini terus berkembang. Tailwind juga mempermudah pembuatan layout responsif tanpa harus menulis banyak kelas custom di file CSS.

