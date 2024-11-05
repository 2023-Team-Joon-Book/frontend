interface BookProps {
  title: string
  author: string
  imgSrc: string
}

const Book = ({ title, author, imgSrc }: BookProps) => {
  return (
    <div className="w-44">
      <img
        className="h-64 bg-gray-200 rounded-lg flex flex-col justify-center"
        alt="책 표지"
        src={imgSrc}
      />
      <div className="mt-2 text-left">
        <div className="font-bold text-xl mb-1 truncate">{title}</div>
        <div className="text-base text-gray-500 truncate">{author}</div>
      </div>
    </div>
  )
}

export default Book
