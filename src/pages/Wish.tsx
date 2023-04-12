import React,{useState, useEffect} from "react";
import NavigationBar from "../components/NavigationBar";
import Header from "../components/Header";
import "../scss/MyShelf.scss";
import axios from "axios";

interface Data {
  id: number;
  author: string;
  coverImageUrl: string;
  height: number;
  publisher: string;
  thickness: number;
  title: string;
  width: number;
}

function WishShelf() {
  const [data, setData] = useState<Data[]>();

  localStorage.setItem('id', '4');
  const user = localStorage.getItem('id');

  // 읽는 책 조회 
  const allList = async () =>{
    const response = await axios.get(`http://localhost:8080/api/v1/readings/${user}?status=UNREAD`)
    setData(response.data)
    return response.data;
  }

  // 컴포넌트가 실행될 때 바로 보이게 
  useEffect(()=>{
    const getAllList = async () =>{
      const allBookList = await allList();
      if(allBookList) setData(allBookList);
    };
    getAllList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // [] 안에 있는 값이 바뀔 때마다 useEffect 호출 

  return (
    <div className="std">
      <div>
        <Header />
      </div>
      <div className="container">
        {data?.map((e) => (
          <div className="book"><img src={e.coverImageUrl} alt="이미지" /></div>
        ))}
      </div>
      <div className="navbar">
        <NavigationBar />
      </div>
    </div>
  );
}

export default WishShelf;
