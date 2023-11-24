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

// interface DecodedToken {
//   // 토큰의 구조를 정의합니다.
//   auth: string
//   exp: number
//   iat: number
//   sub: string
//   // 다른 필드가 필요한 경우 추가하세요.
// }

const SearchPage = () => {
  const [activeSwipe, setActiveSwipe] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [books, setBooks] = useState<any[]>([]) // <--- books 상태 추가
  const [isAsk, setIsAsk] = useState(false)
  const [userName, setUserName] = useState('')
  // const [userAuth, setUserAuth] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const access = localStorage.getItem('accessToken')

  useEffect(() => {
    // 컴포넌트가 마운트될 때만 실행
    if (access) {
      let payload = access.substring(access.indexOf('.') + 1, access.lastIndexOf('.'))

      let dec = base64.decode(payload)

      try {
        // JSON 문자열을 JavaScript 객체로 파싱
        const jsonObject = JSON.parse(dec)

        // "sub" 속성에 접근하여 값을 추출
        const subValue = jsonObject.sub
        const authValue = jsonObject.auth
        console.log(jsonObject) // "sunjae333"
        setUserName(subValue)

        if (authValue == 'ROLE_ADMIN') {
          setIsAdmin(true)
        }
      } catch (error) {
        console.error('Error parsing JSON:', error)
      }
    }
  }, []) // 빈 배열은 컴포넌트가 마운트될 때만 실행되도록 합니다.

  const handleSwipeClick = (index: number) => {
    setActiveSwipe((prev) => (prev === index ? null : index))
  }

  const handleSearch = async () => {
    await fetchBooks(searchQuery) // Fetching books with the provided query
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
        // 데이터 없는지 체크
        alert('검색 결과가 없습니다.') // 없으면 알림
      }
      setBooks(fetchedBooks) // 데이터 상태 관리
    } catch (error) {
      console.error('Failed to fetch books', error)
      alert('서버 오류') // 서버 오류
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
