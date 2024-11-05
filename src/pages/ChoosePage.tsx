import { styled } from 'styled-components'
import books from '../../public/img/books.png'
import statistics from '../../public/img/statistics.png'
import { Link } from 'react-router-dom'

const ChoosePage = () => {
  return (
    <>
      <Container>
        <Link to="/stack">
          <Layout style={{ marginRight: '9rem' }}>
            <div style={{ flexDirection: 'column' }}>
              <TextLayout>
                <Text1>쌓아보기</Text1>
                <Text2>읽은 책들이 얼마나 쌓였는 지 확인할 수 있어요!</Text2>
              </TextLayout>
              <BookLayout>
                <BooksImage src={books} alt="stack" />
              </BookLayout>
            </div>
          </Layout>
        </Link>
        <Link to="/activity">
          <Layout>
            <div style={{ flexDirection: 'column' }}>
              <TextLayout>
                <Text1>모아보기</Text1>
                <Text2>하루에 몇 페이지씩 읽었는 지 확인할 수 있어요!</Text2>
              </TextLayout>
              <StatisLayout>
                <StatisticsImage src={statistics} alt="statistics" />
              </StatisLayout>
            </div>
          </Layout>
        </Link>
      </Container>
    </>
  )
}

export default ChoosePage

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 12.15rem;
`

const Layout = styled.div`
  display: flex;
  width: 26rem;
  height: 30rem;
  flex-shrink: 0;
  border-radius: 1rem;
  background: #faf8f8;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.17);
  transition: all 0.5s ease; /* 부드러운 전환 효과를 위한 추가 */

  &:hover {
    transform: scale(1.02); /* 커지는 효과 */
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.26); /* 그림자 강조 효과 */
  }
`

const TextLayout = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
  margin-left: 1.5rem;
  gap: 1.2rem;
`

const Text1 = styled.h1`
  color: #000;
  font-family: BM Jua;
  font-size: 2.2rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`

const Text2 = styled.h2`
  color: #b2b2b2;
  font-family: BM Jua;
  font-size: 1.3rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`

const BooksImage = styled.img`
  width: 18rem;
  height: 19rem;
`

const StatisticsImage = styled.img`
  width: 14rem;
  height: 14rem;
`

const BookLayout = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 3.4rem;
  margin-left: 6rem;
`

const StatisLayout = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 6rem;
`
