import { BrowserRouter, Routes, Route } from 'react-router-dom'
import  LoginPage  from '../pages/login/LoginPage'
import ProtectedRoute from './ProtectedRoute'
import Dashboard from '../pages/dashboard/Dashboard'
import SidebarLayout from '../layouts/SidebarLayout'
import UserDetail from '../pages/user/UserDetail'
import UserList from '../pages/user/UserList'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<SidebarLayout />}>
            <Route path='/' element={<Dashboard />} />
            <Route path='/user/:id' element={<UserDetail />} />
            <Route path='/users' element={<UserList />} />
            <Route path='*' element={<div>404 Not Found</div>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
