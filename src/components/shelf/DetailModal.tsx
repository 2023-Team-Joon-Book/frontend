import React, { useState } from 'react'

interface DetailModalProps {
  book: {
    id: number
    title: string
    status: string
    author: string
    img_url: string
  }
  setIsModalOpen: (isOpen: boolean) => void
}

const DetailModal: React.FC<DetailModalProps> = ({ book, setIsModalOpen }) => {
  return (
    <div
      className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-gray-800 bg-opacity-50"
      style={{ fontFamily: 'bmfont' }}>
      <div className=" bg-white rounded-lg p-4 flex flex-col">
        <div className="p-4 flex flex-col justify-center items-center">
          <img
            src={book.img_url}
            alt={book.title}
            className="object-cover rounded-lg mb-4 shadow-lg w-32 h-max"
          />
          <h2 className="font-bold mb-2 justify-center items-center text-2xl">{book.title}</h2>
          <p className="text-gray-600">저자: {book.author}</p>
        </div>
        <div className="p-4 flex flex-col">
          <h3 className="text-3xl flex flex-col font-semibold mb-2 mt-20 items-center">
            현재까지 읽은 페이지 수
          </h3>
          <p className="text-3xl flex flex-col items-center m-20">progressBar</p>
        </div>
        <button
          className="text-gray-500 hover:text-gray-700 cursor-pointer text-xl"
          onClick={() => setIsModalOpen(false)}>
          X
        </button>
      </div>
    </div>
  )
}

export default DetailModal
