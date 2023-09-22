import React from 'react'
import styled from 'styled-components'
import LoginInput from '../components/Input/LoginInput'
import { useCallback, useState } from 'react'
import SignUpBtn from '../components/Btn/SignUpBtn'
import LoginHeader from '../components/Header/LoginHeader'
import { Link, useNavigate } from 'react-router-dom'

import Bar1 from '../../public/img/Bar1.png'
import Bar2 from '../../public/img/Bar2.png'
import Bar3 from '../../public/img/Bar3.png'

export default function SignUpPage() {
  const navigate = useNavigate()

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
      if (id && pw && passwordConfirm) {
        navigate('/login')
      }
    }
  }

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
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,25}$/
    const passwordCurrent = e.target.value
    setPw(passwordCurrent)

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage('* 영문 + 숫자 + 6자리 이상으로 입력바랍니다.')
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
    <LoginContainer>
      <LoginHeader />
      <div style={{ display: 'flex' }}>
        <Container>
          <TitleContainer>
            <Title>책 잇</Title>
            <TextContainer>
              <Text style={{ fontSize: '1.45rem' }}>당신의 책을 함께 기억해요</Text>
              <Text style={{ fontSize: '1.13rem' }}>remember your book together</Text>
            </TextContainer>
          </TitleContainer>

          <FormBox>
            <LoginInput
              title="Username"
              placeholder="영문 + 4자리 이상"
              value={id}
              type="id"
              onChange={onChangeId}
              onKeyPress={handleIdKeyPress}
              ref={idInputRef} // 아이디 입력 필드에 대한 ref를 전달합니다.
            />
            {id.length > 0 && (
              <span className={`message ${isId ? 'success' : 'error'}`}>{idMessage}</span>
            )}
          </FormBox>
          <FormBox>
            <LoginInput
              title="Password"
              placeholder="영문 + 숫자 + 6자리 이상"
              value={pw}
              type="password"
              onChange={onChangePassword}
              onKeyPress={handlePwKeyPress}
              ref={pwInputRef} // 비밀번호 입력 필드에 대한 ref를 전달합니다.
            />
            {pw.length > 0 && (
              <span className={`message ${isPassword ? 'success' : 'error'}`}>
                {passwordMessage}
              </span>
            )}
          </FormBox>
          <FormBox>
            <LoginInput
              title="Re-enter Password"
              placeholder=""
              value={passwordConfirm}
              type="password"
              onChange={onChangePasswordConfirm}
              onKeyPress={handleConfirmKeyPress}
              ref={confirmInputRef}
            />
            {passwordConfirm.length > 0 && (
              <span className={`message ${isPasswordConfirm ? 'success' : 'error'}`}>
                {passwordConfirmMessage}
              </span>
            )}
          </FormBox>
        </Container>
        <ImgContainer>
          <Bar1Image src={Bar1} alt="Bar1" />
          <Bar2Image src={Bar2} alt="Bar2" />
          <Bar3Image src={Bar3} alt="Bar3" />
        </ImgContainer>
      </div>

      {/* 연동 안해놔서 아직 link to로 이동, 연동 후엔 link to 삭제 후 SignUpBtn에 navigation해서 사용 */}
      <Link to="/login">
        <SignUpBtn disabled={!(isId && isPassword && isPasswordConfirm)} />
      </Link>
    </LoginContainer>
  )
}

const LoginContainer = styled.div`
  overflow: hidden;
  max-height: 100vh;
`
const Container = styled.div`
  margin-left: 14rem;
  margin-top: 8.23rem;
`

const TitleContainer = styled.div`
  display: flex;
  margin-bottom: 2.2rem;
`
const Title = styled.h1`
  color: #000;
  text-align: center;
  /* font-family: BM Jua; */
  font-family: bmfont;
  font-size: 7.3rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
const Text = styled.h2`
  color: #000;
  font-family: bmfont;

  font-style: normal;
  font-weight: 400;
  /* line-height: 3.75rem; */
`
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3.5rem;
  margin-left: 1.1rem;
`

const ImgContainer = styled.div`
  display: flex;
  align-items: flex-end;
  margin-top: 17rem;
  margin-left: 21.5rem;
  position: relative;
`

const Bar1Image = styled.img`
  width: 22rem;
  height: 32rem;
  position: absolute;
  right: calc(100% - 89px);
  z-index: 1;
`

const Bar2Image = styled.img`
  width: 17rem;
  height: 33.3rem;
`

const Bar3Image = styled.img`
  width: 10.3rem;
  height: 36rem;
`

const FormBox = styled.div`
  position: relative;
  margin-bottom: 1.25rem;
  .message {
    font-weight: 500;
    font-size: 1rem;
    line-height: 1.5rem;
    letter-spacing: -0.0625rem;
    position: absolute;
    top: 5rem;
    left: 1rem;
    &.success {
      color: #b2b2b2;
    }
    &.error {
      color: #b2b2b2;
    }
  }
`
