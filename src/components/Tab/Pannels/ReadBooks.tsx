import BookBox from '../../shelf/BookBox'
import StarRate from '../../shelf/StarRate'

const ReadBook = () => {
  return (
    <div className="grid grid-cols-4 gap-y-14 gap-x-8 mt-16">
      <BookBox
        img={'https://image.yes24.com/goods/126344176/XL'}
        title="다정하지만 만만하지 않습니다"
        writer="정문정"
        children={<StarRate grade={3} />}
      />
      <BookBox
        img={'https://image.yes24.com/goods/126344176/XL'}
        title="다정하지만 만만하지 않습니다"
        writer="정문정"
        children={<StarRate grade={3} />}
      />
      <BookBox
        img={'https://image.yes24.com/goods/126344176/XL'}
        title="다정하지만 만만하지 않습니다"
        writer="정문정"
        children={<button className="font-sm text-neutral-500">책 리뷰 남기기 {'>'}</button>}
      />
      <BookBox
        img={'https://image.yes24.com/goods/126344176/XL'}
        title="다정하지만 만만하지 않습니다"
        writer="정문정"
        children={<button className="font-sm text-neutral-500">책 리뷰 남기기 {'>'}</button>}
      />
      <BookBox
        img={'https://image.yes24.com/goods/126344176/XL'}
        title="다정하지만 만만하지 않습니다"
        writer="정문정"
        children={<button className="font-sm text-neutral-500">책 리뷰 남기기 {'>'}</button>}
      />
      <BookBox
        img={'https://image.yes24.com/goods/126344176/XL'}
        title="다정하지만 만만하지 않습니다"
        writer="정문정"
        children={<button className="font-sm text-neutral-500">책 리뷰 남기기 {'>'}</button>}
      />
    </div>
  )
}

export default ReadBook
