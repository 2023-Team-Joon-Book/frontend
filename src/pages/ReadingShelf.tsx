import React from "react";
import NavigationBar from "../components/NavigationBar";
import Header from "../components/Header";
import "../scss/MyShelf.scss";

function ReadingShelf() {
  const reading = [
    {
      image: "image",
      title: "Guy",
      author: "Jowwita Bydlowska",
    },

    {
      image: "image",
      title: "Guy",
      author: "Jowwita Bydlowska",
    },

    {
      image: "image",
      title: "Guy",
      author: "Jowwita Bydlowska",
    },

    {
      image: "image",
      title: "Guy",
      author: "Jowwita Bydlowska",
    },
  ];

  return (
    <div className="std">
      <div>
        <Header />
      </div>
      <div className="container">
        {reading?.map((e) => (
          <div className="book">{e.image}</div>
        ))}
      </div>
      <div className="navbar">
        <NavigationBar />
      </div>
    </div>
  );
}

export default ReadingShelf;
