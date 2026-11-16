import PageHeader from '../components/PageHeader'

const techStack = ['React', 'Vite', 'React Router', 'Tailwind CSS', 'PWA', 'Express.js', 'Supabase']

function Row({ label, value }) {
  return (
    <div className="flex justify-between gap-4 py-2 text-sm">
      <dt className="text-slate-500">{label}</dt>
      <dd className="text-right font-medium text-slate-800">{value}</dd>
    </div>
  )
}

export default function Profile() {
  return (
    <div>
      <PageHeader title="Profile" subtitle="Tentang aplikasi dan pembuat" />

      <div className="space-y-4 px-4 py-4">
        <section className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-xl font-bold text-white">
              P
            </div>
            <div>
              <h2 className="font-bold text-slate-900">PustakaKu</h2>
              <p className="text-xs text-slate-500">Katalog Buku Mini</p>
            </div>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Aplikasi katalog buku sederhana untuk melihat daftar buku beserta kategorinya. Data diambil dari
            REST API buatan sendiri (Praktikum PPB Modul 1) dan aplikasi ini bisa dipasang di layar utama
            sebagai Progressive Web App.
          </p>
          <dl className="mt-3 divide-y divide-slate-100">
            <Row label="Versi" value="1.0.0" />
            <Row label="Platform" value="Progressive Web App" />
            <Row label="Sumber data" value="API Modul 1" />
          </dl>
        </section>

        <section className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
          <h2 className="font-bold text-slate-900">Teknologi</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span key={tech} className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600">
                {tech}
              </span>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
          <h2 className="font-bold text-slate-900">Pembuat</h2>
          <dl className="mt-1 divide-y divide-slate-100">
            <Row label="Nama" value="Dafa Briangga Agdyananta" />
            <Row label="NIM" value="21120124140112" />
            <Row label="Program studi" value="Teknik Komputer" />
            <Row label="Universitas" value="Universitas Diponegoro" />
            <Row label="Praktikum" value="PPB 2026" />
          </dl>
          <a
            href="https://github.com/Bringg07"
            target="_blank"
            rel="noreferrer"
            className="mt-3 block rounded-lg bg-slate-900 py-2.5 text-center text-sm font-medium text-white hover:bg-slate-700"
          >
            github.com/Bringg07
          </a>
        </section>
      </div>
    </div>
  )
}
