import React from 'react';
import book1 from '../../../public/img/book1.png';
import book2 from '../../../public/img/book2.png';
import book3 from '../../../public/img/book3.png';
import book4 from '../../../public/img/book4.png';
import book5 from '../../../public/img/book5.png';
import book6 from '../../../public/img/book6.png';
import book7 from '../../../public/img/book7.png';
import book8 from '../../../public/img/book8.png';
import book9 from '../../../public/img/book9.png';
import book10 from '../../../public/img/book10.png';
import book11 from '../../../public/img/book11.png';
import book12 from '../../../public/img/book12.png';

const img = [
    { imgSrc: book1, },
    { imgSrc: book2, },
    { imgSrc: book3, },
    { imgSrc: book4, },
    { imgSrc: book5, },
    { imgSrc: book6, },
    { imgSrc: book7, },
    { imgSrc: book8, },
    { imgSrc: book9, },
    { imgSrc: book10, },
    { imgSrc: book11, },
    { imgSrc: book12, },
];

interface BookProps {
    title: string;
    content: string;
}

const Book: React.FC<BookProps> = ({ title, content }) => (
    <div className="w-44">
        <img className="h-64 bg-gray-200 rounded-lg flex flex-col 
        justify-center " alt="iPhone_01" src="img/book3.png">
        </img>
        <div className="mt-2 text-left">
            <div className="text-2xl mb-1 truncate">{title}</div>
            <div className="text-base text-gray-600 truncate">{content}</div>
        </div>
    </div>
);

export default function PopularBook() {
    const books = [
        { title: '책 1', content: '내용 1' },
        { title: '책 2', content: '내용 2' },
        { title: '책 3', content: '내용 3' },
        { title: '책 4', content: '내용 4' },
        { title: '책 5', content: '내용 5' },
        { title: '책 6', content: '내용 6' },
        { title: '책 7', content: '내용 7' },
    ];

    return (
        <div className="py-4">
            <h2 className="text-3xl  mb-8 text-center" style={{ fontFamily: "bmfont" }} >인기있는 도서</h2>
            <div className="flex justify-center space-x-8 w-full overflow-x-auto">

                {books.map((book, index) => (
                    <Book key={index} title={book.title} content={book.content} />
                ))}
            </div>
        </div>
    );
}
