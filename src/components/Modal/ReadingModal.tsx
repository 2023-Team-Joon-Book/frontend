import { ReactNode } from 'react'
import StateBtn from './ModalAtom/StateBtn'

type ReadingModalProps = {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

const ReadingModal = ({ isOpen, onClose, children }: ReadingModalProps) => {
  if (!isOpen) return null

  return (
    <>
      <div className="z-40 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className=" flex flex-col  items-center bg-white  rounded-lg w-[36rem] h-[45rem]">
          <div className="flex w-full justify-end pr-3">
            <button onClick={onClose} className="  p-2 z-50">
              ✕
            </button>
          </div>
          {children}
          <button className="mt-[2rem] bg-btn rounded-lg w-[30rem] h-[3rem] text-white">
            저장하기
          </button>
        </div>
      </div>
    </>
  )
}

export default ReadingModal
