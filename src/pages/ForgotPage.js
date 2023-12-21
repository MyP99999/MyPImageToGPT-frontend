import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axiosInstance from '../api/axios';

const ForgotPage = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(email)
        try {
          const response = await axiosInstance.post(`/api/auth/forgot-password?email=${email}`)
          
          console.log(response)
          if (response.status === 200 || response.status === 201) { // Check for successful response status
            alert("You have received an email to reset your password!")
          } else {
            // Handle errors, show messages to user
            console.error('Registration failed');
          }
        } catch (error) {
          console.error('Registration error:', error);
          alert('An error occurred during reseting.');
        }
      };

    const formVariants = {
        hidden: { opacity: 0, y: -100 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        exit: { opacity: 0, y: 100, transition: { duration: 0.3 } }
      };
    
      return (
        <motion.div
          className="min-h-screen bg-slate-700 flex flex-col justify-center"
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            className="max-w-md w-full mx-auto rounded-md bg-slate-900 text-white border-gray-300 shadow-lg"
            variants={formVariants}
          >
            <div className="text-3xl font-bold text-white mt-8 text-center">Forgot Password</div>
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
                    <p className='italic'>You already have an account?</p>
                    <Link to='/login' className='font-bold text-blue-600 cursor-pointer'>Login</Link>
                  </div>
                  <div>
                    <button type="submit" className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm">Submit</button>
                  </div>
                </div>
              </form>
             
            </div>
          </motion.div>
        </motion.div >
      );
}

export default ForgotPage