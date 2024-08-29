import { useQuery } from 'react-query'
import { getRecentBooksAPI } from '../../api/main'
import { BookCover } from '../../types'
import Book from './Book'

export default function RecentBook() {
  const {
    data: recent = [],
    isLoading,
    error,
  } = useQuery<BookCover[]>(['recentBooks'], getRecentBooksAPI)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error fetching recent books</div>
  }

  return (
    <div className="py-4">
      <h2
        className="text-3xl mb-8 text-center font-semibold"
        style={{ fontFamily: 'Noto Sans KR' }}>
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
