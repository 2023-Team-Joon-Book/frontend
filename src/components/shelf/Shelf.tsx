import React from 'react'
import Books from './Books'
import { motion } from 'framer-motion'
import '../../scss/Shelf.scss'

interface ShelfProps {
  selectedShelf: 'shelf1' | 'shelf2' | 'shelf3' // 선택된 책장은 이 세 가지 중 하나여야 합니다.
  startIndex: number // 현재 페이지의 시작 인덱스
  endIndex: number // 현재 페이지의 끝 인덱스
}

const Shelf: React.FC<ShelfProps> = ({ selectedShelf, startIndex, endIndex }) => {
  // 책장에 보여줄 책 목록을 상태로 관리
  const shelves = {
    //찜한책
    shelf1: [
      {
        id: 1,
        title: '책 제목 1',
        status: '찜',
        author: '저자 1',
        img_url: 'src/assets/images/1.png',
        pageCount: 70,
      },
      {
        id: 2,
        title: '책 제목 2',
        status: '찜',
        author: '저자 2',
        img_url: 'src/assets/images/2.png',
        pageCount: 70,
      },
      {
        id: 3,
        title: '책 제목 3',
        status: '찜',
        author: '저자 3',
        img_url: 'src/assets/images/3.png',
        pageCount: 70,
      },
      {
        id: 4,
        title: '책 제목 4',
        status: '찜',
        author: '저자 4',
        img_url: 'src/assets/images/4.png',
      },
      {
        id: 5,
        title: '책 제목 5',
        status: '찜',
        author: '저자 5',
        img_url: 'src/assets/images/5.png',
        pageCount: 70,
      },
      {
        id: 6,
        title: '책 제목 6',
        status: '찜',
        author: '저자 6',
        img_url: 'src/assets/images/6.png',
        pageCount: 70,
      },
      {
        id: 7,
        title: '책 제목 7',
        status: '찜',
        author: '저자 7',
        img_url: 'src/assets/images/7.png',
        pageCount: 70,
      },
      {
        id: 8,
        title: '책 제목 8',
        status: '찜',
        author: '저자 8',
        img_url: 'src/assets/images/8.png',
        pageCount: 70,
      },
      {
        id: 9,
        title: '책 제목 9',
        status: '찜',
        author: '저자 9',
        img_url: 'src/assets/images/9.png',
        pageCount: 70,
      },
      {
        id: 10,
        title: '책 제목 10',
        status: '찜',
        author: '저자 10',
        img_url: 'src/assets/images/10.png',
        pageCount: 70,
      },
    ],
    //읽고 있는 책
    shelf2: [
      {
        id: 6,
        title: '책 제목 6',
        status: '읽는 중',
        author: '저자 6',
        img_url: 'src/assets/images/6.png',
        pageCount: 70,
      },
      {
        id: 7,
        title: '책 제목 7',
        status: '읽는 중',
        author: '저자 7',
        img_url: 'src/assets/images/7.png',
        pageCount: 70,
      },
      {
        id: 8,
        title: '책 제목 8',
        status: '읽는 중',
        author: '저자 8',
        img_url: 'src/assets/images/8.png',
        pageCount: 70,
      },
      {
        id: 9,
        title: '책 제목 9',
        status: '읽는 중',
        author: '저자 9',
        img_url: 'src/assets/images/9.png',
        pageCount: 70,
      },
      {
        id: 10,
        title: '책 제목 10',
        status: '읽는 중',
        author: '저자 10',
        img_url: 'src/assets/images/10.png',
        pageCount: 70,
      },
      {
        id: 1,
        title: '책 제목 1',
        status: '읽는 중',
        author: '저자 1',
        img_url: 'src/assets/images/1.png',
        pageCount: 70,
      },
      {
        id: 2,
        title: '책 제목 2',
        status: '읽는 중',
        author: '저자 2',
        img_url: 'src/assets/images/2.png',
        pageCount: 70,
      },
      {
        id: 3,
        title: '책 제목 3',
        status: '읽는 중',
        author: '저자 3',
        img_url: 'src/assets/images/3.png',
        pageCount: 70,
      },
      {
        id: 4,
        title: '책 제목 4',
        status: '읽는 중',
        author: '저자 4',
        img_url: 'src/assets/images/4.png',
        pageCount: 70,
      },
      {
        id: 5,
        title: '책 제목 5',
        status: '읽는 중',
        author: '저자 5',
        img_url: 'src/assets/images/5.png',
        pageCount: 70,
      },
      {
        id: 11,
        title: '책 제목 11',
        status: '읽는 중',
        author: '저자 11',
        img_url: 'src/assets/images/3.png',
        pageCount: 70,
      },
      {
        id: 12,
        title: '책 제목 12',
        status: '읽는 중',
        author: '저자 12',
        img_url: 'src/assets/images/4.png',
        pageCount: 70,
      },
      {
        id: 13,
        title: '책 제목 13',
        status: '읽는 중',
        author: '저자 13',
        img_url: 'src/assets/images/5.png',
        pageCount: 70,
      },
    ],
    //읽은 책
    shelf3: [
      {
        id: 9,
        title: '책 제목 9',
        status: '읽음',
        author: '저자 9',
        img_url: 'src/assets/images/9.png',
        pageCount: 70,
      },
      {
        id: 10,
        title: '책 제목 10',
        status: '읽음',
        author: '저자 10',
        img_url: 'src/assets/images/10.png',
        pageCount: 70,
      },
      {
        id: 4,
        title: '책 제목 4',
        status: '읽음',
        author: '저자 4',
        img_url: 'src/assets/images/4.png',
        pageCount: 70,
      },
      {
        id: 5,
        title: '책 제목 5',
        status: '읽음',
        author: '저자 5',
        img_url: 'src/assets/images/5.png',
        pageCount: 70,
      },
      {
        id: 6,
        title: '책 제목 6',
        status: '읽음',
        author: '저자 6',
        img_url: 'src/assets/images/6.png',
        pageCount: 70,
      },

      {
        id: 1,
        title: '책 제목 1',
        status: '읽음',
        author: '저자 1',
        img_url: 'src/assets/images/1.png',
        pageCount: 70,
      },
      {
        id: 2,
        title: '책 제목 2',
        status: '읽음',
        author: '저자 2',
        img_url: 'src/assets/images/2.png',
        pageCount: 70,
      },
      {
        id: 3,
        title: '책 제목 3',
        status: '읽음',
        author: '저자 3',
        img_url: 'src/assets/images/3.png',
        pageCount: 70,
      },
      {
        id: 7,
        title: '책 제목 7',
        status: '읽음',
        author: '저자 7',
        img_url: 'src/assets/images/7.png',
        pageCount: 70,
      },
      {
        id: 8,
        title: '책 제목 8',
        status: '읽음',
        author: '저자 8',
        img_url: 'src/assets/images/8.png',
        pageCount: 70,
      },
    ],
  }

  // 선택된 책장의 책 목록을 가져옵니다.
  const currentShelfBooks = shelves[selectedShelf]

  // border-bottom scss로 커스터마이징
  return (
    <div>
      <div className="custom-border p-2 m-4 shelf-container">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: '0' }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}>
          <div className="grid grid-cols-5  gap-4 ">
            {currentShelfBooks.slice(startIndex, endIndex - 5).map((book) => (
              <Books
                key={book.id}
                book={book}
                closeModal={function (): void {
                  throw new Error('Function not implemented.')
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      <div className="custom-border p-2 m-4 shelf-container">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: '0' }}
          exit={{ x: '100%' }}
          transition={{ duration: 1.0, ease: 'easeInOut' }}>
          <div className="grid grid-cols-5  gap-4 ">
            {currentShelfBooks.slice(endIndex - 5, endIndex).map((book) => (
              <Books
                key={book.id}
                book={book}
                closeModal={function (): void {
                  throw new Error('Function not implemented.')
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Shelf
