import { useEffect, useState } from 'react'
import { baseInstance } from '../../api/config'
import '../../scss/Slider.scss'

interface Book {
  imgSrc: string
  target: string
}

function MainSlider() {
  const [animate, setAnimate] = useState(true)
  const [books, setBooks] = useState<Book[]>([])

  useEffect(() => {
    const fetchBooksData = async () => {
      try {
        const response = await baseInstance.get('/books/like')
        if (response.data && response.data.data && response.data.data.content) {
          setBooks(
            response.data.data.content.map((book: any) => ({
              imgSrc: book.cover_image_url,
              target: '#',
            })),
          )
        }
      } catch (error) {
        console.error('Error fetching books data:', error)
      }
    }

    fetchBooksData()
  }, [])

  const onStop = () => setAnimate(false)
  const onRun = () => setAnimate(true)

  return (
    <div className="wrapper">
      <div className="slide_container" onMouseEnter={onStop} onMouseLeave={onRun}>
        <ul className="slide_wrapper">
          <div className={'slide original'.concat(animate ? '' : ' stop')}>
            {books.map((s, i) => (
              <li key={i} className="big">
                <div
                  className="item"
                  style={{
                    backgroundImage: `url(${s.imgSrc})`,
                    backgroundSize: 'cover', // 또는 'contain'으로 설정
                    backgroundPosition: 'center',
                    width: '100%', // 적절한 크기로 조정
                    height: '100%', // 적절한 크기로 조정
                  }}>
                  {/* Additional content can be added here if needed */}
                </div>
              </li>
            ))}
          </div>
          <div className={'slide clone'.concat(animate ? '' : ' stop')}>
            {books.map((s, i) => (
              <li key={i} className="big">
                <div
                  className="item"
                  style={{
                    backgroundImage: `url(${s.imgSrc})`,
                    backgroundSize: 'cover', // 또는 'contain'으로 설정
                    backgroundPosition: 'center',
                    width: '100%', // 적절한 크기로 조정
                    height: '100%', // 적절한 크기로 조정
                  }}>
                  {/* Additional content can be added here if needed */}
                </div>
              </li>
            ))}
          </div>
        </ul>
      </div>
    </div>
  )
}

export default MainSlider
