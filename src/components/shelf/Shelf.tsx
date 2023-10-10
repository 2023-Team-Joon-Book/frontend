import React, { useEffect } from 'react'
import Books from './Books'
import { motion } from 'framer-motion'
import '../../scss/Shelf.scss'

interface ShelfProps {
  startIndex: number // 현재 페이지의 시작 인덱스
  endIndex: number // 현재 페이지의 끝 인덱스
  currentPage: number
  currentShelfBooks: {}
  setIsModalOpen: (isOpen: boolean) => void
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

const Shelf: React.FC<ShelfProps> = ({
  startIndex,
  endIndex,
  currentPage,
  currentShelfBooks,

  openModal,
}) => {
  // 첫 페이지 렌더링 시에만 애니메이션을 비활성화하기 위한 상태를 추가합니다.
  const [disableAnimation, setDisableAnimation] = React.useState(true)

  // 첫 페이지 렌더링 시에 애니메이션을 활성화하고, 나중에 다시 비활성화합니다.
  useEffect(() => {
    const timer = setTimeout(() => {
      setDisableAnimation(false)
    }, 500) // 원하는 시간(밀리초)을 설정하세요.

    return () => clearTimeout(timer)
  }, [])

  const currentShelfBooksArray: Array<{
    // id: number
    // title: string
    // status: string
    // author: string
    // img_url: string
    // pageCount?: number
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
  }> = Object.values(currentShelfBooks)

  // border-bottom scss로 커스터마이징
  return (
    <div>
      <div className="custom-border px-24 m-4 shelf-container">
        <motion.div
          initial={disableAnimation ? false : { x: '100%' }}
          animate={{ x: '0' }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          key={currentPage}>
          <div className="grid grid-cols-5 gap-4">
            {currentShelfBooksArray.slice(startIndex, endIndex - 5).map((book) => (
              <Books key={book.id} book={book} openModal={openModal} />
            ))}
          </div>
        </motion.div>
      </div>

      <div className="custom-border px-24 m-4 shelf-container">
        <motion.div
          initial={disableAnimation ? false : { x: '100%' }}
          animate={{ x: '0' }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          key={currentPage}>
          <div className="grid grid-cols-5 gap-4">
            {currentShelfBooksArray.slice(endIndex - 5, endIndex).map((book) => (
              <Books key={book.id} book={book} openModal={openModal} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Shelf
