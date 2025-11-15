import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

function Layout() {
  return (
    <>
      <Header />
      <Outlet />  {/* This renders the child routes */}
      <Footer />
    </>
  )
}

export default Layout