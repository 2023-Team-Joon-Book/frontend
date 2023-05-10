import * as React from "react";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import "../scss/Search.scss";

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
          width: "fit-content",
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
          <ListItemText
            onClick={() => {
              if (`${text}` === "읽어보기") {
                navigate(`/book/${title}`, {
                  state: {
                    coverImageUrl: `${coverImageUrl}`,
                    title: `${title}`,
                    author: `${author}`,
                    //progress: `${page}`
                  },
                });
              }
            }}
            primary={`${text}`}
            style={{
              color: "white",
            }}
          />
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
      </List>
    </ThemeProvider>
  );
}

export default StatusButton;
