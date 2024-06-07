import { useState } from 'react'
import FinishIcon from '../../../assets/svgs/finish.svg?react'
import BookIcon from '../../../assets/svgs/book.svg?react'
const StateBtn = () => {
  const [isActive, setIsActive] = useState(true)

  return (
    <div className="flex space-x-2 w-[30rem] mt-12">
      <button
        onClick={() => setIsActive(true)} // 첫 번째 버튼을 활성화
        className={`flex items-center justify-center w-[7rem] h-[3rem] px-4 py-2 rounded  ${
          isActive ? 'bg-toggle' : 'bg-inactive'
        }`}>
        <BookIcon fill={isActive ? '#4ECB71' : '#888888'} />
        도서 중
      </button>

      <button
        onClick={() => setIsActive(false)} // 두 번째 버튼을 활성화
        className={`flex w-[7rem] h-[3rem] items-center justify-center px-4 py-2 rounded   ${
          !isActive ? 'bg-toggle' : 'bg-inactive'
        }`}>
        <FinishIcon stroke={isActive ? '#888888' : '#4ECB71'} />
        완독!
      </button>
    </div>
  )
}

export default StateBtn
