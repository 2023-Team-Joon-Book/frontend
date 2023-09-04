import React from "react";
import BookRoundedIcon from "@mui/icons-material/BookRounded";
import InsightsIcon from "@mui/icons-material/Insights";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useNavigate } from "react-router-dom";

const navigationBarStyles = {
  position: "fixed",
  bottom: 0,
  left: 0,
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: "white",
  padding: "10px 40px",
  boxShadow: "0px -2px 4px rgba(0, 0, 0, 0.1)",
} as const; // Use 'as const' to specify the exact type of navigationBarStyles

export default function NavigationBar() {
  const navigate = useNavigate();

  return (
    <div style={navigationBarStyles}>
      <div>
        <BookRoundedIcon
          onClick={() => {
            navigate("/my/ing");
          }}
          style={{ color: "grey", fontSize: "30px" }}
        />
      </div>
      <div>
        <SearchRoundedIcon
          onClick={() => {
            navigate("/");
          }}
          style={{ color: "grey", fontSize: "30px" }}
        />
      </div>
      <div>
        <InsightsIcon
          onClick={() => {
            navigate("/my/activity");
          }}
          style={{ color: "#bfc66a", fontSize: "30px" }}
        />
      </div>
    </div>
  );
}
