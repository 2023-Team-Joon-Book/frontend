import { FC } from 'react'
import logo from '../../../public/logo.png'
import { useLocation, useNavigate } from 'react-router-dom'
import { baseInstance } from '../../api/config'

const MyHeader: FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      const refreshToken = localStorage.getItem('refreshToken')

      if (accessToken && refreshToken) {
        // 로그아웃 API를 호출하여 서버에서 로그아웃 처리
        const response = await baseInstance.post('/users/logout', {
          accessToken,
          refreshToken,
        })

        if (response.status === 200) {
          // 서버에서 로그아웃이 성공하면 로컬 스토리지에서 토큰을 삭제하고 홈페이지로 이동
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
          navigate('/')
        } else {
          // 서버에서 로그아웃이 실패하면 에러 처리
          console.error('로그아웃 실패')
        }
      } else {
        console.error('로그아웃 실패: 토큰이 유효하지 않습니다.')
      }
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error)
    }
  }

  const goToWish = () => {
    navigate('/shelf')
  }

  const goToStatistic = () => {
    navigate('/choose')
  }

  const goToMain = () => {
    navigate('/')
  }

  const headerStyle = {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
  }

  const imageStyle = {
    width: 'auto',
    height: '144px',
  }

  return (
    <div
      className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 flex items-center justify-between w-full px-4"
      style={headerStyle}>
      <div className="opacity-0 invisible">
        <button className="text-black font-bold text-2xl px-4 py-2 mb-8 rounded-md">내 서재</button>
        <button className="text-black font-bold px-4 text-2xl py-2 mb-8 rounded-md">
          독서통계
        </button>
        <button className="text-black font-bold px-4 text-2xl py-2 mb-8 rounded-md">
          로그아웃
        </button>
      </div>

      <img
        src={logo}
        alt="Header Image"
        className="w-full mx-auto cursor-pointer"
        style={imageStyle}
        onClick={goToMain}
      />

      <div className="flex items-center space-x-4" style={{ fontFamily: 'bmfont' }}>
        <button className="text-black  text-2xl px-4 py-2 mb-8 rounded-md" onClick={goToWish}>
          내 서재
        </button>
        <button
          className="text-black text-2xl px-4 py-2 mb-8 rounded-md"
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
        <button className="text-black text-2xl px-4 py-2 mb-8 rounded-md" onClick={handleLogout}>
          로그아웃
        </button>
      </div>
    </div>
  )
}

export default MyHeader
