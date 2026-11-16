import { Navigate, Route, Routes } from 'react-router-dom'
import BottomNav from './components/BottomNav'
import BookDetail from './pages/BookDetail'
import Books from './pages/Books'
import CategoryDetail from './pages/CategoryDetail'
import Categories from './pages/Categories'
import Home from './pages/Home'
import Profile from './pages/Profile'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-200">
      {/* Lebar dibatasi supaya tampilan seperti aplikasi HP, juga di desktop */}
      <div className="relative mx-auto min-h-screen max-w-md bg-white pb-20 shadow-xl">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buku" element={<Books />} />
          <Route path="/buku/:id" element={<BookDetail />} />
          <Route path="/kategori" element={<Categories />} />
          <Route path="/kategori/:id" element={<CategoryDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <BottomNav />
      </div>
    </div>
  )
}
