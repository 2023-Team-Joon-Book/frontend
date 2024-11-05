import searchhistory from '../../../../../public/searchhistory.png'

interface HistoryContentsProps {
  content: string
}

const HistoryContents = ({ content }: HistoryContentsProps) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center w-[9rem] h-[9rem] rounded-[2.0625rem] border border-[#C4C4C4] bg-white hover:scale-105 duration-300 ease-in-out">
        <div className="pt-6">
          <img src={searchhistory} className="pb-8" />
          <p className="text-sm font-black max-w-[9rem] overflow-hidden truncate whitespace-nowrap">
            {content}
          </p>
        </div>
      </div>
    </>
  )
}

export default HistoryContents
