import BookBox from '../../shelf/BookBox'
import { GoHeartFill } from 'react-icons/go'
import { useEffect, useState } from 'react'
import { baseInstance } from '../../../api/config'
import { useMyContext } from '../../Context/MyContext'
import Swal from 'sweetalert2'
import Empty from '../../../assets/lotties/Animation - 1724653336505.json'
import Lottie from 'lottie-react'
import useInfiniteScroll from '../../../hooks/useInfiniteScroll'
import { useNavigate } from 'react-router-dom'
type BookType = {
  cover_image_url: string
  title: string
  author: string
  id: number
  isLiked: boolean
}

const WishList = () => {
  const [books, setBooks] = useState<BookType[]>([])
  const [page, setPage] = useState<number>(1)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const access = localStorage.getItem('accessToken')
  const { setSelectedBook } = useMyContext()
  const [isLoading, _] = useState(true)
  const navigate = useNavigate()

  const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer
      toast.onmouseleave = Swal.resumeTimer
    },
  })

  // 찜한 책 api 요청
  useEffect(() => {
    getWishList()
  }, [])

  const getWishList = async () => {
    try {
      const response = await baseInstance.get(`/readings?pageNumber=${page}&status=LIKE`, {
        headers: { Authorization: `Bearer ${access}` },
      })
      const wishBooks = response.data.bookInfos.content
      if (response.data.bookInfos.empty) {
        setHasMore(false)
      } else {
        const newBooks = wishBooks.map((book: any) => ({ ...book, isLiked: true }))
        setBooks((prevBooks) => [...prevBooks, ...newBooks])
      }
    } catch (error) {
      console.log(error)
    }
  }

  const loadMore = async () => {
    setPage((prevPage) => prevPage + 1)
    await getWishList()
  }

  const setTarget = useInfiniteScroll({ hasMore, onLoadMore: loadMore })

  const toggleWhishList = async (book: BookType) => {
    setSelectedBook(book)

    try {
      const response = await baseInstance.post(`/books/like/${book.id}`)
      if (response.data.code === 'B002') {
        setBooks((prevBooks) =>
          prevBooks.map((prevBook) =>
            prevBook.id === book.id ? { ...prevBook, isLiked: !book.isLiked } : prevBook,
          ),
        )
        const message = !book.isLiked
          ? '읽고 싶은 책이 저장되었습니다'
          : '읽고 싶은 책이 삭제되었습니다'
        Toast.fire({
          icon: 'success',
          title: message,
        })
      }
    } catch (error) {
      Swal.fire({
        title: `오류: 다시 시도해주세요`,
        icon: 'error',
      })
    }
  }

  const goBookSearch = () => navigate('/booksearch')

  return (
    <div className="w-full">
      {books.length === 0 && isLoading ? (
        <div className="w-full mt-10 flex flex-col justify-center items-center h-dvh">
          <Lottie
            animationData={Empty}
            style={{
              width: '280px',
            }}
          />
          <p className="text-xl font-semibold text-gray-700">찜한 목록이 없습니다</p>
          <button
            className="text-lg mt-4 px-4 py-2 text-btn underline underline-offset-4"
            onClick={() => goBookSearch()}>
            찜할 책 찾으러 가기
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
            : books.map((book) => (
                <BookBox
                  key={book.id}
                  img={book.cover_image_url}
                  title={book.title}
                  writer={book.author}>
                  <div className="flex flex-row-reverse pt-3 h-[3rem]">
                    <GoHeartFill
                      onClick={() => toggleWhishList(book)}
                      size={20}
                      style={{ color: book.isLiked ? '#4ebb00' : 'gray' }}
                    />
                  </div>
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

export default WishList
