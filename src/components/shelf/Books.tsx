import React, { useState } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import DetailModal from './DetailModal'
// import ReviewModal from './ReviewModal'

interface BookProps {
  book: {
    // id: number
    // title: string
    // status: string
    // author: string
    // img_url: string
    // // pageCount: number
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
  openModal: (book: {
    // id: number
    // title: string
    // status: string
    // author: string
    // img_url: string
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
  }) => void // 수정된 openModal 함수의 타입
}

const Books: React.FC<BookProps> = ({ book, openModal }) => {
  return (
    <div className="bg-white p-2 drop-shadow-xl z-0">
      <img
        src={book.cover_image_url}
        onClick={() => {
          openModal(book)
          console.log('**')
        }}
      />
    </div>
  )
}

export default Books
