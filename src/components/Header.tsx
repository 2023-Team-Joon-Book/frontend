import * as React from "react";
import { useNavigate } from "react-router-dom";
import Divider from "./Divider";
import "../scss/Header.scss";

export default function NavigationBar() {
  const navigate = useNavigate();

  return (
    <div className="head_frame">
      <div className="head_title">내 서재</div>
      <Divider />
      <div className="head_context"
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
      </div>
      <Divider />
    </div>
  );
}
