import React, { useEffect, useState } from 'react'
import RecentSwipe from './swiper/RecentSwipe'
import { baseInstance } from '../../api/config'

interface RecentBooksProps {
  onSwipeClick: (index: number) => void
  active: boolean
}

interface Book {
  title: string
  author: string
  publisher: string
  cover_image_url: string
  pages: number
  category: string
}

// interface BookDetail {
//   id: number
//   title: string
//   author: string
//   publisher: string
//   pages: number
//   like_status: boolean
// }

const RecentBooks: React.FC<RecentBooksProps> = ({ onSwipeClick, active }) => {
  const [books, setBooks] = useState<Book[]>([])

  return (
    <RecentSwipe
      index={0}
      onSwipeClick={onSwipeClick}
      active={active}
      title="최근 출시작"
      name={books.map((book) => book.title)}
      author={books.map((book) => book.author)}
      publisher={books.map((book) => book.publisher)}
      pages={books.map((book) => book.pages.toString())}
    />
  )
}

export default RecentBooks
