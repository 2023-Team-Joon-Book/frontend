import MainSlider from './MainSlider'
import ReverseSlider from './ReverseSlider'

export default function MainFirst() {
  const headerStyle = {
    width: '100%',
    backgroundColor: 'white',
  }

  return (
    <div className=" indent-1 mt-60 text-center" style={headerStyle}>
      <div style={{ fontFamily: 'Noto Sans KR' }}>
        <p className="text-5xl animate-slideUpFade">당신을 기다리는</p>
        <p className="text-5xl animate-slideUpFade">15만 권의 도서</p>
        <div className="mt-8">
          <p className="text-2xl animate-slideUpFade">첫 달 무료 구독을 통해</p>
          <p className="text-2xl animate-slideUpFade">어떤 도서가 있는지 확인해보세요</p>
        </div>
        <div className="flex flex-col mt-auto" style={{ marginTop: '10vh' }}>
          <MainSlider />
        </div>
        <div style={{ marginTop: '20px' }}>
          <ReverseSlider />
        </div>
      </div>
    </div>
  )
}
