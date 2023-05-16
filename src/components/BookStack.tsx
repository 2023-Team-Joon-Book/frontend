import React, { useState, useEffect } from 'react';

const BookStack = () => {
  const [books, setBooks] = useState<{ id: number; width: number; left: number; top: number; }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (books.length >= 20) {
        clearInterval(interval);
        return;
      }

      const newBook = {
        id: books.length + 1,
        width: Math.floor(Math.random() * 100 + 150),
        left: Math.floor(Math.random() * (window.innerWidth - 200) + 100),
        top: Math.floor((window.innerHeight * 0.05 * books.length) + 20), // 5% 비율로 배치
      };

      setBooks(prevBooks => [newBook, ...prevBooks]);
    }, 700);

    return () => {
      clearInterval(interval);
    };
  }, [books]);

  return (
    <div className="relative">
      {books.map(book => (
        <div
          key={book.id}
          className="absolute bg-gray-300 shadow-md rounded-md"
          style={{
            width: book.width,
            height: 20,
            left: book.left,
            top: book.top,
            transition: 'all 0.5s',
          }}
        ></div>
      ))}
    </div>
  );
};

export default BookStack;
