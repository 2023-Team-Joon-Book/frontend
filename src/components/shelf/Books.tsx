import { useLocation } from 'react-router-dom'
// import { motion, AnimatePresence } from 'framer-motion'
// import DetailModal from './DetailModal'
// import ReviewModal from './ReviewModal'

interface BookProps {
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
  openModal: (book: {
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
  const location = useLocation()
  const isMyPage = location.pathname === '/mypage'
  return (
    <div className="flex justify-items-center">
      <div className=" p-1 drop-shadow-xl w-[9.5rem] h-[16rem]">
        <img
          className="shadow-custom"
          src={book.cover_image_url}
          onClick={() => {
            openModal(book)
          }}
        />

        {isMyPage ? (
          <div className="mt-1">
            <p className="text-center text-sm font-bold max-w-[9rem] overflow-hidden truncate whitespace-nowrap">
              {'다정하지만 만만하지 않습니다'}
            </p>
            <p className="text-center text-sm max-w-[9rem] overflow-hidden truncate whitespace-nowrap">
              {'홍길동'}
            </p>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default Books
