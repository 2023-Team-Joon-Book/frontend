import { createBrowserRouter } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { ClipLoader } from 'react-spinners'

import Layout from './src/components/Layout'
import LayoutWithoutHeader from './src/components/LayoutWithoutHeader' // 새로운 레이아웃
const MainPage = lazy(() => import('./src/pages/MainPage'))
const LoginPage = lazy(() => import('./src/pages/LoginPage'))
const SignUpPage = lazy(() => import('./src/pages/SignUpPage'))
const MyPage = lazy(() => import('./src/pages/MyPage'))
const SearchPage = lazy(() => import('./src/pages/SearchPage'))
const BookInfoPage = lazy(() => import('./src/pages/BookInfoPage'))
const ChoosePage = lazy(() => import('./src/pages/ChoosePage'))
const Statistics = lazy(() => import('./src/pages/Statistics'))
const BookStackPage = lazy(() => import('./src/pages/BookStackPage'))

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense
        fallback={
          <div
            style={{
              width: '100%',
              height: '67.5rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ClipLoader color="black" size={28} />
          </div>
        }>
        <LayoutWithoutHeader /> 
      </Suspense>
    ),
    children: [
      { path: '/', element: <MainPage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/signup', element: <SignUpPage /> },
    ],
  },
  {
    path: '/',
    element: (
      <Suspense
        fallback={
          <div
            style={{
              width: '100%',
              height: '67.5rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ClipLoader color="black"  size={28} />
          </div>
        }>
        <Layout /> 
      </Suspense>
    ),
    children: [
      { path: '/mypage', element: <MyPage /> },
      { path: '/booksearch', element: <SearchPage /> },
      { path: '/book/:id', element: <BookInfoPage /> },
      { path: '/choose', element: <ChoosePage /> },
      { path: '/activity', element: <Statistics /> },
      { path: '/stack', element: <BookStackPage /> },
    ],
  },
])

export default router
