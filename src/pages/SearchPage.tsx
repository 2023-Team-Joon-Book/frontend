import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Ask from '../components/search/Ask'
import MyHeader from '../components/Header/MyHeader'
import ViewedBooks from '../components/search/ViewedBooks'
import PopularBooks from '../components/search/PopularBook'
import RecentBooks from '../components/search/RecentBooks'
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import ChatModal from '../components/search/ChatModal'
import AdminChatModal from '../components/search/AdminChatModal'
import base64 from 'base-64'
import SearchHistorySwipe from '../components/search/swiper/SearchHistory/SearchHistorySwipe'
import beforearrow from '../../public/beforearrow.png'

const SearchPage = () => {
  const [activeSwipe, setActiveSwipe] = useState<number | null>(null)
  const [books, setBooks] = useState<any[]>([])
  const [isAsk, setIsAsk] = useState(false)
  const [userName, setUserName] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [step, setStep] = useState('검색 메인')
  const [currentQuery, setCurrentQuery] = useState<string>('')

  const access = localStorage.getItem('accessToken')

  useEffect(() => {
    if (access) {
      let payload = access.substring(access.indexOf('.') + 1, access.lastIndexOf('.'))
      let dec = base64.decode(payload)

      try {
        // JSON 문자열을 JavaScript 객체로 파싱
        const jsonObject = JSON.parse(dec)

        // "sub" 속성에 접근하여 값을 추출
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

  // 책 정보를 가져오는 함수
  const fetchBooks = async (query: string) => {
    try {
      const response = await axios.get('http://localhost:8081/api/v1/books/search', {
        params: { title: query },
      })
      const fetchedBooks = response.data
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
      Toast.fire({
        icon: 'success',
        title: '검색 성공!',
      })
      if (fetchedBooks.length === 0) {
        // 데이터 없는지 체크
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
        Toast.fire({
          icon: 'warning',
          title: '검색 결과가 없습니다.',
        })
      } else {
        setStep('검색 결과')
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
    // 검색을 수행하는 로직을 구현합니다.
    fetchBooks(query)
    const storedSearches = localStorage.getItem('recentSearches')
    if (storedSearches) {
      setRecentSearches(JSON.parse(storedSearches))
    }
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
          <SearchHistorySwipe recentSearches={recentSearches} onSearch={handleSearch} />
          {/* <ViewedBooks onSwipeClick={handleSwipeClick} active={activeSwipe === 0} books={books} /> */}
          <PopularBooks onSwipeClick={handleSwipeClick} active={activeSwipe === 0} />
          <RecentBooks onSwipeClick={handleSwipeClick} active={activeSwipe === 0} />
        </>
      ) : (
        <>
          {/* 검색 결과 표시 */}
          <div className="p-8 pt-[150px]">
            <h2 className="text-xl font-bold pb-8">
              <span className="text-[#90C66A]">'{currentQuery}'</span>에 대한 검색 결과입니다.
            </h2>
            <button
              onClick={handleBackToMain}
              className="z-50 fixed bottom-5 left-10 py-2 bg-[rgba(51,109,26,0.9)] w-16 h-16 rounded-full mb-2 transition-transform duration-300 hover:scale-110 hover:bg-[rgba(51,109,26,1)]">
              <img src={beforearrow} className="w-auto h-9 inline-block mr-2" />
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
              {books.map((book, index) => (
                <div key={index} className=" ">
                  {/* <div className="w-[185px] h-[250px]">
                    <img
                      src={book.cover_image_url}
                      className="w-auto h-auto max-h-full max-w-full mx-auto my-auto shadow-sm"
                    />
                  </div> */}
                  <button
                    key={index}
                    className="cursor-pointer focus:outline-none"
                    onClick={() => console.log('Button clicked', book)}>
                    <img
                      src={book.cover_image_url}
                      className="w-[185px] h-[250px] shadow-sm transition-transform duration-300 hover:shadow-lg hover:shadow-black/50"
                    />
                  </button>
                  <h3 className="text-lg font-bold pt-2">{book.title}</h3>
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
