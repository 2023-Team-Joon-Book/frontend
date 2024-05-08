import { ReactNode } from 'react'
type BookBoxType = {
  img: string
  title: string
  writer: string
  children: ReactNode
}

const BookBox = ({ img, title, writer, children }: BookBoxType) => {
  return (
    <>
      <div className="flex w-[19.1875rem] h-[10.25rem] rounded-[2.0625rem] border border-[#C4C4C4] bg-white">
        <div className=" ml-[1rem] mb-[10.37rem] relative w-[8rem] h-[11rem]">
          <img
            className="absolute bottom-[2rem] shadow-custom w-[8rem] h-[11rem]"
            src={img}
            alt="Book Cover"
          />
        </div>

        <div className="pl-3 pt-[1.81rem]">
          <p className="text-sm font-black max-w-[9rem] overflow-hidden truncate whitespace-nowrap">
            {title}
          </p>
          <p className="text-xs font-black max-w-[9rem] overflow-hidden truncate whitespace-nowrap">
            {writer}
          </p>
          <div>{children}</div>
        </div>
      </div>
    </>
  )
}

export default BookBox
