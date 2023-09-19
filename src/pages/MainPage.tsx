import React, { useState } from 'react'
import DetailModal from '../components/shelf/DetailModal'

export default function MainPage() {
  // 예시 데이터
  const bookData = {
    id: 1,
    title: '책 제목',
    status: '읽는 중',
    author: '작가 이름',
    img_url: 'src/assets/images/1.png',
  }

  // 모달 상태를 관리하기 위한 상태 변수
  const [isModalOpen, setIsModalOpen] = useState(false)

  // 모달을 열고 닫는 함수
  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div>
      <button onClick={openModal}>모달 열기</button>
      {isModalOpen && <DetailModal book={bookData} closeModal={closeModal} />}
    </div>
  )
}
