import { createContext, useContext, useState, ReactNode } from 'react'

interface AppContextType {
  activeTab: string
  setActiveTab: (tab: string) => void
  isModalOpen: boolean
  setIsModalOpen: (open: boolean) => void
  selectedBook: any
  setSelectedBook: (book: any) => void
  review: string | null
  setReview: (review: any) => void
  grading: number
  setGrading: (grading: number) => void
  text: string
  setText: (text: string) => void
  newLastPage: number
  setNewLastPage: (newLastPage: number) => void
  isEditing: boolean
  setIsEditing: (isEditing: boolean) => void
  isActive: boolean
  setIsActive: (isActive: boolean) => void
  percentages: number
  setPercentages: (percentages: number) => void
}

const MyContext = createContext<AppContextType | undefined>(undefined)

export const MyProvider = ({ children }: { children: ReactNode }) => {
  const active = localStorage.getItem('activeTab')

  const [activeTab, setActiveTab] = useState(active || 'reading')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedBook, setSelectedBook] = useState(null)
  const [review, setReview] = useState(null)
  const [grading, setGrading] = useState(0)
  const [text, setText] = useState('')
  const [newLastPage, setNewLastPage] = useState(0)
  const [isEditing, setIsEditing] = useState(false)
  const [isActive, setIsActive] = useState(true)
  const [percentages, setPercentages] = useState(0)

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
        grading,
        setGrading,
        text,
        setText,
        newLastPage,
        setNewLastPage,
        isEditing,
        setIsEditing,
        isActive,
        setIsActive,
        percentages,
        setPercentages,
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
