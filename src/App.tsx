import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import WishShelf from './pages/WishShelf'
import ReadingShelf from './pages/ReadingShelf'
import EndShelf from './pages/EndShelf'
import Statistics from './pages/Statistics'
import BookSearch from './pages/BookSearch'
import MainPage from './pages/MainPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import SearchPage from './pages/SearchPage'

function App() {
  return (
    <Router>
      <Routes>
        원준
        <Route path="/" element={<MainPage />} />
        추후 담당자
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        우희
        <Route path="/booksearch" element={<SearchPage />} />
        선재
        <Route path="/wish" element={<WishShelf />} />
        <Route path="/reading" element={<ReadingShelf />} />
        <Route path="/finish" element={<EndShelf />} />
        추후 담당자
        <Route path="/activity" element={<Statistics />} />
      </Routes>
    </Router>
  )
}

export default App
