import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { jwtDecode } from 'jwt-decode'; // Corrected import statement
import axiosInstance from '../api/axios'; // Import your custom axios instance

const GooglePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { login } = useAuth();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const code = queryParams.get('code');
    
        if (code) {
          axiosInstance.post(`/api/auth/google?code=${encodeURIComponent(code)}`)
            .then(response => {
              const data = response.data;
              if (data.token) {
                const user = jwtDecode(data.token); // Decode the JWT token
                login(user, { accessToken: data.token, refreshToken: data.refreshToken });
                navigate('/'); // Navigate to the home page or dashboard
              } else {
                navigate('/login'); // Navigate to login on failure
              }
            })
            .catch(error => {
              console.error('Error:', error);
              navigate('/login'); // Navigate to login on error
            });
        } else {
          navigate('/login'); // Redirect to login if no code is present
        }
      }, [location, navigate, login]);

    return <h1>asdasdasd</h1>;
};

export default GooglePage;
