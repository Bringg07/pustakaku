import CategoryCard from '../components/CategoryCard'
import PageHeader from '../components/PageHeader'
import { Empty, ErrorState, Loading } from '../components/States'
import useFetch from '../hooks/useFetch'
import { getBooks, getCategories } from '../services/api'

export default function Categories() {
  const { data, loading, error, retry } = useFetch(() => Promise.all([getCategories(), getBooks()]))

  const [categories, books] = data || [[], []]
  const countBooks = (id) => books.filter((b) => b.category_id === id).length

  return (
    <div>
      <PageHeader title="Kategori" subtitle="Pilih kategori untuk melihat bukunya" />

      <div className="space-y-3 px-4 py-4">
        {loading && <Loading />}
        {error && <ErrorState message={error} onRetry={retry} />}
        {data && categories.length === 0 && <Empty text="Belum ada kategori." />}
        {data &&
          categories.map((category) => (
            <CategoryCard key={category.id} category={category} count={countBooks(category.id)} />
          ))}
      </div>
    </div>
  )
}
