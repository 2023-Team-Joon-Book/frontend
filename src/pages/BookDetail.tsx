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
  const image = location.state.image;
  const title = location.state.title;
  const author = location.state.author;
  //const progress
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
      <div className="bookimage">{image}</div>
      <div className="booktitle">{title}</div>
      <div className="bookauthor">{author}</div>
      <text className="booktext">출판사</text>

      <div className="divider_layout1">
        <Divider />
      </div>
      <text className="booktext_page">현재까지 읽은 페이지 수</text>
      <text className="bookpage">p.47</text>
      <div className="divider_layout2">
        <Divider />
      </div>
      <div className="navbar_layout">
        <NavigationBar />
      </div>
      <text className="progress">{"<"}진행도{">"}</text>
    </div>
  );
}

export default BookDetail;
