import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Ask from '../components/search/Ask';
import SearchBar from '../components/search/SearchBar';
import MyHeader from '../components/Header/MyHeader';
import ViewedBooks from '../components/search/ViewedBooks';
import PopularBooks from '../components/search/PopularBook';
import RecentBooks from '../components/search/RecentBooks';
import Swal from "sweetalert2";
import 'sweetalert2/src/sweetalert2.scss'

const SearchPage = () => {
  const [activeSwipe, setActiveSwipe] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [books, setBooks] = useState<any[]>([]);  // <--- books 상태 추가

  const handleSwipeClick = (index: number) => {
    setActiveSwipe((prev) => (prev === index ? null : index));
  };

  const handleSearch = async () => {
    await fetchBooks(searchQuery);  // Fetching books with the provided query
  };

  // 책 정보를 가져오는 함수
  const fetchBooks = async (query: string) => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/books/search', {
        params: { title: query }
      });
      const fetchedBooks = response.data;
      const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "검색 성공!"
      });
      if (fetchedBooks.length === 0) {  // 데이터 없는지 체크
        const Toast = Swal.mixin({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "warning",
          title: "검색 결과가 없습니다."
        });
      }
      setBooks(fetchedBooks);  // 데이터 상태 관리
    } catch (error) {
      console.error('Failed to fetch books', error);
      Swal.fire({
        title: "네트워크 오류입니다!",
        icon: "error"
      });
    }
  };

  return (
    <>
      <MyHeader />
      <form>
        <SearchBar onSearch={handleSearch} onInputChange={setSearchQuery} />
      </form>
      <ViewedBooks onSwipeClick={handleSwipeClick} active={activeSwipe === 0} books={books} />
      <RecentBooks onSwipeClick={handleSwipeClick} active={activeSwipe === 0} />
      <PopularBooks onSwipeClick={handleSwipeClick} active={activeSwipe === 0} />
      <Ask />
    </>
  );
};

export default SearchPage;
