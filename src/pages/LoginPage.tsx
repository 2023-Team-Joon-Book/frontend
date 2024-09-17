import React, { useState } from 'react'
import LoginInput from '../components/Input/LoginInput'
import StartNavigator from '../components/main/StartNavigator'
import LoginHeader from '../components/Header/LoginHeader'
import { Link, useNavigate } from 'react-router-dom'

import Bar1 from '../../public/img/Bar1.png'
import Bar2 from '../../public/img/Bar2.png'
import Bar3 from '../../public/img/Bar3.png'
import { baseInstance } from '../api/config'
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
// import { SignIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/clerk-react'

export default function LoginPage() {
  const navigate = useNavigate()
  // const { isLoaded, isSignedIn, user } = useUser()
  const handleLogin = async () => {
    if (id && pw) {
      try {
        const response = await baseInstance.post('/users/login', {
          username: id,
          password: pw,
        })
        if (response.data.code === 'U004') {
          localStorage.setItem('accessToken', response.data.data.accessToken)
          localStorage.setItem('refreshToken', response.data.data.refreshToken)
          localStorage.setItem('userName', response.data.data.username)
          console.log('로그인 잘됨')
          navigate('/booksearch')
          Swal.fire({
            title: '로그인 성공!',
            icon: 'success',
          })
        } else if (response.data.businessCode === 'U002') {
          console.log('에러 내용: ', response.data.message)
          alert(response.data.message)
        } else if (response.data.code === 'U001') {
          console.log('에러 내용: ', response.data.message)
          alert('비밀번호가 틀렸습니다.')
        }
      } catch (error) {
        Swal.fire({
          title: '로그인 실패!',
          icon: 'error',
        })
      }
    }
  }
  // 탭
  const [activeTab, setActiveTab] = useState('regular')

  const [id, setId] = useState<string>('')
  const [pw, setPw] = useState<string>('')

  const idInputRef = React.useRef<HTMLInputElement>(null)
  const pwInputRef = React.useRef<HTMLInputElement>(null)

  const handleIdKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      pwInputRef.current?.focus()
    }
  }

  const handlePwKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleLogin()
    }
  }

  return (
    <div className=" max-h-screen">
      <LoginHeader />
      <div className="flex justify-center">
        <div className="">
          <div className="flex items-center mb-9">
            <h1 className="text-black text-center font-notosans font-normal text-7xl leading-normal">
              책 잇
            </h1>
            <div className="flex flex-col mt-14 ml-4">
              <h2 className="text-black font-notosans font-normal text-[1.45rem]">
                당신의 책을 함께 기억해요
              </h2>
              <h2 className="text-black font-notosans font-normal text-[1.13rem]">
                remember your book together
              </h2>
            </div>
          </div>
          {/* 탭 내비게이션 */}
          <div className="flex mb-6">
            <button
              className={`px-4 py-2 ${
                activeTab === 'regular' ? 'border-b-2 border-btn text-btn' : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('regular')}>
              일반 로그인
            </button>
            <button
              className={`px-4 py-2 ml-4 ${
                activeTab === 'social' ? 'border-b-2 border-btn text-btn' : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('social')}>
              소셜 로그인
            </button>
          </div>

          {activeTab === 'regular' && (
            <form>
              <LoginInput
                title="Username"
                placeholder=""
                value={id}
                type="id"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setId(e.target.value)}
                onKeyPress={handleIdKeyPress}
                ref={idInputRef}
              />
              <LoginInput
                title="Password"
                placeholder=""
                value={pw}
                type="password"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPw(e.target.value)}
                onKeyPress={handlePwKeyPress}
                ref={pwInputRef}
              />
              <StartNavigator text={'로그인하기'} onClick={handleLogin} disabled={!id || !pw} />
            </form>
          )}
          {/* {activeTab === 'social' && <SignIn />} */}
          <div className="flex items-center ml-24 pt-9">
            <h2 className="text-[1.05rem] text-black font-notosans">계정이 없으신가요?</h2>
            <Link to="/signup">
              <button className="ml-4 text-[1.05rem] text-gray-400 font-notosans underline">
                회원가입
              </button>
            </Link>
          </div>
        </div>
        <div className="flex items-end mt-64 ml-96 relative">
          <img
            src={Bar1}
            alt="Bar1"
            className="w-[22rem] h-[32rem] absolute right-[calc(100%-89px)] z-10"
          />
          <img src={Bar2} alt="Bar2" className="w-[17rem] h-[33.3rem]" />
          <img src={Bar3} alt="Bar3" className="w-[10.3rem] h-[36rem]" />
        </div>
      </div>
    </div>
  )
}
