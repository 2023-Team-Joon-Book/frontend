import React from "react";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import { useNavigate, useLocation } from "react-router-dom";
import "../scss/BookDetail.scss";
import Divider from "../components/Divider";
import NavigationBar from "../components/NavigationBar";

function BookDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  function goback() {
    navigate("/");
  }
  const coverImageUrl = location.state.coverImageUrl;
  const title = location.state.title;
  const author = location.state.author;

  return (
    <div
      style={{
        width: "390px",
        height: "844px",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        justifyContent: "center",
      }}
    >
      <ArrowBackIosRoundedIcon
        onClick={goback}
        style={{
          color: "grey",
          position: "fixed",
          width: "30px",
          height: "fit-content",
          left: "3%",
          top: "2%",
        }}
      />
      <div className="context_layout">
        <img
          src={`${coverImageUrl}`}
          alt="책 이미지"
          className="bookimage"
        ></img>
        <div className="booktitle">{title}</div>
        <div className="bookauthor">{author}</div>
        <label className="booktext">출판사</label>

        <div className="divider_layout1">
          <Divider />
        </div>
        <div className="book_page">
          <label className="book_page_text">현재까지 읽은 페이지 수</label>
          <label className="book_page_num">p.47</label>
        </div>
        <div className="divider_layout2">
          <Divider />
        </div>
        <div className="navbar_layout">
          <NavigationBar />
        </div>
        {/* <text className="progress">
          {"<"}진행도{">"}
        </text> */}
      </div>
    </div>
  );
}

export default BookDetail;
