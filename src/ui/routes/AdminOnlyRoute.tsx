import { useAuth } from '@/application/auth/useAuth'
import { Outlet } from 'react-router-dom'


const AdminOnlyRoute = () => {
    const { isAdmin } = useAuth()
    if (!isAdmin) {
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-2">Acceso Denegado</h2>
        <p className="text-gray-600 dark:text-gray-400">No tienes permisos para ver esta página</p>
      </div>
    }
    return (
    <Outlet/>
  )
}

export default AdminOnlyRoute