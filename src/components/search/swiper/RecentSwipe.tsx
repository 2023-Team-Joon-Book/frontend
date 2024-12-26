import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import { FreeMode, Pagination } from 'swiper/modules'
import { useEffect, useState } from 'react'
import { baseInstance } from '../../../api/config'
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
        if (response.data.data.content) {
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
    </div>
  )
}
