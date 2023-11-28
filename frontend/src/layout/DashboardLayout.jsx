// React router
import { Outlet } from 'react-router-dom'
// 
import DashboardNavbar from '../components/DashboardNavbar/DashboardNavbar'
import DashboardSidebar from '../components/DashboardSidebar/DashboardSidebar'

export default function DashboardLayout() {
  return (
    <>
        <DashboardNavbar />

        <div className='d-flex'>
            <DashboardSidebar />
            <Outlet />
        </div>
    </>
  )
}
