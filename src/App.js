import React from 'react';
import MainPage from './pages/MainPage';
import { Routes, Route, Navigate } from 'react-router-dom';
import Missing from './components/Missing';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { useAuth } from './context/useAuth';

const App = () => {
  const { user } = useAuth();

  console.log(user?.sub)


  return (
    <div>
      <Routes>
        <Route path='/' element={user ? <MainPage /> : <Navigate to="/login" replace />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path="*" element={<Missing />} />
      </Routes>
    </div>
  );
}

export default App;
