import { useState } from 'react'
import BookCard from '../components/BookCard'
import PageHeader from '../components/PageHeader'
import { Empty, ErrorState, Loading } from '../components/States'
import useFetch from '../hooks/useFetch'
import { getBooks, getCategories } from '../services/api'

export default function Books() {
  const [query, setQuery] = useState('')
  const { data, loading, error, retry } = useFetch(() => Promise.all([getBooks(), getCategories()]))

  const [books, categories] = data || [[], []]
  const categoryName = (id) => categories.find((c) => c.id === id)?.name

  const keyword = query.trim().toLowerCase()
  const filtered = books.filter(
    (b) => b.name?.toLowerCase().includes(keyword) || b.author?.toLowerCase().includes(keyword),
  )

  return (
    <div>
      <PageHeader title="Daftar Buku" subtitle="Ketuk buku untuk melihat detail" />

      <div className="space-y-3 px-4 py-4">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari judul atau penulis..."
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-indigo-400 focus:bg-white"
        />

        {loading && <Loading />}
        {error && <ErrorState message={error} onRetry={retry} />}
        {data && filtered.length === 0 && <Empty text="Buku tidak ditemukan." />}
        {data &&
          filtered.map((book) => (
            <BookCard key={book.id} book={book} categoryName={categoryName(book.category_id)} />
          ))}
      </div>
    </div>
  )
}
