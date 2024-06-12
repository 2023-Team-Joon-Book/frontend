import styled from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import { FreeMode, Pagination } from 'swiper/modules'
import { useEffect, useState } from 'react'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { baseInstance } from '../../../api/config'
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

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

interface BookState {
  read: boolean
  readComplete: boolean
  heartBlack: boolean
}

// 책 한권 조회로 API 호출 타입 선언

interface BookDetail {
  id: number
  title: string
  author: string
  publisher: string
  cover_image_url: string
  pages: number
  like_status: boolean
  // 다른 필요한 속성들...
}

export default function RecentSwipe({
  title, // name,
  // publisher,
  // author,
  // pages,
  // onSwipeClick,
  // active,
  // index,
}: RecentSwipeProps) {
  const [activeBook, setActiveBook] = useState<number | null>(null)
  const [booksState, setBooksState] = useState<Record<number, BookState>>({})
  const [booksData, setBooksData] = useState<any[]>([]) // 추가: API로부터 불러온 책 데이터를 저장할 상태

  useEffect(() => {
    const fetchBooksData = async () => {
      try {
        const response = await baseInstance.get('/books/new')
        if (response.data && response.data.data && response.data.data.content) {
          setBooksData(response.data.data.content) // 불러온 데이터를 상태에 저장
        }
      } catch (error) {
        console.error('Error fetching books data:', error)
      }
    }

    fetchBooksData()
  }, [])

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
    const bookId = booksData[clickedIndex].id
    fetchBookDetail(bookId)
  }

  const handleInnerClick = (event: React.MouseEvent) => {
    event.stopPropagation()
  }

  // 읽기 / 다 읽은 책 버튼에 따른 readings/read 상태로 API post 함수
  const updateReadingStatus = async (bookId: number, status: string) => {
    try {
      await baseInstance.post('/readings', {
        bookId,
        lastPage: 0, // lastPage 값을 어떻게 설정할지에 따라서 적절한 값을 사용하세요.
        status,
      })
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
      Toast.fire({
        icon: 'success',
        title: '책이 등록되었습니다.📚',
      })
    } catch (error: any) {
      console.error('Error updating reading status:', error)
      const errorMessage = error.response?.data?.errorMessage || 'An unknown error occurred.'
      console.error('Server Error Message:', errorMessage)
      Swal.fire({
        title: `${errorMessage} 입니다.`,
        icon: 'error',
      })
    }
  }

  // 읽기 버튼을 눌렀을 시 updateReadingStatus 'reading' 설정
  const toggleRead = async () => {
    const currentBookState = booksState[activeBook!] || {
      read: false,
      readComplete: false,
      heartBlack: false,
    }

    setBooksState({
      ...booksState,
      [activeBook!]: { ...currentBookState, read: true, readComplete: false },
    })

    // 책이 선택되지 않았다면, API 호출을 진행하지 않습니다.
    if (activeBook === null) return

    const bookId = booksData[activeBook].id

    await updateReadingStatus(bookId, 'reading')
  }

  // 읽기 버튼을 눌렀을 시 updateReadingStatus 'read' 설정
  const toggleReadComplete = async () => {
    const currentBookState = booksState[activeBook!] || {
      read: false,
      readComplete: false,
      heartBlack: false,
    }

    setBooksState({
      ...booksState,
      [activeBook!]: { ...currentBookState, read: false, readComplete: true },
    })

    // 책이 선택되지 않았다면, API 호출을 진행하지 않습니다.
    if (activeBook === null) return

    const bookId = booksData[activeBook].id

    await updateReadingStatus(bookId, 'read')
  }

  const updateBookLike = async (bookId: number) => {
    try {
      await baseInstance.post(`/books/like/${bookId}`)
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
      Toast.fire({
        icon: 'success',
        title: '찜한 책 갱신 완료!',
      })
    } catch (error: any) {
      console.error('Error updating book like:', error)
      const errorMessage = error.response?.data?.message || 'An unknown error occurred.'
      console.error('Server Error Message:', errorMessage)
      Swal.fire({
        title: `오류: ${errorMessage}`,
        icon: 'error',
      })
    }
  }
  // 1. 책 상세 정보가 null 이 아니면  toggleHeartColor 함수 실행
  // 2. bookDetail 상태에 like_status 정보 업데이트
  const toggleHeartColor = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()

    if (selectedBookDetail) {
      setSelectedBookDetail({
        ...selectedBookDetail,
        like_status: !selectedBookDetail.like_status,
      })
    }

    const currentBookState = booksState[activeBook!] || {
      read: false,
      readComplete: false,
      heartBlack: false,
    }

    setBooksState({
      ...booksState,
      [activeBook!]: { ...currentBookState, heartBlack: !currentBookState.heartBlack },
    })

    // 책이 선택되지 않았다면, API 호출을 진행하지 않습니다.
    if (activeBook === null) return

    const bookId = booksData[activeBook].id

    // 좋아요 API 호출
    await updateBookLike(bookId)
  }

  // 책 디테일 한권 조회 상태 선언
  const [selectedBookDetail, setSelectedBookDetail] = useState<BookDetail | null>(null)

  // 책 디테일 한권 조회 API 호출
  const fetchBookDetail = async (bookId: number) => {
    try {
      const response = await baseInstance.get(`/books/${bookId}`)
      console.log(response) // 책 id값에 따른 한권 조회 콘솔 디버깅
      if (response.data && response.data.data) {
        setSelectedBookDetail(response.data.data) // 책 상태 정보 업데이트
      }
    } catch (error) {
      console.error('Error fetching book details:', error)
    }
  }

  return (
    <Container>
      {title && <SwiperTitle>{title}</SwiperTitle>}
      <StyledSwiper
        slidesPerView={6}
        spaceBetween={30}
        freeMode={true}
        pagination={{ clickable: false }}
        modules={[FreeMode, Pagination]}>
        {booksData.map((book, index) => (
          <SwiperSlide key={index} onClick={() => toggleAccordion(index)}>
            <BookCover>
              <StyledImg
                active={activeBook === index}
                src={book.cover_image_url} // API에서 불러온 이미지 URL을 사용
                alt={`Book ${index + 1}`}
              />
              {activeBook === index && (
                <StyledIcon>
                  <SearchRoundedIcon style={{ width: '7rem', height: '7rem', color: '#fff' }} />
                </StyledIcon>
              )}
              <BookTextContainer>
                <BookName>{book.title}</BookName> {/* API에서 불러온 제목을 사용 */}
                <BookAuthor>{book.author}</BookAuthor> {/* API에서 불러온 저자를 사용 */}
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
              src={
                selectedBookDetail?.cover_image_url ?? 'https://i.postimg.cc/jdyPDVpc/bigbook.jpg'
              }
              alt={`Book ${selectedBookDetail?.title ?? ''}`}
            />
            <BookInfo>
              <Info>
                <div>
                  <h2 style={{ fontFamily: 'BM Jua', fontSize: '2rem' }}>
                    {booksData[activeBook]?.title}
                  </h2>
                </div>

                <div style={{ fontFamily: 'BM Hanna Air', display: 'flex' }}>
                  <p>{booksData[activeBook]?.author}</p>
                  <p style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>|</p>
                  <p>{booksData[activeBook]?.publisher}</p>
                  <p style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>|</p>
                  <p>{booksData[activeBook]?.pages}</p>
                </div>

                <div
                  style={{
                    fontFamily: 'BM Jua',
                    fontSize: '1.4rem',
                    display: 'flex',
                  }}>
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
            {/* 좋아요 누른 경우에 따른 하트 버튼 렌더링 */}
            <HeartButton onClick={toggleHeartColor}>
              <img
                style={{
                  width: '2rem',
                  height: '2rem',
                  marginTop: '0.5rem',
                }}
                src={
                  selectedBookDetail && selectedBookDetail.like_status
                    ? 'https://i.postimg.cc/1XkRS36B/blackheart.png'
                    : 'https://i.postimg.cc/Z5jSxYp2/heart.png'
                }
                alt="heart"
              />
            </HeartButton>
          </BookDetails>
        </AccordionContent>
      )}
    </Container>
  )
}

const Container = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: center;
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
  width: 200px; // 고정된 너비 설정
  height: 250px; // 고정된 높이 설정
  object-fit: contain; // 이미지가 컨테이너에 맞춰져서 잘리지 않도록 조정
  background-color: none; // 빈 공간에 배경색 추가
  transition:
    box-shadow 0.3s ease,
    filter 0.3s ease;
  box-shadow: ${({ active }) => (active ? '0 6px 12px rgba(0, 0, 0, 0.3)' : 'none')};
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
  color: black;
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
