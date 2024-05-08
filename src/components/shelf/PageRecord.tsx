const PageRecord = () => {
  return (
    <>
      <div className="w-full bg-neutral-200 rounded-3xl mt-[3rem]">
        <div className="h-2 bg-bar rounded-xl" style={{ width: `${50}%` }}></div>
      </div>
      <div className="flex justify-between ">
        <div className=" text-xs text-neutral-500"> {50}%</div>
        <div className=" text-xs text-neutral-500">
          {50}/{120}
        </div>
      </div>
    </>
  )
}

export default PageRecord
