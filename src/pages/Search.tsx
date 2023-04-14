import React, { useState } from "react";
import "../scss/Search.scss";
import { faHeart, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavigationBar from "../components/NavigationBar";
import axios from "axios";

function Search() {
  const [keyWord, setKeyWord] = useState("");
  const [bookList, setBookList] = useState([{
    author: "",
    coverImageUrl: "",
    height: 0,
    publisher: "",
    thickness: 0, 
    title: "",
    width: 0
    }
  ])

  // const bookList = [
  //   {
  //     image: "image",
  //     title: "Guy",
  //     author: "Jowwita Bydlowska",
  //   },

  //   {
  //     image: "image",
  //     title: "Guy",
  //     author: "Jowwita Bydlowska",
  //   },

  //   {
  //     image: "image",
  //     title: "Guy",
  //     author: "Jowwita Bydlowska",
  //   },
  // ];
  //  {
  //     author: String,
  //     coverImageUrl: String,
  //     height: Number,
  //     publisher: String,
  //     thickness: Number, 
  //     title: String,
  //     width: Number
  //   }
  
  const onChange = (e: any) => {
    setKeyWord(e.target.value)
  }
  const onClick = async() => {
    const response = await axios.get(`http://localhost:8080/api/v1/books/search?title=${keyWord}`)
    setBookList(response.data)
    console.log(response.data)
  }

  return (
    <div className="backgroundStyle">
      <div className="searchBar">
        <input
          className="textInput"
          onChange={onChange}
          placeholder="원하시는 책 이름을 검색해보세요"
        />
        <FontAwesomeIcon
          className="searchIcon"
          icon={faSearch}
          color="gray"
          size="2x"
          onClick={onClick}
        />
      </div>

      {bookList?.map((e) => (
        <div className="listBox">
          <img className="image" src={e.coverImageUrl} alt="이미지"></img>
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
