import axiosInstance from './api';

export const login = async (username, password) => {
  try {
    const response = await axiosInstance.post('/auth/signin', { username, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signup = async (username, email, password) => {
  try {
    const response = await axiosInstance.post('/auth/signup', { username, email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (email) => {
  try {
    const response = await axiosInstance.post('/auth/reset-password', { email });
    return response.data;
  } catch (error) {
    throw error;
  }
};
