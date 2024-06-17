import { useState } from 'react'
import FinishIcon from '../../../assets/svgs/finish.svg?react'
import BookIcon from '../../../assets/svgs/book.svg?react'
import { baseInstance } from '../../../api/config'
import Swal from 'sweetalert2'
import { useMyContext } from '../../Context/MyContext'
const StateBtn = (modalHandle: () => {}) => {
  const { selectedBook } = useMyContext()
  const [isActive, setIsActive] = useState(true)
  console.log('페이지 기록 모달에서 보는', selectedBook)

  // 다 읽은 책 상태 업데이트
  const changeStatus = async () => {
    setIsActive(false)
    const access = localStorage.getItem('accessToken')

    const requestData = {
      // 요청 본문 데이터 (필요에 따라 변경)
      bookId: selectedBook.id,
      lastPage: selectedBook.pages,
      status: 'READ',
    }

    try {
      const response = await baseInstance.put(`readings/status?status=READING`, requestData, {
        headers: { Authorization: `Bearer ${access}` },
      })
      console.log(response.data)

      if (response.data.code === 'R003') {
        modalHandle()
        Swal.fire({
          text: '완독을 축하해요!🎉',
          icon: 'success',
          width: '20rem',
        })
      }
    } catch (error) {
      // Swal.fire({
      //   text: '이미 다 읽었거나, 작은 값을 입력하셨습니다.',
      //   icon: 'warning',
      //   width: '20rem',
      // })
    }
  }
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
        onClick={() => changeStatus()} // 두 번째 버튼을 활성화
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
