import BookBox from '../../shelf/BookBox'
import PageRecord from '../../shelf/PageRecord'
import { useMyContext } from '../../Context/MyContext'
import axios from 'axios'
import { useEffect, useState } from 'react'

type BookType = {
  cover_image_url: string
  title: string
  author: string
  pages: number
  percentage: number
  last_page: number
}

const ReadingBook = () => {
  const [books, setBooks] = useState<BookType[]>([])
  console.log(books)

  // 읽고 있는 책 api 요청
  useEffect(() => {
    getReadingBooks()
  }, [])

  const getReadingBooks = async () => {
    try {
      const access = localStorage.getItem('accessToken')
      const response = await axios.get('http://localhost:8081/api/v1/readings?status=READING', {
        headers: { Authorization: `Bearer ${access}` },
      })
      const readingBooks = response.data.bookInfos.content
      setBooks(readingBooks)
    } catch (error) {
      console.log(error)
    }
  }

  const { setIsModalOpen, setSelectedBook } = useMyContext()

  const handleBookClick = (book: any) => {
    setSelectedBook({ ...book, status: 'Reading' })
    setIsModalOpen(true)
  }

  return (
    <>
      {books.length === 0 ? (
        <div className="text-center text-2xl mt-16">읽고 있는 책이 없습니다.</div>
      ) : (
        <div className="grid grid-cols-4 gap-y-14 gap-x-8 mt-16">
          {books?.map((book, index) => (
            <BookBox
              key={index}
              img={book.cover_image_url}
              title={book.title}
              writer={book.author}
              onClick={() => handleBookClick(book)}>
              <PageRecord
                pages={book.pages}
                percentages={book.percentage}
                lastPage={book.last_page}
              />
            </BookBox>
          ))}
        </div>
      )}
    </>
  )
}

export default ReadingBook
