import BookBox from '../../shelf/BookBox'
import StarRate from '../../shelf/StarRate'
import { useMyContext } from '../../Context/MyContext'

const ReadBook = () => {
  const { setIsModalOpen, setSelectedBook } = useMyContext()

  const handleBookClick = (book: any) => {
    setSelectedBook(book)
    setIsModalOpen(true)
  }
  // 더미 값
  const books = Array(16).fill({
    img: 'https://image.yes24.com/goods/126344176/XL',
    title: '다정하지만 만만하지 않습니다',
    writer: '정문정',
  })
  return (
    <div className="grid grid-cols-4 gap-y-14 gap-x-8 mt-16">
      {books.map((book, index) => (
        <BookBox
          key={index}
          img={book.img}
          title={book.title}
          writer={book.writer}
          onClick={() => handleBookClick(book)}>
          <StarRate grade={3} />
        </BookBox>
      ))}
    </div>
  )
}

export default ReadBook
