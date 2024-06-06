import StateBtn from '../components/Modal/ModalAtom/StateBtn'
import Bar from '../components/Modal/ModalAtom/Bar'
import { MyProvider, useMyContext } from '../components/Context/MyContext'
import TabLayout from '../components/Tab/TabLayout'
import ReadingModal from '../components/Modal/Modal'
import BookInfo from '../components/Modal/ModalAtom/BookInfo'
import ReviewInput from '../components/Modal/ModalAtom/ReviewInput'
import StarRating from '../components/Modal/ModalAtom/StarRating'

const MyPageContent = () => {
  const { activeTab, isModalOpen, selectedBook, setIsModalOpen } = useMyContext()

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }
  console.log(activeTab)

  return (
    <>
      {isModalOpen && (
        <ReadingModal onClose={handleCloseModal}>
          <BookInfo book={selectedBook} />

          {activeTab === 'reading' && (
            <>
              <StateBtn />
              <Bar percentages={50} />
            </>
          )}

          {activeTab === 'read' && (
            <>
              <StarRating />
              <ReviewInput onTextChange={() => {}} />
            </>
          )}
        </ReadingModal>
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
