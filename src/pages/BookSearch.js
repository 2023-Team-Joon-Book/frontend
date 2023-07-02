import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../scss/Search.scss";
import NavigationBar from "../components/NavigationBar";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";


interface BookList {
  id: number;
  author: string;
  coverImageUrl: string;
  height: number;
  publisher: string;
  thickness: number;
  title: string;
  width: number;
}

function BookSearch() {
  const [keyWord, setKeyWord] = useState("");
  const [bookList, setBookList] = useState<BookList[]>();

  const navigate = useNavigate();

  const onChange = (e: any) => {
    setKeyWord(e.target.value);
  };
  const onClick = async () => {
    const response = await axios.get(
      `http://localhost:8080/api/v1/books/search?title=${keyWord}`
    );
    setBookList(response.data);
    console.log(response.data);
  };

  return (
    <div className="backgroundStyle">
      <div className="searchBar">
        <input
          className="textInput"
          onChange={onChange}
          placeholder="원하는 책의 이름을 검색해보세요"
        />
        <div>
          <SearchRoundedIcon style={{ marginTop: "50%" }} onClick={onClick} />
        </div>
      </div>

      {bookList?.map(function (e) {
        return (
          <div className="listBox" key={e.id} onClick={() => {
            navigate(`/info/${e.id}`, {
              state: {
                coverImageUrl: `${e.coverImageUrl}`,
                title: `${e.title}`,
                publisher: `${e.publisher}`,
                author:`${e.author}`,
                id: `${e.id}`,
              }
            })
          }}>
            <img
              style={{
                maxWidth: "80px",
                maxHeight: "100px",
                position: "static",
                float: "inline-start",
                marginTop: "5px",
                marginLeft: "5px",
              }}
              src={`${e.coverImageUrl}`}
              alt="책 이미지"
            ></img>
            <div className="bookInfo">
              <div className="title"> {e.title} </div>
              <div className="author">{e.author}</div>
            </div>
            <div className="btns_layout">
              {/* <div className="buttonLayout">
                <StatusButton
                  id={bookList[i].id}
                  title={bookList[i].title}
                  author={bookList[i].author}
                  coverImageUrl={bookList[i].coverImageUrl}
                />
              </div> */}
            </div>
          </div>
        );
      })}
      <div className="navigationBar">
        <NavigationBar />
      </div>
    </div>
  );
}

export default BookSearch;
