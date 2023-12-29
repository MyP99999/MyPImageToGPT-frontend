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
import ForgotPage from './pages/ForgotPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import AboutPage from './pages/AboutPage';

const App = () => {
  
  const { user } = useAuth();

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/about" replace />;
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
    <div>
      <Routes>
        <Route path='/' element={<ProtectedRoute><MainPage /></ProtectedRoute>} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/activate' element={<ActivatePage />} />
        <Route path='/reset-password' element={<ResetPasswordPage />} />
        <Route path="/login/oauth2/code/google" element={<GooglePage />} />
        <Route path="/history/:id" element={<ProtectedRoute><HistoryDetails /></ProtectedRoute>} />
        <Route path='/login' element={<RedirectIfLoggedIn><LoginPage /></RedirectIfLoggedIn>} />
        <Route path='/register' element={<RedirectIfLoggedIn><RegisterPage /></RedirectIfLoggedIn>} />
        <Route path='/forgot' element={<RedirectIfLoggedIn><ForgotPage /></RedirectIfLoggedIn>} />
        <Route path='/checkout' element={<ProtectedRoute><TokenPurchasePage /></ProtectedRoute>} />
        <Route path="*" element={<Missing />} />
      </Routes>
    </div>
  );
}

export default App;
