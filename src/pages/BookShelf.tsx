import React, { useState, useEffect } from "react";
import NavigationBar from "../components/NavigationBar";
import Header from "../components//main/Header.tsx";
import "../scss/MyShelf.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Book from '../components/shelf/Books'; // Book 컴포넌트 불러오기
import Shelf from '../components/shelf/Shelf.tsx';
import BookModal from '../components/shelf/BookModal.tsx';


const BookShelf: React.FC = () => {
  const [selectedBook, setSelectedBook] = useState<any | null>(null);
  const [currentShelf, setCurrentShelf] = useState<number>(2); // 책장 구성을 나타내는 상태
  const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지를 나타내는 상태

  const handleBookClick = (book: any) => {
    setSelectedBook(book);
  };

  const closeModal = () => {
    setSelectedBook(null);
  };

  const changeShelf = (shelfNumber: number) => {
    setCurrentShelf(shelfNumber);
    setCurrentPage(1); // 책장을 변경할 때 페이지를 리셋
  };

  const handleNextPage = () => {
    // 다음 페이지로 이동
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    // 이전 페이지로 이동
    setCurrentPage((prevPage) => prevPage - 1);
  };

  // 각 버튼을 누를 때 책장 구성을 변경합니다.
  const renderShelf = () => {
    if (currentShelf === 1) {
      // 첫 번째 책장 구성
      const booksOnShelf1 = [
        // ... (첫 번째 책장의 책 리스트)
        { id: 1, title: '책 제목 1', author: '저자 1', category: '카테고리 1', pageCount: 70 },
        { id: 2, title: '책 제목 2', author: '저자 2', category: '카테고리 2' },
        { id: 3, title: '책 제목 3', author: '저자 3', category: '카테고리 3' },
        { id: 4, title: '책 제목 4', author: '저자 4', category: '카테고리 4' },
        { id: 5, title: '책 제목 5', author: '저자 5', category: '카테고리 5' },// 5개의 책 정보를 넣어주세요
        { id: 6, title: '책 제목 6', author: '저자 6', category: '카테고리 6' },
        { id: 7, title: '책 제목 7', author: '저자 7', category: '카테고리 7' },
        { id: 8, title: '책 제목 8', author: '저자 8', category: '카테고리 8' },
        { id: 9, title: '책 제목 9', author: '저자 9', category: '카테고리 9' },
        { id: 10, title: '책 제목 10', author: '저자 10', category: '카테고리 10' }// 5개의 책 정보를 넣어주세요
      ];
      return (
        <Shelf
          onBookClick={handleBookClick}
          books={booksOnShelf1.slice(
            (currentPage - 1) * 10,
            currentPage * 10
          )} // 페이지네이션 적용
        />
      );
    } else if (currentShelf === 2) {
      // 두 번째 책장 구성
      const booksOnShelf2 = [
        { id: 6, title: '책 제목 6', author: '저자 6', category: '카테고리 6' },
        { id: 7, title: '책 제목 7', author: '저자 7', category: '카테고리 7' },
        { id: 8, title: '책 제목 8', author: '저자 8', category: '카테고리 8' },
        { id: 9, title: '책 제목 9', author: '저자 9', category: '카테고리 9' },
        { id: 10, title: '책 제목 10', author: '저자 10', category: '카테고리 10' },// 5개의 책 정보를 넣어주세요
        { id: 1, title: '책 제목 1', author: '저자 1', category: '카테고리 1' },
        { id: 2, title: '책 제목 2', author: '저자 2', category: '카테고리 2' },
        { id: 3, title: '책 제목 3', author: '저자 3', category: '카테고리 3' },
        { id: 4, title: '책 제목 4', author: '저자 4', category: '카테고리 4' },
        { id: 5, title: '책 제목 5', author: '저자 5', category: '카테고리 5' },// 5개의 책 정보를 넣어주세요
        // ... (두 번째 책장의 책 리스트)
      ];
      return (
        <Shelf
          onBookClick={handleBookClick}
          books={booksOnShelf2.slice(
            (currentPage - 1) * 10,
            currentPage * 10
          )} // 페이지네이션 적용
        />
      );
    } else if (currentShelf === 3) {
      // 세 번째 책장 구성
      const booksOnShelf3 = [
        { id: 6, title: '책 제목 6', author: '저자 6', category: '카테고리 6' },
        { id: 7, title: '책 제목 7', author: '저자 7', category: '카테고리 7' },
        { id: 1, title: '책 제목 1', author: '저자 1', category: '카테고리 1' },
        { id: 2, title: '책 제목 2', author: '저자 2', category: '카테고리 2' },
        { id: 3, title: '책 제목 3', author: '저자 3', category: '카테고리 3' },
        { id: 4, title: '책 제목 4', author: '저자 4', category: '카테고리 4' },
        { id: 5, title: '책 제목 5', author: '저자 5', category: '카테고리 5' },// 5개의 책 정보를 넣어주세요
        { id: 8, title: '책 제목 8', author: '저자 8', category: '카테고리 8' },
        { id: 9, title: '책 제목 9', author: '저자 9', category: '카테고리 9' },
        { id: 10, title: '책 제목 10', author: '저자 10', category: '카테고리 10' },// 5개의 책 정보를 넣어주세요
        // ... (세 번째 책장의 책 리스트)
      ];
      return (
        <Shelf
          onBookClick={handleBookClick}
          books={booksOnShelf3.slice(
            (currentPage - 1) * 10,
            currentPage * 10
          )} // 페이지네이션 적용
        />
      );
    }
  };

  return (
    <div>
      <div className="mb-4 flex justify-center">
        <h1>Navbar Navbar Navbar Navbar Navbar Navbar Navbar Navbar Navbar </h1>
      </div>
      <div className="mb-4 flex justify-center">
        <button
          className={`mr-2 p-2 ${currentShelf === 1 ? 'text-2xl' : 'text-sm'}`}
          onClick={() => changeShelf(1)}
        >
          찜한 책
        </button>
        <button
          className={`mr-2 p-2 ${currentShelf === 2 ? 'text-2xl' : 'text-sm'}`}
          onClick={() => changeShelf(2)}
        >
          읽고 있는 책
        </button>
        <button
          className={`p-2 ${currentShelf === 3 ? 'text-2xl' : 'text-sm'}`}
          onClick={() => changeShelf(3)}
        >
          다 읽은 책
        </button>
      </div>
      <div className="flex justify-center items-center"> {/* Flexbox를 사용하여 가운데 정렬 */}
        <div className="mr-4">
          <img
            src="src/assets/images/prevBtn.svg"
            onClick={handlePrevPage}
            className="w-10 cursor-pointer m-6"
          />
        </div>
        <div>
          {renderShelf()}
        </div>
        <div className="ml-4">
          <img
            src="src/assets/images/nextBtn.svg"
            onClick={handleNextPage}
            className="w-10 cursor-pointer m-6"
          />
        </div>
      </div>

      {selectedBook && <BookModal book={selectedBook} closeModal={closeModal} />}
    </div>
  );
};

export default BookShelf;