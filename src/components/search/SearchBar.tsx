import { KeyboardEventHandler, forwardRef, useState } from 'react'
import styles from './SearchBar.module.css'
import search from '../../../public/search.png'
import searchfocus from '../../../public/searchfocus.png'
import searchremove from '../../../public/searchremove.png'

type SearchBarProps = {
  onKeyPress?: KeyboardEventHandler<HTMLInputElement>
  onSearch: () => void
  onInputChange: (query: string) => void
}

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ onSearch, onInputChange }, ref) => {
    const [isFocused, setIsFocused] = useState(false)
    const [inputValue, setInputValue] = useState('')

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value)
      onInputChange(e.target.value)
    }

    const clearInput = () => {
      setInputValue('')
      onInputChange('')
    }

    const handleSearch = () => {
      onSearch()
      saveSearch(inputValue)
    }

    // 검색어를 로컬 스토리지에 저장하는 함수
    const saveSearch = (query: string) => {
      const recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]')
      const updatedSearches = [query, ...recentSearches.filter((item: string) => item !== query)]
      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches.slice(0, 15)))
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
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch() // Enter 키를 눌렀을 때 검색을 수행합니다.
              }
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />

          {isFocused && (
            <img
              src={searchremove}
              className="absolute right-12 top-1/2 transform -translate-y-1/2 w-auto h-4 cursor-pointer"
              onClick={clearInput}
            />
          )}

          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <img
              src={isFocused ? searchfocus : search}
              className="w-auto h-8 cursor-pointer"
              onClick={onSearch}
            />
          </div>
        </div>
      </div>
    )
  },
)

export default SearchBar
