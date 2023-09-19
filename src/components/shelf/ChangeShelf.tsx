import React from 'react'

interface ChangeShelfProps {
  onShelfChange: (newShelf: 'shelf1' | 'shelf2' | 'shelf3') => void
  selectedShelf: 'shelf1' | 'shelf2' | 'shelf3'
}

const ChangeShelf: React.FC<ChangeShelfProps> = ({ onShelfChange, selectedShelf }) => {
  return (
    <div className="mb-4">
      <div className="flex space-x-2" style={{ fontFamily: 'bmfont' }}>
        <button
          onClick={() => onShelfChange('shelf1')}
          className={`${selectedShelf === 'shelf1' ? 'text-5xl' : 'text-xl'}  font`}>
          찜한 책
        </button>
        <button
          onClick={() => onShelfChange('shelf2')}
          className={`${
            selectedShelf === 'shelf2' ? 'text-5xl' : 'text-xl'
          }  px-2 py-1 rounded-md`}>
          읽고 있는 책
        </button>
        <button
          onClick={() => onShelfChange('shelf3')}
          className={`${selectedShelf === 'shelf3' ? 'text-5xl' : 'text-xl'} px-2 py-1 rounded-md`}>
          다 읽은 책
        </button>
      </div>
    </div>
  )
}

export default ChangeShelf
