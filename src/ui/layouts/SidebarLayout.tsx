
import { SidebarProvider, SidebarTrigger } from '../components/ui/sidebar'
import { Outlet } from 'react-router-dom'
import AppSidebar from '../components/common/AppSidebar'

const SidebarLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  )
}

export default SidebarLayout
