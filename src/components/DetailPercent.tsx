import React, { useState, ChangeEvent, useEffect } from 'react';
import PagesModal from './PagesModal';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface DetailPercentProps {
  totalPages: number;
  bookId: string;
}

function DetailPercent({ totalPages, bookId }: DetailPercentProps) {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [currentPersent, setCurrentPersent] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<number | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        if (bookId === undefined) {
          throw new Error('bookId is undefined');
        }
        const response = await axios.get(`http://localhost:8080/api/v1/readings/percentages/1?bid=${bookId}`);
        setCurrentPersent(response.data.data);
        
      } catch (error) {
        console.error('Error fetching book data:', error);
      }
    };

    fetchBook();
  }, [bookId] );


  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value: number = parseInt(e.target.value);
    setInputValue(value);
  };

  const handleModalSubmit = () => {
    if (inputValue !== null && inputValue >= 1 && inputValue <= totalPages) {
      if (bookId === undefined) {
        throw new Error('bookId is undefined');
      }
      axios
        .put(`http://localhost:8080/api/v1/readings/1`, { bookId: parseInt(bookId), lastPage: inputValue })
        .then(response => {
          // Assuming the response contains the current page and percentage
          setCurrentPage(response.data.data.lastPage);
        })
        .catch((error) => {
          console.error('Error updating pages:', error);
        });
    }
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="mx-auto">
      <div className="relative">
        <div className="absolute bottom-0 left-0 right-0 bg-gray-300 rounded-full" style={{ height: '6px' }}></div>
        <div
          className="absolute bottom-0 left-0 bg-white rounded-full"
          style={{ width: `${currentPersent}%`, height: '6px' }}
        ></div>
      </div>
      <div className="mt-2 flex justify-between">
        <div className="text-gray-500 text-lg">{Math.round(currentPersent)}%</div>
        <div className="text-gray-500 text-lg">{`${currentPage}/${totalPages}`}</div>
      </div>
      <button
        onClick={handleOpenModal}
        style={{ backgroundColor: '#BFC66A' }}
        className="mt-4 w-full  text-white font-bold py-2 px-4 rounded"
      >
        페이지 입력하기
      </button>
      <PagesModal isOpen={isModalOpen} onSubmit={handleModalSubmit} onCancel={() => setIsModalOpen(false)}>
        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
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