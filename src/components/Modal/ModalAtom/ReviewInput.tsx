import { useState } from 'react'

type ReviewInputProps = {
  onTextChange: () => void
}

const ReviewInput = ({ onTextChange }: ReviewInputProps) => {
  const [text, setText] = useState('')
  return (
    <textarea
      value={text}
      onChange={(e) => {
        setText(e.target.value)
        onTextChange(e.target.value)
      }}
      placeholder="책에 대한 간단한 소감을 남겨봐요"
      className="mt-5 placeholder:text-slate-400 w-[30rem] h-[14rem] p-2 border rounded-lg focus:outline-none focus:shadow-outline"
    />
  )
}

export default ReviewInput
