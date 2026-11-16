// GET /api/products — daftar semua buku.
import { handle } from './_handler.js'

export default function handler(req, res) {
  return handle(req, res, ['products'])
}
