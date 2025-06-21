import React from "react";
import { useForm } from "react-hook-form";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Registration Data:", data);
  };

  const password = watch("password");

  return (
    <div className="max-w-md mx-auto mt-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-6">Create an Account</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-base-200 p-6 rounded-lg shadow-md space-y-5"
      >
        {/* Name Field */}
        <div>
          <label className="label font-medium" htmlFor="name">
            Name
          </label>
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
          <label className="label font-medium" htmlFor="email">
            Email
          </label>
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
          <label className="label font-medium" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).+$/,
                message:
                  "Password must include uppercase, lowercase, and a special character",
              },
            })}
            className={`input input-bordered w-full ${
              errors.password ? "input-error" : ""
            }`}
            placeholder="Create a password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div>
          <label className="label font-medium" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            className={`input input-bordered w-full ${
              errors.confirmPassword ? "input-error" : ""
            }`}
            placeholder="Repeat your password"
          />
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
      </form>
    </div>
  );
};

export default Register;
