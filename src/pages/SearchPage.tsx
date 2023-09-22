import { useState } from 'react'
import Ask from '../components/search/Ask'
import SearchBar from '../components/search/SearchBar'
import Swipe from '../components/search/swiper/Swipe'
import MyHeader from '../components/Header/MyHeader'

const SearchPage = () => {
  const [activeSwipe, setActiveSwipe] = useState<number | null>(null)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [hasSearched, setHasSearched] = useState<boolean>(false)

  const handleSwipeClick = (index: number) => {
    setActiveSwipe((prev) => (prev === index ? null : index))
  }

  const handleSearch = () => {
    setHasSearched(true)
    const dummyResults = searchQuery ? ['결과1', '결과2', '결과3'] : []
    setSearchResults(dummyResults)
  }

  return (
    <>
      <MyHeader />
      <form>
        <SearchBar onSearch={handleSearch} onInputChange={setSearchQuery} />
      </form>
      {hasSearched ? (
        searchResults.length ? (
          searchResults.map((result) => <div key={result}>{result}</div>)
        ) : (
          <div>조회할 결과가 없습니다.</div>
        )
      ) : null}
      <Swipe
        index={0}
        onSwipeClick={handleSwipeClick}
        active={activeSwipe === 0}
        title="최근에 본 도서"
        name={[
          '제목 1',
          '제목 2',
          '제목 3',
          '제목 4',
          '제목 5',
          '제목 6',
          '제목 7',
          '제목 8',
          '제목 9',
          '제목 10',
          '제목 11',
          '제목 12',
          '제목 13',
          '제목 14',
        ]}
        author={[
          '저자 1',
          '저자 2',
          '저자 3',
          '저자 4',
          '저자 5',
          '저자 6',
          '저자 7',
          '저자 8',
          '저자 9',
          '저자 10',
          '저자 11',
          '저자 12',
          '저자 13',
          '저자 14',
        ]}
        publisher={[
          '출판사 1',
          '출판사 2',
          '출판사 3',
          '출판사 4',
          '출판사 5',
          '출판사 6',
          '출판사 7',
          '출판사 8',
          '출판사 9',
          '출판사 10',
          '출판사 11',
          '출판사 12',
          '출판사 13',
          '출판사 14',
        ]}
        pages={[
          '쪽수 1',
          '쪽수 2',
          '쪽수 3',
          '쪽수 4',
          '쪽수 5',
          '쪽수 6',
          '쪽수 7',
          '쪽수 8',
          '쪽수 9',
          '쪽수 10',
          '쪽수 11',
          '쪽수 12',
          '쪽수 13',
          '쪽수 14',
        ]}
      />
      <Swipe
        index={1}
        onSwipeClick={handleSwipeClick}
        active={activeSwipe === 1}
        title="인기 도서"
        name={[
          '제목 1',
          '제목 2',
          '제목 3',
          '제목 4',
          '제목 5',
          '제목 6',
          '제목 7',
          '제목 8',
          '제목 9',
          '제목 10',
          '제목 11',
          '제목 12',
          '제목 13',
          '제목 14',
        ]}
        author={[
          '저자 1',
          '저자 2',
          '저자 3',
          '저자 4',
          '저자 5',
          '저자 6',
          '저자 7',
          '저자 8',
          '저자 9',
          '저자 10',
          '저자 11',
          '저자 12',
          '저자 13',
          '저자 14',
        ]}
        publisher={[
          '출판사 1',
          '출판사 2',
          '출판사 3',
          '출판사 4',
          '출판사 5',
          '출판사 6',
          '출판사 7',
          '출판사 8',
          '출판사 9',
          '출판사 10',
          '출판사 11',
          '출판사 12',
          '출판사 13',
          '출판사 14',
        ]}
        pages={[
          '쪽수 1',
          '쪽수 2',
          '쪽수 3',
          '쪽수 4',
          '쪽수 5',
          '쪽수 6',
          '쪽수 7',
          '쪽수 8',
          '쪽수 9',
          '쪽수 10',
          '쪽수 11',
          '쪽수 12',
          '쪽수 13',
          '쪽수 14',
        ]}
      />
      <Swipe
        index={2}
        onSwipeClick={handleSwipeClick}
        active={activeSwipe === 2}
        title="최근 출시작"
        name={[
          '제목 1',
          '제목 2',
          '제목 3',
          '제목 4',
          '제목 5',
          '제목 6',
          '제목 7',
          '제목 8',
          '제목 9',
          '제목 10',
          '제목 11',
          '제목 12',
          '제목 13',
          '제목 14',
        ]}
        author={[
          '저자 1',
          '저자 2',
          '저자 3',
          '저자 4',
          '저자 5',
          '저자 6',
          '저자 7',
          '저자 8',
          '저자 9',
          '저자 10',
          '저자 11',
          '저자 12',
          '저자 13',
          '저자 14',
        ]}
        publisher={[
          '출판사 1',
          '출판사 2',
          '출판사 3',
          '출판사 4',
          '출판사 5',
          '출판사 6',
          '출판사 7',
          '출판사 8',
          '출판사 9',
          '출판사 10',
          '출판사 11',
          '출판사 12',
          '출판사 13',
          '출판사 14',
        ]}
        pages={[
          '쪽수 1',
          '쪽수 2',
          '쪽수 3',
          '쪽수 4',
          '쪽수 5',
          '쪽수 6',
          '쪽수 7',
          '쪽수 8',
          '쪽수 9',
          '쪽수 10',
          '쪽수 11',
          '쪽수 12',
          '쪽수 13',
          '쪽수 14',
        ]}
      />
      <Ask />
    </>
  )
}

export default SearchPage
