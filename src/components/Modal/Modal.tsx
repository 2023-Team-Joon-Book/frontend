import { ReactNode } from 'react'
import { useMyContext } from '../Context/MyContext'

type ReadingModalProps = {
  isOpen?: boolean
  onClose: () => void
  children: ReactNode
}

const ReadingModal = ({ onClose, children }: ReadingModalProps) => {
  const { review } = useMyContext()
  return (
    <>
      <div className="z-40 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className=" flex flex-col  items-center bg-white  rounded-lg w-[34rem] h-[40rem]">
          <div className="flex w-full justify-end pr-3 mb-5">
            <button onClick={onClose} className="  p-2 z-50">
              ✕
            </button>
          </div>
          {children}
          {!review && (
            <button className="mt-[2rem] mb-[2rem] bg-btn rounded-lg w-[30rem] h-[3rem] text-white">
              저장하기
            </button>
          )}
        </div>
      </div>
    </>
  )
}

export default ReadingModal
