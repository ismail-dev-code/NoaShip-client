import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../shared/Loading/Loading";

// Format date with AM/PM
const formatDate = (iso) =>
  new Date(iso).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { isPending, data: payments = [] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  if (isPending) return <Loading />;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center md:text-left">
        💳 My Payment History
      </h2>

      <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-200">
        <table className="w-full text-sm table-auto">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs sm:text-sm">
            <tr className="text-left">
              <th className="p-3">#</th>
              <th className="p-3">Parcel ID</th>
              <th className="p-3 hidden md:table-cell">Email</th>
              <th className="p-3">Amount</th>
              <th className="p-3 text-nowrap">Paid By</th>
              <th className="p-3">Transaction ID</th>
              <th className="p-3">Paid At</th>
            </tr>
          </thead>
          <tbody>
            {payments.length > 0 ? (
              payments.map((p, index) => (
                <tr
                  key={p.transactionId}
                  className="hover:bg-gray-50 border-t border-gray-100"
                >
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3" title={p.parcelId}>
                    {p.parcelId}
                  </td>
                  <td className="p-3 hidden md:table-cell" title={p.email}>
                    {p.email}
                  </td>
                  <td className="p-3 text-green-700 font-semibold">৳{p.amount}</td>
                  <td className="p-3 capitalize">{p.paymentMethod?.[0] || "Unknown"}</td>
                  <td className="p-3" title={p.transactionId}>
                    {p.transactionId}
                  </td>
                  <td className="p-3 whitespace-nowrap">{formatDate(p.paid_at_string)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-gray-500 py-6">
                  No payment history found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
