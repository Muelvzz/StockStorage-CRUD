import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Create from './Create'
import Dashboard from './Dashboard'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />}/>
        <Route path='/create' element={<Create />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
