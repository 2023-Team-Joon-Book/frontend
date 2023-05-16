import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import Search from "./pages/Search";
//import Shelf from "./pages/MyShelf";
import WishShelf from "./pages/Wish";
import ReadingShelf from "./pages/ReadingShelf";
import EndShelf from "./pages/EndShelf";
import Statistics from "./pages/Statistics";
import BookDetail from "./pages/BookDetail";
import BookSearch from "./pages/BookSearch";

function App() {
  return (
    <Router>
        <Routes>
          {/* <Route path="/" element={<Search />} /> */}
          {/* <Route path="/my" element={<Shelf />} /> */}
          <Route path="/my/wish" element={<WishShelf />} />
          <Route path="/my/ing" element={<ReadingShelf />} />
          <Route path="/my/fin" element={<EndShelf />} />
          <Route path="/book/:title" element={<BookDetail />} />
          <Route path="/" element={<BookSearch/>}/>
          <Route path="/my/activity" element={<Statistics/>} />
        </Routes>
    </Router>
  );
}

export default App;
