import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import ChatContainer from './chat/ChatContainer'

export const App = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/chat" element={<ChatContainer />} />
    </Routes>
  )
}
