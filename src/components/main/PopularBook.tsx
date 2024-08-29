import { useQuery } from 'react-query'
import { getPopularBooksAPI } from '../../api/main'
import { BookCover } from '../../types'
import Book from './Book'

export default function PopularBook() {
  const {
    data: popular = [],
    isLoading,
    error,
  } = useQuery<BookCover[]>(['popularBooks'], getPopularBooksAPI)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error fetching popular books</div>
  }

  return (
    <div className="py-4">
      <h2
        className="text-3xl mb-8 text-center font-semibold"
        style={{ fontFamily: 'Noto Sans KR' }}>
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
