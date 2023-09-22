import React from 'react'

type SignUpBtnProps = {
  disabled?: boolean
}

const SignUpBtn: React.FC<SignUpBtnProps> = ({ disabled }) => (
  <div className="fixed left-1/2 bottom-8 transform -translate-x-1/2 z-50">
    <button
      className="w-80 h-16 rounded-full bg-opacity-80 bg-black flex items-center justify-center shadow-md"
      disabled={disabled}>
      <div className="text-white text-3xl" style={{ fontFamily: 'bmfont' }}>
        회원가입
      </div>
    </button>
  </div>
)

export default SignUpBtn
