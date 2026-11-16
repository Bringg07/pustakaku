// Tampilan sementara saat data sedang dimuat, gagal dimuat, atau kosong.

export function Loading({ text = 'Memuat data...' }) {
  return (
    <div className="flex flex-col items-center gap-3 py-16 text-slate-500" role="status">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
      <p className="text-sm">{text}</p>
    </div>
  )
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="mx-4 my-8 rounded-xl border border-rose-200 bg-rose-50 p-5 text-center">
      <p className="font-semibold text-rose-700">Data gagal dimuat</p>
      <p className="mt-1 text-sm text-rose-600">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700"
        >
          Coba lagi
        </button>
      )}
    </div>
  )
}

export function Empty({ text }) {
  return <p className="py-12 text-center text-sm text-slate-500">{text}</p>
}
