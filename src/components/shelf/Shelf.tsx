import React from 'react';

interface ShelfProps {
  onBookClick: (book: any) => void;
  books: any[]; // books 배열을 props로 받아오도록 수정
}

const Shelf: React.FC<ShelfProps> = ({ onBookClick, books }) => {
  return (
    <div>    
     <div className="w-1200 p-4 flex flex-wrap justify-center">
      {books.map((book) => (
        <div key={book.id} className="w-1/5 p-4 border-b-8 border-white shadow-bottom">
          <img
            src={`src/assets/images/${book.id}.png`} // 이미지 경로에 따라 수정하세요.
            alt={book.title}
            onClick={() => onBookClick(book)} // 책을 클릭하면 onBookClick 함수 호출
            className="cursor-pointer shadow-lg hover:shadow-2xl"
            style={{ width: '170px', height: '230px' }} // 이미지 크기 조정
          />
        </div>
      ))}
    </div>
  </div>
  );
};


export default Shelf;