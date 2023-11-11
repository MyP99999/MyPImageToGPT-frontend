import React from 'react';
import MainPage from './pages/MainPage';
import { Routes, Route, Navigate } from 'react-router-dom';
import Missing from './components/Missing';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { useAuth } from './context/useAuth';
import GooglePage from './pages/GooglePage';

const App = () => {
  const { user } = useAuth();

console.log(user)

  return (
    <div>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path="/login/oauth2/code/google" element={<GooglePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path="*" element={<Missing />} />
      </Routes>
    </div>
  );
}

export default App;
