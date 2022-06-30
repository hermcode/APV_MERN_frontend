import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AuthLayout from './layout/AuthLayout'
import ProtectedRoute from './layout/ProtectedRoute'

import Login from './pages/Login'
import Register from './pages/Register'
import ConfirmAccount from './pages/ConfirmAccount'
import ForgotPassword from './pages/ForgotPassword'
import NewPassword from './pages/NewPassword'
import ManagePatients from './pages/ManagePatients'
import Profile from './pages/Profile'

import { AuthProvider } from './context/AuthProvider'
import { PatientsProvider } from './context/PatientsProvider'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PatientsProvider>
          <Routes>
            <Route path='/' element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path='register' element={<Register />} />
              <Route path='confirm/:token' element={<ConfirmAccount />} />
              <Route path='forgot-password' element={<ForgotPassword />} />
              <Route path='forgot-password/:token' element={<NewPassword />} />
            </Route>

            <Route path="/admin" element={ <ProtectedRoute />}>
              <Route index element={ <ManagePatients /> } />
              <Route path='profile' element={ <Profile /> } />
            </Route>
          </Routes>
        </PatientsProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
