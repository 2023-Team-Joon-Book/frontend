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
    { imgSrc: book1 },
    { imgSrc: book2 },
    { imgSrc: book3 },
    { imgSrc: book4 },
    { imgSrc: book5 },
    { imgSrc: book6 },
    { imgSrc: book7 },
    { imgSrc: book8 },
    { imgSrc: book9 },
    { imgSrc: book10 },
    { imgSrc: book11 },
    { imgSrc: book12 },
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
            alt="도서 표지"
            src={imgSrc}
        />
        <div className="mt-2 text-left">
            <div className="text-2xl mb-1 truncate">{title}</div>
            <div className="text-base text-gray-600 truncate">{content}</div>
        </div>
    </div>
);

export default function PopularBook() {
    const books = [
        { title: '책 6', content: '내용 6', imgSrc: book6 },
        { title: '책 7', content: '내용 7', imgSrc: book7 },
        { title: '책 8', content: '내용 8', imgSrc: book8 },
        { title: '책 9', content: '내용 9', imgSrc: book9 },
        { title: '책 10', content: '내용 10', imgSrc: book10 },
        { title: '책 11', content: '내용 11', imgSrc: book11 },
        { title: '책 12', content: '내용 12', imgSrc: book12 },
    ];

    return (
        <div className="py-4">
            <h2 className="text-3xl mb-8 text-center" style={{ fontFamily: "bmfont" }}>인기있는 도서</h2>
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
