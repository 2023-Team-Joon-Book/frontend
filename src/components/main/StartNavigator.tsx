import React from 'react';

const StartNavigator: React.FC = () => (
    <div className="fixed left-1/2 bottom-8 transform -translate-x-1/2 z-50">
        <button className="w-80 h-16 rounded-full bg-opacity-80 bg-black flex items-center justify-center shadow-md">
            <div className=" text-white text-3xl" style={{ fontFamily: "bmfont" }}>시작하기</div>
        </button>
    </div>
);

export default StartNavigator;
