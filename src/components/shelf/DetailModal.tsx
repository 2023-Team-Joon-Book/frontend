import axios from 'axios'
import React, { useEffect, useState } from 'react'

interface DetailModalProps {
  book: {
    author: string
    cover_image_url: string
    height: string
    id: number
    like_status: boolean
    likes: number
    pages: number
    publisher: string
    title: string
    width: number
    status: string
  }
  setIsModalOpen: (isOpen: boolean) => void
}

const DetailModal: React.FC<DetailModalProps> = ({ book, setIsModalOpen }) => {
  const id = book.id
  const [lastPage, setLastPage] = useState(0)
  const [percentages, setPercentages] = useState(0)
  const [loading, setLoading] = useState(true) // 로딩 상태 추가
  const [editedLastPage, setEditedLastPage] = useState('') // 사용자가 입력한 페이지를 저장할 상태

  // 사용자가 페이지 입력란을 변경할 때 호출되는 함수
  const handleLastPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedLastPage(e.target.value)
  }

  // 책 상태변경 api 요청
  async function changeStatus() {
    const access = localStorage.getItem('accessToken')

    const requestData = {
      // 요청 본문 데이터 (필요에 따라 변경)
      bookId: book.id,
      lastPage: book.pages,
      status: 'READ',
    }

    try {
      const response = await axios.put(
        'http://localhost:8080/api/v1/readings/status?status=READING',
        requestData,
        {
          headers: { Authorization: `Bearer ${access}` },
        },
      )

      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  // 읽은 퍼센트, 읽은 페이지 요청 api
  async function readPercentages() {
    const access = localStorage.getItem('accessToken')

    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/readings/percentages?bid=${id}`,
        {
          headers: { Authorization: `Bearer ${access}` },
        },
      )

      console.log(response.data)
      setLastPage(response.data.data.lastPage) // 읽은 페이지
      setPercentages(response.data.data.percentage) // 읽은 퍼센트
      setLoading(false) // 데이터 로딩 완료 후 로딩 상태 변경
    } catch (error) {
      console.log(error)
      setLoading(false) // 데이터 로딩 실패 시에도 로딩 상태 변경
    }
  }

  // 책 상태변경 api 요청
  async function changePages() {
    const access = localStorage.getItem('accessToken')

    const requestData = {
      // 요청 본문 데이터 (필요에 따라 변경)
      bookId: book.id,
      lastPage: editedLastPage,
    }

    try {
      const response = await axios.put('http://localhost:8080/api/v1/readings', requestData, {
        headers: { Authorization: `Bearer ${access}` },
      })

      console.log(response)
      alert('페이지가 기록되었습니다.')
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    readPercentages()
  }, []) // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행

  return (
    <div>
      {loading ? (
        <div
          className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-gray-800 bg-opacity-50"
          style={{ fontFamily: 'bmfont' }}>
          <div className="bg-white w-2/3 h-2/3 rounded-lg p-4 flex justify-center">
            <h1 className="text-7xl grid place-items-center">로딩 중...</h1>
          </div>
        </div>
      ) : (
        <div
          className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-gray-800 bg-opacity-50"
          style={{ fontFamily: 'bmfont' }}>
          <div className="bg-white w-2/3 h-2/3 rounded-lg p-4 flex">
            <div className="w-1/3 p-4 flex flex-col justify-center items-center  ml-20">
              <img
                src={book.cover_image_url}
                alt={book.title}
                className="object-cover rounded-lg mb-4 shadow-lg w-52 h-max"
              />
              <h2 className="font-bold mb-2 justify-center items-center text-2xl">{book.title}</h2>
              <p className="text-gray-600">저자: {book.author}</p>
            </div>
            <div className="w-2/3 p-4 flex flex-col">
              <h3 className="text-4xl flex flex-col font-semibold mb-2 mt-20 items-center">
                현재까지 읽은 페이지 수 : {loading ? '로딩 중...' : `${lastPage}/${book.pages}`}
              </h3>
              <div className="flex justify-center items-center mt-10 mb-10">
                <p className="text-2xl mr-4">읽은 페이지 기록하기 :</p>
                {/* 사용자가 페이지를 입력할 수 있는 입력란 추가 */}
                <input
                  defaultValue={editedLastPage}
                  onChange={handleLastPageChange}
                  placeholder={String(lastPage)}
                  className="border w-10 text-2xl text-center"
                />

                {/* 저장 버튼을 누르면 서버에 저장 */}
                <button
                  className="text-lime-500 hover:text-lime-600 cursor-pointer text-2xl ml-4"
                  onClick={() => {
                    changePages()
                  }}>
                  기록하기
                </button>
              </div>
              {percentages === 100 ? (
                <button
                  className="text-blue-500 hover:text-blue-700 cursor-pointer text-3xl items-center m-20"
                  onClick={() => {
                    changeStatus()
                  }}>
                  다 읽었어요
                </button>
              ) : (
                <p className="text-3xl flex flex-row items-center m-20">
                  <div className="w-full  bg-gray-200 rounded">
                    <div
                      className="h-4 bg-blue-500 rounded"
                      style={{ width: `${percentages}%` }}></div>
                  </div>
                  <div className="pl-3 text-2xl"> {percentages}%</div>
                </p>
              )}
            </div>
            <button
              className="fixed top-25 text-gray-500 hover:text-gray-700 cursor-pointer text-xl"
              onClick={() => setIsModalOpen(false)}>
              X
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default DetailModal
