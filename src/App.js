import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainPage from './pages/MainPage';
import Missing from './components/Missing';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import GooglePage from './pages/GooglePage';
import ActivatePage from './pages/ActivatePage';
import TokenPurchasePage from './pages/TokenPurchasePage';
import { useAuth } from './context/useAuth';
import Navbar from './components/Navbar';
import HistoryDetails from './components/HistoryDetails';

const App = () => {
  
  const { user } = useAuth();

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    return (
      <>
        <Navbar />
        {children}
      </>
    )
  };

  const RedirectIfLoggedIn = ({ children }) => {
    if (user) {
      return <Navigate to="/" replace />;
    }
    return children;
  };


  return (
    <div className='bg-gray-300'>
      <Routes>
        <Route path='/' element={<ProtectedRoute><MainPage /></ProtectedRoute>} />
        <Route path='/activate' element={<ActivatePage />} />
        <Route path="/login/oauth2/code/google" element={<GooglePage />} />
        <Route path="/history/:id" element={<ProtectedRoute><HistoryDetails /></ProtectedRoute>} />
        <Route path='/login' element={<RedirectIfLoggedIn><LoginPage /></RedirectIfLoggedIn>} />
        <Route path='/register' element={<RedirectIfLoggedIn><RegisterPage /></RedirectIfLoggedIn>} />
        <Route path='/checkout' element={<ProtectedRoute><TokenPurchasePage /></ProtectedRoute>} />
        <Route path="*" element={<Missing />} />
      </Routes>
    </div>
  );
}

export default App;
