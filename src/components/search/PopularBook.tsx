// ResentBooks.tsx
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PopularSwipe from './swiper/PopularSwipe' // 추후 PopularSwipe 추가

interface PopularBooksProps {
  onSwipeClick: (index: number) => void
  active: boolean
}

interface Book {
  title: string
  author: string
  publisher: string
  cover_image_url: string
  pages: number
  category: string
}

const PopularBooks: React.FC<PopularBooksProps> = ({ onSwipeClick, active }) => {
  const [books, setBooks] = useState<Book[]>([])

  // useEffect(() => {
  //     // Define an async function
  //     const fetchBooks = async () => {
  //         try {
  //             const response = await axios.get('http://localhost:8081/api/v1/books/like');
  //             // Update state with fetched books
  //             setBooks(response.data.data.content);
  //         } catch (error) {
  //             console.error("Error fetching data: ", error);
  //             // Handle error accordingly
  //         }
  //     };
  //     // Call the async function
  //     fetchBooks();
  // }, []); // Empty dependency array means this useEffect runs once when component mounts

  return (
    <PopularSwipe
      index={0}
      onSwipeClick={onSwipeClick}
      active={active}
      title="Best 10"
      name={books.map((book) => book.title)}
      author={books.map((book) => book.author)}
      publisher={books.map((book) => book.publisher)}
      pages={books.map((book) => book.pages.toString())}
    />
  )
}

export default PopularBooks
