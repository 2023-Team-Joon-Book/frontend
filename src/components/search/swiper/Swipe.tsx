import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import { FreeMode, Pagination } from 'swiper/modules'
import './styles.css'
import { useState } from 'react'

interface SwipeProps {
  title?: string
  name?: string[]
  author?: string[]
  publisher?: string[]
  pages?: string[]
}

export default function Swipe({ title, name, author, publisher, pages }: SwipeProps) {
  const [activeBook, setActiveBook] = useState<number | null>(null)
  const toggleAccordion = (index: number) => {
    if (activeBook === index) {
      setActiveBook(null)
    } else {
      setActiveBook(index)
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      {title && (
        <h1
          style={{
            fontSize: '1.25rem',
            fontWeight: 'bold',
            paddingTop: '2rem',
            paddingBottom: '1rem',
          }}
          className="swiper-title">
          {title}
        </h1>
      )}
      <Swiper
        slidesPerView={7}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
        style={{ paddingBottom: '3rem' }}>
        {[...Array(14).keys()].map((index) => (
          <>
            <SwiperSlide key={index} onClick={() => toggleAccordion(index)}>
              <img
                src={`path/to/book${index + 1}.jpg`}
                alt={`Book ${index + 1}`}
                className="book-image"
              />
              {/* {`Book ${index + 1}`} */}
            </SwiperSlide>
            <div>
              <h1>{name && name[index]}</h1>
              <h2>{author && author[index]}</h2>
            </div>
          </>
        ))}
      </Swiper>

      {activeBook !== null && (
        <div className="accordion-content">
          <hr />
          <div
            style={{
              paddingTop: '3.25rem',
              paddingBottom: '3.25rem',
              paddingLeft: '12rem',
              paddingRight: '12rem',
            }}
            className="book-details">
            <img
              style={{ width: '23.5rem', height: '32rem' }}
              src={`path/to/book${activeBook + 1}.jpg`}
              alt={`Book ${activeBook + 1}`}
              className="book-image-detail"
            />

            <div style={{ display: 'flex' }}>
              <div style={{ marginLeft: '12rem' }} className="book-info">
                <div style={{ display: 'flex' }}>
                  <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                    {name && name[activeBook]}
                  </h2>
                </div>

                <div style={{ display: 'flex' }}>
                  <p>{author && author[activeBook]}</p>
                  <p style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>|</p>
                  <p>{publisher && publisher[activeBook]}</p>
                  <p style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>|</p>
                  <p>{pages && pages[activeBook]}</p>
                </div>

                <div style={{ fontSize: '1rem', display: 'flex' }}>
                  <button style={{ marginRight: '1rem' }}>읽기</button>
                  <button>다 읽은 책</button>
                </div>
              </div>
              <div style={{ flexDirection: 'column' }}>
                <img
                  style={{ width: '2rem', height: '2rem' }}
                  src="https://i.postimg.cc/Z5jSxYp2/heart.png"
                  alt="heart"
                />
                <p>명이 좋아합니다.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
