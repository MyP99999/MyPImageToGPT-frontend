// src/pages/TokenPurchasePage.js

import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const CheckoutForm = () => {
    console.log(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
    const stripe = useStripe();
    const elements = useElements();
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            // Call your backend to create the PaymentIntent
            const response = await fetch('http://localhost:8080/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: amount }) // Amount in cents
            });
            const clientSecret = await response.text(); // Get the client secret as text

            // Confirm the payment with the card details
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: { card: elements.getElement(CardElement) }
            });
            console.log(result)
            if (result.error) {
                // Handle errors here
                setError(result.error.message);
            } else {
                if (result.paymentIntent.status === 'succeeded') {
                    console.log("success")
                }
            }
        } catch (error) {
            // Handle errors here
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
