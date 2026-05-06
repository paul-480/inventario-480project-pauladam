
import { SidebarProvider, SidebarTrigger} from '../components/ui/sidebar'
import { Outlet } from 'react-router-dom'
import AppSidebar from '../components/common/AppSidebar'
import { useIsMobile } from '@/hooks/use-mobile'

const SidebarLayout = () => {
  const isMobile = useIsMobile();
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        {isMobile && <SidebarTrigger className='ml-auto' />}

        <Outlet />
      </main>
    </SidebarProvider>
  )
}

export default SidebarLayout
