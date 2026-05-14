
import { SidebarProvider, SidebarTrigger} from '../components/ui/sidebar'
import { Outlet } from 'react-router-dom'
import AppSidebar from '../components/common/AppSidebar'
import { useIsMobile } from '@/ui/hooks/use-mobile'

const SidebarLayout = () => {
  const isMobile = useIsMobile();
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className='container p-4 md:p-8 max-w-7xl mx-auto space-y-6'>
        {isMobile && <SidebarTrigger className='ml-0 sticky' />}

        <Outlet />
      </main>
    </SidebarProvider>
  )
}

export default SidebarLayout
