import { useAuth } from '@/application/auth/useAuth'
import { Navigate, Outlet } from 'react-router-dom'


const ProtectedRoute = () => {
    const { isAuthenticated, isLoading } = useAuth()
    if (isLoading) return null;
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />
    }
    return (
    <Outlet/>
  )
}

export default ProtectedRoute
