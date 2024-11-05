import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import { FreeMode, Pagination } from 'swiper/modules'
import { useEffect, useState } from 'react'
import { baseInstance } from '../../../api/config'
import { useNavigate } from 'react-router-dom'

interface PopularSwipeProps {
  title?: string
}

export default function PopularSwipe({ title }: PopularSwipeProps) {
  const [booksData, setBooksData] = useState<any[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchBooksData = async () => {
      try {
        const response = await baseInstance.get('/books/like')
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

  return (
    <div className="p-8 pt-[120px]">
      {title && <h1 className="pt-8 pb-4 text-xl font-bold">{title}</h1>}
      <Swiper
        slidesPerView={5}
        spaceBetween={15}
        freeMode={true}
        pagination={{ clickable: false }}
        modules={[FreeMode, Pagination]}
        className="pb-10">
        {booksData.map((book, index) => (
          <SwiperSlide key={index} onClick={() => handleBookClick(book.id)}>
            <div className="group w-[230px] flex flex-col bg-[#f0f3ca] cursor-pointer relative rounded-xl p-7 ml-2 transition-shadow duration-300 ease-in-out hover:shadow-lg">
              <img
                src={book.cover_image_url}
                alt={`Book ${index + 1}`}
                className={`w-[200px] h-[250px] object-contain bg-white transition-shadow duration-300 ease-in-out group-hover:shadow-lg `}
              />
              <div className="flex flex-row justify-start pt-3">
                <h1 className="text-[3.75rem] font-bold mr-2">{index + 1}</h1>
                <div className="flex flex-col items-start flex-grow pt-[2.7rem]">
                  <h1 className="text-[1.1rem] font-bold max-w-[130px] whitespace-nowrap overflow-hidden text-ellipsis text-center">
                    {book.title}
                  </h1>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <style>{`
        .swiper-pagination-bullets {
          display: none;
        }
      `}</style>
    </div>
  )
}
