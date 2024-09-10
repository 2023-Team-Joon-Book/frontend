type PageRecordProps = {
  pages: number
  percentages: number
  lastPage: number
}

const PageRecord = ({ pages, percentages, lastPage }: PageRecordProps) => {
  if (percentages >= 100) {
    percentages = 100
  }
  return (
    <>
      <div className="w-36 bg-neutral-200 rounded-3xl mt-[3rem]">
        <div className="h-2 bg-bar rounded-xl" style={{ width: `${percentages}%` }}></div>
      </div>
      <div className="flex justify-between ">
        <div className=" text-xs text-neutral-500"> {percentages}%</div>
        <div className=" text-xs text-neutral-500">
          {lastPage}/{pages}
        </div>
      </div>
    </>
  )
}

export default PageRecord
