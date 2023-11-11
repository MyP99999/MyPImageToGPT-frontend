import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { jwtDecode } from 'jwt-decode'; // Corrected import statement

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/auth/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        const user = jwtDecode(data?.token); // Corrected usage
        login(user);
        navigate('/');
      } else {
        throw new Error(data.message || 'Error logging in');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert(error.message);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  };

  return (
    <div className="min-h-screen bg-blue-700 flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto rounded-md bg-white border-gray-300 ">
        <div className="text-3xl font-bold text-gray-900 mt-8 text-center">Login</div>
        <div className="p-8">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label htmlFor="username" className="text-sm font-bold text-gray-600 block">Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                />
              </div>
              <div>
                <label htmlFor="password" className="text-sm font-bold text-gray-600 block">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                />
              </div>
              <div>
                <p className='italic'>Don't you have an account?</p>
                <Link to='/register' className='font-bold text-blue-600 cursor-pointer'>Register</Link>
              </div>
              <div>
                <button type="submit" className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm">Sign In</button>
              </div>
            </div>
          </form>
          <button
            onClick={handleGoogleLogin}
            className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 rounded-md text-white text-sm mt-4"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
