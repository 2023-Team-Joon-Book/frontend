import React, { FC } from 'react'
import logo from '../../../public/logo.png'
import { useLocation, useNavigate } from 'react-router-dom'

const Header: FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const goToWish = () => {
    navigate('/wish')
  }

  const goToStatistic = () => {
    navigate('/choose')
  }

  const logout = () => {
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

      <img src={logo} alt="Header Image" className="w-full mx-auto" style={imageStyle} />

      <div className="flex items-center space-x-4" style={{ fontFamily: 'bmfont' }}>
        <button className="text-black  text-2xl px-4 py-2 mb-8 rounded-md" onClick={goToWish}>
          내 서재
        </button>
        <button
          className="text-black text-2xl px-4 py-2 mb-8 rounded-md"
          style={{ color: location.pathname === '/choose' ? '#BFC66A' : 'black' }}
          onClick={goToStatistic}>
          독서 통계
        </button>
        <button className="text-black text-2xl px-4 py-2 mb-8 rounded-md" onClick={logout}>
          로그아웃
        </button>
      </div>
    </div>
  )
}

export default Header
