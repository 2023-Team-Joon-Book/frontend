import useOnScreen from '../../hooks/useOnScreen'
import PopularBook from './PopularBook'

export default function MainThird() {
  const [ref, visible] = useOnScreen({ threshold: 0.1 })

  const headerStyle = {
    width: '100%',
    backgroundColor: 'white',
  }

  return (
    <div className="text-5xl indent-1 mt-60 text-center" style={headerStyle} ref={ref}>
      <div style={{ fontFamily: 'Noto Sans KR' }}>
        <p className={`text-5xl ${visible ? 'animate-slideUpFade' : ''}`}>인기있는 도서들을 </p>
        <p className={`text-5xl ${visible ? 'animate-slideUpFade' : ''}`}>한 눈에 볼 수 있습니다</p>
        <div className="mt-8">
          <p className={`text-2xl ${visible ? 'animate-slideUpFade' : ''}`}>
            검색어 순위를 통해 뽑은
          </p>
          <p className={`text-2xl ${visible ? 'animate-slideUpFade' : ''}`}>
            인기 분야 책들을 확인해보세요
          </p>
        </div>
      </div>
      <div className="flex flex-col mt-auto" style={{ marginTop: '10vh' }}>
        <PopularBook />
      </div>
    </div>
  )
}
