import React from 'react';
import MainSlider from '../components/main/MainSlider';
import ReverseSlider from '../components/main/ReverseSlider';
import Header from '../components/main/Header';

const MainPage: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen justify-between pb-96">
            <div className="relative z-60">
                <Header />
            </div>

            <div className="flex flex-col mt-auto" style={{ marginTop: '42vh' }}>
                <MainSlider />
            </div>

            <ReverseSlider />
        </div>
    );
}

export default MainPage;

