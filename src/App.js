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

const App = () => {
  const { user } = useAuth();

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    return children;
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
        <Route path='/activate' element={<ActivatePage />} />
        <Route path="/login/oauth2/code/google" element={<GooglePage />} />
        <Route path='/login' element={<RedirectIfLoggedIn><LoginPage /></RedirectIfLoggedIn>} />
        <Route path='/register' element={<RedirectIfLoggedIn><RegisterPage /></RedirectIfLoggedIn>} />
        <Route path='/checkout' element={<ProtectedRoute><TokenPurchasePage /></ProtectedRoute>} />
        <Route path="*" element={<Missing />} />
      </Routes>
    </div>
  );
}

export default App;
