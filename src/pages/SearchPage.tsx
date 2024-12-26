import { useEffect, useState } from 'react'
import axios from 'axios'
import Ask from '../components/search/Ask'
import PopularBooks from '../components/search/PopularBook'
import RecentBooks from '../components/search/RecentBooks'
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import ChatModal from '../components/search/ChatModal'
import AdminChatModal from '../components/search/AdminChatModal'
import base64 from 'base-64'
import SearchHistorySwipe from '../components/search/swiper/SearchHistory/SearchHistorySwipe'
import beforearrow from '../../public/beforearrow.png'
import { baseInstance } from '../api/config'
import { useLocation } from 'react-router-dom'

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

const SearchPage = () => {
  const [activeSwipe, setActiveSwipe] = useState<number | null>(null)
  const [books, setBooks] = useState<Book[]>([])
  const [isAsk, setIsAsk] = useState(false)
  const [userName, setUserName] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [recentSearches, setRecentSearches] = useState<SearchHistory[]>([])
  const [step, setStep] = useState('검색 메인')
  const [currentQuery, setCurrentQuery] = useState<string>('')
  const location = useLocation()
  const access = localStorage.getItem('accessToken')

  useEffect(() => {
    if (access) {
      let payload = access.substring(access.indexOf('.') + 1, access.lastIndexOf('.'))
      let dec = base64.decode(payload)

      try {
        const jsonObject = JSON.parse(dec)

        const subValue = jsonObject.sub
        const authValue = jsonObject.auth

        setUserName(subValue)

        if (authValue == 'ROLE_ADMIN') {
          setIsAdmin(true)
        }
      } catch (error) {
        console.error('Error parsing JSON:', error)
      }
    }
  }, [access])

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const query = queryParams.get('query')
    if (query) {
      handleSearch(query)
    }
  }, [location.search])

  useEffect(() => {
    const storedSearches = localStorage.getItem('recentSearches')
    if (storedSearches) {
      setRecentSearches(JSON.parse(storedSearches))
    }
  }, [])

  const handleSwipeClick = (index: number) => {
    setActiveSwipe((prev) => (prev === index ? null : index))
  }

  const handleAsk = () => {
    setIsAsk(true)
  }

  const disableHandleAsk = () => {
    setIsAsk(false)
  }

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
    fetchBooks(query)
    setStep('검색 결과')
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

  const handleBookClick = (book: Book) => {
    const updatedSearches = recentSearches.map((search) => {
      if (search.query === currentQuery) {
        return {
          ...search,
          books: [book, ...search.books.filter((b) => b.id !== book.id)], // 클릭한 책만 추가
        }
      }
      return search
    })

    setRecentSearches(updatedSearches)
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches))
  }

  const handleBackToMain = () => {
    setStep('검색 메인')
  }

  const truncateText = (text: string, length: number) => {
    if (text.length > length) {
      return text.substring(0, length) + '...'
    }
    return text
  }

  return (
    <div className="max-w-[1324px] mx-auto">
      <MyHeader onSearch={handleSearch} />
      {step === '검색 메인' ? (
        <>
          {recentSearches.length > 0 && (
            <SearchHistorySwipe recentSearches={recentSearches} onSearch={handleSearch} />
          )}
          <PopularBooks onSwipeClick={handleSwipeClick} active={activeSwipe === 0} />
          <RecentBooks onSwipeClick={handleSwipeClick} active={activeSwipe === 0} />
        </>
      ) : (
        <>
          {/* 검색 결과 표시 */}
          <div className="p-8 pt-[150px]">
            <h2 className="pb-8 text-xl font-bold">
              <span className="text-[#90C66A]">'{currentQuery}'</span>에 대한 검색 결과입니다.
            </h2>
            <button
              onClick={handleBackToMain}
              className="z-50 fixed bottom-5 left-10 py-2 bg-[rgba(51,109,26,0.9)] w-16 h-16 rounded-full mb-2 transition-transform duration-300 hover:scale-110 hover:bg-[rgba(51,109,26,1)]">
              <img src={beforearrow} className="inline-block w-auto mr-2 h-9" />
            </button>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
              {books.map((book, index) => (
                <div key={index} className="">
                  {/* <div className="w-[185px] h-[250px]">
                    <img
                      src={book.cover_image_url}
                      className="w-auto h-auto max-w-full max-h-full mx-auto my-auto shadow-sm"
                    />
                  </div> */}
                  <button
                    key={index}
                    className="cursor-pointer focus:outline-none"
                    onClick={() => handleBookClick(book)}>
                    <img
                      src={book.cover_image_url}
                      className="w-[185px] h-[250px] shadow-sm transition-transform duration-300 hover:shadow-lg hover:shadow-black/50"
                    />
                  </button>
                  <h3 className="pt-2 text-lg font-bold">{book.title}</h3>
                  <p className="text-base text-gray-500">{truncateText(book.author, 10)}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      {isAsk ? (
        isAdmin ? (
          <AdminChatModal
            disableHandleAsk={disableHandleAsk}
            userName={userName}
            isAdmin={isAdmin}
          />
        ) : (
          <ChatModal disableHandleAsk={disableHandleAsk} userName={userName} isAdmin={isAdmin} />
        )
      ) : (
        <Ask handleAsk={handleAsk} />
      )}
    </div>
  )
}

export default SearchPage
