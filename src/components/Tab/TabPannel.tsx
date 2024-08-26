// import { useContext } from 'react'
// import { TabContext } from './TabLayout'
// import { TabId } from './TabLayout'
// import { ReactNode } from 'react'

// interface TabPannelProps {
//   id: TabId
//   children: ReactNode
// }

// const TabPannel = ({ id, children }: TabPannelProps) => {
//   const { selectedId } = useContext(TabContext)
//   return selectedId === id ? (
//     <div className="max-w-[94.5rem] flex justify-center ">{children}</div>
//   ) : null
// }

import { useMyContext } from '../Context/MyContext'

interface TabPannelProps {
  id: string
  children: React.ReactNode
}

const TabPannel = ({ id, children }: TabPannelProps) => {
  const { activeTab } = useMyContext()

  return activeTab === id ? (
    <div className="max-w-[93.5rem] flex justify-center">{children}</div>
  ) : null
}

export default TabPannel
