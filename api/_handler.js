// Logika API PustakaKu: GET /api/products dan /api/categories (+ versi /:id).
// Tidak memakai Express atau paket lain supaya bisa langsung jalan sebagai
// Vercel Function maupun lewat `node api/server.js` di lokal.
//
// Sumber data: Supabase kalau SUPABASE_URL & SUPABASE_KEY diisi.
// Kalau belum diisi (atau Supabase gagal dihubungi), pakai data contoh di _data.js.

import { categories, products } from './_data.js'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, apikey',
}

function sendJson(res, status, payload) {
  res.statusCode = status
  for (const [key, value] of Object.entries(CORS_HEADERS)) res.setHeader(key, value)
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(payload))
}

// Ambil data dari Supabase REST (select bisa berisi relasi, mis. "*,categories(id,name)").
async function fromSupabase(table, select) {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_KEY
  if (!url || !key) return null

  try {
    const res = await fetch(`${url.replace(/\/$/, '')}/rest/v1/${table}?select=${select}`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
    })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

async function loadProducts() {
  return (await fromSupabase('products', '*,categories(id,name)')) ?? products
}

async function loadCategories() {
  return (await fromSupabase('categories', 'id,name')) ?? categories
}

// Ambil :id dari request. Vercel mengisi req.query.id untuk route [id].js,
// tapi kalau kosong kita ambil segmen terakhir dari url sebagai cadangan.
export function idFrom(req) {
  if (req.query?.id) return String(req.query.id)
  const parts = (req.url || '').split('?')[0].split('/').filter(Boolean)
  return parts[parts.length - 1]
}

// `segments` = bagian path setelah /api, mis. ['products','3'] atau [].
export async function handle(req, res, segments) {
  if (req.method === 'OPTIONS') {
    res.statusCode = 204
    for (const [key, value] of Object.entries(CORS_HEADERS)) res.setHeader(key, value)
    res.end()
    return
  }

  if (req.method !== 'GET') {
    return sendJson(res, 405, { error: 'Metode tidak didukung. Gunakan GET.' })
  }

  const [resource, id] = segments

  // /api saja: tampilkan daftar endpoint supaya mudah dicek di browser.
  if (!resource) {
    return sendJson(res, 200, {
      nama: 'API PustakaKu',
      endpoints: ['/api/products', '/api/products/:id', '/api/categories', '/api/categories/:id'],
    })
  }

  try {
    if (resource === 'products') {
      const data = await loadProducts()
      if (!id) return sendJson(res, 200, data)
      const book = data.find((item) => String(item.id) === String(id))
      return book ? sendJson(res, 200, book) : sendJson(res, 404, { error: 'Buku tidak ditemukan.' })
    }

    if (resource === 'categories') {
      const data = await loadCategories()
      if (!id) return sendJson(res, 200, data)
      const category = data.find((item) => String(item.id) === String(id))
      return category
        ? sendJson(res, 200, category)
        : sendJson(res, 404, { error: 'Kategori tidak ditemukan.' })
    }

    return sendJson(res, 404, { error: 'Endpoint tidak dikenal. Coba /api/products atau /api/categories.' })
  } catch (err) {
    return sendJson(res, 500, { error: `API gagal memuat data: ${err.message}` })
  }
}
