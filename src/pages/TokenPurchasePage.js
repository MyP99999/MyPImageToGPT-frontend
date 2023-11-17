import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { useAuth } from '../context/useAuth';
import axiosInstance from '../api/axios'; // Import your custom axios instance
import { redirect, useNavigate } from 'react-router-dom';

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
        <div>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
                        Amount of Tokens
                    </label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Amount of Tokens"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="amount"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Card Details
                    </label>
                    <div className="p-4 bg-gray-100 rounded">
                        <CardElement className="p-2 bg-white rounded shadow-inner" />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        disabled={!stripe || !elements}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Pay
                    </button>
                </div>
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
