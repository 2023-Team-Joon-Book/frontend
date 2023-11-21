import React, { useEffect, useState } from 'react'
import Writng from './Writing'
import '../../scss/BookReview.scss'
import axios from 'axios'
import Swal from "sweetalert2";
import 'sweetalert2/src/sweetalert2.scss'

interface ReviewModalProps {
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

const ReviewModal: React.FC<ReviewModalProps> = ({ book, setIsModalOpen }) => {
  const numberOfStars = 5
  const stars = Array(numberOfStars).fill(null)
  const [isWriting, setIsWriting] = useState(false)
  const [review, setReview] = useState('책에 대한 줄거리와 소감을 남겨보세요!')
  const [loading, setLoading] = useState(true) // 로딩 상태 추가

  // 리뷰 조회 api 요청
  async function viewReview() {
    const access = localStorage.getItem('accessToken')

    // 쿼리 매개변수를 사용하여 요청 데이터 전달
    const params = {
      book_id: book.id,
    }

    try {
      const response = await axios.get(`http://localhost:8080/api/v1/reviews/${book.id}`, {
        params, // 쿼리 매개변수로 요청 데이터 전달
        headers: { Authorization: `Bearer ${access}` },
      })
      console.log(response)
      const content = response.data.data.content
      setReview(content)
      setLoading(false) // 데이터 로딩 완료 후 로딩 상태 변경
    } catch (error) {
      console.error(error)
      setLoading(false) // 데이터 로딩 실패 시에도 로딩 상태 변경
    }
  }

  // 리뷰 삭제 api 요청
  async function deleteReview() {
    const access = localStorage.getItem('accessToken')

    try {
      const response = await axios.delete(`http://localhost:8080/api/v1/reviews/${book.id}`, {
        headers: { Authorization: `Bearer ${access}` },
      })
      console.log(response)
      Swal.fire({
        title: "리뷰가 삭제 되었습니다.",
        icon: "success"
      });
      setReview('책에 대한 줄거리와 소감을 남겨보세요!')
    } catch (error) {
      console.error(error)
      console.log('에러발생')
    }
  }

  useEffect(() => {
    viewReview()
    console.log('api요청')
  }, [])

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
                src={book.cover_image_url} // 책 이미지의 경로를 사용
                alt={book.title}
                className="object-cover rounded-lg mb-4 shadow-lg w-52 h-max "
              />
              <h2 className="font-bold mb-2 justify-center items-center text-2xl">{book.title}</h2>
              <p className="text-gray-600">저자: {book.author}</p>
            </div>
            <div className="w-8/12 p-10 flex flex-col">
              <div className="flex flex-col h-2/3 border-2">
                {isWriting ? (
                  // 리뷰를 작성중인 상태라면
                  <div className="h-full">
                    <Writng
                      book={book}
                      viewReview={viewReview}
                      setIsWriting={setIsWriting}></Writng>
                  </div>
                ) : (
                  // 초기상태
                  <React.Fragment>
                    <p
                      className={`flex flex-col items-center p-10 ${review == '책에 대한 줄거리와 소감을 남겨보세요!'
                        ? 'text-gray-400 text-xl'
                        : 'text-3xl '
                        }`}>
                      {review}
                    </p>
                    <div className="flex flex-row mt-36">
                      <button
                        onClick={() => {
                          if (review != '책에 대한 줄거리와 소감을 남겨보세요!') {
                            Swal.fire({
                              title: "기존에 작성한 리뷰를 먼저 삭제해주세요. 🥺",
                              icon: "warning"
                            });
                          } else {
                            setIsWriting(true)
                          }
                        }}
                        className="text-lime-500 hover:text-lime-600 ml-4 mt-6 text-2xl">
                        리뷰 작성하기
                      </button>
                      <button
                        onClick={() => {
                          deleteReview()
                        }}
                        className="text-lime-500 hover:text-lime-600 ml-4 mt-6 text-2xl">
                        리뷰 삭제하기
                      </button>
                    </div>
                  </React.Fragment>
                )}
              </div>
              <div className="mt-10 flex flex-col">
                <p className="flex justify-end">이 책에 대한 나의 평가</p>
                <div className="flex justify-end">
                  {stars.map((_, index) => (
                    <YellowStar key={index} />
                  ))}
                </div>
              </div>
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

export default ReviewModal

function YellowStar() {
  return (
    <div className="star">
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
        <path fill="yellow" d="M12 2l2.3 7.6h7.7l-6 4.8 2.3 7.6-6-4.7-6 4.7 2.3-7.6-6-4.8h7.7z" />
      </svg>
    </div>
  )
}
