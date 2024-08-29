import { useEffect, useState } from 'react'
import { getRecentBooksAPI } from '../../api/main'
import { BookCover } from '../../types'
import Book from './Book'

export default function RecentBook() {
  const [recent, setRecent] = useState<BookCover[]>([])

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const recentBooks = await getRecentBooksAPI()
        setRecent(recentBooks)
      } catch (error) {
        console.error('API 호출 오류: ', error)
      }
    }

    fetchRecent()
  }, [])

  return (
    <div className="py-4">
      <h2 className="text-3xl text-center" style={{ fontFamily: 'Noto Sans KR' }}>
        최근 출시작
      </h2>
      <div className="flex justify-center space-x-8 w-full overflow-x-auto">
        {recent.map((book, index) => (
          <Book key={index} title={book.title} author={book.author} imgSrc={book.cover_image_url} />
        ))}
      </div>
    </div>
  )
}
