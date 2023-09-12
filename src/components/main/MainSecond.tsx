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
            <p className="font-semibold text-5xl ">매일 신작 도서를</p>
            <p className="font-semibold text-5xl ">구경하세요</p>
            <div className='mt-8'>
                <p className="text-2xl ">10년치 베스트셀러</p>
                <p className="text-2xl">신간 오디오북 장르 소설까지</p>
            </div>
            <div className="flex flex-col mt-auto" style={{ marginTop: '10vh' }}>
                <ResentBook />
            </div>
        </div>
    );
}

export default MainSecond;