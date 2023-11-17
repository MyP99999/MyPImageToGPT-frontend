import { jwtDecode } from 'jwt-decode';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const token = localStorage.getItem('accessToken');
      return token ? jwtDecode(token) : null;
    } catch (error) {
      console.error('Error decoding the access token:', error);
      return null;
    }
  });
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      try {
        const userData = jwtDecode(accessToken); // Decode your token to get user data
        setUser(userData); // Set the user data from the token
      } catch (error) {
        console.error('Error decoding the access token:', error);
        // Handle token decode error (e.g., token expired)
      }
    }
  }, [navigate]);

  const login = (userData, tokens) => {
    localStorage.setItem('accessToken', tokens.accessToken);
    if (tokens?.refreshToken) {
      localStorage.setItem('refreshToken', tokens.refreshToken);
    }
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
