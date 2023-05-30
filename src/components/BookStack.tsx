import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Book {
  id: number;
  title: string;
  left: number;
  top: number;
  color: string;
  textColor: string;
}

const BookStack = () => {
  const [books, setBooks] = useState<Book[]>([]);

  const handleResize = () => {
    setBooks(prevBooks => {
      return prevBooks.map((book, index) => ({
        ...book,
        left: Math.min(Math.max(book.left, 0), window.innerWidth - 150),
        top: Math.min(Math.max(book.top, 0), window.innerHeight - 23 - index * 2),
      }));
    });
  };

  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/readings/1?status=READ')
      .then(response => {
        const booksData = response.data.map((bookData: any, index: number) => ({
          id: bookData.id,
          title: bookData.title,
          left: Math.floor(window.innerWidth * 0.5 - 75 + Math.random() * 100),
          top: Math.floor(window.innerHeight * 0.03 + (window.innerHeight * 0.033 * index) - 20),
          color: index % 2 === 0 ? 'DCF1EB' : '75C8B0',
          textColor: index % 2 === 0 ? '#000000' : '#FFFFFF',
        }));

        setBooks(booksData);
      })
      .catch(error => {
        console.error('Error fetching books', error);
      });
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    handleResize();
  }, []);

  return (
    <div className="relative">
      {books.map((book, index) => (
        <div
          key={book.id}
          className="absolute flex items-center justify-center shadow-md rounded-md"
          style={{
            width: 150,
            height: 23,
            left: book.left - 150 / 2,
            top: book.top + index * 2,
            transition: 'all 0.5s',
            zIndex: 20 - index,
            overflow: 'hidden',
            backgroundColor: `#${book.color}`,
            color: book.textColor,
          }}
        >
          <span className="text-sm text-center">{book.title}</span>
        </div>
      ))}
    </div>
  );
};

export default BookStack;

