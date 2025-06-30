import { useEffect } from 'react';
import axios from 'axios';
import useAuth from './useAuth';


// Create an Axios instance
const axiosSecure = axios.create({
  baseURL: 'http://localhost:5000',
});

// Custom hook to use secure Axios instance with auth token
const useAxiosSecure = () => {
  const { user } = useAuth();

  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        // Add authorization header if user and token exist
        if (user?.accessToken) {
          config.headers.Authorization = `Bearer ${user.accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Eject interceptor on cleanup to prevent duplicate interceptors
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
    };
  }, [user?.accessToken]);

  return axiosSecure;
};

export default useAxiosSecure;
