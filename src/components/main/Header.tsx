import React, { FC } from 'react';
import logo from '../../../public/logo.png';

const Header: FC = () => {
    const headerStyle = {
        width: '100%', // 요소의 너비를 100%로 설정
        backgroundColor: 'white', // 배경색을 하얀색으로 설정
    };

    const imageStyle = {
        width: 'auto', // 이미지의 너비를 100%로 설정하여 가로 비율을 가득 채움
        height: '144px', // 이미지의 높이를 자동으로 조정하여 비율 유지
    };
    return (
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center" style={headerStyle}>
            <img
                src={logo}
                alt="Header Image"
                className="w-full" // 이미지의 가로 비율을 가득 채우기 위해 w-full로 설정
                style={imageStyle} // 이미지에도 스타일 적용
            />

        </div>
    );
}

export default Header;
