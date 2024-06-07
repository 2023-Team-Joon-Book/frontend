import BookBox from '../../shelf/BookBox'
import HeartIcon from '../../../assets/svgs/heart.svg?react'
import axios from 'axios'
import { useEffect, useState } from 'react'

type BookType = {
  cover_image_url: string
  title: string
  author: string
}

const WishList = () => {
  const [books, setBooks] = useState<BookType[]>([])
  // 찜한 책 api 요청
  useEffect(() => {
    getWishList()
  }, [])

  const getWishList = async () => {
    try {
      const access = localStorage.getItem('accessToken')
      const response = await axios.get('http://localhost:8081/api/v1/readings?status=LIKE', {
        headers: { Authorization: `Bearer ${access}` },
      })
      const wishBooks = response.data.bookInfos
      setBooks(wishBooks)
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
    <>
      <div className="grid grid-cols-4 gap-y-14 gap-x-8 mt-16">
        {books.map((book, index) => (
          <BookBox
            key={index}
            img={book.cover_image_url}
            title={book.title}
            writer={book.author}
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
