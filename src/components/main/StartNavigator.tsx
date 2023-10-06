import React from 'react'

interface StartNavigatorProps {
  onClick: () => void
  disabled: boolean
}

const StartNavigator: React.FC<StartNavigatorProps> = ({ onClick, disabled }) => (
  <div className="fixed left-1/2 bottom-8 transform -translate-x-1/2 z-50">
    <button
      onClick={onClick}
      className="w-80 h-16 rounded-full bg-opacity-80 bg-black flex items-center justify-center shadow-md"
      disabled={disabled}>
      <div className="text-white text-3xl" style={{ fontFamily: 'bmfont' }}>
        시작하기
      </div>
    </button>
  </div>
)

export default StartNavigator
