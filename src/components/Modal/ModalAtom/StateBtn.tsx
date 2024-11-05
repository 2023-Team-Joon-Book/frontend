import { useMyContext } from '../../Context/MyContext'
import { RiBook3Line } from 'react-icons/ri'
import { LuFlagTriangleRight } from 'react-icons/lu'



const StateBtn = () => {
  const {
    // newLastPage,
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
        <RiBook3Line size={20} color={isActive ? '#4ECB71' : '#888888'} />
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
        <LuFlagTriangleRight size={22} color={isActive ? '#888888' : '#4ECB71'} />
        완독!
      </button>
    </div>
  )
}

export default StateBtn
