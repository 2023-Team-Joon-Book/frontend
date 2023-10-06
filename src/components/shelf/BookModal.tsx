import React from 'react';

interface BookModalProps {
    book: {
      title: string;
      author: string;
      category: string;
      image: string;
      pageCount: number; // 읽은 페이지 수 추가
    };
    closeModal: () => void;
  }
  
  const BookModal: React.FC<BookModalProps> = ({ book, closeModal }) => {
    return (
  

<div className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-gray-800 bg-opacity-50">
<div className="bg-white w-2/3 h-2/3 rounded-lg p-4 flex">
  <div className="w-1/3 p-4">
    <img
      src={book.image} // 책 이미지의 경로를 사용
      alt={book.title}
      className="w-full h-48 object-cover rounded-lg mb-4 shadow-lg"
    />
    <h2 className="text-xl font-bold mb-2">{book.title}</h2>
    <p className="text-gray-600">저자: {book.author}</p>
    <p className="text-gray-600">카테고리: {book.category}</p>
  </div>
  <div className="w-2/3 p-4">
    <h3 className="text-lg font-semibold mb-2">현재까지 읽은 페이지 수</h3>
    <p className="text-2xl font-bold">{book.pageCount} 페이지</p>
  </div>
  <button
    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer"
    onClick={closeModal}
  >
    닫기
  </button>
</div>
</div>
    );
  };
  
  export default BookModal;