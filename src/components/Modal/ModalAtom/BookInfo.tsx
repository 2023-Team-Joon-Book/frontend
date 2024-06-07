type BookType = {
  cover_image_url: string
  title: string
  author: string
}

type BookInfoProps = {
  book: BookType
}

const BookInfo: React.FC<BookInfoProps> = ({ book }) => {
  return (
    <>
      <img
        src={book.cover_image_url}
        alt={book.title}
        className="shadow-custom w-[9rem] h-[12rem]"
      />
      <h2 className="text-lg font-black mt-2 max-w-[12rem] overflow-hidden truncate whitespace-nowrap">
        {book.title}
      </h2>
      <p className="mt-2 text-base font-medium max-w-[9rem] overflow-hidden truncate whitespace-nowrap">
        {book.author}
      </p>
    </>
  )
}

export default BookInfo
