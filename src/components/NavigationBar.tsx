import * as React from "react";
import BookRoundedIcon from "@mui/icons-material/BookRounded";
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
          style={{ color: "grey", fontSize: "30px" }}
        />
      </div>
    </div>
  );
}
