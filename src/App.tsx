import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Search from "./pages/Search";
import Shelf from "./pages/MyShelf";
import WishShelf from "./pages/Wish";
import ReadingShelf from "./pages/ReadingShelf";
import EndShelf from "./pages/EndShelf";
import ReadingDetail from "./pages/ReadingDetail";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Search />} />
          {/* <Route path="/my" element={<Shelf />} /> */}
          <Route path="/my/wish" element={<WishShelf />} />
          <Route path="/my/ing" element={<ReadingShelf />} />
          <Route path="/my/fin" element={<EndShelf />} />
          <Route path="/detail/:id" element={<ReadingDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
