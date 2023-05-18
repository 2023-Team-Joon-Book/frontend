import React from 'react';
import NavigationBar from '../components/NavigationBar';
import BookStack from '../components/BookStack';
import '../scss/MyShelf.scss';
import BookStackHeader from '../components/BookStackHeader';

export default function Statistics() {
  return (
    <div>
      <div>
        <BookStackHeader/>
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
