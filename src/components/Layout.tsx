import { Outlet } from 'react-router-dom'
import MyHeader from './Header/MyHeader'
const Layout = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[1324px]">
        <MyHeader onSearch={() => {}} />
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
