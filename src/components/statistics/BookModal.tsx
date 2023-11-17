import React from 'react';

interface BookInfoModalProps {
    title: string;
    coverImageUrl: string;
    pages: number;
    onClose: () => void;
}

const BookInfoModal: React.FC<BookInfoModalProps> = ({ title, coverImageUrl, pages, onClose }) => {
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg shadow-xl" style={{ maxWidth: '500px', width: '100%' }}>
                <div className="flex justify-end">
                    <button onClick={onClose} className="text-black font-bold text-lg">&times;</button>
                </div>
                <div className="text-center">
                    <img src={coverImageUrl} alt={title} className="mx-auto w-1/2" />
                    <h2 className="text-2xl my-2" style={{ fontFamily: 'bmfont' }}>{title}</h2>
                    <p style={{ fontFamily: 'bmfont' }}>읽은 페이지 수: {pages}</p>
                </div>
            </div>
        </div>
    );
};

export default BookInfoModal;
