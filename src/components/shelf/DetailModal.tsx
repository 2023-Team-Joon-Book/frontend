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
  const [lastPage, setLastPage] = useState()
  const [percentages, setPercentages] = useState()
  const [loading, setLoading] = useState(true) // 로딩 상태 추가

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
      setLastPage(response.data.data.lastPage)
      setPercentages(response.data.data.percentage)
      setLoading(false) // 데이터 로딩 완료 후 로딩 상태 변경
    } catch (error) {
      console.log(error)
      setLoading(false) // 데이터 로딩 실패 시에도 로딩 상태 변경
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
              <h3 className="text-3xl flex flex-col font-semibold mb-2 mt-20 items-center">
                현재까지 읽은 페이지 수 :{loading ? '로딩 중...' : `${lastPage}/${book.pages}`}
              </h3>
              <p className="text-3xl flex flex-col items-center m-20">
                progress : {loading ? '로딩 중...' : percentages}
              </p>
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
