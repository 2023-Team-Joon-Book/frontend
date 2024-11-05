import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import { FreeMode, Pagination } from 'swiper/modules'
import { useEffect, useState } from 'react'
import { baseInstance } from '../../../api/config'
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import { useNavigate } from 'react-router-dom'

interface RecentSwipeProps {
  index: number
  onSwipeClick: (index: number) => void
  active: boolean
  title?: string
  name?: string[]
  author?: string[]
  publisher?: string[]
  pages?: string[]
}

export default function RecentSwipe({ title }: RecentSwipeProps) {
  const [booksData, setBooksData] = useState<any[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchBooksData = async () => {
      try {
        const response = await baseInstance.get('/books/new')
        if (response.data && response.data.data && response.data.data.content) {
          setBooksData(response.data.data.content)
        }
      } catch (error) {
        console.error('Error fetching books data:', error)
      }
    }

    fetchBooksData()
  }, [])

  const handleBookClick = (bookId: number) => {
    navigate(`/book/${bookId}`)
  }

  // const currentBookState = booksState[activeBook!] || {
  //   read: false,
  //   readComplete: false,
  //   heartBlack: false,
  // }

  // useEffect(() => {
  //   const closeAccordion = (e: MouseEvent) => {
  //     if (e.target !== e.currentTarget) {
  //       setActiveBook(null)
  //     }
  //   }

  //   if (activeBook !== null) {
  //     document.addEventListener('click', closeAccordion)
  //   }

  //   return () => {
  //     document.removeEventListener('click', closeAccordion)
  //   }
  // }, [activeBook])

  // const toggleAccordion = (clickedIndex: number) => {
  //   setActiveBook((prev) => (prev === clickedIndex ? null : clickedIndex))
  //   const bookId = booksData[clickedIndex].id
  //   fetchBookDetail(bookId)
  // }

  // const handleInnerClick = (event: React.MouseEvent) => {
  //   event.stopPropagation()
  // }

  // const updateReadingStatus = async (bookId: number, status: string) => {
  //   try {
  //     await baseInstance.post('/readings', {
  //       bookId,
  //       lastPage: 0,
  //       status,
  //     })
  //     Swal.fire({
  //       toast: true,
  //       position: 'top',
  //       showConfirmButton: false,
  //       timer: 3000,
  //       icon: 'success',
  //       title: '책이 등록되었습니다.📚',
  //     })
  //   } catch (error: any) {
  //     console.error('Error updating reading status:', error)
  //     const errorMessage = error.response?.data?.errorMessage || 'An unknown error occurred.'
  //     Swal.fire({
  //       title: `${errorMessage} 입니다.`,
  //       icon: 'error',
  //     })
  //   }
  // }

  // const toggleRead = async () => {
  //   const currentBookState = booksState[activeBook!] || {
  //     read: false,
  //     readComplete: false,
  //     heartBlack: false,
  //   }

  //   setBooksState({
  //     ...booksState,
  //     [activeBook!]: { ...currentBookState, read: true, readComplete: false },
  //   })

  //   if (activeBook === null) return

  //   const bookId = booksData[activeBook].id

  //   await updateReadingStatus(bookId, 'reading')
  // }

  // const toggleReadComplete = async () => {
  //   const currentBookState = booksState[activeBook!] || {
  //     read: false,
  //     readComplete: false,
  //     heartBlack: false,
  //   }

  //   setBooksState({
  //     ...booksState,
  //     [activeBook!]: { ...currentBookState, read: false, readComplete: true },
  //   })

  //   if (activeBook === null) return

  //   const bookId = booksData[activeBook].id

  //   await updateReadingStatus(bookId, 'read')
  // }

  // const updateBookLike = async (bookId: number) => {
  //   try {
  //     await baseInstance.post(`/books/like/${bookId}`)
  //     Swal.fire({
  //       toast: true,
  //       position: 'top',
  //       showConfirmButton: false,
  //       timer: 3000,
  //       icon: 'success',
  //       title: '찜한 책 갱신 완료!',
  //     })
  //   } catch (error: any) {
  //     console.error('Error updating book like:', error)
  //     const errorMessage = error.response?.data?.message || 'An unknown error occurred.'
  //     Swal.fire({
  //       title: `오류: ${errorMessage}`,
  //       icon: 'error',
  //     })
  //   }
  // }

  // const toggleHeartColor = async (event: React.MouseEvent<HTMLButtonElement>) => {
  //   event.stopPropagation()

  //   if (selectedBookDetail) {
  //     setSelectedBookDetail({
  //       ...selectedBookDetail,
  //       like_status: !selectedBookDetail.like_status,
  //     })
  //   }

  //   const currentBookState = booksState[activeBook!] || {
  //     read: false,
  //     readComplete: false,
  //     heartBlack: false,
  //   }

  //   setBooksState({
  //     ...booksState,
  //     [activeBook!]: { ...currentBookState, heartBlack: !currentBookState.heartBlack },
  //   })

  //   if (activeBook === null) return

  //   const bookId = booksData[activeBook].id

  //   await updateBookLike(bookId)
  // }

  // const [selectedBookDetail, setSelectedBookDetail] = useState<BookDetail | null>(null)

  // const fetchBookDetail = async (bookId: number) => {
  //   try {
  //     const response = await baseInstance.get(`/books/${bookId}`)
  //     if (response.data && response.data.data) {
  //       setSelectedBookDetail(response.data.data)
  //     }
  //   } catch (error) {
  //     console.error('Error fetching book details:', error)
  //   }
  // }

  return (
    <div className="w-full p-8 pb-20 mx-auto max-w-screen-2xl">
      {title && <h1 className="pt-8 pb-4 text-xl font-bold">{title}</h1>}
      <Swiper
        slidesPerView={6}
        spaceBetween={30}
        freeMode={true}
        pagination={{ clickable: false }}
        modules={[FreeMode, Pagination]}
        className="pb-10">
        {booksData.map((book, index) => (
          <SwiperSlide key={index} onClick={() => handleBookClick(book.id)}>
            <div className="relative flex flex-col items-start cursor-pointer">
              <img
                src={book.cover_image_url}
                alt={`Book ${index + 1}`}
                className={`w-[200px] h-[250px] object-contain shadow-custom hover:shadow-customhover transition-shadow duration-300`}
              />
              <div className="flex flex-col items-start pt-2">
                <h1 className="text-lg font-bold text-black">{book.title}</h1>
                <h2 className="text-base text-gray-500">{book.author}</h2>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* {activeBook !== null && (
        <div className="w-full min-h-[150px] p-2">
          <hr />
          <div className="flex pt-[3.25rem] pl-[10rem] items-start">
            <img
              className="w-[25.25rem] h-[35.25rem] bg-gray-400 mr-4"
              src={
                selectedBookDetail?.cover_image_url ?? 'https://i.postimg.cc/jdyPDVpc/bigbook.jpg'
              }
              alt={`Book ${selectedBookDetail?.title ?? ''}`}
            />
            <div className="flex-1 flex flex-col gap-[1.3rem] ml-8">
              <div>
                <h2 className="text-[2rem] font-bold" style={{ fontFamily: 'BM Jua' }}>
                  {booksData[activeBook]?.title}
                </h2>
              </div>
              <div className="flex" style={{ fontFamily: 'BM Hanna Air' }}>
                <p>{booksData[activeBook]?.author}</p>
                <p className="px-2">|</p>
                <p>{booksData[activeBook]?.publisher}</p>
                <p className="px-2">|</p>
                <p>{booksData[activeBook]?.pages}</p>
              </div>
              <div className="flex text-[1.4rem] gap-4" style={{ fontFamily: 'BM Jua' }}>
                <button
                  className={`transition-colors ${currentBookState.read ? 'text-[#BFC66A]' : ''}`}
                  onClick={toggleRead}>
                  읽기
                </button>
                <button
                  className={`transition-colors ${
                    currentBookState.readComplete ? 'text-[#BFC66A]' : ''
                  }`}
                  onClick={toggleReadComplete}>
                  다 읽은 책
                </button>
              </div>
            </div>
            <button
              className="mt-2 ml-auto mr-12 bg-transparent border-none cursor-pointer"
              onClick={toggleHeartColor}>
              <img
                style={{
                  width: '2rem',
                  height: '2rem',
                }}
                src={
                  selectedBookDetail && selectedBookDetail.like_status
                    ? 'https://i.postimg.cc/1XkRS36B/blackheart.png'
                    : 'https://i.postimg.cc/Z5jSxYp2/heart.png'
                }
                alt="heart"
              />
            </button>
          </div>
        </div>
      )} */}
    </div>
  )
}