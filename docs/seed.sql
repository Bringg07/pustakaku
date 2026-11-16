-- Data contoh buku untuk PustakaKu.
-- Jalankan di Supabase: SQL Editor > New query > tempel semua > Run (cukup SEKALI,
-- kalau diulang kategori dan bukunya akan dobel).

-- Kolom tambahan (opsional, supaya buku punya penulis dan gambar sampul).
-- Aplikasi tetap jalan walaupun kolom ini tidak dipakai.
alter table products add column if not exists author text;
alter table products add column if not exists cover_url text;

insert into categories (name) values
  ('Novel'),
  ('Pemrograman'),
  ('Sains & Teknologi'),
  ('Pengembangan Diri'),
  ('Sejarah');

insert into products (sku, name, description, category_id, price, stock, author)
select v.sku, v.name, v.description, c.id, v.price, v.stock, v.author
from (values
  ('BK-001', 'Laskar Pelangi',
   'Kisah sepuluh anak sekolah di Belitung yang belajar dengan segala keterbatasan, dibimbing guru yang tidak pernah menyerah.',
   'Novel', 89000, 20, 'Andrea Hirata'),
  ('BK-002', 'Bumi Manusia',
   'Minke, pribumi terpelajar di masa kolonial, menghadapi ketidakadilan lewat cinta dan perjuangan.',
   'Novel', 110000, 15, 'Pramoedya Ananta Toer'),
  ('BK-003', 'Clean Code',
   'Panduan menulis kode yang rapi, mudah dibaca, dan mudah dirawat, lengkap dengan contoh perbaikan kode.',
   'Pemrograman', 350000, 8, 'Robert C. Martin'),
  ('BK-004', 'Eloquent JavaScript',
   'Pengantar JavaScript modern dari dasar sampai proyek nyata di browser dan Node.js.',
   'Pemrograman', 280000, 12, 'Marijn Haverbeke'),
  ('BK-005', 'The Pragmatic Programmer',
   'Kumpulan kebiasaan dan teknik praktis agar menjadi programmer yang efektif sepanjang karier.',
   'Pemrograman', 320000, 10, 'Andrew Hunt dan David Thomas'),
  ('BK-006', 'A Brief History of Time',
   'Penjelasan populer tentang asal-usul alam semesta, lubang hitam, dan sifat waktu.',
   'Sains & Teknologi', 125000, 14, 'Stephen Hawking'),
  ('BK-007', 'Cosmos',
   'Perjalanan menjelajahi alam semesta dan sejarah ilmu pengetahuan dengan bahasa yang mudah dinikmati.',
   'Sains & Teknologi', 135000, 9, 'Carl Sagan'),
  ('BK-008', 'Atomic Habits',
   'Cara membangun kebiasaan kecil yang konsisten sampai hasilnya terasa besar.',
   'Pengembangan Diri', 99000, 30, 'James Clear'),
  ('BK-009', 'Filosofi Teras',
   'Pengenalan filsafat Stoa untuk menghadapi emosi negatif dan masalah sehari-hari.',
   'Pengembangan Diri', 98000, 25, 'Henry Manampiring'),
  ('BK-010', 'Sapiens',
   'Perjalanan manusia dari pemburu-pengumpul sampai penguasa planet, dilihat dari kacamata sejarah.',
   'Sejarah', 145000, 18, 'Yuval Noah Harari'),
  ('BK-011', 'Sejarah Indonesia Modern',
   'Ringkasan perjalanan Indonesia sejak akhir abad ke-13 hingga masa modern.',
   'Sejarah', 175000, 7, 'M.C. Ricklefs')
) as v(sku, name, description, category, price, stock, author)
join categories c on c.name = v.category;
