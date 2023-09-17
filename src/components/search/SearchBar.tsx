import SearchRoundedIcon from '@mui/icons-material/SearchRounded'

const SearchBar = () => {
  return (
    <div style={{ paddingTop: '2rem' }} className="w-full max-w-sm mx-auto">
      <div className="relative">
        <input
          type="text"
          className="form-input w-full rounded-3xl border-2 border-inherit px-10 py-2"
          placeholder="책 제목을 검색해주세요."
        />

        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <SearchRoundedIcon style={{ color: 'gray' }} />
        </div>
      </div>
    </div>
  )
}

export default SearchBar
