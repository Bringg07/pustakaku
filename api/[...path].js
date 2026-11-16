// Entry point Vercel Function: file ini menangkap semua request /api/*
// (catch-all), lalu diteruskan ke handler yang sama dengan versi lokal.
import { handle } from './_handler.js'

export default function handler(req, res) {
  const segments = req.query?.path
  return handle(req, res, Array.isArray(segments) ? segments : segments ? [segments] : [])
}
