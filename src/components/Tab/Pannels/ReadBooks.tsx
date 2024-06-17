import BookBox from '../../shelf/BookBox'
import StarRate from '../../shelf/StarRate'
import { useMyContext } from '../../Context/MyContext'
import axios from 'axios'
import { useEffect, useState } from 'react'

type BookType = {
  cover_image_url: string
  title: string
  author: string
}

const ReadBook = () => {
  const [books, setBooks] = useState<BookType[]>([])
  const { setIsModalOpen, setSelectedBook } = useMyContext()

  const handleBookClick = (book: any) => {
    setSelectedBook({ ...book, status: 'Read' })
    setIsModalOpen(true)
  }
  // 읽은 책 api 요청
  useEffect(() => {
    getReadBooks()
  }, [])

  const getReadBooks = async () => {
    try {
      const access = localStorage.getItem('accessToken')

      const response = await axios.get('http://localhost:8081/api/v1/readings?status=READ', {
        headers: { Authorization: `Bearer ${access}` },
      })
      const readBooks = response.data.bookInfos.content
      setBooks(readBooks)
console.log('책 목록',readBooks);

    } catch (error) {
      console.log(error)
    }
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
          <StarRate grade={3} />
        </BookBox>
      ))}
    </div>
  )
}

export default ReadBook
