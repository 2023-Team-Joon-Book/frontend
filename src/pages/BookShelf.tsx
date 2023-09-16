import React, { useState } from 'react'
import Shelf from '../components/shelf/Shelf.tsx'
import ChangeShelf from '../components/shelf/ChangeShelf.tsx'
import Header from '../components/shelf/Header.tsx'

const BookShelf: React.FC = () => {
  const [selectedShelf, setSelectedShelf] = useState<'shelf1' | 'shelf2' | 'shelf3'>('shelf1') // 초기 책장 선택 상태

  const handleShelfChange = (newShelf: 'shelf1' | 'shelf2' | 'shelf3') => {
    setSelectedShelf(newShelf)
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4 flex flex-col items-center m-32">
        <ChangeShelf onShelfChange={handleShelfChange} selectedShelf={selectedShelf} />
        <Shelf selectedShelf={selectedShelf} />
      </div>
    </div>
  )
}

export default BookShelf
