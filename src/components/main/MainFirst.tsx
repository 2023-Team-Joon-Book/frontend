import React, { FC } from 'react';
import MainSlider from './MainSlider';
import ReverseSlider from './ReverseSlider';


const MainFirst: FC = () => {

    const headerStyle = {
        width: '100%', // 요소의 너비를 100%로 설정
        backgroundColor: 'white', // 배경색을 하얀색으로 설정
    };

    return (
        <div className=" indent-1 mt-60 text-center" style={headerStyle}>
            <div >
                <p className="font-semibold text-5xl ">당신을 기다리는</p>
                <p className="font-semibold text-5xl ">15만 권의 도서</p>
                <div className='mt-8'>
                    <p className="text-2xl ">첫 달 무료 구독을 통해</p>
                    <p className="text-2xl">어떤 도서가 있는지 확인해보세요</p>
                </div>
                <div className="flex flex-col mt-auto" style={{ marginTop: '10vh' }}>
                    <MainSlider />
                </div>
                <div style={{ marginTop: "20px" }}>
                    <ReverseSlider />
                </div>
            </div>
        </div>
    );
}

export default MainFirst;
