import { AxiosResponse } from 'axios'
import { BookCover, BookImg } from '../types'
import { baseInstance } from './config'

/* 새로운 책 데이터 조회 */
export const getNewBooksAPI = async (): Promise<BookImg[]> => {
  try {
    const response: AxiosResponse<{ data: { content: any[] } }> =
      await baseInstance.get('/books/new')

    // 필요한 데이터만 가공하여 반환
    const newBooks = response.data.data.content.map((book) => ({
      imgSrc: book.cover_image_url,
    }))

    return newBooks
  } catch (error: any) {
    console.error('새로운 책 데이터를 가져오는 중 오류가 발생했습니다:', error.message)
    throw new Error(`새로운 책 데이터를 가져오는 중 오류가 발생했습니다: ${error.message}`)
  }
}

/* 최근 출시작 조회 */
export const getRecentBooksAPI = async (): Promise<BookCover[]> => {
  try {
    const response: AxiosResponse<{ data: { content: BookCover[] } }> =
      await baseInstance.get('/books/new')

    const recentBooks = response.data.data.content.slice(0, 6)

    return recentBooks
  } catch (error: any) {
    console.error('최근 출시작을 가져오는 중 오류가 발생했습니다:', error.message)
    throw new Error(`최근 출시작을 가져오는 중 오류가 발생했습니다: ${error.message}`)
  }
}

/* 인기 있는 도서 조회 */
export const getPopularBooksAPI = async (): Promise<BookCover[]> => {
  try {
    const response: AxiosResponse<{ data: { content: BookCover[] } }> =
      await baseInstance.get('/books/like')

    // API 응답에서 필요한 부분만 잘라서 반환
    const popularBooks = response.data.data.content.slice(0, 6)

    return popularBooks
  } catch (error: any) {
    console.error('인기 있는 도서를 가져오는 중 오류가 발생했습니다:', error.message)
    throw new Error(`인기 있는 도서를 가져오는 중 오류가 발생했습니다: ${error.message}`)
  }
}
