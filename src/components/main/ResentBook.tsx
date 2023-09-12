import React from 'react';

interface BookProps {
    title: string;
    content: string;
}

const Book: React.FC<BookProps> = ({ title, content }) => (
    <div className="w-44">
        <div className="h-64 bg-gray-200 rounded-lg flex flex-col justify-center items-center text-xl font-semibold">
            책
        </div>
        <div className="mt-2 text-left">
            <div className="text-2xl mb-1 truncate">{title}</div>
            <div className="text-base text-gray-600 truncate">{content}</div>
        </div>
    </div>
);

export default function RecentBook() {
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
        <div className="flex justify-center space-x-8 w-full overflow-x-auto py-4">
            {books.map((book, index) => (
                <Book key={index} title={book.title} content={book.content} />
            ))}
        </div>
    );
}
