import React from 'react'

interface DetailModalProps {
  book: {
    id: number
    title: string
    status: string
    author: string
    img_url: string
  }
  closeModal: () => void
}

const DetailModal: React.FC<DetailModalProps> = ({ book, closeModal }) => {
  return (
    <div
      className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-gray-800 bg-opacity-50"
      style={{ fontFamily: 'bmfont' }}>
      <div className="bg-white w-2/3 h-2/3 rounded-lg p-4 flex">
        <div className="w-1/3 p-4">
          <img
            src={book.img_url} // 책 이미지의 경로를 사용
            alt={book.title}
            className="w-full h-48 object-cover rounded-lg mb-4 shadow-lg"
          />
          <h2 className="text-xl font-bold mb-2">{book.title}</h2>
          <p className="text-gray-600">저자: {book.author}</p>
        </div>
        <div className="w-2/3 p-4">
          <h3 className="text-lg font-semibold mb-2">현재까지 읽은 페이지 수</h3>
        </div>
        <button className=" text-gray-500 hover:text-gray-700 cursor-pointer" onClick={closeModal}>
          닫기
        </button>
      </div>
    </div>
  )
}

export default DetailModal
