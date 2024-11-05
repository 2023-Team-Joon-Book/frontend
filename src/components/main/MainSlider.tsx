import { useState } from 'react'
import { useQuery } from 'react-query'
import { getNewBooksAPI } from '../../api/main'
import '../../scss/Slider.scss'
import { BookImg } from '../../types'

export default function MainSlider() {
  const [animate, setAnimate] = useState(true)

  const {
    data: bookCovers = [],
    isLoading,
    error,
  } = useQuery<BookImg[]>(['newBooks'], getNewBooksAPI)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error fetching books data</div>
  }

  const onStop = () => setAnimate(false)
  const onRun = () => setAnimate(true)

  return (
    <div className="wrapper">
      <div className="slide_container" onMouseEnter={onStop} onMouseLeave={onRun}>
        <ul className="slide_wrapper">
          <div className={'slide original'.concat(animate ? '' : ' stop')}>
            {bookCovers.map((s, i) => (
              <li key={i} className="big">
                <div
                  className="item"
                  style={{
                    backgroundImage: `url(${s.imgSrc})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '100%',
                    height: '100%',
                  }}></div>
              </li>
            ))}
          </div>
          <div className={'slide clone'.concat(animate ? '' : ' stop')}>
            {bookCovers.map((s, i) => (
              <li key={i} className="big">
                <div
                  className="item"
                  style={{
                    backgroundImage: `url(${s.imgSrc})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '100%',
                    height: '100%',
                  }}></div>
              </li>
            ))}
          </div>
        </ul>
      </div>
    </div>
  )
}
