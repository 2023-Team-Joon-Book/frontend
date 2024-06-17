import BookBox from '../../shelf/BookBox'
import HeartIcon from '../../../assets/svgs/heart.svg?react'
import { useEffect, useState } from 'react'
import { baseInstance } from '../../../api/config'
import { useMyContext } from '../../Context/MyContext'
import Swal from 'sweetalert2'
type BookType = {
  cover_image_url: string
  title: string
  author: string
}

const WishList = () => {
  const [books, setBooks] = useState<BookType[]>([])
  const access = localStorage.getItem('accessToken')
  const { selectedBook, setSelectedBook } = useMyContext()

  const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer
      toast.onmouseleave = Swal.resumeTimer
    },
  })

  // 찜한 책 api 요청
  useEffect(() => {
    getWishList()
  }, [])

  const getWishList = async () => {
    try {
      const response = await baseInstance.get('/readings?status=LIKE', {
        headers: { Authorization: `Bearer ${access}` },
      })
      const wishBooks = response.data.bookInfos.content
      const newBooks = wishBooks.map((book) => ({ ...book, isLiked: true }))
      setBooks(newBooks)
    } catch (error) {
      console.log(error)
    }
  }

  const toggleWhishList = async (book) => {
    setSelectedBook(book)

    try {
      const response = await baseInstance.post(`/books/like/${book.id}`)
      if (response.data.code === 'B002') {
        setBooks((prevBooks) =>
          prevBooks.map((prevBook) =>
            prevBook.id === book.id ? { ...prevBook, isLiked: !book.isLiked } : prevBook,
          ),
        )
        const message = !book.isLiked ? '읽고 싶은 책이 저장되었습니다' : '읽고 싶은 책이 삭제되었습니다'
        Toast.fire({
          icon: 'success',
          title: message,
        })
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An unknown error occurred.'
      Swal.fire({
        title: `오류: ${errorMessage}`,
        icon: 'error',
      })
    }
  }

  return (
    <>
      <div className="grid grid-cols-4 gap-y-14 gap-x-8 mt-16">
        {books.length === 0 ? (
          <>
            <img src="" alt="" />
            <p>찜한 목록이 없습니다</p>
            <button>책 찜하러 가기</button>
          </>
        ) : (
          books?.map((book, index) => (
            <BookBox
              key={index}
              img={book.cover_image_url}
              title={book.title}
              writer={book.author}
              children={
                <div className="flex flex-row-reverse pr-3 pt-3 h-[3rem]">
                  <HeartIcon
                    fill={book.isLiked ? '#4ebb00' : 'none'}
                    // fill={book.isLiked ? 'none' : 'none'}
                    onClick={() => toggleWhishList(book)}
                  />
                </div>
              }
            />
          ))
        )}
      </div>
    </>
  )
}

export default WishList
