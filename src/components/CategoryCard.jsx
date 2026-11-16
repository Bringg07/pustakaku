import { Link } from 'react-router-dom'

export default function CategoryCard({ category, count }) {
  return (
    <Link
      to={`/kategori/${category.id}`}
      className="flex items-center justify-between rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition hover:border-indigo-200 hover:shadow"
    >
      <div>
        <h3 className="font-semibold text-slate-900">{category.name}</h3>
        {count !== undefined && <p className="text-sm text-slate-500">{count} buku</p>}
      </div>
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m9 18 6-6-6-6" />
      </svg>
    </Link>
  )
}
