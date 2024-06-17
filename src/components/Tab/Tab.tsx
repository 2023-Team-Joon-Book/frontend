import { useMyContext } from '../Context/MyContext'

interface TabProps {
  label: string
  id: string
}

const Tab = ({ label, id }: TabProps) => {
  const { activeTab, setActiveTab } = useMyContext()
  const tabStyle = activeTab === id ? 'font-bold' : ''

  return (
    <div
      className={`ml-24 text-lg cursor-pointer ${tabStyle} mx-[1rem]`}
      onClick={() => setActiveTab(id)}>
      {label}
    </div>
  )
}

export default Tab
