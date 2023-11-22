import axios from 'axios'
import { setISOWeek } from 'date-fns'
import React, { useState } from 'react'
import Swal from "sweetalert2";
import 'sweetalert2/src/sweetalert2.scss'

interface WritngProps {
  book: {
    author: string
    cover_image_url: string
    height: string
    id: number
    like_status: boolean
    likes: number
    pages: number
    publisher: string
    title: string
    width: number
    status: string
  }
  setIsWriting: (isWriting: boolean) => void
  viewReview: () => void
}

const Writng: React.FC<WritngProps> = ({ book, setIsWriting, viewReview }) => {
  const [editedLastPage, setEditedLastPage] = useState('') // 사용자가 입력한 페이지를 저장할 상태

  // 사용자가 페이지 입력란을 변경할 때 호출되는 함수
  const handleLastPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedLastPage(e.target.value)
  }

  // 리뷰 등록 api 요청
  async function registering() {
    const access = localStorage.getItem('accessToken')

    const requestData = {
      // 요청 본문 데이터 (필요에 따라 변경)
      book_id: book.id,
      content: editedLastPage,
      grade: 5,
      title: '제목',
    }

    try {
      const response = await axios.post('http://localhost:8080/api/v1/reviews', requestData, {
        headers: { Authorization: `Bearer ${access}` },
      })
      console.log(response);
      Swal.fire({
        title: "리뷰가 등록되었습니다! 🎉",
        icon: "success"
      });
      setIsWriting(false)
      viewReview()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex-col">
      <input
        defaultValue={editedLastPage}
        onChange={handleLastPageChange}
        placeholder="리뷰 내용(책에 대한 줄거리와 소감을 남겨보세요!)"
        className="w-full h-72 flex text-center text-2xl p-10"></input>
      <button
        onClick={() => {
          registering()
        }}
        className="text-lime-500 hover:text-lime-600 text-2xl ml-4 mt-2">
        등록하기
      </button>
    </div>
  )
}

export default Writng
