import BookBox from '../../shelf/BookBox'
import StarRate from '../../shelf/StarRate'
import { useMyContext } from '../../Context/MyContext'
import axios from 'axios'
import { useEffect, useState } from 'react'

type BookType = {
  cover_image_url: string
  title: string
  author: string
  grade: number
}

const ReadBook = () => {
  const [books, setBooks] = useState<BookType[]>([])
  const { isModalOpen, setIsModalOpen, setSelectedBook } = useMyContext()

  const handleBookClick = (book: any) => {
    setSelectedBook({ ...book, status: 'Read' })
    setIsModalOpen(true)
  }
  // 읽은 책 api 요청
  useEffect(() => {
    getReadBooks()
  }, [isModalOpen])

  const getReadBooks = async () => {
    try {
      const access = localStorage.getItem('accessToken')

      const response = await axios.get('http://localhost:8081/api/v1/readings?status=READ', {
        headers: { Authorization: `Bearer ${access}` },
      })
      const readBooks = response.data.bookInfos.content
      setBooks(readBooks)
    } catch (error) {}
  }

  return (
    <div className="grid grid-cols-4 gap-y-14 gap-x-8 mt-16">
      {books.map((book, index) => (
        <BookBox
          key={index}
          img={book.cover_image_url}
          title={book.title}
          writer={book.author}
          onClick={() => handleBookClick(book)}>
          {book.grade === 0 ? (
            <button className="text-gray-600 pl-6  pt-2">책 리뷰 남기기 {' >'}</button>
          ) : (
            <StarRate grade={book.grade} />
          )}
        </BookBox>
      ))}
    </div>
  )
}

export default ReadBook
