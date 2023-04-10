import React,{useState, useEffect} from "react";
import NavigationBar from "../components/NavigationBar";
import Header from "../components/Header";
import "../scss/MyShelf.scss";
import axios from "axios";

function ReadingShelf() {
  const [bookList, setBookList] = useState([
    {
      author: "",
      coverImageUrl: "",
      height: 0,
      publisher: "",
      thickness: 0, 
      title: "",
      width: 0
      }
  ]);
  // const reading = [
  //   {
  //     image: "image",
  //     title: "Guy",
  //     author: "Jowwita Bydlowska",
  //   },

  //   {
  //     image: "image",
  //     title: "Guy",
  //     author: "Jowwita Bydlowska",
  //   },

  //   {
  //     image: "image",
  //     title: "Guy",
  //     author: "Jowwita Bydlowska",
  //   },

  //   {
  //     image: "image",
  //     title: "Guy",
  //     author: "Jowwita Bydlowska",
  //   },
  // ];
  localStorage.setItem('id', '4');
  const user = localStorage.getItem('id');

  // 읽는 책 조회 
  const allList = async () =>{
    const response = await axios.get(`http://localhost:8080/api/v1/readings/${user}?status=READING`)
    setBookList(response.data)
    return response.data;
    console.log(response.data)
  }

  // 컴포넌트가 실행될 때 바로 보이게 
  useEffect(()=>{
    const getAllList=async () =>{
      const allBookList = await allList();
      if(allBookList) setBookList(allBookList);
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
        {bookList?.map((e) => (
          <img className="book" src={e.coverImageUrl} alt="이미지" />
        ))}
      </div>
      <div className="navbar">
        <NavigationBar />
      </div>
    </div>
  );
}

export default ReadingShelf;
