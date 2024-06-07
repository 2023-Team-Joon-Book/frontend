import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import BookBox from '../../../shelf/BookBox'
import HistoryContents from './HistoryContents'
import { FreeMode, Pagination } from 'swiper/modules'
import styled from 'styled-components'

type SearchHistorySwipeProps = {
  recentSearches: string[]
  onSearch: (query: string) => void
}

const SearchHistorySwipe = ({ recentSearches, onSearch }: SearchHistorySwipeProps) => {
  const handleSearch = (query: string) => {
    onSearch(query) // 클릭된 검색어를 검색합니다.
  }

  return (
    <div className="p-8 pt-[120px]">
      <p className="text-xl font-bold pt-8 pb-4">최근 히스토리</p>
      <StyledSwiper
        slidesPerView={5}
        spaceBetween={10}
        freeMode={false}
        pagination={{ clickable: false }}
        modules={[FreeMode, Pagination]}>
        <Swiper navigation pagination>
          {recentSearches.map((search, index) => (
            <StyledSwiperSlide key={index}>
              <div
                onClick={() => handleSearch(search)} // 클릭된 검색어를 검색합니다.
                className="cursor-pointer hover:bg-gray-100 rounded-md">
                <HistoryContents content={search} />
              </div>
            </StyledSwiperSlide>
          ))}
          {/* <BookBox
            img={'https://image.yes24.com/goods/126344176/XL'}
            title="다정하지만 만만하지 않습니다"
            writer="정문정"
            children={''}
          /> */}
        </Swiper>
      </StyledSwiper>
    </div>
  )
}

const StyledSwiper = styled(Swiper)`
  padding-bottom: 2.5rem;
  .swiper-pagination-bullet {
    display: none;
  }
`

const StyledSwiperSlide = styled(SwiperSlide)`
  width: 9rem !important;
  margin-right: 1.2rem !important;
`

export default SearchHistorySwipe
