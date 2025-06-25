import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const from = location.state?.from || "/";

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await signIn(data.email, data.password);
      toast.success("Login successful!");
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-6">Welcome Back</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-base-200 p-6 rounded-lg shadow-md space-y-5"
      >
        {/* Email */}
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

        {/* Password */}
        <div>
          <label className="label font-medium" htmlFor="password">
            Password
          </label>
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
                  message:
                    "Must include uppercase, lowercase, and a special character",
                },
              })}
              className={`input input-bordered w-full pr-10 ${
                errors.password ? "input-error" : ""
              }`}
              placeholder="Enter your password"
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

        {/* Forgot Password */}
        <div className="text-right">
          <a className="link link-hover text-sm">Forgot password?</a>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn btn-primary text-black w-full"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Register Link */}
        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-secondary font-medium hover:underline"
          >
            Create one
          </Link>
        </p>
      </form>

      <SocialLogin />
    </div>
  );
};

export default Login;
