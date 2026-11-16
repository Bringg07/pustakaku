// GET /api/categories — daftar semua kategori.
import { handle } from './_handler.js'

export default function handler(req, res) {
  return handle(req, res, ['categories'])
}
