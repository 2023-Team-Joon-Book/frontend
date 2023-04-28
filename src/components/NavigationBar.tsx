import * as React from "react";
// import { useState } from "react";
// import BottomNavigation from "@mui/material/BottomNavigation";
// import BottomNavigationAction from "@mui/material/BottomNavigationAction";
// import RestoreIcon from '@mui/icons-material/Restore';
import BookRoundedIcon from "@mui/icons-material/BookRounded";
// import FavoriteIcon from '@mui/icons-material/Favorite';
import InsightsIcon from "@mui/icons-material/Insights";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useNavigate } from "react-router-dom";

export default function NavigationBar() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        textAlign: "center",
        justifyContent: "space-between",
        marginLeft: "40px",
        marginRight: "40px",
      }}
    >
      <div>
        <BookRoundedIcon
          onClick={() => {
            navigate("/my/ing");
          }}
          style={{ color: "grey", fontSize: "35px" }}
        />
      </div>
      <div>
        <SearchRoundedIcon
          onClick={() => {
            navigate("/");
          }}
          style={{ color: "grey", fontSize: "35px" }}
        />
      </div>
      <div>
        <InsightsIcon
          onClick={() => {
            navigate("/my/activity");
          }}
          style={{ color: "grey", fontSize: "35px" }}
        />
      </div>
    </div>
  );
}
