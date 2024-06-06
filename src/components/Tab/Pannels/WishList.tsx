import BookBox from '../../shelf/BookBox'
import HeartIcon from '../../../assets/svgs/heart.svg?react'
const WishList = () => {
  // 더미 값
  const books = Array(16).fill({
    img: 'https://image.yes24.com/goods/126344176/XL',
    title: '다정하지만 만만하지 않습니다',
    writer: '정문정',
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
            children={
              <div className="flex flex-row-reverse pr-3 pt-3 h-[3rem]">
                <HeartIcon fill="#8bbf66" />
              </div>
            }
          />
        ))}
      </div>
    </>
  )
}

export default WishList
