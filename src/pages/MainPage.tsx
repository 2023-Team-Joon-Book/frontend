import React from 'react';
import MainSlider from '../components/main/MainSlider';
import ReverseSlider from '../components/main/ReverseSlider';

const MainPage: React.FC = () => {
    return (
        <div >
            <MainSlider />
            <ReverseSlider />
        </div>
    );
}

export default MainPage;
