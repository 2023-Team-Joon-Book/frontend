import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Ask from '../components/search/Ask';
import SearchBar from '../components/search/SearchBar';
import MyHeader from '../components/Header/MyHeader';
import ViewedBooks from '../components/search/ViewedBooks';
import PopularBooks from '../components/search/PopularBook';
import RecentBooks from '../components/search/RecentBooks';

const SearchPage = () => {
  const [activeSwipe, setActiveSwipe] = useState<number | null>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [books, setBooks] = useState<any[]>([]);  // <--- books 상태 추가

  const handleSwipeClick = (index: number) => {
    setActiveSwipe((prev) => (prev === index ? null : index));
  };

  const handleSearch = () => {
    setHasSearched(true);
    // API 호출로 대체
    fetchBooks(searchQuery);
  };

  // 책 정보를 가져오는 함수
  const fetchBooks = async (query: string) => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/books/search', {
        params: { title: query }
      });
      setBooks(response.data);  // API 결과를 books 상태에 저장
    } catch (error) {
      console.error('Failed to fetch books', error);
    }
  };

  return (
    <>
      <MyHeader />
      <form>
        <SearchBar onSearch={handleSearch} onInputChange={setSearchQuery} />
      </form>
      {hasSearched ? (
        searchResults.length ? (
          searchResults.map((result) => <div key={result}>{result}</div>)
        ) : (
          <div>조회할 결과가 없습니다.</div>
        )
      ) : null}
      <ViewedBooks onSwipeClick={handleSwipeClick} active={activeSwipe === 0} books={books} />
      <RecentBooks onSwipeClick={handleSwipeClick} active={activeSwipe === 0} />
      <PopularBooks onSwipeClick={handleSwipeClick} active={activeSwipe === 0} />
      <Ask />
    </>
  );
};

export default SearchPage;
