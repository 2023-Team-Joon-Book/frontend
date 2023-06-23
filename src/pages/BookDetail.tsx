import { useState, useEffect } from "react";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../scss/BookDetail.scss";
import Divider from "../components/Divider";
import NavigationBar from "../components/NavigationBar";
import DetailPercent from "../components/DetailPercent";

interface Book {
  id: number;
  author: string;
  coverImageUrl: string;
  height: number;
  pages: number;
  publisher: string;
  title: string;
  width: number;
}


function BookDetail() {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/books/${bookId}`);
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    };

    fetchBook();
  }, [bookId]);

  const goBack = () => {
    navigate(-1);
  };

  if (!book) {
    return <div>Loading...</div>;
  }

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
        onClick={goBack}
        style={{
          color: "grey",
          position: "fixed",
          width: "30px",
          height: "fit-content",
          left: "3%",
          top: "2%",
        }}
      />
      <div className="context_layout ">
        <img
          src={book.coverImageUrl}
          alt="책 이미지"
          className="bookimage, mx-auto mt-16"
        ></img>
        <div className="booktitle">{book.title}</div>
        <div className="bookauthor">작가: {book.author}</div>
        <label className="booktext">출판사: {book.publisher}</label>
        <div className="bookauthor">총 페이지 수: {book.pages}</div>
        <div className="divider_layout1">
          <Divider />
        </div>
        <div className="book_page">
          <DetailPercent totalPages={book.pages}/>
        </div>
        <div className="divider_layout2">
          <Divider />
        </div>
        {/* <div className="navbar_layout">
          <NavigationBar />
        </div> */}
        {/* <text className="progress">
          {"<"}진행도{">"}
        </text> */}
      </div>
    </div>
  );
}

export default BookDetail;
