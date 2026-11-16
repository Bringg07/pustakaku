// Semua pemanggilan ke API (Modul 1) ada di file ini.
// Kalau struktur API-mu beda, cukup ubah file ini saja.

// Kosong = pakai /api di domain yang sama (API bawaan folder `api/`).
// Isi VITE_API_URL hanya kalau ingin memakai API lain (mis. API Modul 1).
const BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')

async function request(path) {
  const url = `${BASE_URL}/api${path}`

  let res
  try {
    res = await fetch(url)
  } catch {
    throw new Error('Tidak bisa terhubung ke server. Cek koneksi internet atau pengaturan CORS API.')
  }

  // API yang benar selalu membalas JSON. Kalau yang datang HTML, berarti alamat
  // /api dibalas halaman aplikasi (bukan API) — cek VITE_API_URL atau server API-nya.
  const raw = await res.text()
  let body
  try {
    body = JSON.parse(raw)
  } catch {
    throw new Error(
      `Alamat ${url} membalas HTML/halaman web, bukan JSON (status ${res.status}). Jalankan API dengan \`node api/server.js\` atau cek VITE_API_URL.`,
    )
  }

  if (!res.ok) {
    throw new Error(body?.error || `Permintaan gagal (${res.status})`)
  }

  return body
}

// products di API dipakai sebagai "buku"
export const getBooks = () => request('/products')
export const getBook = (id) => request(`/products/${id}`)

// categories di API dipakai sebagai "kategori buku"
export const getCategories = () => request('/categories')
export const getCategory = (id) => request(`/categories/${id}`)
