import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import WishShelf from './pages/WishShelf'
import ReadingShelf from './pages/ReadingShelf'
import EndShelf from './pages/EndShelf'
import MainPage from './pages/MainPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import SearchPage from './pages/SearchPage'
import ChoosePage from './pages/ChoosePage'
import Statistics from './pages/Statistics'

function App() {
  return (
    <Router>
      <Routes>
        {/* 원준 */}
        <Route path="/" element={<MainPage />} />
        {/* 우희 */}
        <Route path="/booksearch" element={<SearchPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        {/* 선재 */}
        <Route path="/wish" element={<WishShelf />} />
        <Route path="/reading" element={<ReadingShelf />} />
        <Route path="/finish" element={<EndShelf />} />
        {/* 추후 담당자 */}
        <Route path="/choose" element={<ChoosePage />} />
        {/* <Route path="/stack" element={< />} /> */}
        <Route path="/statistics" element={<Statistics />} />
      </Routes>
    </Router>
  )
}

export default App
