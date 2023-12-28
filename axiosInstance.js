// axiosInstance.js
import axios from 'axios';

const baseURL = 'https://movieapi-hi6b.onrender.com/api'; 

const axiosInstance = axios.create({
  baseURL,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    console.log('Request Interceptor:', config);
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Modify the response data
    console.log('Response Interceptor:', response);
    return response;
  },
  (error) => {
    // Handle response error
    return Promise.reject(error);
  }
);

export default axiosInstance;
