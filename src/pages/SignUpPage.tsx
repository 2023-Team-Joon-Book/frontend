import React from 'react'
import LoginInput from '../components/Input/LoginInput'
import { useCallback, useState } from 'react'
import SignUpBtn from '../components/Btn/SignUpBtn'
import LoginHeader from '../components/Header/LoginHeader'
import { useNavigate, Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import Bar1 from '../../public/img/Bar1.png'
import Bar2 from '../../public/img/Bar2.png'
import Bar3 from '../../public/img/Bar3.png'
import { baseInstance } from '../api/config'
// import { SignUp, SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'

export default function SignUpPage() {
  const navigate = useNavigate()

  const handleSignUp = async () => {
    if (id && pw && passwordConfirm) {
      try {
        const response = await baseInstance.post('/users/join', {
          username: id,
          password: pw,
          nickname: 'null',
        })
        if (response.data.code === 'U001') {
          console.log('회원가입 잘됨')
          navigate('/login')
          Swal.fire({
            title: '회원가입 성공!',
            icon: 'success',
          })
        } else {
          // 회원가입 실패 처리
          console.log(response.data.message)
          Swal.fire({
            title: `${response.data.message}`,
            icon: 'error',
          })
        }
      } catch (error) {
        // 에러 처리
        Swal.fire({
          title: '회원가입 실패',
          text: '아이디나 비밀번호를 다시 한 번 확인해 보세요!',
          icon: 'error',
        })
      }
    }
  }

  const idInputRef = React.useRef<HTMLInputElement>(null)
  const pwInputRef = React.useRef<HTMLInputElement>(null)
  const confirmInputRef = React.useRef<HTMLInputElement>(null)

  const handleIdKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      // 여기에 다음 input의 ref를 사용하여 포커스 이동
      pwInputRef.current?.focus()
    }
  }

  const handlePwKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      // 여기에 다음 input의 ref를 사용하여 포커스 이동
      confirmInputRef.current?.focus()
    }
  }

  const handleConfirmKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      // 모든 입력이 완료되면 '회원가입' 버튼의 동작을 수행
      handleSignUp()
    }
  }
  // 탭
  const [activeTab, setActiveTab] = useState('regular')

  // 아이디, 비밀번호, 비밀번호 확인
  const [id, setId] = useState<string>('')
  const [pw, setPw] = useState<string>('')
  const [passwordConfirm, setPasswordConfirm] = useState<string>('')

  // 오류메시지 상태저장
  const [idMessage, setIdMessage] = useState<string>('')
  const [passwordMessage, setPasswordMessage] = useState<string>('')
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState<string>('')

  // 유효성 검사
  const [isId, setIsId] = useState<boolean>(false)
  const [isPassword, setIsPassword] = useState<boolean>(false)
  const [isPasswordConfirm, setIsPasswordConfirm] = useState<boolean>(false)

  // 아이디
  const onChangeId = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const IdRegex = /^(?=.*[a-zA-Z]).{4,25}$/
    const IdCurrent = e.target.value
    setId(IdCurrent)

    if (!IdRegex.test(IdCurrent)) {
      setIdMessage('* 영문 + 4자리 이상으로 입력바랍니다.')
      setIsId(false)
    } else {
      setIdMessage('')
      setIsId(true)
    }
  }, [])

  // 비밀번호
  const onChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/
    const passwordCurrent = e.target.value
    setPw(passwordCurrent)

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage('* 대소문자 + 숫자 + 특수문자 + 8~16자리로 입력바랍니다.')
      setIsPassword(false)
    } else {
      setPasswordMessage('')
      setIsPassword(true)
    }
  }, [])

  // 비밀번호 확인
  const onChangePasswordConfirm = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const passwordConfirmCurrent = e.target.value
      setPasswordConfirm(passwordConfirmCurrent)

      if (pw === passwordConfirmCurrent) {
        setPasswordConfirmMessage('* 비밀번호가 일치합니다.')
        setIsPasswordConfirm(true)
      } else {
        setPasswordConfirmMessage('* 비밀번호가 일치하지 않습니다.')
        setIsPasswordConfirm(false)
      }
    },
    [pw],
  )

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

          <div>
            <div className="relative mb-5">
              <LoginInput
                title="Username"
                placeholder="영문 + 4자리 이상"
                value={id}
                type="id"
                onChange={onChangeId}
                onKeyPress={handleIdKeyPress}
                ref={idInputRef}
              />
              {id.length > 0 && (
                <span
                  className={`absolute top-20 left-4 text-sm font-medium ${
                    isId ? 'text-gray-400' : 'text-red-400'
                  }`}>
                  {idMessage}
                </span>
              )}
            </div>
            <div className="relative mb-5">
              <LoginInput
                title="Password"
                placeholder="영문 + 숫자 + 6자리 이상"
                value={pw}
                type="password"
                onChange={onChangePassword}
                onKeyPress={handlePwKeyPress}
                ref={pwInputRef}
              />
              {pw.length > 0 && (
                <span
                  className={`absolute top-20 left-4 text-sm font-medium ${
                    isPassword ? 'text-gray-400' : 'text-red-400'
                  }`}>
                  {passwordMessage}
                </span>
              )}
            </div>
            <div className="relative mb-5">
              <LoginInput
                title="Re-enter Password"
                placeholder="비밀번호를 다시 입력해주세요"
                value={passwordConfirm}
                type="password"
                onChange={onChangePasswordConfirm}
                onKeyPress={handleConfirmKeyPress}
                ref={confirmInputRef}
              />
              {passwordConfirm.length > 0 && (
                <span
                  className={`absolute top-20 left-4 text-sm font-medium ${
                    isPasswordConfirm ? 'text-gray-400' : 'text-red-400'
                  }`}>
                  {passwordConfirmMessage}
                </span>
              )}
            </div>
            <SignUpBtn
              onClick={handleSignUp}
              disabled={!(isId && isPassword && isPasswordConfirm)}
            />
          </div>

          <div className="flex items-center ml-24">
            <h2 className="text-[1.05rem] text-black font-notosans my-8">계정이 있으신가요?</h2>
            <Link to="/login">
              <button className="my-8 ml-4 text-[1.05rem] text-gray-400 font-notosans underline">
                로그인
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
