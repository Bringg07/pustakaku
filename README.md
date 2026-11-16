# PustakaKu : Katalog Buku Mini

Tugas Akhir Praktikum PPB 2026 (PWA). Aplikasi katalog buku sederhana yang mengambil data dari REST API sendiri.

- Nama: Dafa Briangga Agdyananta
- NIM: 21120124140112
- Platform: Progressive Web App (React + Vite)

## Pemenuhan ketentuan

| Ketentuan | Di aplikasi ini |
| --- | --- |
| API sendiri | folder `api/`: `GET /api/products` dan `GET /api/categories` (bisa membaca Supabase) |
| Bottom Navigation Bar | `src/components/BottomNav.jsx` (Home, Buku, Kategori, Profile) |
| Minimal 5 halaman | 6 halaman: Home, Daftar Buku, Detail Buku, Daftar Kategori, Detail Kategori, Profile |
| 2 halaman list yang bisa diklik ke detail | Daftar Buku → Detail Buku, Daftar Kategori → Detail Kategori |
| Halaman Profile/About | `src/pages/Profile.jsx` |
| GitHub + free hosting (PWA) | Push ke GitHub, deploy ke Vercel |

## Menjalankan di lokal

Butuh dua terminal, karena API dan aplikasi jalan terpisah (Vite meneruskan `/api` ke port 3000).

```bash
npm install

npm run api    # terminal 1 → API di http://localhost:3000/api/products
npm run dev    # terminal 2 → aplikasi di http://localhost:5173
```

Tanpa file `.env` pun sudah jalan, karena `api/` memakai data contoh di `api/_data.js`. Kalau perlu contoh variabel, salin `.env.example` menjadi `.env`.

Build produksi: `npm run build` lalu `npm run preview` (proxy `/api` ikut aktif saat preview).

## API (folder `api/`)

| Method | Endpoint | Isi |
| --- | --- | --- |
| GET | `/api/products` | daftar buku (`products`), masing-masing dengan `categories` |
| GET | `/api/products/:id` | satu buku, 404 kalau tidak ada |
| GET | `/api/categories` | daftar kategori |
| GET | `/api/categories/:id` | satu kategori, 404 kalau tidak ada |

Ciri API yang benar: dibuka di browser, `/api/products` menampilkan **JSON** seperti `[{"id":1,"name":"Laskar Pelangi",...}]`, bukan halaman aplikasi. CORS sudah aktif (`Access-Control-Allow-Origin: *`) sehingga API ini juga bisa dipakai project terpisah.

### Memakai Supabase (opsional)

1. Buat project di Supabase, lalu jalankan isi `docs/seed.sql` di SQL Editor (cukup sekali).
2. Isi `.env`:
   ```
   SUPABASE_URL=https://xxxx.supabase.co
   SUPABASE_KEY=anon-public-key
   ```
3. Jalankan ulang `npm run api`. Kalau dua variabel itu kosong atau Supabase gagal dihubungi, API kembali memakai data contoh.

## Deploy ke Vercel

1. Push project ke GitHub (`.env` sudah ada di `.gitignore`, jadi aman).
2. vercel.com → Add New → Project → import repository ini. Preset otomatis terdeteksi sebagai Vite.
3. Deploy. Folder `api/` otomatis menjadi Vercel Function, jadi **tidak perlu** membuat project API terpisah dan tidak perlu mengisi `VITE_API_URL`.
4. Pastikan `https://<domain-hasil-deploy>/api/products` menampilkan JSON.
5. Buka domain itu di Chrome HP → menu → "Install app" / "Tambahkan ke layar utama".

`vercel.json` mengatur agar refresh di halaman seperti `/buku/123` tidak 404, tanpa mengganggu rute `/api/*`.

### Kalau muncul "Data gagal dimuat"

- Buka `<domain>/api/products` di browser. Kalau yang muncul halaman aplikasi, berarti request `/api` tidak sampai ke API — cek folder `api/` ikut ter-deploy.
- `VITE_API_URL` harus **kosong** kecuali kamu memang memakai API lain. Kalau diisi URL aplikasi sendiri, aplikasi akan meminta data ke halamannya sendiri dan membalas HTML, bukan JSON.
- Nilai `VITE_API_URL` dibaca saat build: setelah mengubahnya di Vercel, lakukan Redeploy.

## Struktur folder

```
api/
  products.js          Vercel Function → GET /api/products
  products/[id].js     Vercel Function → GET /api/products/:id
  categories.js        Vercel Function → GET /api/categories
  categories/[id].js   Vercel Function → GET /api/categories/:id
  server.js            server API untuk lokal (npm run api)
  _handler.js          logika endpoint + pengambilan data (Supabase)
  _data.js             data contoh, dipakai kalau Supabase belum diisi
src/
  services/api.js      semua pemanggilan API (ubah di sini kalau API berubah)
  hooks/useFetch.js    hook untuk loading / error / data
  components/          BottomNav, BookCard, CategoryCard, PageHeader, States
  pages/               Home, Books, BookDetail, Categories, CategoryDetail, Profile
  utils/format.js      format rupiah dan warna sampul
  App.jsx              daftar route
vite.config.js         konfigurasi Tailwind, PWA, dan proxy /api saat dev
docs/seed.sql          data contoh untuk Supabase
```

## Alur data (untuk responsi)

1. Halaman memanggil `useFetch(() => getBooks())`.
2. `getBooks()` di `services/api.js` melakukan `fetch` ke `/api/products` (atau `VITE_API_URL/api/products` kalau diisi).
3. Fungsi di `api/_handler.js` membaca Supabase (kalau `SUPABASE_URL` + `SUPABASE_KEY` ada) atau `api/_data.js`, lalu mengembalikan JSON.
4. Hook menyimpan hasilnya, halaman menampilkan `Loading`, `ErrorState` (ada tombol coba lagi), atau daftar `BookCard`.
5. Klik item → route `/buku/:id` → `getBook(id)` → `GET /api/products/:id`.
6. Karena API tidak punya endpoint "buku per kategori", halaman Detail Kategori mengambil semua buku lalu menyaring berdasarkan `category_id`.

## Fitur PWA

- Bisa di-install ke layar utama (manifest + ikon).
- Service worker (vite-plugin-pwa): file aplikasi di-cache, data API memakai strategi network-first dengan cadangan cache, jadi halaman yang pernah dibuka tetap tampil saat offline.
