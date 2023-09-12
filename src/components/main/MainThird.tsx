import React, { FC } from 'react';
import PopularBook from './PopularBook';


const MainSecond: FC = () => {

    const headerStyle = {
        width: '100%', // 요소의 너비를 100%로 설정
        backgroundColor: 'white', // 배경색을 하얀색으로 설정
    };

    return (
        <div className="text-5xl indent-1 mt-60 text-center" style={headerStyle}>
            <div style={{ fontFamily: "bmfont" }} >
                <p className="text-5xl animate-pulse">인기있는 도서들을 </p>
                <p className="text-5xl animate-pulse">한 눈에 볼 수 있습니다</p>
                <div className='mt-8'>
                    <p className="text-2xl ">검색어 순위를 통해 뽑은</p>
                    <p className="text-2xl">인기 분야 책들을 확인해보세요</p>
                </div>
            </div>
            <div className="flex flex-col mt-auto" style={{ marginTop: '10vh' }}>
                <PopularBook />
            </div>
        </div>
    );
}

export default MainSecond;