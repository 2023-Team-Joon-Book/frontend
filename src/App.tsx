import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import WishShelf from './pages/WishShelf'
// import ReadingShelf from './pages/ReadingShelf'
// import EndShelf from './pages/EndShelf'
import Statistics from './pages/Statistics'
// import BookSearch from './pages/BookSearch'
import MainPage from './pages/MainPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import SearchPage from './pages/SearchPage'
import BookStackPage from './pages/BookStackPage'
import ChoosePage from './pages/ChoosePage'
import BookShelfPage from './pages/BookShelfPage'
import MyPage from './pages/MyPage'

function App() {
  return (
    <Router>
      <Routes>
        {/* 원준 */}
        <Route path="/" element={<MainPage />} />
        <Route path="/stack" element={<BookStackPage />} />
        {/* 우희 */}
        <Route path="/booksearch" element={<SearchPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        {/* 선재 */}
        {/* <Route path="/wish" element={<WishShelf />} />
        <Route path="/reading" element={<ReadingShelf />} />
        <Route path="/finish" element={<EndShelf />} /> */}
        <Route path="/shelf" element={<BookShelfPage />} />
        {/* 추후 담당자 */}
        {/* <Route path="/activity" element={<Statistics />} />
        <Route path="/BookStack" element={<BookStackPage />} /> */}
        <Route path="/choose" element={<ChoosePage />} />
        {/* <Route path="/stack" element={< />} /> */}
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </Router>
  )
}

export default App
