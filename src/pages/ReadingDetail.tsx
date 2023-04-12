import React,{useState, useEffect} from "react";
import NavigationBar from "../components/NavigationBar";
import Header from "../components/Header";
// import "../scss/MyShelf.scss";
import { useParams } from 'react-router-dom';
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

function ReadingDetail() {
    let { id } = useParams();
    const [data, setData] = useState<Data>();

    const book = async () =>{
        const response = await axios.get(`http://localhost:8080/api/v1/books/${id}`)
        setData(response.data)
        console.log(response.data)
    }

    useEffect(() => {
        book();
    }, []);
    
    return (
    <div className="std">
        <div>
        <Header />
        </div>
        <div className="container">
            {data?.title}
            {data?.author}
            {data?.publisher}
            {data?.coverImageUrl}
        </div>
        <div className="navbar">
        <NavigationBar />
        </div>
    </div>
    );
}
    
    export default ReadingDetail;
    