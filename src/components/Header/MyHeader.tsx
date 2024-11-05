import { FC, useState } from 'react'
import logo from '../../../public/logo.png'
import { useLocation, useNavigate } from 'react-router-dom'
import { baseInstance } from '../../api/config'
import SearchBar from '../search/SearchBar'

const MyHeader: FC<{ onSearch: (query: string) => void }> = ({ onSearch }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isLogoutClicked, setIsLogoutClicked] = useState(false)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const userName = localStorage.getItem('userName')

  const handleLogout = async () => {
    setIsLogoutClicked(true)

    try {
      const accessToken = localStorage.getItem('accessToken')
      const refreshToken = localStorage.getItem('refreshToken')

      if (accessToken && refreshToken) {
        const response = await baseInstance.post('/users/logout', {
          accessToken,
          refreshToken,
        })

        if (response.status === 200) {
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
          localStorage.removeItem('userName')
          navigate('/')
        } else {
          console.error('로그아웃 실패')
        }
      } else {
        console.error('로그아웃 실패: 토큰이 유효하지 않습니다.')
      }
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error)
    }
  }

  const goToMyPage = () => {
    navigate('/mypage')
  }

  const goToStatistic = () => {
    navigate('/choose')
  }

  const goToMain = () => {
    navigate('/')
  }

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      navigate(`/booksearch?query=${encodeURIComponent(searchQuery)}`)
    }
  }

  const headerStyle = {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    display: 'flex',
    justifyContent: 'space-between',
  }

  return (
    <div className="flex items-center justify-between w-full px-4" style={headerStyle}>
      <div className="flex items-center justify-start">
        <img
          src={logo}
          alt="Header Image"
          className="m-6 cursor-pointer"
          style={{ width: 'auto', height: '100px' }}
          onClick={goToMain}
        />
        <SearchBar onSearch={handleSearch} onInputChange={setSearchQuery} />
      </div>

      <div
        className="flex items-center justify-end space-x-4"
        style={{ fontFamily: 'Noto Sans KR' }}>
        <p className="py-2 mb-8 text-sm rounded-md">{userName}</p>
        <p className="px-2 py-2 mb-8 text-sm text-black rounded-md">|</p>
        <button className="py-2 mb-8 text-sm text-black rounded-md" onClick={goToMyPage}>
          내 서재
        </button>
        <p className="px-2 py-2 mb-8 text-sm text-black rounded-md">|</p>
        <button
          className="py-2 mb-8 text-sm text-black rounded-md"
          style={{
            color:
              location.pathname === '/choose' ||
              location.pathname === '/statistics' ||
              location.pathname === '/stack'
                ? '#BFC66A'
                : 'black',
          }}
          onClick={goToStatistic}>
          독서 통계
        </button>
        <p className="px-2 py-2 mb-8 text-sm text-black rounded-md">|</p>
        <button
          className="py-2 pr-2 mb-8 text-sm text-black rounded-md"
          style={{
            color: isLogoutClicked ? '#BFC66A' : 'black',
          }}
          onClick={handleLogout}>
          로그아웃
        </button>
      </div>
    </div>
  )
}

export default MyHeader
