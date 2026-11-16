// Data contoh PustakaKu.
// Dipakai otomatis kalau SUPABASE_URL / SUPABASE_KEY belum diisi,
// dan sebagai cadangan kalau Supabase tidak bisa dihubungi.

export const categories = [
  { id: '1', name: 'Novel' },
  { id: '2', name: 'Pemrograman' },
  { id: '3', name: 'Sains & Teknologi' },
  { id: '4', name: 'Pengembangan Diri' },
  { id: '5', name: 'Sejarah' },
]

const categoryName = (id) => categories.find((c) => c.id === id)?.name

const rows = [
  {
    id: 1,
    sku: 'BK-001',
    name: 'Laskar Pelangi',
    description:
      'Kisah sepuluh anak sekolah di Belitung yang belajar dengan segala keterbatasan, dibimbing guru yang tidak pernah menyerah.',
    category_id: '1',
    price: 89000,
    stock: 20,
    author: 'Andrea Hirata',
  },
  {
    id: 2,
    sku: 'BK-002',
    name: 'Bumi Manusia',
    description:
      'Minke, pribumi terpelajar di masa kolonial, menghadapi ketidakadilan lewat cinta dan perjuangan.',
    category_id: '1',
    price: 110000,
    stock: 15,
    author: 'Pramoedya Ananta Toer',
  },
  {
    id: 3,
    sku: 'BK-003',
    name: 'Clean Code',
    description:
      'Panduan menulis kode yang rapi, mudah dibaca, dan mudah dirawat, lengkap dengan contoh perbaikan kode.',
    category_id: '2',
    price: 350000,
    stock: 8,
    author: 'Robert C. Martin',
  },
  {
    id: 4,
    sku: 'BK-004',
    name: 'Eloquent JavaScript',
    description: 'Pengantar JavaScript modern dari dasar sampai proyek nyata di browser dan Node.js.',
    category_id: '2',
    price: 280000,
    stock: 12,
    author: 'Marijn Haverbeke',
  },
  {
    id: 5,
    sku: 'BK-005',
    name: 'The Pragmatic Programmer',
    description:
      'Kumpulan kebiasaan dan teknik praktis agar menjadi programmer yang efektif sepanjang karier.',
    category_id: '2',
    price: 320000,
    stock: 10,
    author: 'Andrew Hunt dan David Thomas',
  },
  {
    id: 6,
    sku: 'BK-006',
    name: 'A Brief History of Time',
    description:
      'Penjelasan populer tentang asal-usul alam semesta, lubang hitam, dan sifat waktu.',
    category_id: '3',
    price: 125000,
    stock: 14,
    author: 'Stephen Hawking',
  },
  {
    id: 7,
    sku: 'BK-007',
    name: 'Cosmos',
    description:
      'Perjalanan menjelajahi alam semesta dan sejarah ilmu pengetahuan dengan bahasa yang mudah dinikmati.',
    category_id: '3',
    price: 135000,
    stock: 9,
    author: 'Carl Sagan',
  },
  {
    id: 8,
    sku: 'BK-008',
    name: 'Atomic Habits',
    description: 'Cara membangun kebiasaan kecil yang konsisten sampai hasilnya terasa besar.',
    category_id: '4',
    price: 99000,
    stock: 30,
    author: 'James Clear',
  },
  {
    id: 9,
    sku: 'BK-009',
    name: 'Filosofi Teras',
    description:
      'Pengenalan filsafat Stoa untuk menghadapi emosi negatif dan masalah sehari-hari.',
    category_id: '4',
    price: 98000,
    stock: 25,
    author: 'Henry Manampiring',
  },
  {
    id: 10,
    sku: 'BK-010',
    name: 'Sapiens',
    description:
      'Perjalanan manusia dari pemburu-pengumpul sampai penguasa planet, dilihat dari kacamata sejarah.',
    category_id: '5',
    price: 145000,
    stock: 18,
    author: 'Yuval Noah Harari',
  },
  {
    id: 11,
    sku: 'BK-011',
    name: 'Sejarah Indonesia Modern',
    description: 'Ringkasan perjalanan Indonesia sejak akhir abad ke-13 hingga masa modern.',
    category_id: '5',
    price: 175000,
    stock: 7,
    author: 'M.C. Ricklefs',
  },
]

export const products = rows.map((row) => ({
  ...row,
  cover_url: null,
  categories: { id: row.category_id, name: categoryName(row.category_id) },
}))
