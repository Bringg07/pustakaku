import { Link, useParams } from 'react-router-dom'
import { BookCover } from '../components/BookCard'
import PageHeader from '../components/PageHeader'
import { ErrorState, Loading } from '../components/States'
import useFetch from '../hooks/useFetch'
import { getBook } from '../services/api'
import { rupiah } from '../utils/format'

export default function BookDetail() {
  const { id } = useParams()
  const { data: book, loading, error, retry } = useFetch(() => getBook(id), [id])

  return (
    <div>
      <PageHeader title="Detail Buku" back />

      {loading && <Loading />}
      {error && <ErrorState message={error} onRetry={retry} />}

      {book && (
        <div className="px-4 py-5">
          <div className="flex gap-4">
            <BookCover book={book} className="h-44 w-32" />
            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-bold text-slate-900">{book.name}</h2>
              {book.author && <p className="mt-1 text-sm text-slate-500">oleh {book.author}</p>}
              {book.categories && (
                <Link
                  to={`/kategori/${book.categories.id}`}
                  className="mt-2 inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600"
                >
                  {book.categories.name}
                </Link>
              )}
              <p className="mt-3 text-2xl font-bold text-indigo-600">{rupiah(book.price)}</p>
            </div>
          </div>

          <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl bg-slate-50 p-3">
              <dt className="text-xs text-slate-500">Kode buku (SKU)</dt>
              <dd className="mt-0.5 font-semibold text-slate-800">{book.sku || '-'}</dd>
            </div>
            <div className="rounded-xl bg-slate-50 p-3">
              <dt className="text-xs text-slate-500">Stok tersedia</dt>
              <dd className="mt-0.5 font-semibold text-slate-800">{book.stock} eksemplar</dd>
            </div>
          </dl>

          <h3 className="mt-6 font-bold text-slate-900">Sinopsis</h3>
          <p className="mt-1 whitespace-pre-line text-sm leading-relaxed text-slate-600">
            {book.description || 'Belum ada deskripsi untuk buku ini.'}
          </p>
        </div>
      )}
    </div>
  )
}
