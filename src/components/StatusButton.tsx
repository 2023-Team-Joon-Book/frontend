import * as React from "react";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import "../scss/Search.scss";

function StatusButton({
  id,
  title,
  author,
  image,
}: {
  id: number;
  title: string;
  author: string;
  image: string;
}) {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState("읽어보기");
  const handleClick = () => {
    setText("읽어보기");
    setOpen(!open);
  };
  return (
    <List
      sx={{
        height: "fit-content",
        bgcolor: "#bfc66a",
        borderRadius: "20px",
        paddingTop: 0,
        paddingBottom: 0,
      }}
      component="nav"
    >
      <ListItemButton
        onClick={handleClick}
        style={{ paddingTop: 0, paddingBottom: 0, color: "white" }}
      >
        <ListItemText
          onClick={() => {
            if (`${text}` === "읽어보기") {
              navigate(`/book/${title}`, {
                state: {
                  image: `${image}`,
                  title: `${title}`,
                  author: `${author}`,
                  //progress: `${page}`
                },
              });
            }
          }}
          primary={`${text}`}
          style={{ color: "white" }}
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
            style={{ paddingTop: 0, paddingBottom: 0 }}
          >
            <ListItemText primary="기록하기" style={{ color: "white" }} />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}

export default StatusButton;
