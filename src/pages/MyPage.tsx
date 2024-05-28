import TabLayout from '../components/Tab/TabLayout'
import ReviewModal from '../components/Modal/ReviewModal'
import ReadingModal from '../components/Modal/ReadingModal'
import StarRate from '../components/shelf/StarRate'
import ReviewInput from '../components/Modal/ModalAtom/ReviewInput'
import { useState } from 'react'
import BookInfo from '../components/Modal/ModalAtom/BookInfo'
import StateBtn from '../components/Modal/ModalAtom/StateBtn'
import Bar from '../components/Modal/ModalAtom/Bar'

export default function MyPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(true)

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setIsReviewModalOpen(false)
  }

  return (
    <>
      {isModalOpen ? (
        <ReviewModal isOpen={isModalOpen} onClose={handleCloseModal}>
          <BookInfo />
          {/* <StarRate grade={3} /> */}
          <ReviewInput onTextChange={() => {}} />
        </ReviewModal>
      ) : (
        ''
      )}
      {isReviewModalOpen ? (
        <ReadingModal isOpen={isReviewModalOpen} onClose={handleCloseModal}>
          <BookInfo />
          <StateBtn />
          {/* <StarRate grade={3} /> */}
          <Bar />
        </ReadingModal>
      ) : (
        ''
      )}
      <TabLayout />
    </>
  )
}
