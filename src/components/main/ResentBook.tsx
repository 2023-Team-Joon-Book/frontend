import React from 'react';
import book1 from '../../../public/img/book1.png';
import book2 from '../../../public/img/book2.png';
import book3 from '../../../public/img/book3.png';
import book4 from '../../../public/img/book4.png';
import book5 from '../../../public/img/book5.png';
import book6 from '../../../public/img/book6.png';
import book7 from '../../../public/img/book7.png';

const img = [
    { imgSrc: book1 },
    { imgSrc: book2 },
    { imgSrc: book3 },
    { imgSrc: book4 },
    { imgSrc: book5 },
    { imgSrc: book6 },
    { imgSrc: book7 },
];

interface BookProps {
    title: string;
    content: string;
    imgSrc: string;
}

const Book: React.FC<BookProps> = ({ title, content, imgSrc }) => (
    <div className="w-44">
        <img
            className="h-64 bg-gray-200 rounded-lg flex flex-col justify-center"
            alt="책 표지"
            src={imgSrc}
        />
        <div className="mt-2 text-left">
            <div className="text-2xl mb-1 truncate">{title}</div>
            <div className="text-base text-gray-600 truncate">{content}</div>
        </div>
    </div>
);

export default function RecentBook() {
    const books = [
        { title: '책 1', content: '내용 1', imgSrc: book1 },
        { title: '책 2', content: '내용 2', imgSrc: book2 },
        { title: '책 3', content: '내용 3', imgSrc: book3 },
        { title: '책 4', content: '내용 4', imgSrc: book4 },
        { title: '책 5', content: '내용 5', imgSrc: book5 },
        { title: '책 6', content: '내용 6', imgSrc: book6 },
        { title: '책 7', content: '내용 7', imgSrc: book7 },
    ];

    return (
        <div className="py-4">
            <h2 className="text-3xl mb-8 text-center" style={{ fontFamily: "bmfont" }}>최근 출시작</h2>
            <div className="flex justify-center space-x-8 w-full overflow-x-auto">
                {books.map((book, index) => (
                    <Book
                        key={index}
                        title={book.title}
                        content={book.content}
                        imgSrc={book.imgSrc}
                    />
                ))}
            </div>
        </div>
    );
}
