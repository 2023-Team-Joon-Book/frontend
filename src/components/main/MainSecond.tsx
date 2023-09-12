import React, { FC } from 'react';
import MainSlider from './MainSlider';
import ReverseSlider from './ReverseSlider';
import ResentBook from './ResentBook';


const MainSecond: FC = () => {

    const headerStyle = {
        width: '100%', // 요소의 너비를 100%로 설정
        backgroundColor: 'white', // 배경색을 하얀색으로 설정
    };

    return (
        <div className="text-5xl indent-1 mt-60 text-center" style={headerStyle}>
            <p className="font-bold">매일 신작 도서를</p>
            <p className="font-bold">구경하세요</p>
            <div className="flex flex-col mt-auto" style={{ marginTop: '20vh' }}>
                <ResentBook />
            </div>
        </div>
    );
}

export default MainSecond;