import { useEffect, useState } from 'react'
import { BsArrowCounterclockwise } from 'react-icons/bs'
import { baseInstance } from '../../../api/config'
import { useMyContext } from '../../Context/MyContext'

type Book = {
  id: number
  title: string
  pages: number
}

const Bar = ({ book }: { book: Book }) => {
  const [initialPercentages, setInitialPercentages] = useState(0)
  const [lastPage, setLastPage] = useState(0)
  // const [newLastPage, setNewLastPage] = useState(0)
  const {
    newLastPage,
    setNewLastPage,
    isEditing,
    setIsEditing,
    setIsActive,
    percentages,
    setPercentages,
  } = useMyContext()

  // 읽은 퍼센트, 읽은 페이지 요청 api
  useEffect(() => {
    readPercentages()
  }, [])
  const readPercentages = async () => {
    const access = localStorage.getItem('accessToken')

    try {
      const response = await baseInstance.get(`/readings/percentages?bid=${book.id}`, {
        headers: { Authorization: `Bearer ${access}` },
      })
      if (response.data.data.percentage >= 100) {
        setPercentages(100)
      } else {
        setPercentages(response.data.data.percentage) // 읽은 퍼센트
      }
      setLastPage(response.data.data.lastPage) // 읽은 페이지
      localStorage.setItem('lastPage', response.data.data.lastPage)
      setInitialPercentages(response.data.data.percentage) //초기 퍼센트 저장
      localStorage.setItem('percentage', response.data.data.percentage)
      setNewLastPage(response.data.data.lastPage) // 초기 페이지 설정
    } catch (error) {}
  }

  //인풋 입력
  const handleLastPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setNewLastPage(value === '' ? 0 : Number(value))
  }
  // 퍼센트 수정
  const changePages = () => {
    if (newLastPage >= 0 && newLastPage <= book.pages) {
      setPercentages(Math.floor((newLastPage / book.pages) * 100))
    }
  }
  //되돌리기 버튼 핸들러
  const resetHandle = () => {
    setIsEditing(false)
    setIsActive(true)
    setLastPage(lastPage) //초기 페이지
    setPercentages(initialPercentages) //초기 퍼센트
    setNewLastPage(lastPage)
  }

  useEffect(() => {
    isEditing && changePages()
  }, [newLastPage, isEditing])

  return (
    <div className="flex flex-col mb-3">
      <div className="flex justify-between mr-1 mb-2 mt-10">
        <p className="text-xl  ">독서량</p>
        {isEditing && (
          <button onClick={resetHandle}>
            <BsArrowCounterclockwise size={20} />
          </button>
        )}
      </div>
      <div className="w-[30rem] bg-gray-200 rounded">
        <div className="h-4 bg-bar rounded" style={{ width: `${percentages}%` }}></div>
      </div>
      <div className="flex justify-between">
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
              {lastPage}
            </span>
          )}
          / {book.pages}
        </div>
      </div>
    </div>
  )
}

export default Bar
