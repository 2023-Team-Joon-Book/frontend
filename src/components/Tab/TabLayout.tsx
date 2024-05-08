import { createContext, useState } from 'react'
import ReadBook from './Pannels/ReadBooks'
import ReadingBook from './Pannels/ReadingBooks'
import WishList from './Pannels/WishList'
import Tab from './Tab'
import TabPannel from './TabPannel'

export type TabId = 'reading' | 'whishlist' | 'read'

const mapTabIdToComponent: Record<TabId, () => JSX.Element> = {
  reading: () => <ReadingBook />,
  whishlist: () => <WishList />,
  read: () => <ReadBook />,
}

interface TabContextType {
  selectedId: TabId | ''
  setSelectedId: (id: TabId) => void
}

export const TabContext = createContext<TabContextType>({
  selectedId: '',
  setSelectedId: () => {},
})

interface TabMenu {
  label: string
  id: TabId
}

const tabMenus: TabMenu[] = [
  { label: '읽고 있는 책', id: 'reading' },
  { label: '읽고 싶은 책', id: 'whishlist' },
  { label: '읽은 책', id: 'read' },
]

const TabLayout = () => {
  const [selectedId, setSelectedId] = useState<TabId | ''>(tabMenus[0].id)

  const contextValue = {
    selectedId,
    setSelectedId,
  }

  return (
    <>
      <TabContext.Provider value={contextValue}>
        <div className="flex items-center w-screen h-[4rem] border border-x-gray-500">
          {tabMenus.map((tabProps, index) => (
            <Tab key={`tab-${index}`} {...tabProps} />
          ))}
        </div>
        {tabMenus.map(({ id }, index) => (
          <TabPannel key={`tabpannel-${index}`} id={id}>
            {mapTabIdToComponent[id]()}
          </TabPannel>
        ))}
      </TabContext.Provider>
    </>
  )
}

export default TabLayout
