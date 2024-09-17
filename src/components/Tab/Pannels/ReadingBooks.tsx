import BookBox from '../../shelf/BookBox'
import PageRecord from '../../shelf/PageRecord'
import { useMyContext } from '../../Context/MyContext'
import { baseInstance } from '../../../api/config'
import { useEffect, useState } from 'react'
import useInfiniteScroll from '../../../hooks/useInfiniteScroll'
import Lottie from 'lottie-react'
import Empty from '../../../assets/lotties/Animation - 1724653336505.json'
import { useNavigate } from 'react-router-dom'

type BookType = {
  cover_image_url: string
  title: string
  author: string
  pages: number
  percentage: number
  last_page: number
}

const ReadingBook = () => {
  const { isModalOpen, setIsModalOpen, setSelectedBook } = useMyContext()
  const [books, setBooks] = useState<BookType[]>([])
  const [page, setPage] = useState<number>(1)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const navigate = useNavigate()

  const getReadingBooks = async () => {
    try {
      setIsLoading(true)
      const access = localStorage.getItem('accessToken')
      const response = await baseInstance.get(`/readings?page=${page}&status=READING`, {
        headers: { Authorization: `Bearer ${access}` },
      })
      const readingBooks = response.data.bookInfos.content

      if (response.data.bookInfos.empty) {
        setHasMore(false)
      } else {
        setBooks((prevBooks) => [...prevBooks, ...readingBooks])
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getReadingBooks()
  }, [isModalOpen])

  const loadMore = async () => {
    setPage((prevPage) => prevPage + 1)
    await getReadingBooks()
  }

  const setTarget = useInfiniteScroll({ hasMore, onLoadMore: loadMore })

  const handleBookClick = (book: any) => {
    setSelectedBook({ ...book, status: 'Reading' })
    setIsModalOpen(true)
  }
  const goBookSearch = () => navigate('/booksearch')

  return (
    <>
      {books.length === 0 && !isLoading ? (
        <div className="w-full mt-10 flex flex-col justify-center items-center h-dvh">
          <Lottie
            animationData={Empty}
            style={{
              width: '280px',
            }}
          />
          <p className="text-xl font-semibold text-gray-700">독서 중인 책이 없습니다</p>
          <button
            className="text-lg mt-4 px-4 py-2 text-btn underline underline-offset-4"
            onClick={() => {
              goBookSearch()
            }}>
            읽을 책 찾으러 가기
          </button>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-4 gap-y-14 gap-x-8 mt-16">
            {isLoading && books.length === 0
              ? Array.from({ length: 12 }).map((_, index) => (
                  <div
                    key={index}
                    className="skeleton bg-base-300 w-[19.1875rem] h-[10.25rem] rounded-[2.0625rem] animate-pulse"
                  />
                ))
              : books.map((book, index) => (
                  <BookBox
                    key={index}
                    img={book.cover_image_url}
                    title={book.title}
                    writer={book.author}
                    onClick={() => handleBookClick(book)}>
                    <PageRecord
                      pages={book.pages}
                      percentages={book.percentage}
                      lastPage={book.last_page}
                    />
                  </BookBox>
                ))}
            {isLoading &&
              books.length > 0 &&
              Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="skeleton bg-base-300 w-[19.1875rem] h-[10.25rem] rounded-[2.0625rem] animate-pulse"
                />
              ))}
          </div>
          <div ref={setTarget} className="w-full h-3"></div>
        </div>
      )}
    </>
  )
}

export default ReadingBook
