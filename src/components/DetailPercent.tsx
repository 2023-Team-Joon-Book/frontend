import React, { useState, ChangeEvent, useEffect } from 'react';
import PagesModal from './PagesModal';
import axios from 'axios';

interface DetailPercentProps {
  totalPages: number;
  bookId: string;
}

function DetailPercent({ totalPages, bookId }: DetailPercentProps) {
  const [lastPage, setLastPage] = useState<number>(0);
  const [currentPersent, setCurrentPersent] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<number | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        if (bookId === undefined) {
          throw new Error('bookId is undefined');
        }
        const response = await axios.get(`http://localhost:8080/api/v1/readings/percentages/3?bid=${bookId}`);
        console.log(response.data);
        setCurrentPersent(response.data.data.percentage);
        setLastPage(response.data.data.lastPage);

      } catch (error) {
        console.error('Error fetching book data:', error);
      }
    };

    fetchBook();
  }, [bookId, lastPage]);


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
        .put(`http://localhost:8080/api/v1/readings/3`, { bookId: bookId, lastPage: inputValue })
        .then((response) => {
          // Assuming the response contains the updated page data
          const updatedLastPage = response.data.data.lastPage;
          const updatedCurrentPercent = response.data.data.percentage;

          // Set the state with the updated values
          setLastPage(updatedLastPage);
          setCurrentPersent(updatedCurrentPercent);
        })
        .catch((error) => {
          console.error('Error updating pages:', error);
        });
    }
    setIsModalOpen(false);
  };


  const handleFinishReading = () => {
    if (bookId === undefined) {
      throw new Error('bookId is undefined');
    }
    axios
      .put(`http://localhost:8080/api/v1/readings/status/3?status=READING`, { bookId: bookId, lastPage: totalPages, status: "READ" })
      .then((response) => {
        // Assuming the response contains the updated data
        const updatedLastPage = response.data.data.lastPage;
        // Set the state with the updated values
        setLastPage(updatedLastPage);
        // Update your status state here as per your requirement
      })
      .catch((error) => {
        console.error('Error updating status:', error);
      });
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
        <div className="text-gray-500 text-lg">{`${lastPage}/${totalPages}`}</div>
      </div>
      <div className="mt-4 flex justify-between space-x-4">
        <button
          onClick={handleOpenModal}
          style={{ backgroundColor: '#BFC66A' }}
          className="w-full  text-white font-bold py-2 px-4 rounded"
        >
          페이지 입력
        </button>
        <button
          onClick={handleFinishReading}
          style={{ backgroundColor: '#BFC66A' }}
          className="w-full text-white font-bold py-2 px-4 rounded"
        >
          다 읽었어요
        </button>
      </div>
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