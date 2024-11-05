import { useEffect, useState } from 'react'
import { TiStarFullOutline } from 'react-icons/ti'

import { useMyContext } from '../../Context/MyContext'
import { baseInstance } from '../../../api/config'
const StarRating = () => {
  const { selectedBook, setReview, grading, setGrading } = useMyContext()
  const [rating, setRating] = useState(0)

  const starHandle = (star: number) => {
    selectedBook.grade === 0 && setGrading(star)
  }
  const selectedBookId = selectedBook.id

  const access = localStorage.getItem('accessToken')

  // 리뷰 조회 api 요청
  useEffect(() => {
    viewReview()
  }, [])

  const viewReview = async () => {
    try {
      const response = await baseInstance.get(`/reviews/${selectedBookId}`, {
        headers: { Authorization: `Bearer ${access}` },
      })

      if (response.data.code === 'RE002') {
        const { content, grade } = response.data.data
        setReview(content)
        setRating(grade)
      }
    } catch (error) {}
  }

  return (
    <div className="w-[30rem] flex justify-between mt-5">
      <div className="space-x-1">
        <span className="font-bold text-xl mr-2">평점</span>
        <span className="font-bold text-xl">{grading === 0 ? rating : grading}</span>
        <span className="text-gray-500">/5</span>
      </div>
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <TiStarFullOutline
            key={star}
            size={24}
            color={star <= (grading === 0 ? rating : grading) ? '#f6ce0b' : '#e4e4e4'} // 색상 설정
            className="cursor-pointer"
            onClick={() => starHandle(star)}
          />
        ))}
      </div>
    </div>
  )
}

export default StarRating
