import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Book {
  id: number;
  title: string;
  pages: number;
  left: number;
  top: number;
  color: string;
  textColor: string;
  height: number;
}

const BookStack = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [booksData, setBooksData] = useState<Book[]>([]);

  const calculateHeight = (pages: number) => {
    const minPages = 0, maxPages = 500;
    const minHeight = 5, maxHeight = 50;

    // pages 값에 따른 적절한 height 값을 계산합니다.
    return ((maxHeight - minHeight) * (pages - minPages) / (maxPages - minPages)) + minHeight;
  };

  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/readings/1?status=READ')
      .then(response => {
        const booksData = response.data.map((bookData: any, index: number) => {
          const height = calculateHeight(bookData.pages); // 페이지 수에 따라 책의 높이를 계산합니다.
          return {
            id: bookData.id,
            title: bookData.title,
            pages: bookData.pages,
            height,
            left: Math.floor(window.innerWidth * 0.5 - 75 + Math.random() * 100),
            top: Math.floor(window.innerHeight * 0.67 - (window.innerHeight * 0.033 * index) - height / 2),
            color: index % 2 === 0 ? 'DCF1EB' : '75C8B0',
            textColor: index % 2 === 0 ? '#000000' : '#FFFFFF',
          };
        });
        setBooksData(booksData);
        console.log('Books Data:', booksData);
      })
      .catch(error => {
        console.error('Error fetching books', error);
      });
  }, []);

  useEffect(() => {
    if (booksData.length > 0) {
      const interval = setInterval(() => {
        if (booksData.length > 0) {
          setBooks(prevBooks => [booksData[0], ...prevBooks]);
          setBooksData(prevBooksData => prevBooksData.slice(1));
        } else {
          clearInterval(interval);
        }
      }, 300);
      return () => clearInterval(interval);
    }
  }, [booksData]);

  const handleResize = () => {
    setBooks(prevBooks => {
      return prevBooks.map((book, index) => ({
        ...book,
        left: Math.min(Math.max(book.left, 0), window.innerWidth - 150),
        top: Math.min(Math.max(book.top, 0), window.innerHeight - book.height - index * 1.2),
      }));
    });
  };

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
            height: book.height,
            left: book.left - 150 / 2,
            top: book.top + index * 1.2,
            transition: 'all 0.5s',
            zIndex: books.length - index,
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
