import BookBox from '../../shelf/BookBox'
import StarRate from '../../shelf/StarRate'
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
  grade: number
}

const ReadBook = () => {
  const [books, setBooks] = useState<BookType[]>([])
  const [page, setPage] = useState<number>(1)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { isModalOpen, setIsModalOpen, setSelectedBook } = useMyContext()
  const navigate = useNavigate()

  const handleBookClick = (book: any) => {
    setSelectedBook({ ...book, status: 'Read' })
    setIsModalOpen(true)
  }

  const getReadBooks = async () => {
    try {
      setIsLoading(true)
      const access = localStorage.getItem('accessToken')

      const response = await baseInstance.get(`/readings?status=READ&page=${page}`, {
        headers: { Authorization: `Bearer ${access}` },
      })
      const readBooks = response.data.bookInfos.content

      if (response.data.bookInfos.empty) {
        setHasMore(false)
      } else {
        setBooks((prevBooks) => [...prevBooks, ...readBooks])
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getReadBooks()
  }, [isModalOpen])

  const loadMore = async () => {
    setPage((prevPage) => prevPage + 1)
    await getReadBooks()
  }

  const setTarget = useInfiniteScroll({ hasMore, onLoadMore: loadMore })

  const goBookSearch = () => navigate('/booksearch')

  return (
    <div>
      {books.length === 0 ? (
        <div className="w-full mt-10 flex flex-col justify-center items-center h-dvh">
          <Lottie
            animationData={Empty}
            style={{
              width: '280px',
            }}
          />
          <p className="text-xl font-semibold text-gray-700">완독한 내역이 없습니다</p>
          <button
            className="text-lg mt-4 px-4 py-2 text-btn underline underline-offset-4"
            onClick={() => {goBookSearch()}}>
            읽을 책 찾으러 가기
          </button>
        </div>
      ) : (
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
                  {book.grade === 0 ? (
                    <button className="text-gray-600 pl-6 pt-2">책 리뷰 남기기 {' >'}</button>
                  ) : (
                    <StarRate grade={book.grade} />
                  )}
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
      )}
      <div ref={setTarget} className="w-full h-3 bg-transparent"></div>
    </div>
  )
}

export default ReadBook
