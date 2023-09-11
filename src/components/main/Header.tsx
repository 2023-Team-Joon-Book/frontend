import React, { FC } from 'react';
import logo from '../../../public/logo.png';

const Header: FC = () => {
    return (
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center">
            <img
                src={logo}
                alt="Header Image"
                className="w-auto h-36" // 이미지의 높이를 100픽셀로 설정합니다.
            />
            <div className="text-4xl indent-1 mt-24 text-center">
                <p>당신이 기억할</p>
                <p>1만권의 도서</p>
            </div>
        </div>
    );
}

export default Header;
