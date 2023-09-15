// ReviewModal.tsx

import React from 'react'

interface ReviewModalProps {
  book: {
    title: string
    author: string
    category: string
    image: string
    pageCount: number
  }
  closeModal: () => void
  // 다른 리뷰 관련 정보를 받을 수 있는 props를 추가할 수 있습니다.
  reviewText: string // 리뷰 텍스트
  rating: number // 별점 등
}

const ReviewModal: React.FC<ReviewModalProps> = ({ book, closeModal, reviewText, rating }) => {
  return (
    <div className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-gray-800 bg-opacity-50">
      <div className="bg-white w-2/3 h-2/3 rounded-lg p-4 flex">
        <div className="w-1/3 p-4">
          <img
            src={book.image}
            alt={book.title}
            className="w-full h-48 object-cover rounded-lg mb-4 shadow-lg"
          />
          <h2 className="text-xl font-bold mb-2">{book.title}</h2>
          <p className="text-gray-600">저자: {book.author}</p>
          <p className="text-gray-600">카테고리: {book.category}</p>
        </div>
        <div className="w-2/3 p-4">
          <h3 className="text-lg font-semibold mb-2">리뷰</h3>
          <p>{reviewText}</p>
          <h3 className="text-lg font-semibold mt-4 mb-2">별점</h3>
          <p>{rating} / 5</p>
        </div>
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer"
          onClick={closeModal}>
          닫기
        </button>
      </div>
    </div>
  )
}

export default ReviewModal
