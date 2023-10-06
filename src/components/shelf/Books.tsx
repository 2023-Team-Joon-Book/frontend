import React, { useState } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import DetailModal from './DetailModal'
// import ReviewModal from './ReviewModal'

interface BookProps {
  book: {
    id: number
    title: string
    status: string
    author: string
    img_url: string
    // pageCount: number
  }
  openModal: (book: {
    id: number
    title: string
    status: string
    author: string
    img_url: string
  }) => void // 수정된 openModal 함수의 타입
}

const Books: React.FC<BookProps> = ({ book, openModal }) => {
  return (
    <div className="bg-white p-2 drop-shadow-xl z-0">
      <img
        src={book.img_url}
        onClick={() => {
          openModal(book)
          console.log('**')
        }}
      />
    </div>
  )
}

export default Books
