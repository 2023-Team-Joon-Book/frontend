import axios from 'axios'
import React, { useState } from 'react'
import StarRate from './StartRate'
import { baseInstance } from '../../api/config'

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
  setReviewGrade: (newGrade: number) => void
}

const Writng: React.FC<WritngProps> = ({ book, setReviewGrade }) => {
  const [editedLastPage, setEditedLastPage] = useState('') // 사용자가 입력한 페이지를 저장할 상태
  const [grade, setGrade] = useState(5) // 별점 상태 추가

  // 사용자가 페이지 입력란을 변경할 때 호출되는 함수
  const handleLastPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedLastPage(e.target.value)
  }

  // 별점 변경 핸들러
  const handleGradeChange = (newGrade: number) => {
    setGrade(newGrade)
    setReviewGrade(newGrade) // ReviewModal의 별점 상태 업데이트
  }

  // 리뷰 등록 api 요청
  async function registering() {
    const access = localStorage.getItem('accessToken')

    const requestData = {
      // 요청 본문 데이터 (필요에 따라 변경)
      book_id: book.id,
      content: editedLastPage,
      grade: grade,
      title: '제목',
    }

    try {
      const response = await baseInstance.post('/reviews', requestData, {
        headers: { Authorization: `Bearer ${access}` },
      })
      console.log(response)
      alert('리뷰가 등록되었습니다 !')
      // 등록 후 별점 초기화 또는 다른 로직 수행
      setReviewGrade(5) // 예시로 5점으로 초기화
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
