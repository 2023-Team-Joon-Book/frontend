import React from 'react'

type SignUpBtnProps = {
  onClick: () => void
  disabled?: boolean
}

const SignUpBtn: React.FC<SignUpBtnProps> = ({ onClick, disabled }) => (
  <div className="fixed left-1/2 bottom-8 transform -translate-x-1/2 z-50">
    <button
      onClick={onClick}
      className="w-80 h-16 rounded-full bg-opacity-80 bg-black flex items-center justify-center shadow-md"
      disabled={disabled}>
      <div className="text-white text-3xl" style={{ fontFamily: 'Noto Sans KR' }}>
        회원가입
      </div>
    </button>
  </div>
)

export default SignUpBtn
