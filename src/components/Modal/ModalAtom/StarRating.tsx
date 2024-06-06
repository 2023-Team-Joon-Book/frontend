

import React, { useState } from 'react'
import { useDrag, useDrop, DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const Star: React.FC<{ filled: boolean }> = ({ filled }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={filled ? 'gold' : 'none'}
      stroke="gold"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-star">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

const StarRating: React.FC = () => {
  const [rating, setRating] = useState(3.5)

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'star',
    item: { rating },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  const [, dropRef] = useDrop(() => ({
    accept: 'star',
    drop: (item: { rating: number }, monitor) => {
      if (monitor.didDrop()) return
      const delta = monitor.getDifferenceFromInitialOffset()
      if (!delta) return
      const newRating = Math.min(5, Math.max(0, item.rating + delta.x / 20))
      setRating(newRating)
    },
  }))

  const stars = Array.from({ length: 5 }, (_, i) => (
    <div key={i} className="inline-block cursor-pointer">
      <Star filled={i < Math.round(rating)} />
    </div>
  ))

  return (
    <div
      className="flex items-center space-x-2"
      ref={dropRef}
      style={{ opacity: isDragging ? 0.5 : 1 }}>
      <p className="font-bold">평점</p>
      <p className="text-xl">{rating.toFixed(1)}/5</p>
      <div ref={dragRef} className="flex space-x-1">
        {stars}
      </div>
    </div>
  )
}

