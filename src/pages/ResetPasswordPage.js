import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axiosInstance from '../api/axios';
import { motion } from 'framer-motion';

const ResetPasswordPage = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }
        try {
            const response = await axiosInstance.post(`${process.env.REACT_APP_URL}api/auth/reset-password`, {
                token,
                newPassword: password
            });
            console.log(response)
            if (response.status === 200 || response.status === 201) {
                alert("Password reset successfully.");
            } else {
                console.error('Reset failed');
            }
        } catch (error) {
            console.error('Reset error:', error);
            alert('An error occurred during password reset.');
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
            <div className="text-3xl font-bold text-white mt-8 text-center">Reset You Password</div>
            <div className="p-8">
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="password" className="text-sm font-bold block">New Password</label>
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
                    <label htmlFor="confirm" className="text-sm font-bold block">Confirm Password</label>
                    <input
                      type="password"
                      id="confirm"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full text-white p-2 bg-slate-900 border border-gray-300 rounded mt-1"
                      required
                    />
                  </div>

                  <div>
                    <p className='italic'>You already have an account?</p>
                    <Link to='/login' className='font-bold text-blue-600 cursor-pointer'>Login</Link>
                  </div>
                  <div>
                    <button type="submit" className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm">Reset</button>
                  </div>
                </div>
              </form>
             
            </div>
          </motion.div>
        </motion.div >
      );
}

export default ResetPasswordPage;
