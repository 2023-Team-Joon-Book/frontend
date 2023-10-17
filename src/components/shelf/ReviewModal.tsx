import React, { useState } from 'react'
import Writng from './Writing'
import '../../scss/BookReview.scss'

interface ReviewModalProps {
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
  setIsModalOpen: (isOpen: boolean) => void
}

const ReviewModal: React.FC<ReviewModalProps> = ({ book, setIsModalOpen }) => {
  const numberOfStars = 5
  const stars = Array(numberOfStars).fill(null)
  const [isWriting, setIsWriting] = useState(false)

  return (
    <div
      className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-gray-800 bg-opacity-50"
      style={{ fontFamily: 'bmfont' }}>
      <div className="bg-white w-2/3 h-2/3 rounded-lg p-4 flex">
        <div className="w-1/3 p-4 flex flex-col justify-center items-center  ml-20">
          <img
            src={book.cover_image_url} // 책 이미지의 경로를 사용
            alt={book.title}
            className="object-cover rounded-lg mb-4 shadow-lg w-52 h-max "
          />
          <h2 className="font-bold mb-2 justify-center items-center text-2xl">{book.title}</h2>
          <p className="text-gray-600">저자: {book.author}</p>
        </div>
        <div className="w-8/12 p-10 flex flex-col">
          <div className="flex flex-col h-2/3 border-2">
            {!isWriting ? (
              <React.Fragment>
                <p className="text-3xl flex flex-col items-center p-10">리뷰내용</p>
                <button
                  onClick={() => {
                    setIsWriting(true)
                  }}
                  className="text-blue-500 hover:text-blue-700">
                  리뷰 작성하기
                </button>
              </React.Fragment>
            ) : (
              <div className="h-full">
                <Writng book={book}></Writng>
              </div>
            )}
          </div>
          <div className="mt-10 flex flex-col">
            <p className="flex justify-end">이 책에 대한 나의 평가</p>
            <div className="flex justify-end">
              {stars.map((_, index) => (
                <YellowStar key={index} />
              ))}
            </div>
          </div>
        </div>
        <button
          className="fixed top-25 text-gray-500 hover:text-gray-700 cursor-pointer text-xl"
          onClick={() => setIsModalOpen(false)}>
          X
        </button>
      </div>
    </div>
  )
}

export default ReviewModal

function YellowStar() {
  return (
    <div className="star">
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
        <path fill="yellow" d="M12 2l2.3 7.6h7.7l-6 4.8 2.3 7.6-6-4.7-6 4.7 2.3-7.6-6-4.8h7.7z" />
      </svg>
    </div>
  )
}
