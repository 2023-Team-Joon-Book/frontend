// ResentBooks.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ResentSwipe from './swiper/ResentSwipe';

interface ResentBooksProps {
    onSwipeClick: (index: number) => void;
    active: boolean;
}

interface Book {
    title: string;
    author: string;
    publisher: string;
    pages: number;
    category: string;
}

const ResentBooks: React.FC<ResentBooksProps> = ({ onSwipeClick, active }) => {
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        // Define an async function
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/books/new');
                // Update state with fetched books
                setBooks(response.data.data.content);
            } catch (error) {
                console.error("Error fetching data: ", error);
                // Handle error accordingly
            }
        };
        // Call the async function
        fetchBooks();
    }, []); // Empty dependency array means this useEffect runs once when component mounts

    return (
        <ResentSwipe
            index={0}
            onSwipeClick={onSwipeClick}
            active={active}
            title="최근 출시작"
            name={books.map(book => book.title)}
            author={books.map(book => book.author)}
            publisher={books.map(book => book.publisher)}
            pages={books.map(book => book.pages.toString())}

        />
    );
}

export default ResentBooks;
