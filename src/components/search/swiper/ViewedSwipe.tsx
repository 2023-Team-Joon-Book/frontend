import styled from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import { FreeMode, Pagination } from 'swiper/modules'
import { useEffect, useState } from 'react'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { baseInstance } from '../../../api/config'
import Swal from "sweetalert2";
import 'sweetalert2/src/sweetalert2.scss'

interface ViewedSwipeProps {
    index: number
    onSwipeClick: (index: number) => void
    active: boolean
    id: (string | null)[];
    title?: string
    name?: string[]
    author?: string[]
    publisher?: string[]
    pages?: string[]
    coverImageUrl: string[]
}

interface BookState {
    read: boolean
    readComplete: boolean
    heartBlack: boolean
}

interface BookDetails {
    code: string;
    message: string;
    data: {
        id: number;
        title: string;
        author: string;
        publisher: string;
        cover_image_url: string;
        height: number;
        width: number;
        pages: number;
        likes: number;
        like_status: boolean;
    };
}

export default function Swipe({
    title,
    name,
    author,
    publisher,
    pages,
    coverImageUrl,
    id,
    // onSwipeClick,
    // active,
    index,
}: ViewedSwipeProps) {
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

    const updateReadingStatus = async (bookId: string, status: string) => {
        try {
            await baseInstance.post('/readings', {
                bookId,
                lastPage: 0, // lastPage 값을 어떻게 설정할지에 따라서 적절한 값을 사용하세요.
                status,
            });
            const Toast = Swal.mixin({
                toast: true,
                position: "top",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "success",
                title: "책이 등록되었습니다.📚"
            });
        } catch (error: any) {
            console.error('Error updating reading status:', error);
            const errorMessage = error.response?.data?.errorMessage || 'An unknown error occurred.';
            console.error('Server Error Message:', errorMessage);
            Swal.fire({
                title: `${errorMessage} 입니다.`,
                icon: "error"
            });
        }
    }

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

        if (activeBook === null) return;

        // 아래에서 책의 ID를 가져옵니다.
        const bookId = id[activeBook];
        if (!bookId) return;

        await updateReadingStatus(bookId, 'reading');
    }


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

        if (activeBook === null) return;

        // 책의 ID를 가져오기
        const bookId = id[activeBook];
        if (!bookId) return;

        await updateReadingStatus(bookId, 'read');
    }

    const updateBookLike = async (bookId: string | null) => {
        if (bookId === null) return;

        try {
            await baseInstance.post(`/books/like/${bookId}`, {
                like_status: bookDetails ? !bookDetails.data.like_status : true, // Assuming default 'like' status is false
            });
            const Toast = Swal.mixin({
                toast: true,
                position: "top",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "success",
                title: "찜한 책 갱신 완료!"
            });
        } catch (error: any) {
            console.error('좋아요 업데이트 중 오류 발생:', error);
            const errorMessage = error.response?.data?.message || '알 수 없는 오류가 발생했습니다.';
            console.error('서버 오류 메시지:', errorMessage);
            Swal.fire({
                title: `오류: ${errorMessage}`,
                icon: "error"
            });
        }
    };

    const toggleHeartColor = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();

        if (activeBook === null) return;

        // 1. 책 상세 정보가 null 이 아니면  toggleHeartColor 함수 실행
        // 2. bookDetail 상태에 like_status 정보 업데이트
        if (bookDetails) {
            setBookDetails({
                ...bookDetails,
                data: {
                    ...bookDetails.data,
                    like_status: !bookDetails.data.like_status,
                }
            });
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
        if (activeBook === null) return;

        const bookId = id[activeBook];

        // 좋아요 API 호출
        await updateBookLike(bookId);
    }


    const [bookDetails, setBookDetails] = useState<BookDetails | null>(null);


    useEffect(() => {
        // activeBook 상태가 바뀔 때마다 호출되어 책 정보를 가져오는 함수
        const fetchBookDetails = async () => {
            if (activeBook !== null) {
                try {
                    const response = await baseInstance.get(`/books/${id[activeBook]}`);
                    console.log(response); // 책 id값에 따른 한권 조회 콘솔 디버깅
                    setBookDetails(response.data); // 책 상태 정보 업데이트
                } catch (error) {
                    console.error('Failed to fetch book details:', error);
                }
            }
        };

        fetchBookDetails();
    }, [activeBook, id]);

    return (
        <Container>

            {title && <SwiperTitle>{title}</SwiperTitle>}
            <StyledSwiper
                slidesPerView={7}
                spaceBetween={30}
                freeMode={true}
                modules={[FreeMode, Pagination]}
            >
                <div className="absolute inset-0 flex items-center justify-center bg-white opacity-70">
                    <span className="text-xl font-bold">책 제목을 검색해보세요! 📚</span>
                </div>
                {
                    name && name.slice(0, 30).map((bookName, index) => (
                        <SwiperSlide key={index} onClick={() => toggleAccordion(index)}>
                            <BookCover>
                                <StyledImg
                                    active={activeBook === index}
                                    src={coverImageUrl && coverImageUrl.length > index ? coverImageUrl[index] : "https://i.postimg.cc/jdyPDVpc/bigbook.jpg"}
                                    alt={`Book ${index + 1}`}
                                />

                                {activeBook === index && (
                                    <StyledIcon>
                                        <SearchRoundedIcon style={{ width: '7rem', height: '7rem', color: '#fff' }} />
                                    </StyledIcon>
                                )}
                                <BookTextContainer>
                                    <BookName>{bookName}</BookName>  {/* name 배열에서 가져온 제목을 사용 */}
                                    <BookAuthor>{author && author[index]}</BookAuthor>  {/* author 배열에서 가져온 저자를 사용 */}
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
                            src={bookDetails ? bookDetails.data.cover_image_url : "https://i.postimg.cc/jdyPDVpc/bigbook.jpg"}
                            alt={bookDetails ? bookDetails.data.title : `Book ${index + 1}`}
                        />
                        <BookInfo>
                            <Info>
                                <div>
                                    <h2 style={{ fontFamily: 'BM Jua', fontSize: '2rem' }}>
                                        {name && name[activeBook]}
                                    </h2>
                                </div>

                                <div style={{ fontFamily: 'BM Hanna Air', display: 'flex' }}>
                                    <p>{author && author[activeBook]}</p>
                                    <p style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>|</p>
                                    <p>{publisher && publisher[activeBook]}</p>
                                    <p style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>|</p>
                                    <p>{pages && pages[activeBook]}</p>
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
                                    bookDetails && bookDetails.data.like_status
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
width: 200px;  // 고정된 너비 설정
height: 250px; // 고정된 높이 설정
object-fit: contain; // 이미지가 컨테이너에 맞춰져서 잘리지 않도록 조정
background-color: white; // 빈 공간에 배경색 추가
transition: box-shadow 0.3s ease, filter 0.3s ease;
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
