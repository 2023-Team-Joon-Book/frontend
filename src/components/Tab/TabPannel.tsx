import { useContext } from 'react'
import { TabContext } from './TabLayout'
import { TabId } from './TabLayout'
import { ReactNode } from 'react'

interface TabPannelProps {
  id: TabId
  children: ReactNode
}

const TabPannel = ({ id, children }: TabPannelProps) => {
  const { selectedId } = useContext(TabContext)
  return selectedId === id ? (
    <div className="max-w-[94.5rem] flex justify-center ">{children}</div>
  ) : null
}
export default TabPannel
