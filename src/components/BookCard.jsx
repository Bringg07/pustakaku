import { Link } from 'react-router-dom'
import { coverColor, rupiah } from '../utils/format'

// Cover buku: pakai gambar kalau API punya `cover_url`, kalau tidak pakai blok warna + inisial.
export function BookCover({ book, className = 'h-24 w-16' }) {
  if (book.cover_url) {
    return <img src={book.cover_url} alt={book.name} className={`${className} rounded-lg object-cover shadow-sm`} />
  }
  return (
    <div
      className={`${className} flex shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${coverColor(book.name)} text-2xl font-bold text-white shadow-sm`}
      aria-hidden="true"
    >
      {book.name?.charAt(0).toUpperCase()}
    </div>
  )
}

export default function BookCard({ book, categoryName }) {
  return (
    <Link
      to={`/buku/${book.id}`}
      className="flex gap-3 rounded-xl border border-slate-100 bg-white p-3 shadow-sm transition hover:border-indigo-200 hover:shadow"
    >
      <BookCover book={book} />
      <div className="min-w-0 flex-1">
        <h3 className="line-clamp-2 font-semibold text-slate-900">{book.name}</h3>
        {book.author && <p className="truncate text-sm text-slate-500">{book.author}</p>}
        {categoryName && (
          <span className="mt-1 inline-block rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-600">
            {categoryName}
          </span>
        )}
        <p className="mt-1 text-sm font-semibold text-slate-800">{rupiah(book.price)}</p>
      </div>
    </Link>
  )
}
