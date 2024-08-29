import { useEffect, useState } from 'react'
import { baseInstance } from '../../api/config'
import { BookCover } from '../../types'
import Book from './Book'

export default function PopularBook() {
  const [popular, setPopular] = useState<BookCover[]>([])

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const response = await baseInstance.get('/books/like')
        setPopular(response.data.data.content.slice(0, 6))
      } catch (error) {
        console.error('API 호출 오류: ', error)
      }
    }
    fetchPopular()
  }, [])

  return (
    <div className="py-4">
      <h2 className="text-3xl mb-8 text-center" style={{ fontFamily: 'Noto Sans KR' }}>
        인기있는 도서
      </h2>
      <div className="flex justify-center space-x-8 w-full overflow-x-auto">
        {popular.map((book, index) => (
          <Book key={index} title={book.title} author={book.author} imgSrc={book.cover_image_url} />
        ))}
      </div>
    </div>
  )
}
