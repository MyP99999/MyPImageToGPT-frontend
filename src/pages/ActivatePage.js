import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const ActivatePage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    useEffect(() => {
        const activateAccount = async () => {
            const token = searchParams.get('token');
            if (!token) {
                setMessage('error: Invalid activation link');
                return;
            }

            try {
                // Call the activation API using Axios with async/await
                const response = await axios.get(`http://localhost:8080/api/auth/activate?token=${token}`);
                setMessage(response.data.message || 'Your account has been successfully activated.');
                // Redirect after a delay
                setTimeout(() => navigate('/login'), 3000);
            } catch (error) {
                console.error('error:', error);
                setMessage('There was an error activating your account.');
            }
        };

        activateAccount();
    }, [searchParams, navigate]);


    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-200">
            <div className="max-w-md w-full bg-white shadow-md rounded px-8 py-10 mb-4">
                <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Account Activation</h1>
                <p className={`text-center font-bold text-xl ${message.includes('error') ? 'text-red-500' : 'text-green-500'}`}>
                    {message}
                </p>
                {message.includes('error') &&
                    <h1 className='text-center mt-4 text-xl flex justify-center items-center gap-2'>
                        Go to <h1 className='text-2xl text-blue-600 font-bold underline hover:scale-105 hover:text-blue-800 transform transition duration-300'>
                            <Link to='/register'>
                                Register
                            </Link>
                        </h1>
                    </h1>
                }
            </div>
        </div>
    );

};

export default ActivatePage;
