import BookBox from '../../shelf/BookBox'
import PageRecord from '../../shelf/PageRecord'
import { useMyContext } from '../../Context/MyContext'

const ReadingBook = () => {
  const { setIsModalOpen, setSelectedBook } = useMyContext()

  const handleBookClick = (book: any) => {
    setSelectedBook(book)
    setIsModalOpen(true)
  }
  // 더미 값
  const books = Array(16).fill({
    img: 'https://image.yes24.com/goods/12332164/XL',
    title: '원씽',
    writer: '게리 켈러, 제이 파파산',
  })
  return (
    <>
      <div className="grid grid-cols-4 gap-y-14 gap-x-8 mt-16">
        {books.map((book, index) => (
          <BookBox
            key={index}
            img={book.img}
            title={book.title}
            writer={book.writer}
            onClick={() => handleBookClick(book)}>
            <PageRecord />
          </BookBox>
        ))}
      </div>
    </>
  )
}

export default ReadingBook
