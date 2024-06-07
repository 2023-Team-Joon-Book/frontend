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

const SearchPage = () => {
  const [activeSwipe, setActiveSwipe] = useState<number | null>(null)
  const [books, setBooks] = useState<any[]>([])
  const [isAsk, setIsAsk] = useState(false)
  const [userName, setUserName] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])

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
      }
      setBooks(fetchedBooks)
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

  return (
    <>
      <MyHeader onSearch={handleSearch} />
      <SearchHistorySwipe recentSearches={recentSearches} onSearch={handleSearch} />
      {/* <ViewedBooks onSwipeClick={handleSwipeClick} active={activeSwipe === 0} books={books} /> */}
      <PopularBooks onSwipeClick={handleSwipeClick} active={activeSwipe === 0} />
      <RecentBooks onSwipeClick={handleSwipeClick} active={activeSwipe === 0} />
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
    </>
  )
}

export default SearchPage
