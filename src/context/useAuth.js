import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Correct import statement for jwt-decode
import axiosInstance from '../api/axios';

export const isTokenExpired = (token) => {
  try {
    const { exp } = jwtDecode(token);
    return exp ? (Date.now() / 1000) > exp : false;
  } catch (error) {
    console.error('Error decoding the token:', error);
    return true;
  }
};

export async function refreshAccessToken(refreshToken) {
  try {
    const response = await axiosInstance.post(
      'http://localhost:8080/api/auth/refresh-token?refreshToken=' + refreshToken
    );
    const { token } = response.data;
    localStorage.setItem('accessToken', token);
    return token;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    throw error; // Throw the error to be handled by the caller
  }
}

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('accessToken');
    return token && !isTokenExpired(token) ? jwtDecode(token) : null;
  });

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
    navigate('/login');
  };

  useEffect(() => {
    const checkToken = async () => {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');

      if (accessToken && !isTokenExpired(accessToken)) {
        setUser(jwtDecode(accessToken));
        try {
          const newAccessToken = await refreshAccessToken(refreshToken);
          if (newAccessToken) {
            setUser(jwtDecode(newAccessToken));
          } else {
            logout();
          }
        } catch (error) {
          console.error('Error while refreshing token:', error);
          logout();
        }
      }
      else if (refreshToken && !isTokenExpired(refreshToken)) {
        try {
          const newAccessToken = await refreshAccessToken(refreshToken);
          if (newAccessToken) {
            setUser(jwtDecode(newAccessToken));
          } else {
            logout();
          }
        } catch (error) {
          console.error('Error while refreshing token:', error);
          logout();
        }
      } else if (user) {
        logout();
      }
    };

    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const login = (userData, tokens) => {
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
    setUser(userData);
  };

  async function refreshAccessToken(refreshToken) {
    try {
      const response = await axiosInstance.post(
        `${process.env.REACT_APP_URL}refresh-token?refreshToken=` + refreshToken
      );
      const { token } = response.data;
      localStorage.setItem('accessToken', token);
      const userData = jwtDecode(token);
      setUser(userData); // Update the user state with the new token data
      return token;
    } catch (error) {
      console.error('Error refreshing access token:', error);
      throw error; // Throw the error to be handled by the caller
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser, refreshAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
