import { useNavigate } from 'react-router-dom'
import MainHeader from '../components/Header/MainHeader'
import MainFirst from '../components/main/MainFirst'
import MainSecond from '../components/main/MainSecond'
import MainThird from '../components/main/MainThird'
import StartNavigator from '../components/main/StartNavigator'

function MainPage() {
  const navigate = useNavigate()

  const handleStart = () => {
    const token = localStorage.getItem('accessToken')

    if (token) {
      navigate('/booksearch')
    } else {
      navigate('/login')
    }
  }

  return (
    <div className="flex flex-col min-h-screen justify-between pb-96">
      <div className="relative z-60">
        <MainHeader />
      </div>
      <MainFirst />
      <MainSecond />
      <MainThird />
      <StartNavigator text={'시작하기'} onClick={handleStart} />
    </div>
  )
}

export default MainPage
