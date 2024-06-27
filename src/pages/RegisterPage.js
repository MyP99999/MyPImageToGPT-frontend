import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axios'; // Import your custom axios instance
import { motion } from 'framer-motion';
import google from '../assets/google.png'
import Sidebar from '../components/about/Sidebar';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosInstance.post(`/api/auth/register`, {
        username,
        email,
        password
      });
      if (response.status === 200 || response.status === 201) { // Check for successful response status
        alert("You have received an email to activate the account!")
      } else {
        // Handle errors, show messages to user
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('An error occurred during registration.');
    }
  };

  
  const handleGoogleLogin = () => {
    window.location.href = `${process.env.REACT_APP_URL}oauth2/authorization/google`;
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
        <div className="text-3xl font-bold text-white text-center">Register</div>
        <div className="p-8">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label htmlFor="email" className="text-sm font-bold block">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-white p-2 bg-slate-900 border border-gray-300 rounded mt-1"
                  required
                />
              </div>
              <div>
                <label htmlFor="username" className="text-sm font-bold block">Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full text-white p-2 bg-slate-900 border border-gray-300 rounded mt-1"

                />
              </div>
              <div>
                <label htmlFor="password" className="text-sm font-bold block">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-white p-2 bg-slate-900 border border-gray-300 rounded mt-1"
                  required
                />
              </div>
              <div>
                <p className='italic'>You already have an account?</p>
                <Link to='/login' className='font-bold text-blue-600 cursor-pointer'>Login</Link>
              </div>
              <div>
                <button type="submit" className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm">Register</button>
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
      <Sidebar />
      <motion.div className="absolute text-[50vh] bottom-[-120px] whitespace-nowrap text-[#ffffff09] w-1/2 font-bold pointer-events-none" variants={sliderVariants} initial="initial" animate="animate">
        MyP Image to GPT
      </motion.div>
    </motion.div >
  );
};

export default RegisterPage;
