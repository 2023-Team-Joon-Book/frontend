import { useState } from 'react'

const StateBtn = () => {
  const [isActive, setIsActive] = useState(true) // 초기 상태 설정

  return (
    <div className="flex space-x-2 w-[30rem] mt-8">
      <button
        onClick={() => setIsActive(true)} // 첫 번째 버튼을 활성화
        className={`flex items-center justify-center w-[7rem] h-[3rem] px-4 py-2 rounded transition-colors duration-300 ${
          isActive ? 'bg-toggle' : 'bg-inactive'
        }`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.5em"
          height="1.5em"
          viewBox="0 0 36 36"
          className="mr-2">
          <path fill="#4ECB71" d="M10 5.2h18v1.55H10z" />
          <path
            fill="#4ECB71"
            d="M29 8H9.86A1.89 1.89 0 0 1 8 6a2 2 0 0 1 1.86-2H29a1 1 0 0 0 0-2H9.86A4 4 0 0 0 6 6a4.14 4.14 0 0 0 0 .49a1 1 0 0 0 0 .24V30a4 4 0 0 0 3.86 4H29a1 1 0 0 0 1-1V9.07A1.07 1.07 0 0 0 29 8m-1 24H9.86A2 2 0 0 1 8 30V9.55a3.63 3.63 0 0 0 1.86.45H28Z"
          />
          <path fill="none" d="M0 0h36v36H0z" />
        </svg>
        도서 중
      </button>
      <button
        onClick={() => setIsActive(false)} // 두 번째 버튼을 활성화
        className={`flex w-[7rem] h-[3rem] items-center justify-center px-4 py-2 rounded transition-colors duration-300 ${
          !isActive ? 'bg-toggle' : 'bg-inactive'
        }`}>
        <svg
          width="1.5em"
          height="1.5em"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            id="Vector"
            d="M1.26562 21.7303V3.46528C1.26562 2.67278 1.26563 2.27778 1.45772 2.09028C1.64981 1.90278 1.92687 2.02778 2.48099 2.27778L20.8019 10.5453C21.888 11.0353 22.431 11.2803 22.431 11.7303C22.431 12.1803 21.888 12.4253 20.8019 12.9153L1.26562 21.7303ZM1.26562 21.7303V36.7303"
            stroke="#888888"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
        완독!
      </button>
    </div>
  )
}

export default StateBtn
