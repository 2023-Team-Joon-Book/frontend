import styled from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import { FreeMode, Pagination } from 'swiper/modules'
import { useEffect, useState } from 'react'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'

interface SwipeProps {
  index: number
  onSwipeClick: (index: number) => void
  active: boolean
  title?: string
  name?: string[]
  author?: string[]
  publisher?: string[]
  pages?: string[]
}

interface BookState {
  read: boolean
  readComplete: boolean
  heartBlack: boolean
}

export default function Swipe({
  title,
  name,
  author,
  publisher,
  pages,
  onSwipeClick,
  active,
  index,
}: SwipeProps) {
  const [activeBook, setActiveBook] = useState<number | null>(null)
  const [booksState, setBooksState] = useState<Record<number, BookState>>({})

  const currentBookState = booksState[activeBook!] || {
    read: false,
    readComplete: false,
    heartBlack: false,
  }

  useEffect(() => {
    const closeAccordion = (e: MouseEvent) => {
      if (e.target !== e.currentTarget) {
        setActiveBook(null)
      }
    }

    // 아코디언이 열렸을 때만 리스너를 추가합니다.
    if (activeBook !== null) {
      document.addEventListener('click', closeAccordion)
    }

    return () => {
      document.removeEventListener('click', closeAccordion)
    }
  }, [activeBook])

  const toggleAccordion = (clickedIndex: number) => {
    setActiveBook((prev) => (prev === clickedIndex ? null : clickedIndex))
  }

  const handleInnerClick = (event: React.MouseEvent) => {
    event.stopPropagation()
  }

  const toggleRead = () => {
    const currentBookState = booksState[activeBook!] || {
      read: false,
      readComplete: false,
      heartBlack: false,
    }
    setBooksState({
      ...booksState,
      [activeBook!]: { ...currentBookState, read: true, readComplete: false },
    })
  }

  const toggleReadComplete = () => {
    const currentBookState = booksState[activeBook!] || {
      read: false,
      readComplete: false,
      heartBlack: false,
    }
    setBooksState({
      ...booksState,
      [activeBook!]: { ...currentBookState, read: false, readComplete: true },
    })
  }

  const toggleHeartColor = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    const currentBookState = booksState[activeBook!] || {
      read: false,
      readComplete: false,
      heartBlack: false,
    }
    setBooksState({
      ...booksState,
      [activeBook!]: { ...currentBookState, heartBlack: !currentBookState.heartBlack },
    })
  }

  return (
    <Container>
      {title && <SwiperTitle>{title}</SwiperTitle>}
      <StyledSwiper
        slidesPerView={7}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: false,
        }}
        modules={[FreeMode, Pagination]}>
        {[...Array(14).keys()].map((index) => (
          <SwiperSlide key={index} onClick={() => toggleAccordion(index)}>
            <BookCover>
              <StyledImg
                active={activeBook === index}
                src="https://i.postimg.cc/jdyPDVpc/bigbook.jpg"
                alt={`Book ${index + 1}`}
              />
              {activeBook === index && (
                <StyledIcon>
                  <SearchRoundedIcon style={{ width: '7rem', height: '7rem', color: '#fff' }} />
                </StyledIcon>
              )}
              <BookTextContainer>
                <BookName>{name && name[index]}</BookName>
                <BookAuthor>{author && author[index]}</BookAuthor>
              </BookTextContainer>
            </BookCover>
          </SwiperSlide>
        ))}
      </StyledSwiper>

      {activeBook !== null && (
        <AccordionContent onClick={handleInnerClick}>
          <hr />
          <BookDetails>
            <BookImageDetail
              // src={`path/to/book${activeBook + 1}.jpg`}
              src="https://i.postimg.cc/jdyPDVpc/bigbook.jpg"
              alt={`Book ${activeBook + 1}`}
            />
            <BookInfo>
              <Info>
                <div>
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

                <div style={{ fontSize: '1.25rem', display: 'flex', fontWeight: 'bold' }}>
                  <StyledButton
                    active={currentBookState.read}
                    onClick={toggleRead}
                    style={{ marginRight: '1rem' }}>
                    읽기
                  </StyledButton>

                  <StyledButton active={currentBookState.readComplete} onClick={toggleReadComplete}>
                    다 읽은 책
                  </StyledButton>
                </div>
              </Info>
            </BookInfo>
            {/* <Like> */}
            <HeartButton onClick={toggleHeartColor}>
              <img
                style={{
                  width: '2rem',
                  height: '2rem',
                  marginTop: '0.5rem',
                }}
                src={
                  currentBookState.heartBlack
                    ? 'https://i.postimg.cc/1XkRS36B/blackheart.png'
                    : 'https://i.postimg.cc/Z5jSxYp2/heart.png'
                }
                alt="heart"
              />
            </HeartButton>
            {/* <p>명이 좋아합니다.</p> */}
            {/* </Like> */}
          </BookDetails>
        </AccordionContent>
      )}
    </Container>
  )
}

const Container = styled.div`
  padding: 2rem;
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

const AccordionContent = styled.div`
  padding: 10px;
  display: block;
  width: 100%;
  min-height: 150px;
`

const BookDetails = styled.div`
  display: flex;
  align-items: flex-start;
  padding-top: 3.25rem;
  padding-left: 10rem;
`

const BookImageDetail = styled.img`
  width: 25.25rem;
  height: 35.25rem;
  background-color: gray;
  margin-right: 1rem;
`

const BookInfo = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
  & > div {
    display: flex;
  }
  margin-left: 2rem;
`

const Info = styled.div`
  flex-direction: column;
  gap: 1.3rem;
`

const BookCover = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  cursor: pointer;
  position: relative;
`

const StyledImg = styled.img<{ active: boolean }>`
  transition: box-shadow 0.3s ease;
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

const BookTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 0.5rem;
`

const BookName = styled.h1`
  font-size: 1.25rem;
  font-weight: bold;
`

const BookAuthor = styled.h2`
  font-size: 1rem;
  color: gray;
`

// const Like = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 1.4rem;
//   align-items: flex-end;
//   margin-left: 20rem;
// `

const StyledButton = styled.button<{ active: boolean }>`
  color: ${({ active }) => (active ? '#BFC66A' : 'initial')};
  transition: color 0.3s ease;
  &:hover {
    color: #bfc66a;
  }
`

const HeartButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 3rem;
  margin-left: auto;
`
