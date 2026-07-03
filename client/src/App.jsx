import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import GetStarted from './features/onboarding/GetStarted'
import VerifyEmail from './features/onboarding/VerifyEmail'

export const App = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/get-started" element={<GetStarted />} />
      <Route path="verify-email" element={<VerifyEmail />} />
    </Routes>
  )
}
