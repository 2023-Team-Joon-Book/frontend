import React from 'react';
import MainSlider from '../components/main/MainSlider';
import ReverseSlider from '../components/main/ReverseSlider';
import Header from '../components/main/Header';

const MainPage: React.FC = () => {
    return (
        <div className="flex flex-col h-screen justify-center">
            <Header />

            <div className="flex flex-col mt-96">
                <MainSlider />
            </div>

            <ReverseSlider />
        </div>
    );
}

export default MainPage;
