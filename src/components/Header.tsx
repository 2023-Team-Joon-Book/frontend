import * as React from "react";
// import BookRoundedIcon from "@mui/icons-material/BookRounded";
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import InsightsIcon from "@mui/icons-material/Insights";
// import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useNavigate } from "react-router-dom";

export default function NavigationBar() {
  const navigate = useNavigate();

  return (
    <div>
      <h2
        style={{
          display: "flex",
          justifyContent: "flex-start",
          marginLeft: "50px",
        }}
      >
        내 서재
      </h2>
      <div style={{ height: "2px", background: "#BFC66A" }}></div>
      <div
        style={{
          display: "flex",
          textAlign: "center",
          justifyContent: "space-evenly",
          marginTop: "10px",
          marginBottom: "10px"
        }}
      >
        <div
          onClick={() => {
            navigate("/my/ing");
          }}
        >
          읽는 중
        </div>
        <div
          onClick={() => {
            navigate("/my/fin");
          }}
        >
          읽은 책
        </div>
        <div
          onClick={() => {
            navigate("/my/wish");
          }}
        >
          찜 목록
        </div>
      </div>
      <div style={{ height: "2px", background: "#BFC66A" }}></div>
    </div>
  );
}
