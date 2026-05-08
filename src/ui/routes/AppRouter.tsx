import { BrowserRouter, Routes, Route } from 'react-router-dom'
import  LoginPage  from '../pages/login/LoginPage'
import ProtectedRoute from './ProtectedRoute'
import Dashboard from '../pages/dashboard/Dashboard'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
