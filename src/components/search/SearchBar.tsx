import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { KeyboardEventHandler, forwardRef, useEffect, useState } from 'react'
import styles from './SearchBar.module.css'
import search from '../../../public/search.png'
import searchfocus from '../../../public/searchfocus.png'
import searchhistory from '../../../public/searchhistory.png'
import searchremove from '../../../public/searchremove.png'

type SearchBarProps = {
  onKeyPress?: KeyboardEventHandler<HTMLInputElement>
  onSearch: (query: string) => void
  onInputChange: (query: string) => void
}
interface Book {
  id: number
  title: string
  author: string
  cover_image_url: string
  publisher?: string
  pages?: number
}

interface SearchHistory {
  query: string
  books: Book[]
}

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ onKeyPress, onSearch, onInputChange }, ref) => {
    const [inputValue, setInputValue] = useState('')
    const [isFocused, setIsFocused] = useState(false)
    const [recentSearches, setRecentSearches] = useState<SearchHistory[]>([])

    useEffect(() => {
      const searches = JSON.parse(localStorage.getItem('recentSearches') || '[]')
      setRecentSearches(searches)
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value)
      onInputChange(e.target.value)
    }

    const handleSearch = () => {
      // 최신 inputValue를 사용하여 검색합니다.
      if (inputValue.trim()) {
        onSearch(inputValue)
        const updatedSearches = [
          { query: inputValue, books: [] },
          ...recentSearches.filter((item) => item.query !== inputValue),
        ]
        localStorage.setItem('recentSearches', JSON.stringify(updatedSearches.slice(0, 10)))
        setRecentSearches(updatedSearches.slice(0, 10))
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleSearch() // handleSearch를 호출하여 검색을 실행합니다.
      }
    }

    return (
      <div className="w-full max-w-sm mx-auto">
        <div className="relative">
          <input
            type="text"
            className={styles.formInput}
            placeholder="책 제목을 검색해주세요."
            ref={ref}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 100)}
          />
          {isFocused && recentSearches.length > 0 && (
            <ul
              className="absolute z-10 p-2 w-full pt-1 mt-1 overflow-auto bg-[#FAFAF6] rounded-[20px] max-h-40 "
              style={{ boxShadow: '4px 8px 10px rgba(0, 0, 0, 0.3)' }}>
              <span className="inline-block px-2 py-1 mb-3 text-sm text-gray-500">최근 검색어</span>
              {recentSearches.map((search, idx) => (
                <div
                  className="flex pl-2 hover:bg-gray-100"
                  onClick={() => {
                    setInputValue(search.query)
                    onSearch(search.query)
                  }}>
                  <img
                    src={searchhistory}
                    className="w-auto h-4 mt-3 cursor-pointer"
                    alt="Search icon"
                  />
                  <li key={idx} className="p-2 cursor-pointer ">
                    {search.query}
                  </li>
                </div>
              ))}
              <div className="mt-2" />
            </ul>
          )}
          <div className="absolute transform -translate-y-1/2 right-3 top-1/2">
            <img
              src={isFocused ? searchfocus : search}
              className="w-auto h-8 cursor-pointer"
              onClick={handleSearch}
            />
          </div>
        </div>
      </div>
    )
  },
)

export default SearchBar
