import React, { useEffect, useState } from 'react'
import Shelf from '../components/shelf/Shelf.tsx'
import ChangeShelf from '../components/shelf/ChangeShelf.tsx'
import Header from '../components/Header/ShelfHeader.tsx'
import DetailModal from '../components/shelf/DetailModal.tsx'
import ReviewModal from '../components/shelf/ReviewModal.tsx'
import axios from 'axios'
import BookInfo from '../components/Modal/ModalAtom/BookInfo'

const BookShelfPage: React.FC = () => {
  // 3개의 책장 구성
  const [selectedShelf, setSelectedShelf] = useState<'shelf1' | 'shelf2' | 'shelf3'>('shelf2') // 초기 책장 선택 상태

  // 사용자가 가지고 있는 책목록
  const [shelves, setShelves] = useState({
    shelf1: [{}],
    shelf2: [{}],
    shelf3: [{}],
  })

  // 페이지네이션
  const [currentPage, setCurrentPage] = useState<number>(3)
  const booksPerPage = 10 // 한 페이지에 보여줄 책의 수
  const startIndex = (currentPage - 1) * booksPerPage // 현재 페이지의 시작 인덱스

  const handleShelfChange = async (newShelf: 'shelf1' | 'shelf2' | 'shelf3') => {
    setSelectedShelf(newShelf)
    setCurrentPage(1) // 책장을 변경할 때 페이지를 리셋
  }
  const handleNextPage = () => {
    // 다음 페이지로 이동
    setCurrentPage((currentPage) => currentPage + 1)
  }

  const handlePrevPage = () => {
    // 이전 페이지로 이동
    setCurrentPage((currentPage) => currentPage - 1)
  }

  useEffect(() => {
    // 이펙트 함수 내에서 API 요청 실행
    async function fetchData() {
      if (selectedShelf === 'shelf2') {
        await bookInfo2()
      } else if (selectedShelf === 'shelf3') {
        await bookInfo3()
      } else if (selectedShelf === 'shelf1') {
        await bookInfo1()
      }
    }

    fetchData()
    console.log('api요청')
  }, [selectedShelf]) // selectedShelf가 변경될 때마다 이펙트 함수 실행

  // 찜한 책 api 요청
  async function bookInfo1() {
    try {
      const access = localStorage.getItem('accessToken')

      const response_1 = await axios.get('http://localhost:8081/api/v1/readings?status=LIKE', {
        headers: { Authorization: `Bearer ${access}` },
      })
      const readingData_1 = response_1.data.bookInfos
      const statusData = response_1.data.status

      console.log('응답 값', response_1.data)
      // 책장 데이터를 업데이트하고 "status"를 추가합니다.
      setShelves((prevShelves) => {
        return {
          ...prevShelves,
          shelf1: readingData_1.map((book: any) => ({ ...book, status: statusData })),
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  // 읽고 있는 책 api 요청
  async function bookInfo2() {
    try {
      const access = localStorage.getItem('accessToken')

      const response_2 = await axios.get('http://localhost:8081/api/v1/readings?status=READING', {
        headers: { Authorization: `Bearer ${access}` },
      })
      const readingData_2 = response_2.data.bookInfos.content
      const statusData = response_2.data.status

      console.log('응답 값', response_2.data.bookInfos.content)
      // 책장 데이터를 업데이트하고 "status"를 추가합니다.
      setShelves((prevShelves) => {
        return {
          ...prevShelves,
          shelf2: readingData_2.map((book: any) => ({
            ...book,
            status: statusData,
          })),
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  // 읽은 책 api 요청
  async function bookInfo3() {
    try {
      const access = localStorage.getItem('accessToken')

      const response_3 = await axios.get('http://localhost:8081/api/v1/readings?status=READ', {
        headers: { Authorization: `Bearer ${access}` },
      })
      const readingData_3 = response_3.data.bookInfos.content
      const statusData = response_3.data.status

      console.log('응답 값', response_3.data)

      // 책장 데이터를 업데이트
      // 책장 데이터를 업데이트하고 "status"를 추가합니다.
      setShelves((prevShelves) => {
        return {
          ...prevShelves,
          shelf3: readingData_3.map((book: any) => ({ ...book, status: statusData })),
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  // 선택된 책장의 책 목록을 가져옵니다.
  const currentShelfBooks = shelves[selectedShelf]

  // 모달창 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false)

  // 선택된 책 정보를 관리할 상태
  const [selectedBook, setSelectedBook] = useState<{
    author: string
    cover_image_url: string
    height: string
    id: number
    like_status: boolean
    likes: number
    pages: number
    publisher: string
    title: string
    width: number
    status: string
  } | null>(null)

  const openModal = (book: {
    author: string
    cover_image_url: string
    height: string
    id: number
    like_status: boolean
    likes: number
    pages: number
    publisher: string
    title: string
    width: number
    status: string
  }) => {
    setSelectedBook(book)
    setIsModalOpen(true)
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4 flex flex-col items-center m-32">
        <ChangeShelf onShelfChange={handleShelfChange} selectedShelf={selectedShelf} />
        <div className="flex flex-row ">
          <img
            src="src/assets/images/prevBtn.svg"
            onClick={handlePrevPage}
            className="w-10 cursor-pointer m-14"
          />
          <Shelf
            startIndex={startIndex}
            endIndex={startIndex + booksPerPage}
            currentPage={currentPage}
            currentShelfBooks={currentShelfBooks}
            setIsModalOpen={setIsModalOpen}
            openModal={openModal}
          />
          <img
            src="src/assets/images/nextBtn.svg"
            onClick={handleNextPage}
            className="w-10 cursor-pointer m-14"
          />
        </div>
      </div>
      {isModalOpen && selectedBook?.status == 'READING' && (
        <div className="">
          <DetailModal setIsModalOpen={setIsModalOpen} book={selectedBook} />
        </div>
      )}
      {isModalOpen && selectedBook?.status == 'READ' && (
        <div className="">
          <ReviewModal setIsModalOpen={setIsModalOpen} book={selectedBook} />
        </div>
      )}
    </div>
  )
}

export default BookShelfPage
