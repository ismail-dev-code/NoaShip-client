import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  FaBox,
  FaCheckCircle,
  FaClock,
  FaTruck,
  FaDollarSign,
  FaUserAlt,
  FaHistory,
} from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import moment from "moment";

const statusIcons = {
  pending: <FaClock className="text-4xl text-warning" />,
  rider_assigned: <FaTruck className="text-4xl text-info" />,
  in_transit: <FaBox className="text-4xl text-orange-500" />,
  delivered: <FaCheckCircle className="text-4xl text-success" />,
};

const statusLabels = {
  pending: "Pending",
  rider_assigned: "Assigned to Rider",
  in_transit: "In Transit",
  delivered: "Delivered",
};

const UserDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Fetch user profile to get last_log_in
  const { data: userProfile, isLoading: isUserLoading } = useQuery({
    queryKey: ["userProfile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/profile?email=${user.email}`);
      return res.data;
    },
  });

  const { data: deliveryStatus = [], isLoading, isError, error } = useQuery({
    queryKey: ["userStatusCount", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/user/status-count?email=${user.email}`);
      return res.data;
    },
  });

  const { data: paymentSummary = { paidCount: 0, totalPaid: 0 }, isLoading: isLoadingPayments, isError: isPaymentError, error: paymentError } = useQuery({
    queryKey: ["userPaymentSummary", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/user/summary?email=${user.email}`);
      return res.data;
    },
  });

  const { data: recentParcels = [] } = useQuery({
    queryKey: ["userRecentParcels", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/user/recent?email=${user.email}`);
      return res.data;
    },
  });

  const { data: recentPayments = [] } = useQuery({
    queryKey: ["userRecentPayments", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/user/recent?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading || isLoadingPayments || isUserLoading)
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  if (isError || isPaymentError)
    return (
      <div className="text-center text-red-600 mt-10">
        Error loading data: {error?.message || paymentError?.message}
      </div>
    );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user?.displayName || user?.email}</h1>

      {/* User Info */}
      <div className="card bg-base-100 shadow-md p-6 border border-base-200 mb-6">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <FaUserAlt className="text-info" /> Your Info
        </h2>
        <p><strong>Email:</strong> {user?.email}</p>
        <p>
          <strong>Last Login:</strong>{" "}
          {userProfile?.last_log_in
            ? moment(userProfile.last_log_in).format("MMMM Do YYYY, h:mm:ss a")
            : "No login info available"}
        </p>
      </div>

      {/* Payment Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div className="card bg-base-100 shadow-md p-6 border border-base-200">
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <FaDollarSign className="text-success" /> Total Payments Made
          </h2>
          <p className="text-3xl font-bold text-success">${paymentSummary.totalPaid}</p>
        </div>
        <div className="card bg-base-100 shadow-md p-6 border border-base-200">
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <FaCheckCircle className="text-primary" /> Number of Paid Parcels
          </h2>
          <p className="text-3xl font-bold text-primary">{paymentSummary.paidCount}</p>
        </div>
      </div>

      {/* Parcel Status */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {deliveryStatus.map(({ count, status }) => (
          <div
            key={status}
            className="card bg-base-100 shadow-md border border-base-200 flex flex-col items-center justify-center p-6"
          >
            {statusIcons[status] || <FaBox className="text-4xl" />}
            <h2 className="text-lg font-semibold mt-3 text-center">
              {statusLabels[status] || status}
            </h2>
            <p className="text-4xl font-extrabold text-primary mt-2">{count}</p>
          </div>
        ))}
      </div>

      {/* Recent Parcels */}
      <div className="card bg-base-100 shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <FaBox /> Recent Parcels
        </h2>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Tracking ID</th>
                <th>Cost</th>
                <th>Status</th>
                <th>Date and Time</th>
              </tr>
            </thead>
            <tbody>
              {recentParcels.map((parcel) => (
                <tr key={parcel._id}>
                  <td>{parcel.trackingId}</td>
                  <td>${parcel.cost}</td>
                  <td>{parcel.deliveryStatus}</td>
                  <td>{moment(parcel.creation_date).format("LLL")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Payments */}
      <div className="card bg-base-100 shadow-md p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <FaHistory /> Recent Payments
        </h2>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Date and Time</th>
              </tr>
            </thead>
            <tbody>
              {recentPayments.map((payment) => (
                <tr key={payment._id}>
                  <td>{payment.transactionId}</td>
                  <td>${payment.amount}</td>
                  <td>{payment.paymentMethod?.[0]}</td>
                  <td>{moment(payment.paid_at).format("LLL")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
