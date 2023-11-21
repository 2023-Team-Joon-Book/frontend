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
      alt="책 표지"
      src={imgSrc}
    />
    <div className="mt-2 text-left">
      <div className="font-bold text-xl mb-1 truncate">{title}</div>
      <div className="text-base text-gray-500 truncate">{author}</div>
    </div>
  </div>
)

export default function RecentBook() {
  const [recent, setRecent] = useState<BookData[]>([])

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const response = await baseInstance.get('/books/new')
        setRecent(response.data.data.content.slice(0, 6))
      } catch (error) {
        console.error('API 호출 오류: ', error)
      }
    }
    fetchRecent()
  }, [])

  return (
    <div className="py-4">
      <h2 className="text-3xl text-center" style={{ fontFamily: 'bmfont' }}>
        최근 출시작
      </h2>
      <div className="flex justify-center space-x-8 w-full overflow-x-auto">
        {recent.map((book, index) => (
          <Book key={index} title={book.title} author={book.author} imgSrc={book.cover_image_url} />
        ))}
      </div>
    </div>
  )
}
