import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { jwtDecode } from 'jwt-decode'; // Corrected import statement
import axiosInstance from '../api/axios'; // Import your custom axios instance
import google from '../assets/google.png'
import { motion } from 'framer-motion';
import Sidebar from '../components/about/Sidebar'

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/api/auth/authenticate', {
        username: email,
        password
      });
      const data = response.data;
      const user = jwtDecode(data.token); // Decode JWT to get user data
      login(user, { accessToken: data.token, refreshToken: data.refreshToken });
      navigate('/');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error logging in';
      console.error('Login error:', errorMessage);
      alert(errorMessage);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `https://mypimagetogpt-mypimagetogpt.azuremicroservices.io/oauth2/authorization/google`;
  };

  const formVariants = {
    hidden: { opacity: 0, y: -100 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: 100, transition: { duration: 0.3 } }
  };

  const sliderVariants = {
    initial: {
      x: 0,
    },
    animate: {
      x: "-220%",
      transition: {
        repeat: Infinity,
        repeatType: "mirror",
        duration: 15,
      }
    }
  }

  return (
    <motion.div
      className="min-h-screen bg-slate-700 flex flex-col justify-center overflow-hidden relative bg-gradient-to-b from-[#0c0c1d] to-[#111132]"
      initial="hidden"
      animate="visible"
      exit="exit"
    >

      <motion.div
        className="max-w-md w-full mx-auto rounded-md bg-slate-900 text-white border-gray-300 shadow-lg"
        variants={formVariants}
      >
        <div className='w-full flex items-center p-2 justify-center h-full'>
          <img src='/logo.png' className='w-20' alt="Logo" />
        </div>
        <div className="text-3xl font-bold text-white text-center">Login</div>
        <div className="p-8">
          <form onSubmit={handleSubmit}>
            <div className="space-y-2">
              <div>
                <label htmlFor="email" className="text-sm font-bold block">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder='email'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-white p-2 bg-slate-900 border border-gray-300 rounded mt-1"
                />
              </div>
              <div>
                <label htmlFor="password" className="text-sm font-bold block">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder='password'
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-white p-2 bg-slate-900 border border-gray-300 rounded mt-1"
                />
              </div>
              <div>
                <p className='italic'>Don't you have an account?</p>
                <Link to='/register' className='font-bold text-blue-600 cursor-pointer hover:text-blue-800 transition-all duration-300 ease-in-out'>Register</Link>
              </div>
              <div className='text-right'>
                <Link to='/forgot' className='italic text-blue-600 cursor-pointer hover:text-blue-800 transition-all duration-300 ease-in-out'>Forgot Password?</Link>
              </div>
              <div>
                <button type="submit" className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm">Sign In</button>
              </div>
            </div>
          </form>
          <div className='text-center flex flex-col items-center justify-center gap-2 mt-2'>
            <h1>Or</h1>
            <h1>
              Sign in with Google
            </h1>
            <button
              onClick={handleGoogleLogin}
              className=""
            >
              <img src={google} className='w-8 h-8 hover:scale-110 transition-all duration-300 ease-in-out' alt="google" />
            </button>
          </div>
        </div>
      </motion.div>
      {/* <Sidebar /> */}
      <motion.div className="absolute text-[50vh] bottom-[-120px] whitespace-nowrap text-[#ffffff09] w-1/2 font-bold pointer-events-none" variants={sliderVariants} initial="initial" animate="animate">
        MyP Image to GPT
      </motion.div>
    </motion.div >
  );
};

export default LoginPage;
