import { useEffect, useState } from 'react'
import ReturnIcon from '../../../assets/svgs/reset.svg?react'

const Bar = ({ book }) => {
  //더미
  const initialPercentages = 60
  const [lastPage, setLastPage] = useState(150) //숫자로 받음
  const [percentages, setPercentages] = useState(initialPercentages) //숫자로 받음
  const [newLastPage, setNewLastPage] = useState(lastPage)
  const [isEditing, setIsEditing] = useState(false)

  const handleLastPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setNewLastPage(value === '' ? 0 : Number(value))
  }

  const changePages = () => {
    if (newLastPage >= 0 && newLastPage <= 250) {
      setPercentages(Math.floor((newLastPage / 250) * 100))
    }
  }
  const resetHandle = () => {
    setIsEditing(false)
    setLastPage(150) //초기 페이지
    setPercentages(initialPercentages) //초기 퍼센트
    setNewLastPage(lastPage)
  }
  useEffect(() => {
    isEditing && changePages()
  }, [newLastPage])

  return (
    <div className="flex flex-col mb-5">
      <div className="flex justify-between mr-4 mb-2 mt-10">
        <p className="text-2xl  ">독서량</p>
        {isEditing && (
          <button onClick={resetHandle}>
            <ReturnIcon />
          </button>
        )}
      </div>
      <div className="w-[30rem] bg-gray-200 rounded">
        <div className="h-4 bg-bar rounded" style={{ width: `${percentages}%` }}></div>
      </div>
      <div className="flex space-x-96">
        <div className="mt=5 text-lg">{percentages}%</div>
        <div className="mt=5 text-base">
          {isEditing ? (
            <input
              onChange={handleLastPageChange}
              value={newLastPage || '0'}
              className="text-lg  text-end w-[2rem] h-[1.25rem] rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:invalid:border-red-500"
              type="text"
            />
          ) : (
            <span
              onClick={() => setIsEditing(true)}
              className="underline text-lg cursor-pointer underline-offset-2 font-medium">
              150
            </span>
          )}
          / 250
        </div>
      </div>
    </div>
  )
}

export default Bar
