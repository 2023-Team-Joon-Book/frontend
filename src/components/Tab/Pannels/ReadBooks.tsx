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
    setSelectedBook(book)
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
      const readBooks = response.data.bookInfos
      setBooks(readBooks)

      console.log('응답 값', response.data)
    } catch (error) {
      console.log(error)
    }
  }
  // 더미 값
  // const books = Array(16).fill({
  //   img: 'https://image.yes24.com/goods/126344176/XL',
  //   title: '다정하지만 만만하지 않습니다',
  //   writer: '정문정',
  // })
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
