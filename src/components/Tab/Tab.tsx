import { useCallback, useContext } from 'react'
import { TabContext } from './TabLayout'
import { TabId } from './TabLayout'

interface TabProps {
  label: string
  id: TabId
}

const Tab = ({ label, id }: TabProps) => {
  const { selectedId, setSelectedId } = useContext(TabContext)

  const tabStyle = selectedId === id ? 'font-bold' : ''

  const handleClickTab = useCallback(() => {
    if (selectedId === id) return
    setSelectedId(id)
  }, [id, selectedId, setSelectedId])

  return (
    <div className={`ml-24 text-lg cursor-pointer ${tabStyle} mx-[1rem]`} onClick={handleClickTab}>
      {label}
    </div>
  )
}
export default Tab
