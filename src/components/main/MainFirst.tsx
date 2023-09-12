import React, { FC } from 'react';
import MainSlider from './MainSlider';
import ReverseSlider from './ReverseSlider';


const MainFirst: FC = () => {

    const headerStyle = {
        width: '100%', // 요소의 너비를 100%로 설정
        backgroundColor: 'white', // 배경색을 하얀색으로 설정
    };

    return (
        <div className="text-4xl indent-1 mt-60 text-center" style={headerStyle}>
            <div >
                <p className="font-bold">당신이 기억할</p>
                <p className="font-bold">1만권의 도서</p>
                <div className="flex flex-col mt-auto" style={{ marginTop: '20vh' }}>
                    <MainSlider />
                </div>
                <ReverseSlider />
            </div>
        </div>
    );
}

export default MainFirst;
