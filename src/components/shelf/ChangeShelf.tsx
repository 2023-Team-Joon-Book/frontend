import React, { useState } from 'react'

interface ChangeShelfProps {
  onShelfChange: (newShelf: 'shelf1' | 'shelf2' | 'shelf3') => void
  selectedShelf: 'shelf1' | 'shelf2' | 'shelf3'
}

const ChangeShelf: React.FC<ChangeShelfProps> = ({ onShelfChange, selectedShelf }) => {
  const [btn, setBtn] = useState(['찜한 책', '읽고 있는 책', '다 읽은 책'])

  return (
    <div className="mb-4">
      <div className="flex space-x-2" style={{ fontFamily: 'bmfont' }}>
        <button
          onClick={() => onShelfChange('shelf1')}
          className={`${selectedShelf === 'shelf1' ? 'text-5xl' : 'text-xl'}  font`}>
          {btn[0]}
        </button>
        <button
          onClick={() => onShelfChange('shelf2')}
          className={`${
            selectedShelf === 'shelf2' ? 'text-5xl' : 'text-xl'
          }  px-2 py-1 rounded-md`}>
          {btn[1]}
        </button>
        <button
          onClick={() => onShelfChange('shelf3')}
          className={`${selectedShelf === 'shelf3' ? 'text-5xl' : 'text-xl'} px-2 py-1 rounded-md`}>
          {btn[2]}
        </button>
      </div>
    </div>
  )
}

export default ChangeShelf
