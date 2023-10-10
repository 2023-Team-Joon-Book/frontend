import { useState } from 'react'
import Ask from '../components/search/Ask'
import SearchBar from '../components/search/SearchBar'
import MyHeader from '../components/Header/MyHeader'
import ViewedBooks from '../components/search/ViewedBooks'
import PopularBooks from '../components/search/PopularBook'
import ResentBooks from '../components/search/ResentBooks'

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
      <ResentBooks onSwipeClick={handleSwipeClick} active={activeSwipe === 0} />
      <ViewedBooks onSwipeClick={handleSwipeClick} active={activeSwipe === 0} />
      <PopularBooks onSwipeClick={handleSwipeClick} active={activeSwipe === 0} />
      <Ask />
    </>
  )
}

export default SearchPage
