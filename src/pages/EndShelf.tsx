import React, { useState, useEffect } from "react";
import NavigationBar from "../components/NavigationBar";
import Header from "../components/Header";
import "../scss/MyShelf.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Data {
  id: number;
  author: string;
  cover_image_url: string;
  height: number;
  publisher: string;
  thickness: number;
  title: string;
  width: number;
}

function EndShelf() {
  const navigate = useNavigate();
  const [data, setData] = useState<Data[]>();

  localStorage.setItem('id', '3');
  const user = localStorage.getItem('id');

  // 읽은 책 조회 
  const allList = async () => {
    const response = await axios.get(`http://localhost:8080/api/v1/readings/${user}?status=READ`)
    setData(response.data)
    return response.data;
  }

  // 컴포넌트가 실행될 때 바로 보이게 
  useEffect(() => {
    const getAllList = async () => {
      const allBookList = await allList();
      if (allBookList) setData(allBookList);
    };
    getAllList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // [] 안에 있는 값이 바뀔 때마다 useEffect 호출 

  const handleBookClick = (bookId: number) => {
    console.log(bookId); // Here
    navigate(`/book/${bookId}`);
  };

  return (
    <div className="std">
      <div>
        <Header />
      </div>
      <div className="container max-h-[calc(100vh-200px)] overflow-y-auto">
        {data?.map((e) => (<div
          onClick={() => handleBookClick(e.id)}
          key={e.id}
          className="book_link"
        >
          <img className="book" src={e.cover_image_url} alt="이미지" />
        </div>
        ))}
      </div>
      <div className="navbar">
        <NavigationBar />
      </div>
    </div>
  );
}

export default EndShelf;
