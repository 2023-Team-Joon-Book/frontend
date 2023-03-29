import React from "react";
import NavigationBar from "../components/NavigationBar";
import Header from "../components/Header";
import "../scss/MyShelf.scss";

function EndShelf() {
  const finished = [
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
        {finished?.map((e) => (
          <div className="book">{e.image}</div>
        ))}
      </div>
      <div className="navbar">
        <NavigationBar />
      </div>
    </div>
  );
}

export default EndShelf;
