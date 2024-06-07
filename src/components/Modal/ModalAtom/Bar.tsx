import { useEffect, useState } from 'react'
import ReturnIcon from '../../../assets/svgs/reset.svg?react'
import axios from 'axios'

const Bar = ({ book }) => {
  const [initialPercentages, setInitialPercentages] = useState(0)
  const [lastPage, setLastPage] = useState(0)
  const [percentages, setPercentages] = useState(0)
  const [newLastPage, setNewLastPage] = useState(0)
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true) // 로딩 상태 추가

  // 읽은 퍼센트, 읽은 페이지 요청 api
  useEffect(() => {
    readPercentages()
  }, [])
  const readPercentages = async () => {
    const access = localStorage.getItem('accessToken')

    try {
      const response = await axios.get(
        `http://localhost:8081/api/v1/readings/percentages?bid=${book.id}`,
        {
          headers: { Authorization: `Bearer ${access}` },
        },
      )

      setLastPage(response.data.data.lastPage) // 읽은 페이지
      setPercentages(response.data.data.percentage) // 읽은 퍼센트
      setInitialPercentages(response.data.data.percentage) //초기 퍼센트 저장
      setLoading(false) // 데이터 로딩 완료 후 로딩 상태 변경
      setNewLastPage(response.data.data.lastPage) // 초기 페이지 설정
    } catch (error) {
      console.log(error)
      setLoading(false) // 데이터 로딩 실패 시에도 로딩 상태 변경
    }
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
    setLastPage(lastPage) //초기 페이지
    setPercentages(initialPercentages) //초기 퍼센트
    setNewLastPage(lastPage)
  }

  useEffect(() => {
    isEditing && changePages()
  }, [newLastPage, isEditing])

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
