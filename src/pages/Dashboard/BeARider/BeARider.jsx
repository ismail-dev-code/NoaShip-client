import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLoaderData } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const BeARider = () => {
  const districtData = useLoaderData();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [formData, setFormData] = useState({
    phone: "",
    age: "",
    nid: "",
    bikeBrand: "",
    bikeRegNumber: "",
    region: "",
    district: "",
    city: "",
    coveredArea: "",
    info: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.phone || !/^01[3-9]\d{8}$/.test(formData.phone)) {
      newErrors.phone = "Phone must be 11 digits and start with 013–019.";
    }
    if (!formData.age || isNaN(formData.age) || formData.age < 21) {
      newErrors.age = "Valid age (21+) is required.";
    }
    if (!formData.nid || formData.nid.length < 10) {
      newErrors.nid = "NID must be at least 10 characters.";
    }
    if (!formData.bikeBrand) newErrors.bikeBrand = "Bike brand is required.";
    if (!formData.bikeRegNumber)
      newErrors.bikeRegNumber = "Bike registration is required.";
    if (!formData.region) newErrors.region = "Region is required.";
    if (!formData.district) newErrors.district = "District is required.";
    if (!formData.city) newErrors.city = "City is required.";
    if (!formData.coveredArea)
      newErrors.coveredArea = "Covered area is required.";
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const regions = [...new Set(districtData.map((item) => item.region))];
  const districts = districtData
    .filter((item) => item.region === formData.region)
    .map((item) => item.district);
  const cities = districtData
    .filter((item) => item.district === formData.district)
    .map((item) => item.city);
  const areaOptions =
    districtData.find((item) => item.city === formData.city)?.covered_area ||
    [];

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the form errors.");
      return;
    }
    setErrors({});

    // Send full data including formatted phone and default status
    const riderData = {
      ...formData,
      phone: `+88${formData.phone}`,
      name: user.displayName,
      email: user.email,
      status: "pending",
      applied_at: new Date().toISOString(), 
    };

    axiosSecure.post("/riders", riderData).then((res) => {
      if (res.data.insertedId) {
        toast.success("Application submitted successfully!");
        console.log(riderData);
      }
    });

    // Reset form
    setFormData({
      phone: "",
      age: "",
      nid: "",
      bikeBrand: "",
      bikeRegNumber: "",
      region: "",
      district: "",
      city: "",
      coveredArea: "",
      info: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 max-w-xl mx-auto shadow-md rounded-lg"
    >
      <h2 className="text-2xl font-bold mb-2">Become a Rider</h2>

      <label>Name</label>
      <input
        readOnly
        value={user?.displayName}
        className="input input-bordered w-full"
      />

      <label>Email</label>
      <input
        readOnly
        value={user?.email}
        className="input input-bordered w-full"
      />

      <label>Phone Number</label>
      <div className="flex items-center gap-2">
        <span className="py-2 rounded-md">+88</span>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="input input-bordered w-full"
          placeholder="e.g. 01712345678"
          maxLength={11}
        />
      </div>
      {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

      <label>Age</label>
      <input
      type="number"
        name="age"
        value={formData.age}
        onChange={handleChange}
        className="input input-bordered w-full"
        placeholder="Age"
      />
      {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}

      <label>NID</label>
      <input
        name="nid"
        type="number"
        value={formData.nid}
        onChange={handleChange}
        className="input input-bordered w-full"
        placeholder="NID Number"
      />
      {errors.nid && <p className="text-red-500 text-sm">{errors.nid}</p>}

      <label>Bike Brand</label>
      <input
        name="bikeBrand"
        value={formData.bikeBrand}
        onChange={handleChange}
        className="input input-bordered w-full"
        placeholder="Bike Brand"
      />
      {errors.bikeBrand && (
        <p className="text-red-500 text-sm">{errors.bikeBrand}</p>
      )}

      <label>Bike Registration Number</label>
      <input
        name="bikeRegNumber"
        value={formData.bikeRegNumber}
        onChange={handleChange}
        className="input input-bordered w-full"
        placeholder="Registration Number"
      />
      {errors.bikeRegNumber && (
        <p className="text-red-500 text-sm">{errors.bikeRegNumber}</p>
      )}

      <label>Region</label>
      <select
        name="region"
        value={formData.region}
        onChange={handleChange}
        className="select select-bordered w-full"
      >
        <option value="">Select Region</option>
        {regions.map((region, idx) => (
          <option key={idx} value={region}>
            {region}
          </option>
        ))}
      </select>
      {errors.region && <p className="text-red-500 text-sm">{errors.region}</p>}

      <label>District</label>
      <select
        name="district"
        value={formData.district}
        onChange={handleChange}
        className="select select-bordered w-full"
        disabled={!formData.region}
      >
        <option value="">Select District</option>
        {districts.map((district, idx) => (
          <option key={idx} value={district}>
            {district}
          </option>
        ))}
      </select>
      {errors.district && (
        <p className="text-red-500 text-sm">{errors.district}</p>
      )}

      <label>City</label>
      <select
        name="city"
        value={formData.city}
        onChange={handleChange}
        className="select select-bordered w-full"
        disabled={!formData.district}
      >
        <option value="">Select City</option>
        {cities.map((city, idx) => (
          <option key={idx} value={city}>
            {city}
          </option>
        ))}
      </select>
      {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}

      <label>Covered Area</label>
      <select
        name="coveredArea"
        value={formData.coveredArea}
        onChange={handleChange}
        className="select select-bordered w-full"
        disabled={!formData.city}
      >
        <option value="">Select Covered Area</option>
        {areaOptions.map((area, idx) => (
          <option key={idx} value={area}>
            {area}
          </option>
        ))}
      </select>
      {errors.coveredArea && (
        <p className="text-red-500 text-sm">{errors.coveredArea}</p>
      )}

      <label>Additional Info</label>
      <textarea
        name="info"
        value={formData.info}
        onChange={handleChange}
        className="textarea textarea-bordered w-full"
        rows="3"
        placeholder="Write something about you..."
      />

      <button type="submit" className="btn btn-primary text-black w-full mt-4">
        Submit Application
      </button>
    </form>
  );
};

export default BeARider;
