export interface BookCover {
  title: string
  author: string
  cover_image_url: string
}

export type BookImg = {
  imgSrc: Pick<BookCover, 'cover_image_url'>['cover_image_url']
}
