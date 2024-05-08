import { useState } from 'react'

const Bar = ({ book }) => {
  const [lastPage, setLastPage] = useState(0)
  const [percentages, setPercentages] = useState(0)
  const [editedLastPage, setEditedLastPage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLastPageChange = (event) => {
    setEditedLastPage(event.target.value)
  }

  const changePages = () => {
    const newLastPage = parseInt(editedLastPage, 10)
    if (newLastPage > 0 && newLastPage <= book.pages) {
      setLastPage(newLastPage)
      setPercentages((newLastPage / book.pages) * 100)
      setLoading(false)
    }
  }

  const changeStatus = () => {
    setPercentages(100)
    setLastPage(book.pages)
  }

  const closeBar = () => {}

  return (
    <div className="flex flex-col">
      <p className="text-2xl mr-4 mb-2 mt-10 ">독서량</p>

      <div className="w-[30rem] bg-gray-200 rounded">
        <div className="h-4 bg-blue-500 rounded" style={{ width: `${percentages}%` }}></div>
      </div>
      <div className="flex space-x-96">
        <div className="mt=5 text-lg">{percentages}%</div>
        <div className="mt=5 text-lg">48 / 210</div>
      </div>

      <button
        className="fixed top-10 right-10 text-gray-500 hover:text-gray-700 cursor-pointer text-xl"
        onClick={closeBar}>
        X
      </button>
    </div>
  )
}

export default Bar
