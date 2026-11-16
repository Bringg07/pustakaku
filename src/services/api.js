// Semua pemanggilan ke API (Modul 1) ada di file ini.
// Kalau struktur API-mu beda, cukup ubah file ini saja.

const BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')

async function request(path) {
  if (!BASE_URL) {
    throw new Error('VITE_API_URL belum diisi. Salin .env.example menjadi .env lalu isi URL API-mu.')
  }

  let res
  try {
    res = await fetch(`${BASE_URL}/api${path}`)
  } catch {
    throw new Error('Tidak bisa terhubung ke server. Cek koneksi internet atau pengaturan CORS API.')
  }

  if (!res.ok) {
    let message = `Permintaan gagal (${res.status})`
    try {
      const body = await res.json()
      if (body?.error) message = body.error
    } catch {
      // body bukan JSON, pakai pesan default
    }
    throw new Error(message)
  }

  return res.json()
}

// products di API dipakai sebagai "buku"
export const getBooks = () => request('/products')
export const getBook = (id) => request(`/products/${id}`)

// categories di API dipakai sebagai "kategori buku"
export const getCategories = () => request('/categories')
export const getCategory = (id) => request(`/categories/${id}`)
