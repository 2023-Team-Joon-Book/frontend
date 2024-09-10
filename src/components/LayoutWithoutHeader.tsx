import { Outlet } from 'react-router-dom'

const LayoutWithoutHeader = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[1324px]">
        <Outlet />
      </div>
    </div>
  )
}

export default LayoutWithoutHeader
