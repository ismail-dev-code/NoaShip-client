import React, { useState } from "react";
import useTrackParcel from "../../../hooks/useTrackParcel";

const TrackParcel = () => {
  const [trackingId, setTrackingId] = useState("");
  const [submittedId, setSubmittedId] = useState("");

  const {
    data: parcel,
    isLoading,
    isError,
  } = useTrackParcel(submittedId);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (trackingId.trim()) {
      setSubmittedId(trackingId.trim());
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className=" text-2xl md:text-3xl font-bold text-center mb-6 text-gray-800">
        📦 Track Your Parcel
      </h2>

      {/* Search Input */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter Tracking ID"
          className="input input-bordered w-full"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
        />
        <button type="submit" className="btn btn-primary whitespace-nowrap">
          Track
        </button>
      </form>

      {/* Feedback States */}
      {isLoading && (
        <p className="text-center text-gray-600">🔄 Loading tracking info...</p>
      )}
      {isError && (
        <p className="text-center text-red-500">
          ❌ Failed to fetch tracking data.
        </p>
      )}
      {!isLoading && submittedId && !parcel && (
        <p className="text-center text-gray-500">
          No parcel found for this tracking ID.
        </p>
      )}

      {/* Parcel Info Card */}
      {parcel && (
        <div className="bg-white rounded-lg shadow-md p-6 space-y-4 border border-gray-200">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-blue-700">
              {parcel.title}
            </h3>
            <p className="text-sm text-gray-600">
              Tracking ID:{" "}
              <span className="font-medium text-black">
                {parcel.trackingId}
              </span>
            </p>
            <p className="text-sm text-gray-600">
              Created at: {parcel.creation_time}
            </p>
          </div>

          {/* Status Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
            <div>
              <p className="font-semibold text-green-700">
                Delivery Status:{" "}
                <span className="font-normal">{parcel.deliveryStatus}</span>
              </p>
            </div>
            <div>
              <p className="font-semibold text-blue-600">
                Payment Status:{" "}
                <span className="font-normal">{parcel.paymentStatus}</span>
              </p>
            </div>
            <div>
              <p className="font-semibold">
                Weight: <span className="font-normal">{parcel.weight} kg</span>
              </p>
            </div>
          </div>

          {/* Sender Info */}
          <div>
            <h4 className="font-bold text-gray-800 mb-2">📤 Sender Info</h4>
            <div className="text-sm space-y-1">
              <p>Name/Contact: {parcel.senderContact}</p>
              <p>Region: {parcel.senderRegion}</p>
              <p>Center: {parcel.senderCenter}</p>
              <p>Address: {parcel.senderAddress}</p>
              {parcel.pickupInstruction && (
                <p>Instruction: {parcel.pickupInstruction}</p>
              )}
            </div>
          </div>

          {/* Receiver Info */}
          <div>
            <h4 className="font-bold text-gray-800 mb-2">📥 Receiver Info</h4>
            <div className="text-sm space-y-1">
              <p>Name: {parcel.receiverName}</p>
              <p>Contact: {parcel.receiverContact}</p>
              <p>Region: {parcel.receiverRegion}</p>
              <p>Center: {parcel.receiverCenter}</p>
              <p>Address: {parcel.receiverAddress}</p>
              {parcel.deliveryInstruction && (
                <p>Instruction: {parcel.deliveryInstruction}</p>
              )}
            </div>
          </div>

          {/* Payment Summary */}
          <div className="text-sm text-gray-700">
            <p>
              <span className="font-bold">Payment:</span>{" "}
              <span className="text-green-700 font-semibold">
                ৳{parcel.cost}
              </span>{" "}
              {parcel.paymentStatus === "paid" && (
                <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                  Paid
                </span>
              )}
            </p>
            <p className="text-xs text-gray-500 italic mt-2">
              Type: {parcel.type || "Parcel"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackParcel;
