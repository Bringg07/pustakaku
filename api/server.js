// Server API untuk lokal: node api/server.js  →  http://localhost:3000/api/products
// Dipakai oleh proxy Vite saat `npm run dev`, jadi frontend dan API tetap satu alur.
import http from 'node:http'
import { handle } from './_handler.js'

const port = Number(process.env.PORT) || 3000

const server = http.createServer((req, res) => {
  const pathname = new URL(req.url, `http://localhost:${port}`).pathname
  const segments = pathname.replace(/^\/api\/?/, '').split('/').filter(Boolean)
  handle(req, res, segments)
})

server.listen(port, () => {
  console.log(`API PustakaKu siap di http://localhost:${port}/api/products`)
})
