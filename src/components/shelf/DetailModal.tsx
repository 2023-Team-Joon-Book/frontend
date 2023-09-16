import React from 'react'

interface DetailModalProps {
  book: {
    id: number
    title: string
    status: string
    author: string
    img_url: string
  }
  onClose: () => void
}

const DetailModal: React.FC<DetailModalProps> = ({ book, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <img src={book.img_url} width="300"></img>
        <h3 className="text-lg font-semibold">{book.title}</h3>
        <p className="text-sm">{book.author}</p>
        <p className="text-sm">{book.status}</p>
        {/* 추가적인 책 상세 정보 표시 */}
        <button onClick={onClose} className="text-blue-500 underline mt-4 cursor-pointer">
          닫기
        </button>
      </div>
    </div>
  )
}

export default DetailModal
