import { createContext, useContext, useState, ReactNode } from 'react'

interface AppContextType {
  activeTab: string
  setActiveTab: (tab: string) => void
  isModalOpen: boolean
  setIsModalOpen: (open: boolean) => void
  selectedBook: any
  setSelectedBook: (book: any) => void
  review: any
  setReview: (review: any) => void
}

const MyContext = createContext<AppContextType | undefined>(undefined)

export const MyProvider = ({ children }: { children: ReactNode }) => {
  const [activeTab, setActiveTab] = useState('reading')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedBook, setSelectedBook] = useState(null)
  const [review, setReview] = useState(null)

  return (
    <MyContext.Provider
      value={{
        activeTab,
        setActiveTab,
        isModalOpen,
        setIsModalOpen,
        selectedBook,
        setSelectedBook,
        review,
        setReview,
      }}>
      {children}
    </MyContext.Provider>
  )
}

export const useMyContext = () => {
  const context = useContext(MyContext)
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}
