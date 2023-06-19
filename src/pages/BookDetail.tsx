import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

interface Book {
  id: number;
  author: string;
  coverImageUrl: string;
  height: number;
  pages: number;
  publisher: string;
  title: string;
  width: number;
}

function BookDetail() {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/books/${bookId}`);
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    };

    fetchBook();
  }, [bookId]);

  const goBack = () => {
    navigate(-1);
  };

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button onClick={goBack}>Go Back</button>
      <h2>{book.title}</h2>
      <p>Author: {book.author}</p>
      <p>Publisher: {book.publisher}</p>
      <p>Pages: {book.pages}</p>
      <img src={book.coverImageUrl} alt="Book Cover" />
    </div>
  );
}

export default BookDetail;
