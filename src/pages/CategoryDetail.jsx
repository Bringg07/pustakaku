import { useParams } from 'react-router-dom'
import BookCard from '../components/BookCard'
import PageHeader from '../components/PageHeader'
import { Empty, ErrorState, Loading } from '../components/States'
import useFetch from '../hooks/useFetch'
import { getBooks, getCategory } from '../services/api'

export default function CategoryDetail() {
  const { id } = useParams()
  const { data, loading, error, retry } = useFetch(() => Promise.all([getCategory(id), getBooks()]), [id])

  const [category, books] = data || [null, []]
  // API tidak punya endpoint "buku per kategori", jadi disaring di sini
  const booksInCategory = books.filter((b) => b.category_id === id)

  return (
    <div>
      <PageHeader
        title={category?.name || 'Detail Kategori'}
        subtitle={data ? `${booksInCategory.length} buku` : undefined}
        back
      />

      <div className="space-y-3 px-4 py-4">
        {loading && <Loading />}
        {error && <ErrorState message={error} onRetry={retry} />}
        {data && booksInCategory.length === 0 && <Empty text="Belum ada buku di kategori ini." />}
        {data &&
          booksInCategory.map((book) => (
            <BookCard key={book.id} book={book} categoryName={category.name} />
          ))}
      </div>
    </div>
  )
}
