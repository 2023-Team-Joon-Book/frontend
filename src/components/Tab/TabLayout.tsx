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
  return (
    <>
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
    </>
  )
}

export default TabLayout
