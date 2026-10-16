import { Outlet } from 'react-router'
import Navbar from '../navigation/Navbar'
import ScrollToHash from './ScrollToHash'

/** Shared shell around every page: the nav pill, the page itself, and anchor scrolling. */
export default function SiteLayout() {
  return (
    <>
      <ScrollToHash />
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  )
}
