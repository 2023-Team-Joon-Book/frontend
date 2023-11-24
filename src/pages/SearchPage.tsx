import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Ask from '../components/search/Ask'
import SearchBar from '../components/search/SearchBar'
import MyHeader from '../components/Header/MyHeader'
import ViewedBooks from '../components/search/ViewedBooks'
import PopularBooks from '../components/search/PopularBook'
import RecentBooks from '../components/search/RecentBooks'
import ChatModal from '../components/search/ChatModal'
import AdminChatModal from '../components/search/AdminChatModal'
import base64 from 'base-64'

const SearchPage = () => {
  const [activeSwipe, setActiveSwipe] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [books, setBooks] = useState<any[]>([])
  const [isAsk, setIsAsk] = useState(false)
  const [userName, setUserName] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

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
  }, [])

  const handleSwipeClick = (index: number) => {
    setActiveSwipe((prev) => (prev === index ? null : index))
  }

  const handleSearch = async () => {
    await fetchBooks(searchQuery)
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
      const response = await axios.get('http://localhost:8080/api/v1/books/search', {
        params: { title: query },
      })
      const fetchedBooks = response.data
      if (fetchedBooks.length === 0) {
        alert('검색 결과가 없습니다.')
      }
      setBooks(fetchedBooks)
    } catch (error) {
      console.error('Failed to fetch books', error)
      alert('서버 오류')
    }
  }

  return (
    <>
      <MyHeader />
      <form>
        <SearchBar onSearch={handleSearch} onInputChange={setSearchQuery} />
      </form>
      <ViewedBooks onSwipeClick={handleSwipeClick} active={activeSwipe === 0} books={books} />
      <RecentBooks onSwipeClick={handleSwipeClick} active={activeSwipe === 0} />
      <PopularBooks onSwipeClick={handleSwipeClick} active={activeSwipe === 0} />
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
