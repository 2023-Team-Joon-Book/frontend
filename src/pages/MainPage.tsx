import React from 'react';
import Header from '../components/main/Header';
import MainFirst from '../components/main/MainFirst';
import MainSecond from '../components/main/MainSecond';
import MainThird from '../components/main/MainThird';
import StartNavigator from '../components/main/StartNavigator';

const MainPage: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen justify-between pb-96">
            <div className="relative z-60">
                <Header />
            </div>
            <MainFirst />
            <MainSecond />
            <MainThird />
            <StartNavigator />
        </div>
    );
}

export default MainPage;

