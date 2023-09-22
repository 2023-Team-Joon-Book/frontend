import React, { useState } from 'react'
import Shelf from '../components/shelf/Shelf.tsx'
import ChangeShelf from '../components/shelf/ChangeShelf.tsx'
import Header from '../components/shelf/Header.tsx'

const BookShelf: React.FC = () => {
  // 3개의 책장 구성
  const [selectedShelf, setSelectedShelf] = useState<'shelf1' | 'shelf2' | 'shelf3'>('shelf2') // 초기 책장 선택 상태

  const handleShelfChange = (newShelf: 'shelf1' | 'shelf2' | 'shelf3') => {
    setSelectedShelf(newShelf)
    setCurrentPage(1) // 책장을 변경할 때 페이지를 리셋
  }

  // 페이지네이션
  const [currentPage, setCurrentPage] = useState<number>(1)
  const booksPerPage = 10 // 한 페이지에 보여줄 책의 수
  const startIndex = (currentPage - 1) * booksPerPage // 현재 페이지의 시작 인덱스

  const handleNextPage = () => {
    // 다음 페이지로 이동
    setCurrentPage((currrentPage) => currrentPage + 1)
  }

  const handlePrevPage = () => {
    // 이전 페이지로 이동
    setCurrentPage((currrentPage) => currrentPage - 1)
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
            selectedShelf={selectedShelf}
            startIndex={startIndex}
            endIndex={startIndex + booksPerPage}
            currentPage={currentPage}
          />
          <img
            src="src/assets/images/nextBtn.svg"
            onClick={handleNextPage}
            className="w-10 cursor-pointer m-14"
          />
        </div>
      </div>
    </div>
  )
}

export default BookShelf
