// GET /api/categories/:id — satu kategori.
import { handle, idFrom } from '../_handler.js'

export default function handler(req, res) {
  return handle(req, res, ['categories', idFrom(req)])
}
