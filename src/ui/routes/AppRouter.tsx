import { BrowserRouter, Routes, Route } from 'react-router-dom'
import  LoginPage  from '../pages/login/LoginPage'
import ProtectedRoute from './ProtectedRoute'
import Dashboard from '../pages/dashboard/Dashboard'
import SidebarLayout from '../layouts/SidebarLayout'
import UserDetail from '../pages/user/UserDetail'
import UserList from '../pages/user/UserList'
import AdminOnlyRoute from './AdminOnlyRoute'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<SidebarLayout />}>
            <Route path='/' element={<Dashboard />} />
            <Route path='/users' element={<UserList />} />
            <Route path='*' element={<div>404 Not Found</div>} />
            <Route element={<AdminOnlyRoute/>}>
            <Route path='/user/:id' element={<UserDetail paramUser={null}/>} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
