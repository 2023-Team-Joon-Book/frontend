import React, { useState, ChangeEvent } from 'react';
import PagesModal from './PagesModal';

interface DetailPercentProps {
  totalPages: number;
}

function DetailPercent({ totalPages }: DetailPercentProps) {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<number | null>(null);
  const percent: number = (currentPage / totalPages) * 100;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value: number = parseInt(e.target.value);
    setInputValue(value);
  };

  const handleModalSubmit = () => {
    if (inputValue !== null && inputValue >= 1 && inputValue <= totalPages) {
      setCurrentPage(inputValue);
    }
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="mx-auto">
      <div className="relative">
        <div
          className="absolute bottom-0 left-0 right-0 bg-gray-300 rounded-full"
          style={{ height: '6px' }}
        ></div>
        <div
          className="absolute bottom-0 left-0 bg-white rounded-full"
          style={{ width: `${percent}%`, height: '6px' }}
        ></div>
      </div>
      <div className="mt-2 text-gray-500 text-lg text-center">{Math.round(percent)}%</div>
      <button 
        onClick={handleOpenModal}
        className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        페이지 입력하기
      </button>
      <PagesModal isOpen={isModalOpen} onSubmit={handleModalSubmit} onCancel={() => setIsModalOpen(false)}>
        <h3 className="background-#BFC66A ,text-lg leading-6 font-medium text-gray-900" id="modal-title">
          페이지 수 입력
        </h3>
        <div className="mt-2">
          <input
            type="number"
            min={1}
            max={totalPages}
            onChange={handleInputChange}
            className="w-full mt-2 rounded-md border-gray-300 shadow-sm"
          />
        </div>
      </PagesModal>
    </div>
  );
}

export default DetailPercent;
