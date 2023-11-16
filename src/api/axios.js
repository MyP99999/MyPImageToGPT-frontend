import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // Your backend base URL
});

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');
      // Call your refresh token function here
      const newAccessToken = await refreshAccessToken(refreshToken);
      if (newAccessToken) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + newAccessToken;
        return axiosInstance(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

async function refreshAccessToken(refreshToken) {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/refresh-token', { refreshToken });
      const { accessToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
      return accessToken;
    } catch (error) {
      console.error('Error refreshing access token:', error);
      // Redirect to login or handle error
    }
  }
  