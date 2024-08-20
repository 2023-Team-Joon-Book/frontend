import useOnScreen from '../../hooks/useOnScreen'
import RecentBook from './RecentBook'

export default function MainSecond() {
  const [ref, visible] = useOnScreen({ threshold: 0.1 })

  const headerStyle = {
    width: '100%',
    backgroundColor: 'white',
  }

  return (
    <div className="text-5xl indent-1 mt-60 text-center" style={headerStyle} ref={ref}>
      <div style={{ fontFamily: 'Noto Sans KR' }}>
        <p className={`text-5xl ${visible ? 'animate-slideUpFade' : ''}`}>매일 신작 도서를</p>
        <p className={`text-5xl ${visible ? 'animate-slideUpFade' : ''}`}>구경하세요</p>
        <div className="mt-8">
          <p className={`text-2xl ${visible ? 'animate-slideUpFade' : ''}`}>10년치 베스트셀러</p>
          <p className={`text-2xl ${visible ? 'animate-slideUpFade' : ''}`}>
            신간 오디오북 장르 소설까지
          </p>
        </div>
      </div>
      <div className="flex flex-col mt-auto" style={{ marginTop: '10vh' }}>
        <RecentBook />
      </div>
    </div>
  )
}
