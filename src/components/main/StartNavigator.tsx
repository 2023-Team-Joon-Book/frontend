interface StartNavigatorProps {
  onClick: () => void
}

export default function StartNavigator({ onClick }: StartNavigatorProps) {
  return (
    <div className="fixed left-1/2 bottom-8 transform -translate-x-1/2 z-50">
      <button
        onClick={onClick}
        className="w-80 h-16 rounded-full bg-opacity-80 bg-black flex items-center justify-center shadow-md drop-shadow-lg transform transition-transform transition-shadow duration-300 hover:scale-105 hover:shadow-2xl">
        <div className="text-white text-3xl" style={{ fontFamily: 'Noto Sans KR' }}>
          시작하기
        </div>
      </button>
    </div>
  )
}
