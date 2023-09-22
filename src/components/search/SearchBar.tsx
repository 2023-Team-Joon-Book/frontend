import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { KeyboardEventHandler, forwardRef } from 'react'

type SearchBarProps = {
  onKeyPress?: KeyboardEventHandler<HTMLInputElement>
  onSearch: () => void
  onInputChange: (query: string) => void
}

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ onKeyPress, onSearch, onInputChange }, ref) => {
    return (
      <div style={{ paddingTop: '9rem' }} className="w-full max-w-sm mx-auto">
        <div className="relative">
          <input
            type="text"
            className="form-input w-full rounded-3xl border-2 border-inherit px-10 py-2"
            placeholder="책 제목을 검색해주세요."
            ref={ref}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                onSearch()
              }
            }}
          />

          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <SearchRoundedIcon style={{ color: 'gray' }} />
          </div>
        </div>
      </div>
    )
  },
)

export default SearchBar
