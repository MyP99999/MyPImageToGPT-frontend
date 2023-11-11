import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { jwtDecode } from 'jwt-decode'; // Corrected import statement

const GooglePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { login } = useAuth();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const code = queryParams.get('code');
        console.log("code:" + code)
        if (code) {
            // Send the code as a query parameter
            fetch(`http://localhost:8080/api/auth/google?code=${encodeURIComponent(code)}`, {
                method: 'POST',
            })
                .then(response => response.json())
                .then(data => {
                    if (data.token) {
                        const user = jwtDecode(data?.token); // Corrected usage
                        login(user);
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
