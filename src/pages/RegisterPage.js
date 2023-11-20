import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axios'; // Import your custom axios instance
import { motion } from 'framer-motion';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosInstance.post('/api/auth/register', {
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

  const formVariants = {
    hidden: { opacity: 0, y: -100 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: 100, transition: { duration: 0.3 } }
  };

  return (
    <motion.div
      className="min-h-screen bg-blue-700 flex flex-col justify-center"
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        className="max-w-md w-full mx-auto rounded-md bg-white border-gray-300 shadow-lg"
        variants={formVariants}
      >
        <div className="text-3xl font-bold text-gray-900 mt-8 text-center">Register</div>
        <div className="p-8">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label htmlFor="email" className="text-sm font-bold text-gray-600 block">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  required
                />
              </div>
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
        </div>
      </motion.div>
    </motion.div >
  );
};

export default RegisterPage;
