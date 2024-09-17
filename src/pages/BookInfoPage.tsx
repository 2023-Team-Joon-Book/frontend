import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import { baseInstance } from '../api/config'
import { useParams } from 'react-router-dom'
import { AxiosError } from 'axios'

interface BookData {
  author: string
  cover_image_url: string
  height: number
  id: number
  likes: number
  pages: number
  publisher: string
  title: string
  width: number
  description: string
}

export default function BookInfoPage() {
  const { id } = useParams<{ id: string }>()
  const [bookData, setBookData] = useState<BookData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [likeStatus, setLikeStatus] = useState(false)
  const [reading, setReading] = useState(false)
  const [readComplete, setReadComplete] = useState(false)

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken')

        const response = await baseInstance.get(`/books/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        console.log(response)

        setBookData(response.data.data) // API 응답에서 책 정보를 가져옵니다.
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response && error.response.status === 401) {
            setError('Unauthorized')
          } else {
            setError('An error occurred while fetching book data.')
          }
        }
      } finally {
        setLoading(false)
      }
    }

    fetchBookData()
  }, [id])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  // 찜하기 상태 업데이트
  const handleLikeToggle = async () => {
    try {
      await baseInstance.post(`/books/like/${id}`)
      setLikeStatus(!likeStatus)
      // 토스트 알림 표시
      Swal.fire({
        icon: 'success',
        title: `${likeStatus ? '찜 해제되었습니다.' : '찜되었습니다.'}`,
      })
    } catch (error) {
      console.error('Error updating like status:', error)
    }
  }

  // 읽기 상태 업데이트
  const handleReadingToggle = async () => {
    try {
      await baseInstance.post(`/readings`, {
        bookId: id,
        lastPage: 0, // 적절한 lastPage 값을 설정합니다.
        status: reading ? 'not_read' : 'reading',
      })
      setReading(!reading)
      // 토스트 알림 표시
      Swal.fire({
        icon: 'success',
        title: `${reading ? '읽기 중이 해제되었습니다.' : '읽기 중으로 설정되었습니다.'}`,
      })
    } catch (error) {
      console.error('Error updating reading status:', error)
    }
  }

  // 다 읽은 책 상태 업데이트
  const handleReadCompleteToggle = async () => {
    try {
      await baseInstance.post(`/readings`, {
        bookId: id,
        lastPage: bookData?.pages, // 다 읽은 책이므로 마지막 페이지를 설정합니다.
        status: readComplete ? 'reading' : 'read',
      })
      setReadComplete(!readComplete)
      // 토스트 알림 표시
      Swal.fire({
        icon: 'success',
        title: `${
          readComplete ? '다 읽은 책이 해제되었습니다.' : '다 읽은 책으로 설정되었습니다.'
        }`,
      })
    } catch (error) {
      console.error('Error updating read status:', error)
    }
  }

  return (
    <div>
      {/* Book data rendering */}
      {bookData && (
        <div>
          <h1>{bookData?.title}</h1>
          <p>{bookData?.description}</p>
          {/* 다른 필요한 책 정보 렌더링 */}

          {/* 찜하기 버튼 */}
          <button onClick={handleLikeToggle}>{likeStatus ? '찜 해제' : '찜하기'}</button>

          {/* 읽기 버튼 */}
          <button onClick={handleReadingToggle}>{reading ? '읽기 중...' : '읽기'}</button>

          {/* 다 읽은 책 버튼 */}
          <button onClick={handleReadCompleteToggle}>
            {readComplete ? '다 읽은 책 해제' : '다 읽은 책'}
          </button>
        </div>
      )}
    </div>
  )
}
