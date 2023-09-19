import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DetailModal from './DetailModal'
import ReviewModal from './ReviewModal'

interface BookProps {
  book: {
    id: number
    title: string
    status: string
    author: string
    img_url: string
    // pageCount: number
  }
  closeModal: () => void
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
    <div className="bg-white p-4 drop-shadow-xl">
      <motion.img src={book.img_url} onClick={openModal} />
      <AnimatePresence>
        {isModalOpen && book.status === '읽음' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}>
            <ReviewModal book={book} closeModal={closeModal} reviewText={''} />
          </motion.div>
        )}
        {isModalOpen && book.status === '읽는 중' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}>
            <DetailModal book={book} closeModal={closeModal} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Book
