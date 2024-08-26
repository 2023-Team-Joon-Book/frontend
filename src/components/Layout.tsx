const Layout = ({ children }) => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[1324px]">{children}</div>
    </div>
  )
}

export default Layout
