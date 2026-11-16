// GET /api/products/:id — satu buku.
import { handle, idFrom } from '../_handler.js'

export default function handler(req, res) {
  return handle(req, res, ['products', idFrom(req)])
}
