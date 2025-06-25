import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const SendParcel = () => {
  const serviceCenters = useLoaderData();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const watchType = watch("type");
  const watchWeight = parseFloat(watch("weight")) || 0;
  const watchSenderRegion = watch("senderRegion");
  const watchReceiverRegion = watch("receiverRegion");
  const watchSenderCenter = watch("senderCenter");
  const watchReceiverCenter = watch("receiverCenter");

  const uniqueRegions = [
    ...new Set(serviceCenters.map((center) => center.region)),
  ];
  const filteredSenderCenters = serviceCenters.filter(
    (center) => center.region === watchSenderRegion
  );
  const filteredReceiverCenters = serviceCenters.filter(
    (center) => center.region === watchReceiverRegion
  );

  const isSameDistrict = watchSenderCenter === watchReceiverCenter;

  const calculateCostDetails = () => {
    let base = 0;
    let extraWeightCost = 0;
    let extraCharge = 0;
    let total = 0;

    if (watchType === "document") {
      base = isSameDistrict ? 60 : 80;
    } else if (watchType === "non-document") {
      if (watchWeight <= 3) {
        base = isSameDistrict ? 110 : 150;
      } else {
        const extraWeight = watchWeight - 3;
        extraWeightCost = extraWeight * 40;
        base = isSameDistrict ? 110 : 150;
        if (!isSameDistrict) {
          extraCharge = 40;
        }
      }
    }

    total = base + extraWeightCost + extraCharge;
    return { base, extraWeightCost, extraCharge, total };
  };

  const onSubmit = (data) => {
    const { base, extraWeightCost, extraCharge, total } =
      calculateCostDetails();

    Swal.fire({
      title: "Estimated Delivery Cost",
      html: `
        <div style="text-align:left">
          <p><strong>Parcel Type:</strong> ${data.type}</p>
          <p><strong>Weight:</strong> ${
            data.type === "non-document" ? `${watchWeight} kg` : "N/A"
          }</p>
          <p><strong>Delivery Zone:</strong> ${
            isSameDistrict ? "Within City/District" : "Outside City/District"
          }</p>
          <table style="width:100%; font-size: 14px; margin-top: 10px; border-collapse: collapse;">
            <thead>
              <tr style="border-bottom: 1px solid #ccc;">
                <th align="left">Charge Type</th>
                <th align="right">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Base Cost</td><td align="right">৳${base}</td></tr>
              ${
                extraWeightCost > 0
                  ? `<tr><td>Extra Weight Cost</td><td align="right">৳${extraWeightCost}</td></tr>`
                  : ""
              }
              ${
                extraCharge > 0
                  ? `<tr><td>Outside District Charge</td><td align="right">৳${extraCharge}</td></tr>`
                  : ""
              }
              <tr style="border-top: 1px solid #ccc;"><td><strong>Total</strong></td><td align="right"><strong>৳${total}</strong></td></tr>
            </tbody>
          </table>
          <p style="margin-top:10px; font-size:13px; color:#555;">
            <em>Note: For non-document parcels above 3kg, an extra charge of ৳40 per kg applies. An additional ৳40 applies for cross-district delivery.</em>
          </p>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Proceed to Payment",
      cancelButtonText: "Continue Editing",
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#d97706",
    }).then((result) => {
      if (result.isConfirmed) {
        handleConfirmSubmit(data, total);
      }
    });
  };

 const handleConfirmSubmit = (data, cost) => {
  const now = new Date();
  const creation_date = now.toISOString().slice(0, 10);
  const creation_time = now.toTimeString().split(" ")[0];

  const trackingId = `TRK-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const parcelInfo = {
    ...data,
    trackingId,
    cost,
    creation_date,
    creation_time,
    createdBy: user?.email || "Anonymous",
    paymentStatus: "unpaid",
    deliveryStatus: "pending",
  };

  //  Save to database here
  axiosSecure.post('/parcels', parcelInfo).then(res => {
    console.log('Saved to DB:', res.data);
    Swal.fire(
      "Success!",
      `Parcel added successfully! Tracking ID: ${trackingId}`,
      "success"
    );
    reset();
  }).catch(error => {
    console.error('Failed to save parcel:', error);
    Swal.fire("Error", "Something went wrong. Try again!", "error");
  });
};


  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-2">Add New Parcel</h2>
      <p className="mb-6 text-gray-500">
        Fill the form to schedule a pickup and delivery
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="border p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-4">Parcel Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-4">
              <label className="label cursor-pointer">
                <input
                  type="radio"
                  value="document"
                  {...register("type", { required: true })}
                  className="radio"
                />
                <span className="ml-2">Document</span>
              </label>
              <label className="label cursor-pointer">
                <input
                  type="radio"
                  value="non-document"
                  {...register("type", { required: true })}
                  className="radio"
                />
                <span className="ml-2">Non-Document</span>
              </label>
            </div>
            {errors.type && (
              <p className="text-red-500 text-sm col-span-3">
                Parcel type is required
              </p>
            )}

            <input
              {...register("title", { required: true })}
              placeholder="Parcel Title"
              className="input input-bordered"
            />
            {errors.title && (
              <p className="text-red-500 text-sm col-span-3">
                Title is required
              </p>
            )}

            {watchType === "non-document" && (
              <input
                type="number"
                step="0.1"
                min="0"
                {...register("weight", { required: true })}
                placeholder="Weight (kg)"
                className="input input-bordered"
              />
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="border p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-4">Sender Info</h3>
            <div className="grid grid-cols-1 gap-4">
              <input
                value={user?.email || "Anonymous"}
                readOnly
                className="input input-bordered"
                title="Sender Email"
              />
              <input
                {...register("senderContact", { required: true })}
                placeholder="Sender Contact"
                className="input input-bordered"
              />
              {errors.senderContact && (
                <p className="text-red-500 text-sm">
                  Sender contact is required
                </p>
              )}
              <select
                {...register("senderRegion", { required: true })}
                className="select select-bordered"
              >
                <option value="">Select Sender Region</option>
                {uniqueRegions.map((region, idx) => (
                  <option key={idx} value={region}>
                    {region}
                  </option>
                ))}
              </select>
              {errors.senderRegion && (
                <p className="text-red-500 text-sm">Region is required</p>
              )}
              <select
                {...register("senderCenter", { required: true })}
                className="select select-bordered"
                disabled={!watchSenderRegion}
              >
                <option value="">Select Sender Center</option>
                {filteredSenderCenters.map((center, idx) => (
                  <option key={idx} value={center.district}>
                    {center.district}
                  </option>
                ))}
              </select>
              {errors.senderCenter && (
                <p className="text-red-500 text-sm">
                  Service center is required
                </p>
              )}
              <input
                {...register("senderAddress", { required: true })}
                placeholder="Sender Address"
                className="input input-bordered"
              />
              <input
                {...register("pickupInstruction", { required: true })}
                placeholder="Pickup Instruction"
                className="input input-bordered"
              />
              {errors.senderAddress && (
                <p className="text-red-500 text-sm">Address is required</p>
              )}
              {errors.pickupInstruction && (
                <p className="text-red-500 text-sm">Instruction is required</p>
              )}
            </div>
          </div>

          <div className="border p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-4">Receiver Info</h3>
            <div className="grid grid-cols-1 gap-4">
              <input
                {...register("receiverName", { required: true })}
                placeholder="Receiver Name"
                className="input input-bordered"
              />
              <input
                {...register("receiverContact", { required: true })}
                placeholder="Receiver Contact"
                className="input input-bordered"
              />
              {errors.receiverName && (
                <p className="text-red-500 text-sm">
                  Receiver name is required
                </p>
              )}
              {errors.receiverContact && (
                <p className="text-red-500 text-sm">
                  Receiver contact is required
                </p>
              )}
              <select
                {...register("receiverRegion", { required: true })}
                className="select select-bordered"
              >
                <option value="">Select Receiver Region</option>
                {uniqueRegions.map((region, idx) => (
                  <option key={idx} value={region}>
                    {region}
                  </option>
                ))}
              </select>
              {errors.receiverRegion && (
                <p className="text-red-500 text-sm">Region is required</p>
              )}
              <select
                {...register("receiverCenter", { required: true })}
                className="select select-bordered"
                disabled={!watchReceiverRegion}
              >
                <option value="">Select Receiver Center</option>
                {filteredReceiverCenters.map((center, idx) => (
                  <option key={idx} value={center.district}>
                    {center.district}
                  </option>
                ))}
              </select>
              {errors.receiverCenter && (
                <p className="text-red-500 text-sm">
                  Service center is required
                </p>
              )}
              <input
                {...register("receiverAddress", { required: true })}
                placeholder="Receiver Address"
                className="input input-bordered"
              />
              <input
                {...register("deliveryInstruction", { required: true })}
                placeholder="Delivery Instruction"
                className="input input-bordered"
              />
              {errors.receiverAddress && (
                <p className="text-red-500 text-sm">Address is required</p>
              )}
              {errors.deliveryInstruction && (
                <p className="text-red-500 text-sm">Instruction is required</p>
              )}
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary text-black mt-4">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SendParcel;
