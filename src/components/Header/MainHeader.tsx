import React, { FC, useState } from 'react'
import logo from '../../../public/logo.png'
import { useNavigate } from 'react-router-dom'

const Header: FC = () => {
  const navigate = useNavigate()
  const [isLoginClicked, setIsLoginClicked] = useState(false)
  const [isSignUpClicked, setIsSignUpClicked] = useState(false)

  const goToLogin = () => {
    setIsLoginClicked(true) // 로그인 버튼 클릭 상태를 true로 설정
    setIsSignUpClicked(false) // 회원가입 버튼 클릭 상태를 false로 설정
    navigate('/login')
  }

  const goToSignUp = () => {
    setIsSignUpClicked(true) // 회원가입 버튼 클릭 상태를 true로 설정
    setIsLoginClicked(false) // 로그인 버튼 클릭 상태를 false로 설정
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
      className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 flex items-center justify-between w-full px-4"
      style={headerStyle}>
      <div className="opacity-0 invisible">
        <button className="text-black font-bold text-2xl px-4 py-2 mb-8 rounded-md">로그인</button>
        <button className="text-black font-bold px-4 text-2xl py-2 mb-8 rounded-md">
          회원가입
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
        <button
          className="text-black  text-2xl px-4 py-2 mb-8 rounded-md"
          style={{
            color: isLoginClicked ? '#BFC66A' : 'black',
          }}
          onClick={goToLogin}>
          로그인
        </button>
        <button
          className="text-black text-2xl px-4 py-2 mb-8 rounded-md"
          style={{
            color: isSignUpClicked ? '#BFC66A' : 'black',
          }}
          onClick={goToSignUp}>
          회원가입
        </button>
      </div>
    </div>
  )
}

export default Header
