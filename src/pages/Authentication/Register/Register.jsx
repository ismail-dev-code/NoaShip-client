import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from "react-router"; 
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import SocialLogin from "../SocialLogin/SocialLogin";

const Register = () => {
    const {createUser} = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const password = watch("password");

 const onSubmit = (data) => {
  createUser(data.email, data.password)
    .then((result) => {
      console.log(result.user);
      toast.success("Registration successful!");
    })
    .catch((error) => {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    });
};

  return (
    <div className="max-w-md mx-auto mt-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-6">Create an Account</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-base-200 p-6 rounded-lg shadow-md space-y-5"
      >
        {/* Name Field */}
        <div>
          <label className="label font-medium" htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters",
              },
            })}
            className={`input input-bordered w-full ${
              errors.name ? "input-error" : ""
            }`}
            placeholder="Enter your full name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label className="label font-medium" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Enter a valid email address",
              },
            })}
            className={`input input-bordered w-full ${
              errors.email ? "input-error" : ""
            }`}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label className="label font-medium" htmlFor="password">Password</label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).+$/,
                  message: "Must include uppercase, lowercase, and special character",
                },
              })}
              className={`input input-bordered w-full pr-10 ${
                errors.password ? "input-error" : ""
              }`}
              placeholder="Create a password"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-lg text-gray-500"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div>
          <label className="label font-medium" htmlFor="confirmPassword">Confirm Password</label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirm ? "text" : "password"}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className={`input input-bordered w-full pr-10 ${
                errors.confirmPassword ? "input-error" : ""
              }`}
              placeholder="Repeat your password"
            />
            <span
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-lg text-gray-500"
            >
              {showConfirm ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary text-black w-full">
          Register
        </button>

        {/* Login Redirect Link */}
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-secondary font-medium hover:underline">
            Login here
          </Link>
        </p>
      </form>
      <SocialLogin/>
    </div>
  );
};

export default Register;
