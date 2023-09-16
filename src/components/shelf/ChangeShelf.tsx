import React from 'react'

interface ChangeShelfProps {
  onShelfChange: (newShelf: 'shelf1' | 'shelf2' | 'shelf3') => void
  selectedShelf: 'shelf1' | 'shelf2' | 'shelf3'
}

const ChangeShelf: React.FC<ChangeShelfProps> = ({ onShelfChange, selectedShelf }) => {
  return (
    <div className="mb-4">
      <div className="flex space-x-2">
        <button
          onClick={() => onShelfChange('shelf1')}
          className={`${
            selectedShelf === 'shelf1' ? 'bg-blue-500' : 'bg-gray-300'
          } text-white px-2 py-1 rounded-md`}>
          책장 1
        </button>
        <button
          onClick={() => onShelfChange('shelf2')}
          className={`${
            selectedShelf === 'shelf2' ? 'bg-green-500' : 'bg-gray-300'
          } text-white px-2 py-1 rounded-md`}>
          책장 2
        </button>
        <button
          onClick={() => onShelfChange('shelf3')}
          className={`${
            selectedShelf === 'shelf3' ? 'bg-red-500' : 'bg-gray-300'
          } text-white px-2 py-1 rounded-md`}>
          책장 3
        </button>
      </div>
    </div>
  )
}

export default ChangeShelf
