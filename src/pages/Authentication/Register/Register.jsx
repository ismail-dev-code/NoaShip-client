import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import useAxios from '../../../hooks/useAxiosSecure';
import axios from 'axios';
import SocialLogin from '../SocialLogin/SocialLogin';
import { toast } from 'react-toastify';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { createUser, updateProfile } = useAuth();
  const axiosInstance = useAxios();

  const [profilePic, setProfilePic] = useState('');
  const [uploading, setUploading] = useState(false);
const location = useLocation();
  const navigate = useNavigate();
const from = location.state?.from || "/";
  const onSubmit = async (data) => {
    if (!profilePic) {
      toast.error('Please upload your profile picture before submitting.');
      return;
    }

    try {
      // Step 1: Create Firebase User
      const result = await createUser(data.email, data.password);
      const createdUser = result.user;
      console.log('Firebase user:', createdUser);

      // Step 2: Save user to your database
      const userInfo = {
        email: data.email,
        name: data.name,
        role: 'user',
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
      };
      const res = await axiosInstance.post('/users', userInfo);
      console.log('User saved to DB:', res.data);

      // Step 3: Update Firebase Profile
      const userProfile = {
        displayName: data.name,
        photoURL: profilePic,
      };
      await updateProfile(userProfile);
      toast.success('Registration successful!');
      navigate(from)
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Something went wrong');
    }
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return;

    const formData = new FormData();
    formData.append('image', image);
    const uploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_UPLOAD_KEY}`;

    try {
      setUploading(true);
      const res = await axios.post(uploadUrl, formData);
      setProfilePic(res.data.data.url);
      toast.success('Image uploaded successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Image upload failed!');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto mt-10">
      <div className="card-body">
        <h1 className="text-4xl font-bold mb-4">Create Account</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="space-y-3">

            {/* Name */}
            <label className="label">Your Name</label>
            <input
              type="text"
              {...register('name', { required: true })}
              className="input input-bordered w-full"
              placeholder="Your Name"
            />
            {errors.name && <p className="text-red-500 text-sm">Name is required</p>}

            {/* Profile Picture */}
            <label className="label mt-2">Profile Picture</label>
            <input
              type="file"
              onChange={handleImageUpload}
              className="file-input file-input-bordered w-full"
            />
            {profilePic && (
              <img src={profilePic} alt="Profile" className="w-20 h-20 rounded-full mt-2 object-cover border" />
            )}

            {/* Email */}
            <label className="label mt-2">Email</label>
            <input
              type="email"
              {...register('email', { required: true })}
              className="input input-bordered w-full"
              placeholder="Email"
            />
            {errors.email && <p className="text-red-500 text-sm">Email is required</p>}

            {/* Password */}
            <label className="label mt-2">Password</label>
            <input
              type="password"
              {...register('password', { required: true, minLength: 6 })}
              className="input input-bordered w-full"
              placeholder="Password"
            />
            {errors.password?.type === 'required' && <p className="text-red-500 text-sm">Password is required</p>}
            {errors.password?.type === 'minLength' && <p className="text-red-500 text-sm">Password must be at least 6 characters</p>}

            {/* Submit */}
            <button type="submit" className="btn btn-primary text-black w-full mt-4" disabled={uploading}>
              {uploading ? 'Uploading Image...' : 'Register'}
            </button>
          </fieldset>

          <p className="mt-4 text-sm text-center">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 underline">
              Login
            </Link>
          </p>
        </form>

        <div className="divider">OR</div>
        <SocialLogin />
      </div>
    </div>
  );
};

export default Register;
