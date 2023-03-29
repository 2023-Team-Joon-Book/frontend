import React from "react";
import "../scss/Search.scss";
import { faHeart, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavigationBar from "../components/NavigationBar";

function Search() {
  const bookList = [
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
    <div className="backgroundStyle">
      <div className="searchBar">
        <input
          className="textInput"
          onChange={(e) => e.target.value}
          placeholder="원하시는 책 이름을 검색해보세요"
        />
        <FontAwesomeIcon
          className="searchIcon"
          icon={faSearch}
          color="gray"
          size="2x"
        />
      </div>

      {bookList?.map((e) => (
        <div className="listBox">
          <div className="image">{e.image}</div>
          <div className="info">
            <div className="title">{e.title}</div>
            <FontAwesomeIcon
              className="heartIcon"
              icon={faHeart}
              color="#BFC66A"
              size="2x"
              // onClick={}
            />
            <div className="author">{e.author}</div>
            <button className="selectButton">읽어 보기</button>
          </div>
        </div>
      ))}
      <div className="verticleLine" />
      <div className="navigationBar">
        <NavigationBar />
      </div>
    </div>
  );
}

export default Search;
