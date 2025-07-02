import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { FaTrashAlt, FaMoneyCheckAlt } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    data: parcels = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["my-parcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  const deleteParcelMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.delete(`/parcels/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["my-parcels"]);
      Swal.fire("Deleted!", "The parcel has been deleted.", "success");
    },
    onError: () => {
      Swal.fire("Error!", "Failed to delete the parcel.", "error");
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this parcel?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteParcelMutation.mutate(id);
      }
    });
  };

  const handlePay = (parcelId) => {
    navigate(`/dashboard/payment/${parcelId}`);
  };

  if (isLoading) {
    return <p className="text-center text-gray-600 py-6">Loading your parcels...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 py-6">Failed to load parcels.</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">📦 My Parcels ({parcels.length})</h2>

      {parcels.length === 0 ? (
        <p className="text-gray-600">You haven't sent any parcels yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full text-sm">
            <thead>
              <tr className="bg-base-200 text-xs">
                <th>#</th>
                <th>Tracking ID</th>
                <th>Title</th>
                <th>Sender</th>
                <th>Receiver</th>
                <th>Taka</th>
                <th>Type</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel, index) => (
                <tr key={parcel._id} className="hover">
                  <td>{index + 1}</td>
                  <td className="text-nowrap">{parcel.trackingId || "N/A"}</td>
                  <td className="capitalize">
                    {parcel.title?.split(" ").slice(0, 3).join(" ")}
                    {parcel.title?.split(" ").length > 3 ? "..." : ""}
                  </td>
                  <td>
                    <div>
                      <div>{parcel.senderRegion}</div>
                      <div className="text-xs text-gray-500">{parcel.senderCenter}</div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <div>{parcel.receiverRegion}</div>
                      <div className="text-xs text-gray-500">{parcel.receiverCenter}</div>
                    </div>
                  </td>
                  <td>{parcel.cost ? `${parcel.cost} ৳` : "—"}</td>
                  <td>{parcel.type || "—"}</td>
                  <td>
                    <span
                      className={`badge ${
                        parcel.deliveryStatus === "delivered"
                          ? "badge-success"
                          : parcel.deliveryStatus === "pending"
                          ? "badge-warning"
                          : "badge-info"
                      }`}
                    >
                      {parcel.deliveryStatus || "processing"}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        parcel.paymentStatus === "paid"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {parcel.paymentStatus || "unpaid"}
                    </span>
                  </td>
                  <td className="space-x-2">
                    {parcel.paymentStatus !== "paid" && (
                      <>
                        <button
                          onClick={() => handlePay(parcel._id)}
                          data-tooltip-id={`pay-tooltip-${parcel._id}`}
                          className="btn btn-ghost btn-xs text-green-600"
                        >
                          <FaMoneyCheckAlt size={18} />
                        </button>
                        <Tooltip id={`pay-tooltip-${parcel._id}`} content="Pay Now" />
                      </>
                    )}
                    <button
                      onClick={() => handleDelete(parcel._id)}
                      data-tooltip-id={`delete-tooltip-${parcel._id}`}
                      className="btn btn-ghost btn-xs text-red-600"
                    >
                      <FaTrashAlt size={18} />
                    </button>
                    <Tooltip id={`delete-tooltip-${parcel._id}`} content="Delete Parcel" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyParcels;
