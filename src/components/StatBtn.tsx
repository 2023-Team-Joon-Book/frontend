import axios from "axios";
import Button from "@mui/material/Button";
import { ThemeProvider, createTheme } from "@mui/material/styles";

interface MyBook {
  bookId: number;
  lastPage: number;
  status: string;
}

function StatBtn({ id }: { id: number }) {
  localStorage.setItem("id", "3");
  const user = localStorage.getItem("id");

  const handlePostData = async () => {
    const data: MyBook = {
      bookId: id,
      lastPage: 0,
      status: "READING",
    };

    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/readings/${user}`,
        data
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSendData = async () => {
    const data: MyBook = {
      bookId: id,
      lastPage: 0,
      status: "READ",
    };

    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/readings/${user}`,
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
  return (
    <ThemeProvider theme={buttonFont}>
      <Button variant="text" onClick={handlePostData}>
        읽어보기
      </Button>
      <Button variant="text" onClick={handleSendData}>
        기록하기
      </Button>
    </ThemeProvider>
  );
}

export default StatBtn;
