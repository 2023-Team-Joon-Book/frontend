import { useState } from 'react'
import FinishIcon from '../../../assets/svgs/finish.svg?react'
import BookIcon from '../../../assets/svgs/book.svg?react'
import { useMyContext } from '../../Context/MyContext'

const StateBtn = (modalHandle: () => {}) => {
  const {
    newLastPage,
    setNewLastPage,
    selectedBook,
    setIsEditing,
    isActive,
    setIsActive,
    setPercentages,
  } = useMyContext()
  const lastPage = Number(localStorage.getItem('lastPage'))
  const percentage = Number(localStorage.getItem('percentage'))

  return (
    <div className="flex space-x-2 w-[30rem] mt-8">
      <button
        onClick={() => {
          setIsActive(true) // 첫 번째 버튼을 활성화
          setNewLastPage(lastPage) // 마지막 읽은 페이지로 설정
          setPercentages(percentage) // 마지막 읽은 퍼센트로 설정
          setIsEditing(false) // 수정 상태 종료
        }}
        className={`flex items-center justify-center w-[7rem] h-[2.785rem] px-4 py-2 rounded  ${
          isActive ? 'bg-toggle' : 'bg-inactive'
        }`}>
        <BookIcon fill={isActive ? '#4ECB71' : '#888888'} />
        도서 중
      </button>

      <button
        onClick={() => {
          setIsActive(false) // 두 번째 버튼을 활성화
          setNewLastPage(selectedBook.pages) // 마지막 페이지로 설정
          setIsEditing(true) // 수정 중
        }}
        className={`flex w-[7rem] h-[2.785rem] items-center justify-center px-4 py-2 rounded   ${
          !isActive ? 'bg-toggle' : 'bg-inactive'
        }`}>
        <FinishIcon stroke={isActive ? '#888888' : '#4ECB71'} />
        완독!
      </button>
    </div>
  )
}

export default StateBtn
