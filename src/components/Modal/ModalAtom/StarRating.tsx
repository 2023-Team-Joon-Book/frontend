import { useEffect, useState } from 'react'
import StarIcon from '../../../assets/svgs/star.svg?react'
import { useMyContext } from '../../Context/MyContext'
import { baseInstance } from '../../../api/config'
const StarRating = () => {
  const { selectedBook, review, setReview } = useMyContext()
  const selectedBookId = selectedBook.id

  const [isWriting, setIsWriting] = useState(false)
  const [loading, setLoading] = useState(true) // 로딩 상태 추가
  const [grade, setGrade] = useState(0) // 별점 상태 추가

  // 리뷰 조회 api 요청
  useEffect(() => {
    viewReview()
  }, [])

  const viewReview = async () => {
    const access = localStorage.getItem('accessToken')

    try {
      const response = await baseInstance.get(`/reviews/${selectedBookId}`, {
        headers: { Authorization: `Bearer ${access}` },
      })
      console.log('GET response:', response.data)

      const { content, grade } = response.data.data
      setReview(content)
      setGrade(grade)
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false) // 데이터 로딩 실패 시에도 로딩 상태 변경
    }
  }

  // const initialStarRate = 3
  const [rating, setRating] = useState(grade || null)
  const starHandle = (star: number) => {
    !review && setRating(star)
  }
  return (
    <div className="w-[30rem] flex justify-between mt-7">
      <div className="space-x-1">
        <span className="font-bold text-xl mr-2">평점</span>
        <span className="font-bold text-xl">{rating}</span>
        <span className="text-gray-500">/5</span>
      </div>
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon
            className="w-6 h-6 cursor-pointer"
            key={star}
            fill={star <= rating ? '#f6ce0b' : '#e4e4e4'}
            onClick={() => starHandle(star)}></StarIcon>
        ))}
      </div>
    </div>
  )
}

export default StarRating
