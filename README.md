# PustakaKu : Katalog Buku Mini

Tugas Akhir Praktikum PPB 2026 (PWA). Aplikasi katalog buku sederhana yang mengambil data dari REST API buatan sendiri (Modul 1: Express + Supabase).

- Nama: Dafa Briangga Agdyananta
- NIM: 21120124140112
- Platform: Progressive Web App (React + Vite)

## Pemenuhan ketentuan

| Ketentuan | Di aplikasi ini |
| --- | --- |
| API sendiri (Modul 1) | `products` dipakai sebagai buku, `categories` sebagai kategori |
| Bottom Navigation Bar | `src/components/BottomNav.jsx` (Home, Buku, Kategori, Profile) |
| Minimal 5 halaman | 6 halaman: Home, Daftar Buku, Detail Buku, Daftar Kategori, Detail Kategori, Profile |
| 2 halaman list yang bisa diklik ke detail | Daftar Buku → Detail Buku, Daftar Kategori → Detail Kategori |
| Halaman Profile/About | `src/pages/Profile.jsx` |
| GitHub + free hosting (PWA) | Push ke GitHub, deploy ke Vercel (lihat bagian Deploy) |

## Langkah 1: siapkan API (Modul 1)

### a. Tambahkan CORS (WAJIB)

API Modul 1 belum memakai CORS, jadi browser akan memblokir request dari aplikasi ini. Di folder project API:

```bash
npm install cors
```

Lalu di `src/index.js` API:

```js
import cors from "cors";
// ...
app.use(cors());          // taruh SEBELUM app.use(express.json()) dan semua route
app.use(express.json());
```

Commit dan push, tunggu Vercel selesai deploy ulang API-nya.

### b. Isi data buku (opsional tapi disarankan)

Buka Supabase → SQL Editor → New query, tempel isi `docs/seed.sql`, lalu Run (cukup sekali). Isinya 5 kategori dan 11 buku contoh. Kalau data di tabelmu sudah ada, langkah ini boleh dilewati.

### c. Tampilkan penulis dan sampul (opsional)

`seed.sql` menambah kolom `author` dan `cover_url`. Supaya muncul di aplikasi, ubah dua baris di `src/models/productModel.js` API:

```js
// getAll: ganti select yang panjang menjadi
.select("*");

// getById: ganti menjadi
.select("*, categories ( id, name )")
```

Kalau langkah ini dilewati, aplikasi tetap jalan, hanya tanpa penulis dan sampul bergambar.

## Langkah 2: jalankan di lokal

```bash
npm install
cp .env.example .env     # lalu isi VITE_API_URL dengan URL API-mu (tanpa / di akhir)
npm run dev
```

`VITE_API_URL` cukup URL dasar, misalnya `https://api-saya.vercel.app`. Aplikasi sendiri menambahkan `/api/products` dan `/api/categories`.

Build produksi:

```bash
npm run build
npm run preview
```

## Langkah 3: deploy (wajib untuk PWA)

1. Push project ke GitHub (`.env` sudah ada di `.gitignore`, jadi aman).
2. Buka vercel.com → Add New → Project → import repository ini.
3. Preset otomatis terdeteksi sebagai Vite. Di **Environment Variables** tambahkan `VITE_API_URL` berisi URL API-mu.
4. Deploy. `vercel.json` sudah mengatur agar refresh di halaman seperti `/buku/123` tidak 404.
5. Buka link hasil deploy di HP (Chrome) → menu → "Install app" / "Tambahkan ke layar utama".

Kalau `VITE_API_URL` diubah, lakukan Redeploy karena nilainya dibaca saat build.

## Struktur folder

```
src/
  services/api.js      semua pemanggilan API (ubah di sini kalau API berubah)
  hooks/useFetch.js    hook untuk loading / error / data
  components/          BottomNav, BookCard, CategoryCard, PageHeader, States
  pages/               Home, Books, BookDetail, Categories, CategoryDetail, Profile
  utils/format.js      format rupiah dan warna sampul
  App.jsx              daftar route
vite.config.js         konfigurasi Tailwind dan PWA (manifest + service worker)
docs/seed.sql          data contoh
```

## Alur data (untuk responsi)

1. Halaman memanggil `useFetch(() => getBooks())`.
2. `getBooks()` di `services/api.js` melakukan `fetch` ke `VITE_API_URL/api/products`.
3. API Express membaca tabel `products` di Supabase dan mengembalikan JSON.
4. Hook menyimpan hasilnya, halaman menampilkan `Loading`, `ErrorState` (ada tombol coba lagi), atau daftar `BookCard`.
5. Klik item → route `/buku/:id` → `getBook(id)` → `GET /api/products/:id`.
6. Karena API tidak punya endpoint "buku per kategori", halaman Detail Kategori mengambil semua buku lalu menyaring berdasarkan `category_id`.

## Fitur PWA

- Bisa di-install ke layar utama (manifest + ikon).
- Service worker (vite-plugin-pwa): file aplikasi di-cache, data API memakai strategi network-first dengan cadangan cache, jadi halaman yang pernah dibuka tetap tampil saat offline.
