import React, { useEffect, useState } from 'react'
import { baseInstance } from '../../api/config'

interface BookData {
  title: string
  author: string
  cover_image_url: string
}

interface BookProps {
  title: string
  author: string
  imgSrc: string
}

const Book: React.FC<BookProps> = ({ title, author, imgSrc }) => (
  <div className="w-44">
    <img
      className="h-64 bg-gray-200 rounded-lg flex flex-col justify-center"
      alt="도서 표지"
      src={imgSrc}
    />
    <div className="mt-2 text-left">
      <div className="font-bold text-xl mb-1 truncate">{title}</div>
      <div className="text-base text-gray-500 truncate">{author}</div>
    </div>
  </div>
)

export default function PopularBook() {
  const [popular, setPopular] = useState<BookData[]>([])

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const response = await baseInstance.get('/books/like')
        setPopular(response.data.data.content.slice(0, 6))
      } catch (error) {
        console.error('API 호출 오류: ', error)
      }
    }
    fetchPopular()
  }, [])

  return (
    <div className="py-4">
      <h2 className="text-3xl mb-8 text-center" style={{ fontFamily: 'Noto Sans KR' }}>
        인기있는 도서
      </h2>
      <div className="flex justify-center space-x-8 w-full overflow-x-auto">
        {popular.map((book, index) => (
          <Book key={index} title={book.title} author={book.author} imgSrc={book.cover_image_url} />
        ))}
      </div>
    </div>
  )
}
