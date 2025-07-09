import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

export default function Layout() {
  return (
    <div className="bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen transition-colors duration-300">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}
