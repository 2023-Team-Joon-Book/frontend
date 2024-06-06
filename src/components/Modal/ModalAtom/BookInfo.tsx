const BookInfo = () => {
  return (
    <>
      <img
        src={'https://image.yes24.com/goods/12332164/XL'}
        alt={'title'}
        className="w-[9rem] h-[12rem]"
      />
      <h2 className="text-lg font-black mt-2 max-w-[12rem] overflow-hidden truncate whitespace-nowrap">
        {'홍길동전'}
      </h2>
      <p className="mt-2 text-base font-medium max-w-[9rem] overflow-hidden truncate whitespace-nowrap">
        {'김아무개'}
      </p>
    </>
  )
}

export default BookInfo
