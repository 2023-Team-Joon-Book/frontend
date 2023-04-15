import React from "react";
import "../scss/Search.scss";
import { faHeart, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavigationBar from "../components/NavigationBar";
import StatusButton from "../components/StatusButton";

function Search() {
  const bookList = [
    {
      id: 1,
      image: "image",
      title: "Guy",
      author: "Jowwita Bydlowska",
    },

    {
      id: 2,
      image: "image",
      title: "1984",
      author: "Jowwita Bydlowska",
    },

    {
      id: 3,
      image: "image",
      title: "Linear Mathematics",
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

      {bookList.map(function (e, i) {
        return (
          <div className="listBox">
            <div className="image">{e.image}</div>
            <div className="title">{e.title}</div>
            <FontAwesomeIcon
              className="heartIcon"
              icon={faHeart}
              color="#bfc66a"
              size="2x"
              width="fit-content"
            />
            <div className="author">{e.author}</div>
            <div className="buttonLayout">
              <StatusButton
                id={bookList[i].id}
                title={bookList[i].title}
                author={bookList[i].author}
                image={bookList[i].image}
                //progress
              />
            </div>
          </div>
        );
      })}

      <div className="verticleLine" />
      <div className="navigationBar">
        <NavigationBar />
      </div>
    </div>
  );
}

export default Search;
