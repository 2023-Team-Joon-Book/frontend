import React from 'react';
import NavigationBar from '../components/NavigationBar';
import BookStack from '../components/BookStack';
import '../scss/MyShelf.scss';
import BookStackHeader from '../components/StatisticsHeader';
import StatisticsToolbar from '../components/StatisticsToolbar';

export default function Statistics() {
  return (
    <div>
      <div>
        <BookStackHeader />
      </div>
      <div>
        <StatisticsToolbar />
      </div>
      <div className="navbar">
        <NavigationBar />
      </div>
      <div className="bookstack-container">
        <BookStack />
      </div>
    </div>
  );
}
