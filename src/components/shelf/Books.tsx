import React, { useState } from 'react'
import DetailModal from './DetailModal'

interface BookProps {
  book: {
    id: number
    title: string
    status: string
    author: string
    img_url: string
  }
}

const Book: React.FC<BookProps> = ({ book }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <img src={book.img_url} onClick={openModal}></img>
      {isModalOpen && <DetailModal book={book} onClose={closeModal} />}
    </div>
  )
}

export default Book
