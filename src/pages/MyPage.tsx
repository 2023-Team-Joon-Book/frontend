import StateBtn from '../components/Modal/ModalAtom/StateBtn'
import Bar from '../components/Modal/ModalAtom/Bar'
import { MyProvider, useMyContext } from '../components/Context/MyContext'
import TabLayout from '../components/Tab/TabLayout'
import Modal from '../components/Modal/Modal'
import BookInfo from '../components/Modal/ModalAtom/BookInfo'
import ReviewInput from '../components/Modal/ModalAtom/ReviewInput'
import StarRating from '../components/Modal/ModalAtom/StarRating'

const MyPageContent = () => {
  const { activeTab, isModalOpen, selectedBook, setIsModalOpen, setGrading, setText, setIsActive } =
    useMyContext()

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setGrading(0)
    setText('')
    setIsActive(true)
  }

  return (
    <>
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <BookInfo book={selectedBook} />

          {activeTab === 'reading' && (
            <>
              <StateBtn />
              <Bar book={selectedBook} />
            </>
          )}

          {activeTab === 'read' && (
            <>
              <StarRating />
              <ReviewInput />
            </>
          )}
        </Modal>
      )}
      <TabLayout />
    </>
  )
}

export default function MyPage() {
  return (
    <MyProvider>
      <MyPageContent />
    </MyProvider>
  )
}
