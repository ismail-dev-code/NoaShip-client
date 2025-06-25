import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import PaymentForm from './PaymentForm';


const stripePromise = loadStripe('pk_test_51NBihgKzH0a9D7R9fz7GkFylvVwzNRWzYgA8aXgi6b3M6JwnqBWTV7w4aJoHxkOrZPIi2ntHp2TfJdMgbnC1kMjF00PQCKeXe2');

const Payment = () => {
  return (
    <Elements stripe={stripePromise}>
    <PaymentForm/>
    </Elements>
  );
};

export default Payment;
