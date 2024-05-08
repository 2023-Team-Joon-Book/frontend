import Books from '../../shelf/Books'

const WishList = () => {
  return (
    <>
      <div className="grid grid-cols-8 gap-y-8 gap-x-4 mt-8">
        <Books book={{ cover_image_url: 'https://image.yes24.com/goods/12332164/XL' }} />
        <Books book={{ cover_image_url: 'https://image.yes24.com/goods/12332164/XL' }} />
        <Books book={{ cover_image_url: 'https://image.yes24.com/goods/12332164/XL' }} />
        <Books book={{ cover_image_url: 'https://image.yes24.com/goods/12332164/XL' }} />
        <Books book={{ cover_image_url: 'https://image.yes24.com/goods/12332164/XL' }} />
        <Books book={{ cover_image_url: 'https://image.yes24.com/goods/12332164/XL' }} />
        <Books book={{ cover_image_url: 'https://image.yes24.com/goods/12332164/XL' }} />
        <Books book={{ cover_image_url: 'https://image.yes24.com/goods/12332164/XL' }} />
        <Books book={{ cover_image_url: 'https://image.yes24.com/goods/12332164/XL' }} />
        <Books book={{ cover_image_url: 'https://image.yes24.com/goods/12332164/XL' }} />
        <Books book={{ cover_image_url: 'https://image.yes24.com/goods/12332164/XL' }} />
      </div>
    </>
  )
}

export default WishList
