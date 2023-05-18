import React, { useState, useEffect } from 'react';

const BookStack = () => {
  const [books, setBooks] = useState<{ id: number; width: number; left: number; top: number; color: string; text: string; textColor: string; }[]>([]);

  const handleResize = () => {
    setBooks(prevBooks => {
      // 화면 크기 변경 시, 책의 위치를 재조정하여 화면 내에 유지
      return prevBooks.map(book => ({
        ...book,
        left: Math.min(Math.max(book.left, 0), window.innerWidth - book.width),
        top: Math.min(Math.max(book.top, 0), window.innerHeight - 20),
      }));
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (books.length >= 20) {
        clearInterval(interval);
        return;
      }

      const newBook = {
        id: books.length + 1,
        width: 200, // 고정된 가로 크기 (변경 가능)
        left: Math.floor(window.innerWidth * 0.5 - 50 + Math.random() * 100), // 화면 가로 중앙에 배치
        top: Math.floor(window.innerHeight * 0.15 + (window.innerHeight * 0.03 * books.length) - 20), // 화면 위에서 23% 위로 쌓이도록 배치
        color: books.length % 2 === 0 ? 'DCF1EB' : '75C8B0',// 홀수/짝수 번째에 따라 색상 설정
        text: `파워레인저${books.length + 1}`, // 책 안에 들어가는 텍스트 설정
        textColor: books.length % 2 === 0 ? '#000000' : '#FFFFFF', // 홀수/짝수 번째에 따라 글씨 색상 설정
      };

      setBooks(prevBooks => [newBook, ...prevBooks]);
    }, 300);

    return () => {
      clearInterval(interval);
    };
  }, [books]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    handleResize(); // 초기 화면 크기 설정을 위해 한 번 호출
  }, []);

  return (
    <div className="relative">
      {books.map((book, index) => (
        <div
          key={book.id}
          className="absolute flex items-center justify-center shadow-md rounded-md"
          style={{
            width: book.width,
            height: 20,
            left: book.left - book.width / 2, // 중앙 정렬을 위해 width의 절반만큼 왼쪽으로 이동
            top: book.top + index * 2, // 책들이 겹치도록 간격 조정
            transition: 'all 0.5s',
            zIndex: 20 - index, // 쌓인 책의 zIndex를 조정하여 겹치게 함
            overflow: 'hidden', // 책이 짤리지 않도록 overflow 설정
            backgroundColor: `#${book.color}`, // 배경색 설정
            color: book.textColor, // 글씨 색상 설정
            // fontFamily: 'Jeju Gothic', // 폰트 설정
          }}
        >
          <span className="text-sm text-center">{book.text}</span>
        </div>
      ))}
    </div>
  );
};

export default BookStack;
