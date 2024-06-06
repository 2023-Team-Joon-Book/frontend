import { useState } from 'react'
import StarIcon from '../../../assets/svgs/star.svg?react'

const StarRating = () => {
  const initialStarRate = 3
  const [rating, setRating] = useState(initialStarRate)
  const starHandle = (star: number) => {
    setRating(star)
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
