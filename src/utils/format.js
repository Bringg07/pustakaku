export const rupiah = (value) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(Number(value) || 0)

// Warna cover sementara (kalau buku tidak punya gambar), dipilih dari nama buku
const COVER_COLORS = [
  'from-indigo-500 to-violet-500',
  'from-rose-500 to-orange-400',
  'from-emerald-500 to-teal-400',
  'from-sky-500 to-cyan-400',
  'from-amber-500 to-yellow-400',
  'from-fuchsia-500 to-pink-400',
]

export const coverColor = (name = '') => {
  let hash = 0
  for (const ch of name) hash = (hash + ch.charCodeAt(0)) % COVER_COLORS.length
  return COVER_COLORS[hash]
}
