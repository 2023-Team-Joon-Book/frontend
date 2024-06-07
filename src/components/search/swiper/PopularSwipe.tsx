import styled from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import { FreeMode, Pagination } from 'swiper/modules'
import { useEffect, useState } from 'react'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
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
    <Container>
      {title && <SwiperTitle>{title}</SwiperTitle>}
      <StyledSwiper
        slidesPerView={5}
        spaceBetween={30}
        freeMode={true}
        pagination={{ clickable: false }}
        modules={[FreeMode, Pagination]}>
        {booksData.map((book, index) => (
          <SwiperSlide key={index} onClick={() => handleBookClick(book.id)}>
            <BookCover>
              <StyledImg
                src={book.cover_image_url}
                alt={`Book ${index + 1}`}
                active={false} // default value
              />
              <StyledIcon>
                <SearchRoundedIcon style={{ width: '7rem', height: '7rem', color: '#fff' }} />
              </StyledIcon>
              <BookInfoContainer>
                <BookRank>
                  <span>{index + 1}</span>
                </BookRank>
                <BookTextContainer>
                  <BookName>{book.title}</BookName>
                </BookTextContainer>
              </BookInfoContainer>
            </BookCover>
          </SwiperSlide>
        ))}
      </StyledSwiper>
    </Container>
  )
}

const Container = styled.div`
  padding: 2rem;
  padding-top: 120px;
`

const SwiperTitle = styled.h1`
  font-size: 1.25rem;
  font-weight: bold;
  padding-top: 2rem;
  padding-bottom: 1rem;
`

const StyledSwiper = styled(Swiper)`
  padding-bottom: 2.5rem;
  .swiper-pagination-bullet {
    display: none;
  }
`

const BookCover = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f0f3ca;
  cursor: pointer;
  position: relative;
  border-radius: 1rem;
  padding: 1.7rem;
  margin-left: 1rem;
  transition:
    box-shadow 0.3s ease,
    filter 0.3s ease;
  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }
`

const StyledImg = styled.img<{ active: boolean }>`
  width: 200px;
  height: 250px;
  object-fit: contain;
  background-color: white;
  transition:
    box-shadow 0.3s ease,
    filter 0.3s ease;
  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }
  filter: ${({ active }) => (active ? 'brightness(80%)' : 'none')};
`
const StyledIcon = styled.div`
  position: absolute;
  top: 43%;
  left: 50%;
  transform: translate(-50%, -50%);
`
const BookInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding-top: 0.65rem;
`
const BookRank = styled.h1`
  font-size: 3.75rem;
  font-weight: 700;
  margin-right: 0.5rem;
`
const BookTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-grow: 1;
  padding-top: 2.7rem;
`

const BookName = styled.h1`
  font-size: 1.1rem;
  font-weight: bold;
  max-width: 130px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  justify-content: center;
`
