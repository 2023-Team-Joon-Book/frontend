import React, { useState } from 'react'

interface BookProps {
  title: string
  author: string
  description: string
  status: string
}

const Book: React.FC<BookProps> = ({ title, author, description, status }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div>
      <div onClick={openModal} className="cursor-pointer">
        <h2>{title}</h2>
        <p>{author}</p>
        <p>Status: {status}</p>
      </div>
      {isModalOpen && (
        <div className="">
          <div className="modal">
            <button onClick={closeModal} className=" top-4 right-4 m-2">
              <span className="text-lg font-bold"></span>
            </button>
            <h2>{title}</h2>
            <p>{author}</p>
            <p>{description}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Book
