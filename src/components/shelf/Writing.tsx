import React, { useEffect, useState } from 'react'
import { baseInstance } from '../../api/config'
import styled from 'styled-components'
import { setISOWeek } from 'date-fns'
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

interface WritngProps {
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
  setReviewGrade: (newGrade: number) => void
  setIsWriting: (isWriting: boolean) => void
  viewReview: () => void
}

const Writng: React.FC<WritngProps> = ({ book, setReviewGrade, setIsWriting, viewReview }) => {
  const STAR_IDX_ARR = ['first', 'second', 'third', 'fourth', 'last']
  const [ratesResArr, setRatesResArr] = useState([0, 0, 0, 0, 0])
  const [inputGrade, setInputGrade] = useState(0) // 기본 값은 5점
  const [grade, setGrade] = useState(0) // 별점 상태

  const calcStarRates = () => {
    let tempStarRatesArr = [0, 0, 0, 0, 0]
    let starVerScore = (inputGrade * 70) / 5
    let idx = 0
    while (starVerScore > 14) {
      tempStarRatesArr[idx] = 14
      idx += 1
      starVerScore -= 14
    }
    tempStarRatesArr[idx] = starVerScore
    return tempStarRatesArr
  }

  useEffect(() => {
    setRatesResArr(calcStarRates())
    setGrade(inputGrade) // 부모 컴포넌트로 grade 변경 이벤트 전달
  }, [grade, inputGrade, setGrade])

  const [editedLastPage, setEditedLastPage] = useState('') // 사용자가 입력한 페이지를 저장할 상태

  // 사용자가 페이지 입력란을 변경할 때 호출되는 함수
  const handleLastPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedLastPage(e.target.value)
  }

  // 별점 변경 핸들러
  const handleGradeChange = (newGrade: number) => {
    setGrade(newGrade)
    setReviewGrade(newGrade) // ReviewModal의 별점 상태 업데이트
  }

  // 리뷰 등록 api 요청
  async function registering() {
    const access = localStorage.getItem('accessToken')

    const requestData = {
      // 요청 본문 데이터 (필요에 따라 변경)
      book_id: book.id,
      content: editedLastPage,
      grade: grade,
      title: '제목',
    }

    try {
      console.log('Sending POST request to /reviews with:', requestData)
      const response = await baseInstance.post('/reviews', requestData, {
        headers: { Authorization: `Bearer ${access}` },
      })

      console.log('POST response:', response)
      alert('리뷰가 등록되었습니다 !')
      console.log(response)
      Swal.fire({
        title: '리뷰가 등록되었습니다! 🎉',
        icon: 'success',
      })
      setReviewGrade(5) // 예시로 5점으로 초기화
      setIsWriting(false)
      viewReview()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex-col">
      <div className="mb-1 flex flex-col">
        <p className="flex justify-start pl-2 ">이 책에 대한 나의 평가</p>
        <StarRateWrap>
          <input
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={inputGrade}
            onChange={(e) => setInputGrade(parseFloat(e.target.value))}
            className="star-input"
          />
          {STAR_IDX_ARR.map((item, idx) => {
            return (
              <span className="star_icon" key={`${item}_${idx}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="33"
                  height="32"
                  viewBox="0 0 14 13"
                  fill="#cacaca">
                  <clipPath id={`${item}StarClip`}>
                    <rect width={`${ratesResArr[idx]}`} height="39" />
                  </clipPath>
                  <path
                    id={`${item}Star`}
                    d="M9,2l2.163,4.279L16,6.969,12.5,10.3l.826,4.7L9,12.779,4.674,15,5.5,10.3,2,6.969l4.837-.69Z"
                    transform="translate(-2 -2)"
                  />
                  <use clipPath={`url(#${item}StarClip)`} href={`#${item}Star`} fill="#f6ce0b" />
                </svg>
              </span>
            )
          })}
        </StarRateWrap>
      </div>
      <input
        defaultValue={editedLastPage}
        onChange={handleLastPageChange}
        placeholder="리뷰 내용(책에 대한 줄거리와 소감을 남겨보세요!)"
        className="w-full h-72 flex text-center text-2xl p-10"></input>
      <button
        onClick={() => {
          registering()
        }}
        className="text-lime-500 hover:text-lime-600 text-2xl ml-4 mb-5">
        등록하기
      </button>
    </div>
  )
}

export default Writng

const StarRateWrap = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding-left: 0.5rem;
  .star-input {
    margin-right: 0.625rem;
  }
  .star_icon {
    display: inline-flex;
    margin-right: 0.3125rem;
  }
`
