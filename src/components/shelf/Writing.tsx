import React, { useState } from 'react'

interface WritngProps {}

const Writng: React.FC<WritngProps> = () => {
  return (
    <div>
      <input placeholder="리뷰를 작성하세요" className="border text-2xl text-center"></input>
    </div>
  )
}

export default Writng
