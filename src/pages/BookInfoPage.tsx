import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import { baseInstance } from '../api/config'
import MyHeader from '../components/Header/MyHeader'
import likebook from '../../public/likebook.png'
import readingbook from '../../public/readingbook.png'
import readbook from '../../public/readbook.png'
import emptyheart from '../../public/emptyheart.png'
import blackheart from '../../public/blackheart.png'

interface BookData {
  id: number
  title: string
  author: string
  publisher: string
  cover_image_url: string
  height: number
  width: number
  pages: number
  likes: number
  like_status: boolean
  description: string
}

interface Book {
  title: string
  author: string
  cover_image_url: string
  publisher?: string
  pages?: number
  id: number
}

interface SearchHistory {
  query: string
  books: Book[]
}

export default function BookInfoPage() {
  const { id } = useParams<{ id: string }>()
  const [bookData, setBookData] = useState<BookData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [recentSearches, setRecentSearches] = useState<SearchHistory[]>([])
  const [step, setStep] = useState('검색 메인')
  const [books, setBooks] = useState<Book[]>([])
  const [currentQuery, setCurrentQuery] = useState<string>('')
  const navigate = useNavigate()

  const fetchBooks = async (query: string) => {
    try {
      const response = await baseInstance.get('/books/search', {
        params: { title: query },
      })
      const fetchedBooks = response.data

      Swal.fire({
        icon: 'success',
        title: '검색 성공!',
        timer: 3000,
      })

      if (fetchedBooks.length === 0) {
        Swal.fire({
          icon: 'warning',
          title: '검색 결과가 없습니다.',
          timer: 3000,
        })
      } else {
        setStep('검색 결과')
      }

      const updatedSearches = [...recentSearches]
      if (!updatedSearches.find((search) => search.query === query)) {
        updatedSearches.unshift({ query, books: [] })
        setRecentSearches(updatedSearches)
        localStorage.setItem('recentSearches', JSON.stringify(updatedSearches))
      }

      setBooks(fetchedBooks)
      setCurrentQuery(query)
    } catch (error) {
      console.error('Failed to fetch books', error)
      Swal.fire({
        title: '네트워크 오류입니다!',
        icon: 'error',
      })
    }
  }

  const handleSearch = (query: string) => {
    navigate('/booksearch') // 검색을 하면 '/booksearch'로 네비게이트
    fetchBooks(query) // 검색 실행
    const storedSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]')
    const newSearch = {
      query: query,
      books: [],
    }
    const updatedSearches = storedSearches.filter((search: any) => search.query !== query)
    updatedSearches.unshift(newSearch)
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches))
    setRecentSearches(updatedSearches)
  }

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await baseInstance.get(`/books/${id}`)
        setBookData(response.data.data)
        setError(null)
      } catch (error) {
        const axiosError = error as AxiosError
        if (axiosError.response && axiosError.response.status === 401) {
          setError('Unauthorized')
        } else {
          setError('An error occurred while fetching book data.')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchBookData()
  }, [id])

  const handleLikeToggle = async () => {
    try {
      await baseInstance.post(`/books/like/${id}`)
      if (bookData) {
        setBookData({
          ...bookData,
          like_status: !bookData.like_status,
          likes: bookData.like_status ? bookData.likes - 1 : bookData.likes + 1,
        })
      }
      Swal.fire({
        icon: 'success',
        title: `${bookData?.like_status ? '찜 해제되었습니다.' : '찜되었습니다.'}`,
      })
    } catch (error) {
      console.error('Error updating like status:', error)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  const updateBookLike = async (bookId: number) => {
    try {
      await baseInstance.post(`/books/like/${bookId}`)
      alert('찜한 책 갱신 성공!')
    } catch (error: any) {
      console.error('Error updating book like:', error)
      const errorMessage = error.response?.data?.message || 'An unknown error occurred.'
      console.error('Server Error Message:', errorMessage)
      alert(`Error: ${errorMessage}`)
    }
  }

  return (
    <div className="max-w-[1324px] mx-auto p-8">
      <MyHeader onSearch={handleSearch} /> {/* 검색 실행 */}
      {bookData && (
        <>
          <div className="flex pt-[130px] space-x-8 justify-center">
            {/* 책 커버 */}
            <div className="w-[400px] h-auto shadow-lg rounded-lg overflow-hidden">
              <img
                src={bookData.cover_image_url}
                alt={bookData.title}
                className="object-cover w-full h-full"
              />
            </div>

            {/* 책 정보 */}
            <div className="flex flex-col w-2/4 pl-12 space-y-4">
              <div className="flex">
                <h1 className="text-2xl font-bold">{bookData.title}</h1>
              </div>

              <div className="flex pb-16">
                <p className="text-base">{`${bookData.author}`}</p>
                <p className="px-2 text-sm">|</p>
                <p className="text-base">{`${bookData.publisher}`}</p>
                <p className="px-2 text-sm">|</p>
                <p className="text-base">{`${bookData.pages}쪽`}</p>
              </div>
              <div className="flex flex-col">
                <span className="mb-4 text-lg font-bold">책 소개</span>
                <span className="text-sm font-normal whitespace-pre-line">{`${bookData.description}`}</span>
              </div>

              {/* 좋아요 기능 */}
            </div>
          </div>

          {/* 서재에 담기, 좋아요 기능 */}
          <div className="fixed bottom-0 z-50 flex items-center justify-center w-full h-24 pr-32 border-t border-inherit">
            <button
              onClick={() => navigate('/shelf')}
              className="mt-8 w-[28rem] h-12 bg-[#333] mr-8 py-2 mb-8 text-md text-white rounded-md">
              서재에 담기
            </button>

            <button
              onClick={() => navigate('/shelf')}
              className="mt-8 w-[28rem] h-12 bg-[#333] py-2 mb-8 text-md text-white rounded-md">
              다 읽은 책
            </button>

            {/* 좋아요 기능 */}
            <div className="flex flex-col items-center justify-center h-full ml-10 space-y-2">
              <button className="" onClick={handleLikeToggle}>
                <img
                  src={bookData.like_status ? blackheart : emptyheart}
                  alt={bookData.like_status ? '찜 해제' : '찜하기'}
                  className="w-8 h-8 transition-transform ease-out hover:scale-110"
                />
              </button>
              <span className="text-sm">{bookData.likes} 명이 찜했습니다</span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
