import { Link } from 'react-router-dom'
import BookCard from '../components/BookCard'
import { ErrorState, Loading } from '../components/States'
import useFetch from '../hooks/useFetch'
import { getBooks, getCategories } from '../services/api'

export default function Home() {
  const { data, loading, error, retry } = useFetch(() => Promise.all([getBooks(), getCategories()]))

  const [books, categories] = data || [[], []]
  const categoryName = (id) => categories.find((c) => c.id === id)?.name

  return (
    <div>
      <section className="bg-gradient-to-br from-indigo-600 to-violet-600 px-5 pb-8 pt-10 text-white">
        <p className="text-sm text-indigo-100">Selamat datang di</p>
        <h1 className="text-3xl font-bold">PustakaKu</h1>
        <p className="mt-2 text-sm text-indigo-100">Katalog buku mini untuk mencari bacaan berikutnya.</p>

        {data && (
          <div className="mt-5 flex gap-3">
            <div className="flex-1 rounded-xl bg-white/15 px-4 py-3">
              <p className="text-2xl font-bold">{books.length}</p>
              <p className="text-xs text-indigo-100">Judul buku</p>
            </div>
            <div className="flex-1 rounded-xl bg-white/15 px-4 py-3">
              <p className="text-2xl font-bold">{categories.length}</p>
              <p className="text-xs text-indigo-100">Kategori</p>
            </div>
          </div>
        )}
      </section>

      <section className="px-4 py-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Buku Pilihan</h2>
          <Link to="/buku" className="text-sm font-medium text-indigo-600">
            Lihat semua
          </Link>
        </div>

        {loading && <Loading />}
        {error && <ErrorState message={error} onRetry={retry} />}
        {data && (
          <div className="space-y-3">
            {books.slice(0, 4).map((book) => (
              <BookCard key={book.id} book={book} categoryName={categoryName(book.category_id)} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
