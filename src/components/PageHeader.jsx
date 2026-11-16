import { useNavigate } from 'react-router-dom'

// Header halaman. Kalau `back` true, muncul tombol kembali (untuk halaman detail).
export default function PageHeader({ title, subtitle, back = false }) {
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-slate-100 bg-white/95 px-4 py-3 backdrop-blur">
      {back && (
        <button
          onClick={() => navigate(-1)}
          aria-label="Kembali"
          className="-ml-1 rounded-full p-1.5 text-slate-600 hover:bg-slate-100"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
      )}
      <div className="min-w-0">
        <h1 className="truncate text-lg font-bold text-slate-900">{title}</h1>
        {subtitle && <p className="truncate text-xs text-slate-500">{subtitle}</p>}
      </div>
    </header>
  )
}
