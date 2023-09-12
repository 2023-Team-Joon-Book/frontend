import React, { FC } from 'react';
import PopularBook from './PopularBook';


const MainSecond: FC = () => {

    const headerStyle = {
        width: '100%', // 요소의 너비를 100%로 설정
        backgroundColor: 'white', // 배경색을 하얀색으로 설정
    };

    return (
        <div className="text-5xl indent-1 mt-60 text-center" style={headerStyle}>
            <p className="font-bold">인기있는 도서들을</p>
            <p className="font-bold">한눈에 볼 수 있습니다</p>
            <div className="flex flex-col mt-auto" style={{ marginTop: '20vh' }}>
                <PopularBook />
            </div>
        </div>
    );
}

export default MainSecond;