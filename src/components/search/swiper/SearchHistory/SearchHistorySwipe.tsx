import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import HistoryContents from './HistoryContents'
import { FreeMode, Pagination } from 'swiper/modules'

interface Book {
  title: string
  author: string
  cover_image_url: string
  publisher?: string
  pages?: number
  id: number
}

interface SearchHistory {
  query: string
  books: Book[]
}

type SearchHistorySwipeProps = {
  recentSearches: SearchHistory[]
  onSearch: (query: string) => void
}

const SearchHistorySwipe = ({ recentSearches = [], onSearch }: SearchHistorySwipeProps) => {
  const handleSearch = (query: string) => {
    onSearch(query)
  }

  return (
    <div className="p-8 pt-[120px]">
      <p className="pt-8 pb-4 text-xl font-bold">최근 히스토리</p>
      {recentSearches.length > 0 ? (
        <Swiper
          slidesPerView="auto"
          // spaceBetween={recentSearches.length > 0 && recentSearches[0].books.length > 0 ? 182 : 0}
          spaceBetween={182}
          freeMode={true}
          pagination={{ clickable: false }}
          modules={[FreeMode, Pagination]}
          className="py-10">
          <div className="flex mr-40">
            {recentSearches.map((search, index) => (
              <SwiperSlide
                key={index}
                // className={`flex items-start${
                //   search.books.length === 0
                //     ? 'min-w-[132.3px] max-w-[132.3px]'
                //     : 'min-w-[250px] max-w-[300px]'
                // }`}
                className={`flex items-start min-w-[250px] max-w-[300px]`}>
                {search.books.length > 0 && (
                  <div className="mr-4">
                    {search.books.map((book, bookIndex) => (
                      <BookBox
                        key={bookIndex}
                        img={book.cover_image_url}
                        title={book.title}
                        writer={book.author}
                      />
                    ))}
                  </div>
                )}
                <div className="flex flex-shrink-0 mt-3.5">
                  <div onClick={() => handleSearch(search.query)} className="flex-shrink-0 mr-4">
                    <HistoryContents content={search.query} />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      ) : (
        <p>히스토리가 없습니다.</p>
      )}
    </div>
  )
}

export default SearchHistorySwipe
