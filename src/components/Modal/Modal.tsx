import { ReactNode } from 'react'
import { useMyContext } from '../Context/MyContext'
import { baseInstance } from '../../api/config'
import Swal from 'sweetalert2'

type ReadingModalProps = {
  isOpen?: boolean
  onClose: () => void
  children: ReactNode
}

const Modal = ({ onClose, children }: ReadingModalProps) => {
  const {
    selectedBook,
    activeTab,
    text,
    setText,
    grading,
    setGrading,
    newLastPage,
    setNewLastPage,
    setIsActive,
  } = useMyContext()
  const access = localStorage.getItem('accessToken')

  // 책 페이지 변경 api 요청
  const onHandlePages = async () => {
    const requestData = {
      bookId: selectedBook.id,
      lastPage: newLastPage,
    }

    try {
      const response = await baseInstance.put('/readings', requestData, {
        headers: { Authorization: `Bearer ${access}` },
      })
      console.log(response)
      if (response.status === 200) {
        Swal.fire({
          title: '저장되었습니다!',
          icon: 'success',
        })
        onClose()
        setNewLastPage(0)
      }
    } catch (error) {
      Swal.fire({
        text: '책 분량 내의 값을 입력해주세요.',
        icon: 'warning',
      })
    }
  }

  // 리뷰 등록 api 요청
  const onHandleReview = async () => {
    const requestData = {
      book_id: selectedBook.id,
      content: text,
      grade: grading,
      title: '제목',
    }
    if (text !== '' && grading !== 0) {
      try {
        const response = await baseInstance.post('/reviews', requestData, {
          headers: { Authorization: `Bearer ${access}` },
        })
        if (response.status === 200) {
          setText('')
          setGrading(0)
          Swal.fire({
            title: '리뷰가 등록되었습니다! 🎉',
            icon: 'success',
          })
          onClose()
        }
      } catch (error) {
        console.error(error)
      }
    } else {
      Swal.fire({
        title: '리뷰를 입력해주세요!',
        icon: 'error',
      })
    }
  }
  // 완독 api 요청
  // 다 읽은 책 상태 업데이트
  const changeStatus = async () => {
    const requestData = {
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
        Swal.fire({
          text: '완독을 축하해요!🎉',
          icon: 'success',
          width: '20rem',
        })
        onClose()
        setIsActive(true)
      }
    } catch (error) {
      // Swal.fire({
      //   text: '이미 다 읽었거나, 작은 값을 입력하셨습니다.',
      //   icon: 'warning',
      //   width: '20rem',
      // })
    }
  }
  const clickHandler = () => {
    if (activeTab === 'reading') {
      if (selectedBook.pages === newLastPage) changeStatus()
      else onHandlePages()
    } else if (activeTab === 'read') {
      onHandleReview()
    }
  }

  return (
    <>
      <div className="z-40 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className=" flex flex-col  items-center bg-white  rounded-lg w-[34rem] h-[40rem]">
          <div className="flex w-full justify-end pr-3 mb-5">
            <button onClick={onClose} className="  p-2 z-50">
              ✕
            </button>
          </div>
          {children}
          {selectedBook.grade === 0 && (
            <button
              onClick={clickHandler}
              className="mt-[1rem] mb-[1rem] bg-btn rounded-lg w-[30rem] h-[2.5rem] text-white">
              저장하기
            </button>
          )}
        </div>
      </div>
    </>
  )
}

export default Modal
