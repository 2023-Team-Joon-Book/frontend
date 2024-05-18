import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
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
  ({ onKeyPress, onSearch, onInputChange }, ref) => {
    const [isFocused, setIsFocused] = useState(false)
    const [inputValue, setInputValue] = useState('')

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value)
      onInputChange(e.target.value)
    }

    const clearInput = () => {
      setInputValue('') // 상태를 사용하여 입력 필드 클리어
      onInputChange('') // 필요한 경우 외부 이벤트 핸들러 호출
    }

    return (
      <div className="w-full max-w-sm mx-auto">
        <div className="relative">
          <input
            type="text"
            className={styles.formInput}
            placeholder="책 제목을 검색해주세요."
            ref={ref}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                onSearch()
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
