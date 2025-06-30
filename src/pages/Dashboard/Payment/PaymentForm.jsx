import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Loading from "../../../../src/pages/shared/Loading/Loading";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { parcelId } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  const { isPending, data: parcelInfo = {} } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  if (isPending) return <Loading />;

  const amount = parcelInfo.cost;
  const amountInCents = amount * 100;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast.error("Stripe is not initialized yet.");
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      toast.error("Card information is missing.");
      return;
    }

    setProcessing(true);
    setError("");

    try {
      // Step 1: Create payment method
      const { error: stripeError } = await stripe.createPaymentMethod({
        type: "card",
        card,
        billing_details: {
          name: user.displayName || "Anonymous",
          email: user.email,
        },
      });

      if (stripeError) {
        console.error("Stripe validation error:", stripeError);
        setError(stripeError.message);
        toast.error("Card validation failed.");
        return; 
      }
      // Step 2: Get client secret
      const res = await axiosSecure.post("/create-payment-intent", {
        amountInCents,
        parcelId,
      });

      const clientSecret = res.data.clientSecret;

      // Step 3: Confirm card payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      });

      if (result.error) {
        console.error("Payment confirmation error:", result.error);
        setError(result.error.message);
        toast.error("Payment confirmation failed.");
      } else if (result.paymentIntent.status === "succeeded") {
        const transactionId = result.paymentIntent.id;

        // Step 4: Record payment and update parcel status
        const paymentData = {
          parcelId,
          email: user.email,
          amount: parcelInfo.cost,
          transactionId,
          paymentMethod: result.paymentIntent.payment_method_types,
        };

        const paymentRes = await axiosSecure.post("/payments", paymentData);

        if (paymentRes.data.insertedId) {
          // Optionally update local status (if needed)
          await axiosSecure.patch(`/parcels/${parcelId}`, {
            paymentStatus: "paid",
          });

          await Swal.fire({
            icon: "success",
            title: "Payment Successful!",
            html: `<strong>Transaction ID:</strong> <code>${transactionId}</code>`,
            confirmButtonText: "View My Parcels",
          });

          navigate("/dashboard/myParcels");
        }
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("An unexpected error occurred during payment.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <>
      {/* Payment Summary */}
      <div className="bg-gray-100 p-4 rounded-md shadow-sm text-sm text-gray-700 space-y-1 mb-6 max-w-md mx-auto">
        <p>
          <strong>Receiver:</strong> {parcelInfo.receiverName}
        </p>
        <p>
          <strong>Region:</strong> {parcelInfo.receiverRegion},{" "}
          {parcelInfo.receiverCenter}
        </p>
        <p>
          <strong>Weight:</strong> {parcelInfo.weight} kg
        </p>
        <p>
          <strong>Tracking ID:</strong> {parcelInfo.trackingId}
        </p>
        <p>
          <strong>Payment Status:</strong>
          <span
            className={`ml-1 font-semibold ${
              parcelInfo.paymentStatus === "paid"
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {parcelInfo.paymentStatus}
          </span>
        </p>
      </div>

      {/* Stripe Payment Form */}
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          💳 Pay for{" "}
          <span className="text-green-800">{parcelInfo.title || "Parcel"}</span>
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-4 border rounded-md bg-gray-50">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#32325d",
                    "::placeholder": { color: "#a0aec0" },
                  },
                  invalid: { color: "#e53e3e" },
                },
              }}
            />
          </div>

          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

          <button
            type="submit"
            disabled={!stripe || processing}
            className="w-full bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {processing ? "Processing..." : `Pay ${amount}৳`}
          </button>
        </form>
      </div>
    </>
  );
};

export default PaymentForm;
