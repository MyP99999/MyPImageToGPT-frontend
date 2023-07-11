import React from 'react'
import MainPage from './pages/MainPage'
import { Routes, Route } from 'react-router-dom';
import Missing from './components/Missing';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path="*" element={<Missing />} />
      </Routes>
    </div>
  )
}

export default App