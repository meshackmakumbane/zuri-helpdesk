import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import GetStarted from './features/onboarding/GetStarted'
import VerifyEmail from './features/onboarding/VerifyEmail'
import Login from './features/auth/Login'
import ResetPassword from './features/auth/ResetPassword'
import ForgotPassword from './features/auth/ForgotPassword'

export const App = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/get-started" element={<GetStarted />} />
      <Route path="verify-email" element={<VerifyEmail />} />
      <Route path='auth/login' element={<Login />} />

      <Route path='/reset-password' element={<ResetPassword />}/>
      <Route path='/forgot-password' element={< ForgotPassword />} />
    </Routes>
  )
}
