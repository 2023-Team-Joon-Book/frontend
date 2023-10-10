// RecentlyViewedBooks.tsx
import React from 'react';
import Swipe from './swiper/Swipe';

interface ResentBooksProps {
    onSwipeClick: (index: number) => void;
    active: boolean;
}

const ResentBooks: React.FC<ResentBooksProps> = ({ onSwipeClick, active }) => {
    return (
        <Swipe
            index={0}
            onSwipeClick={onSwipeClick}
            active={active}
            title="최근 출시작"
            name={['제목 1',
                '제목 2',
                '제목 3',
                '제목 4',
                '제목 5',
                '제목 6',
                '제목 7',
                '제목 8',
                '제목 9',
                '제목 10',
                '제목 11',
                '제목 12',
                '제목 13',
                '제목 14',]}
            author={['저자 1',
                '저자 2',
                '저자 3',
                '저자 4',
                '저자 5',
                '저자 6',
                '저자 7',
                '저자 8',
                '저자 9',
                '저자 10',
                '저자 11',
                '저자 12',
                '저자 13',
                '저자 14',]}
            publisher={['출판사 1',
                '출판사 2',
                '출판사 3',
                '출판사 4',
                '출판사 5',
                '출판사 6',
                '출판사 7',
                '출판사 8',
                '출판사 9',
                '출판사 10',
                '출판사 11',
                '출판사 12',
                '출판사 13',
                '출판사 14',]}
            pages={['쪽수 1',
                '쪽수 2',
                '쪽수 3',
                '쪽수 4',
                '쪽수 5',
                '쪽수 6',
                '쪽수 7',
                '쪽수 8',
                '쪽수 9',
                '쪽수 10',
                '쪽수 11',
                '쪽수 12',
                '쪽수 13',
                '쪽수 14',]}
        />
    );
}

export default ResentBooks;
