import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Book {
  id: number;
  title: string;
  author: string;
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
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const calculateHeight = (pages: number) => {
    const minPages = 0,
      maxPages = 1000;
    const minHeight = 10,
      maxHeight = 50;
    return (
      ((maxHeight - minHeight) * (pages - minPages)) / (maxPages - minPages) +
      minHeight
    );
  };

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/v1/readings/3?status=READING')
      .then((response) => {
        const booksData = response.data.map((bookData: any, index: number) => {
          const height = calculateHeight(bookData.pages);
          return {
            id: bookData.id,
            title: bookData.title,
            author: bookData.author,
            pages: bookData.pages,
            height,
            left: Math.floor(window.innerWidth * 0.5 - 75 + Math.random() * 100),
            top: Math.floor(
              window.innerHeight * 0.67 -
                window.innerHeight * 0.033 * index -
                height / 2
            ),
            color: index % 2 === 0 ? 'DCF1EB' : '75C8B0',
            textColor: index % 2 === 0 ? '#000000' : '#FFFFFF',
          };
        });
        setBooksData(booksData);
        console.log('Books Data:', booksData);
      })
      .catch((error) => {
        console.error('Error fetching books', error);
      });
  }, []);

  useEffect(() => {
    if (booksData.length > 0) {
      const interval = setInterval(() => {
        if (booksData.length > 0) {
          setBooks((prevBooks) => [booksData[0], ...prevBooks]);
          setBooksData((prevBooksData) => prevBooksData.slice(1));
        } else {
          clearInterval(interval);
        }
      }, 300);
      return () => clearInterval(interval);
    }
  }, [booksData]);

  const handleResize = () => {
    setBooks((prevBooks) => {
      return prevBooks.map((book, index) => ({
        ...book,
        left: Math.min(Math.max(book.left, 0), window.innerWidth - 150),
        top: Math.min(
          Math.max(book.top, 0),
          window.innerHeight - book.height - index * 1.2
        ),
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

  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
  };

  const closeModal = () => {
    setSelectedBook(null);
  };

  return (
    <div className="relative">
      {books.map((book, index) => (
        <div
          className="absolute"
          style={{
            height: book.height,
            width: 150,
            left: book.left - 150 / 2,
            top: book.top + index * 1.2,
            zIndex: books.length - index,
          }}
          key={book.id}
        >
          <div
            className="absolute flex items-center justify-center shadow-md rounded-md cursor-pointer"
            style={{
              width: '100%',
              height: '100%',
              transition: 'all 0.5s',
              overflow: 'hidden',
              backgroundColor: `#${book.color}`,
              color: book.textColor,
            }}
            onClick={() => handleBookClick(book)}
          >
            <span className="text-sm text-center flex-wrap overflow-hidden">{book.title}</span>
          </div>
        </div>
      ))}
      {selectedBook && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white max-w-md p-8 rounded-md">
            <h2 className="text-2xl font-bold mb-4">{selectedBook.title}</h2>
            <p className="text-sm mb-2">
              <strong>Author:</strong> {selectedBook.author}
            </p>
            <p className="text-sm mb-2">
              <strong>Pages:</strong> {selectedBook.pages}
            </p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookStack;
