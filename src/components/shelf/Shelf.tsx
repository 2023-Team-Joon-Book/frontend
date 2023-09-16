import React from 'react'
import Books from './Books'
import { motion } from 'framer-motion'

interface ShelfProps {
  selectedShelf: 'shelf1' | 'shelf2' | 'shelf3' // 선택된 책장은 이 세 가지 중 하나여야 합니다.
}

const Shelf: React.FC<ShelfProps> = ({ selectedShelf }) => {
  // 책장에 보여줄 책 목록을 상태로 관리
  const shelves = {
    shelf1: [
      {
        id: 1,
        title: '책 제목 1',
        status: '읽는 중',
        author: '저자 1',
        img_url: 'src/assets/images/1.png',
      },
      {
        id: 2,
        title: '책 제목 2',
        status: '읽음',
        author: '저자 2',
        img_url: 'src/assets/images/2.png',
      },
      {
        id: 3,
        title: '책 제목 3',
        status: '읽음',
        author: '저자 3',
        img_url: 'src/assets/images/3.png',
      },
      {
        id: 4,
        title: '책 제목 4',
        status: '읽는 중',
        author: '저자 4',
        img_url: 'src/assets/images/4.png',
      },
      {
        id: 5,
        title: '책 제목 5',
        status: '읽는 중',
        author: '저자 5',
        img_url: 'src/assets/images/5.png',
      },
      {
        id: 6,
        title: '책 제목 6',
        status: '읽음',
        author: '저자 6',
        img_url: 'src/assets/images/6.png',
      },
      {
        id: 7,
        title: '책 제목 7',
        status: '읽음',
        author: '저자 7',
        img_url: 'src/assets/images/7.png',
      },
      {
        id: 8,
        title: '책 제목 8',
        status: '읽는 중',
        author: '저자 8',
        img_url: 'src/assets/images/8.png',
      },
      {
        id: 9,
        title: '책 제목 9',
        status: '읽는 중',
        author: '저자 9',
        img_url: 'src/assets/images/9.png',
      },
      {
        id: 10,
        title: '책 제목 10',
        status: '읽음',
        author: '저자 10',
        img_url: 'src/assets/images/10.png',
      },
    ],
    shelf2: [
      {
        id: 6,
        title: '책 제목 6',
        status: '읽음',
        author: '저자 6',
        img_url: 'src/assets/images/6.png',
      },
      {
        id: 7,
        title: '책 제목 7',
        status: '읽음',
        author: '저자 7',
        img_url: 'src/assets/images/7.png',
      },
      {
        id: 8,
        title: '책 제목 8',
        status: '읽는 중',
        author: '저자 8',
        img_url: 'src/assets/images/8.png',
      },
      {
        id: 9,
        title: '책 제목 9',
        status: '읽는 중',
        author: '저자 9',
        img_url: 'src/assets/images/9.png',
      },
      {
        id: 10,
        title: '책 제목 10',
        status: '읽음',
        author: '저자 10',
        img_url: 'src/assets/images/10.png',
      },
      {
        id: 1,
        title: '책 제목 1',
        status: '읽는 중',
        author: '저자 1',
        img_url: 'src/assets/images/1.png',
      },
      {
        id: 2,
        title: '책 제목 2',
        status: '읽음',
        author: '저자 2',
        img_url: 'src/assets/images/2.png',
      },
      {
        id: 3,
        title: '책 제목 3',
        status: '읽음',
        author: '저자 3',
        img_url: 'src/assets/images/3.png',
      },
      {
        id: 4,
        title: '책 제목 4',
        status: '읽는 중',
        author: '저자 4',
        img_url: 'src/assets/images/4.png',
      },
      {
        id: 5,
        title: '책 제목 5',
        status: '읽는 중',
        author: '저자 5',
        img_url: 'src/assets/images/5.png',
      },
    ],
    shelf3: [
      {
        id: 9,
        title: '책 제목 9',
        status: '읽는 중',
        author: '저자 9',
        img_url: 'src/assets/images/9.png',
      },
      {
        id: 10,
        title: '책 제목 10',
        status: '읽음',
        author: '저자 10',
        img_url: 'src/assets/images/10.png',
      },
      {
        id: 4,
        title: '책 제목 4',
        status: '읽는 중',
        author: '저자 4',
        img_url: 'src/assets/images/4.png',
      },
      {
        id: 5,
        title: '책 제목 5',
        status: '읽는 중',
        author: '저자 5',
        img_url: 'src/assets/images/5.png',
      },
      {
        id: 6,
        title: '책 제목 6',
        status: '읽음',
        author: '저자 6',
        img_url: 'src/assets/images/6.png',
      },

      {
        id: 1,
        title: '책 제목 1',
        status: '읽는 중',
        author: '저자 1',
        img_url: 'src/assets/images/1.png',
      },
      {
        id: 2,
        title: '책 제목 2',
        status: '읽음',
        author: '저자 2',
        img_url: 'src/assets/images/2.png',
      },
      {
        id: 3,
        title: '책 제목 3',
        status: '읽음',
        author: '저자 3',
        img_url: 'src/assets/images/3.png',
      },
      {
        id: 7,
        title: '책 제목 7',
        status: '읽음',
        author: '저자 7',
        img_url: 'src/assets/images/7.png',
      },
      {
        id: 8,
        title: '책 제목 8',
        status: '읽는 중',
        author: '저자 8',
        img_url: 'src/assets/images/8.png',
      },
    ],
  }

  // 선택된 책장의 책 목록을 가져옵니다.
  const currentShelfBooks = shelves[selectedShelf]

  return (
    <div>
      <div className="border-b-8 border-white shadow-lg m-4 ">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: '0' }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}>
          <div className="grid grid-cols-5  gap-0 ">
            {currentShelfBooks.slice(0, 5).map((book) => (
              <Books key={book.id} book={book} />
            ))}
          </div>
        </motion.div>
      </div>

      <div className="border-b-8 border-white shadow-lg m-4">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: '0' }}
          exit={{ x: '100%' }}
          transition={{ duration: 1.0, ease: 'easeInOut' }}>
          <div className="grid grid-cols-5  gap-0 ">
            {currentShelfBooks.slice(5, 10).map((book) => (
              <Books key={book.id} book={book} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Shelf
