import searchhistory from '../../../../../public/searchhistory.png'

interface HistoryContentsProps {
  content: string
}

const HistoryContents = ({ content }: HistoryContentsProps) => {
  return (
    <>
      <div className="flex justify-center max-w-[9rem] h-[9.25rem] rounded-[2.0625rem] border border-[#C4C4C4] bg-white">
        <div className="">
          <img src={searchhistory} />
          <p className="text-sm font-black max-w-[9rem] overflow-hidden truncate whitespace-nowrap">
            {content}
          </p>
        </div>
      </div>
    </>
  )
}

export default HistoryContents
