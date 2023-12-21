import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { useAuth } from '../context/useAuth';
import axiosInstance from '../api/axios'; // Import your custom axios instance
import { useNavigate } from 'react-router-dom';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const { user, setUser } = useAuth()
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await axiosInstance.post('/create-payment-intent', {
                amount: amount,
                userId: user?.id
            });

            const { clientSecret, newToken } = response.data; // Destructure response data

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: { card: elements.getElement(CardElement) }
            });

            if (result.error) {
                setError(result.error.message);
            } else {
                if (result.paymentIntent.status === 'succeeded') {
                    localStorage.setItem('accessToken', newToken);
                    setUser({ ...user });
                    navigate("/");
                }
            }
        } catch (error) {
            setError(error.message);
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-slate-800 text-white flex justify-center items-center">
            {loading && <div className="text-lg text-blue-300">Loading...</div>}
            {error && <div className="text-red-500 text-lg mb-4">{error}</div>}
            <form onSubmit={handleSubmit} className="w-full max-w-lg p-8 bg-slate-900 rounded-lg shadow-md">
                <div className="mb-6">
                    <label className="block text-xl font-semibold mb-2" htmlFor="amount">
                        Amount of Tokens
                    </label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount"
                        className="w-full px-4 py-2 text-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        id="amount"
                    />
                </div>

                <div className="mb-8">
                    <label className="block text-xl font-semibold mb-2">
                        Card Details
                    </label>
                    <CardElement className="p-4 bg-white text-gray-700 rounded" />
                </div>

                <div className='flex justify-end mr-2 mb-8'>
                    <h2>Price: {amount}<span>$</span></h2>
                </div>
                <button
                    type="submit"
                    disabled={!stripe || !elements}
                    className={`w-full text-lg py-2 rounded font-semibold transition-colors ${stripe && elements ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-400"
                        }`}
                >
                    Pay
                </button>
            </form>
        </div>
    );
};

const TokenPurchasePage = () => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    );
};

export default TokenPurchasePage;
