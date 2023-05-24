import * as React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "../scss/Search.scss";

interface MyBook {
  bookId: number;
  lastPage: number;
  status: string;
}

function StatusButton({
  id,
  title,
  author,
  coverImageUrl,
}: {
  id: number;
  title: string;
  author: string;
  coverImageUrl: string;
}) {
  localStorage.setItem("id", "1");
  const user = localStorage.getItem("id");

  const handlePostData = async () => {
    const data: MyBook = {
      bookId: id,
      lastPage: 0,
      status: "READING",
    };

    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/readings/${user}
      `,
        data
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const buttonFont = createTheme({
    typography: {
      fontFamily: ["Jeju Gothic"].join(","),
    },
  });
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState("읽어보기");
  const handleClick = () => {
    setText("읽어보기");
    setOpen(!open);
  };
  return (
    <ThemeProvider theme={buttonFont}>
      <List
        sx={{
          position: "static",
          width: "114.88px",
          bgcolor: "#bfc66a",
          borderRadius: "20px",
          paddingTop: 0,
          paddingBottom: 0,
        }}
        component="nav"
      >
        <ListItemButton
          onClick={handleClick}
          style={{
            paddingTop: 0,
            paddingBottom: 0,
            color: "white",
          }}
        >
          <div onClick={handlePostData}>
            <ListItemText
              onClick={() => {
                if (`${text}` === "읽어보기" && open === false) {
                  navigate(`/book/${title}`, {
                    state: {
                      coverImageUrl: `${coverImageUrl}`,
                      title: `${title}`,
                      author: `${author}`,
                    },
                  });
                }
              }}
              primary={`${text}`}
              style={{
                color: "white",
              }}
            />
          </div>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              onClick={() => {
                setText("기록하기");
                setOpen(!open);
              }}
              sx={{
                paddingTop: 0,
                paddingBottom: 0,
              }}
            >
              <ListItemText
                primary="기록하기"
                sx={{
                  color: "white",
                }}
              />
            </ListItemButton>
          </List>
        </Collapse>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              onClick={() => {
                setText("찜 하기");
                setOpen(!open);
              }}
              sx={{
                paddingTop: 0,
                paddingBottom: 0,
              }}
            >
              <ListItemText
                primary="찜 하기"
                sx={{
                  color: "white",
                }}
              />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
      {/* <button onClick={handlePostData}>연동 테스트</button> */}
    </ThemeProvider>
  );
}

export default StatusButton;
