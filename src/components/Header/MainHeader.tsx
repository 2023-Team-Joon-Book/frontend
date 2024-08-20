import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../../public/logo.png'

function Header() {
  const navigate = useNavigate()
  const [isLoginClicked, setIsLoginClicked] = useState(false)
  const [isSignUpClicked, setIsSignUpClicked] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    setIsAuthenticated(!!accessToken)
  }, [])

  const goToLogin = () => {
    setIsLoginClicked(true)
    setIsSignUpClicked(false)
    navigate('/login')
  }

  const goToSignUp = () => {
    setIsSignUpClicked(true)
    setIsLoginClicked(false)
    navigate('/signup')
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
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between w-full px-4"
      style={headerStyle}>
      {/* 왼쪽 공간 (필요하면 내용 추가) */}
      <div style={{ width: '33.3333%' }}></div>

      {/* 중앙 로고 */}
      <div style={{ width: '33.3333%' }} className="flex justify-center">
        <img src={logo} alt="Header Image" style={imageStyle} onClick={goToMain} />
      </div>

      {/* 오른쪽 로그인 및 회원가입 버튼 */}
      <div
        className="flex justify-end items-center space-x-4"
        style={{ width: '33.3333%', fontFamily: 'Noto Sans KR' }}>
        {!isAuthenticated && (
          <>
            <button
              className="text-black text-2xl px-4 py-2 mb-8 rounded-md"
              style={{ color: isLoginClicked ? '#BFC66A' : 'black' }}
              onClick={goToLogin}>
              로그인
            </button>
            <button
              className="text-black text-2xl px-4 py-2 mb-8 rounded-md"
              style={{ color: isSignUpClicked ? '#BFC66A' : 'black' }}
              onClick={goToSignUp}>
              회원가입
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Header
