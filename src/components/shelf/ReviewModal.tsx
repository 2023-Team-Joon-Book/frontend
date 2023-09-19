// ReviewModal.tsx

import React from 'react'

interface ReviewModalProps {
  book: {
    id: number
    title: string
    status: string
    author: string
    img_url: string
  }
  closeModal: () => void
  // 다른 리뷰 관련 정보를 받을 수 있는 props를 추가할 수 있습니다.
  reviewText: string // 리뷰 텍스트
}

const ReviewModal: React.FC<ReviewModalProps> = ({ book, closeModal, reviewText }) => {
  return (
    <div
      className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-gray-800 bg-opacity-50"
      style={{ fontFamily: 'bmfont' }}>
      <div className="bg-white w-2/3 h-2/3 rounded-lg p-4 flex">
        <div className="w-1/3 p-4">
          <img
            src={book.img_url}
            alt={book.title}
            className="w-full h-48 object-cover rounded-lg mb-4 shadow-lg"
          />
          <h2 className="text-xl font-bold mb-2">{book.title}</h2>
          <p className="text-gray-600">저자: {book.author}</p>
        </div>
        <div className="w-2/3 p-4">
          <h3 className="text-lg font-semibold mb-2">리뷰</h3>
          <p>{reviewText}</p>
        </div>
        <button className=" text-gray-500 hover:text-gray-700 cursor-pointer" onClick={closeModal}>
          닫기
        </button>
      </div>
    </div>
  )
}

export default ReviewModal
