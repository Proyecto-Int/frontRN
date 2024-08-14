import axiosInstance from './api';

export const getAllCanvases = async () => {
  try {
    const response = await axiosInstance.get('/canvas/all');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createCanvas = async (canvas) => {
  try {
    const response = await axiosInstance.post('/canvas/create', canvas);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCanvasById = async (id) => {
  try {
    const response = await axiosInstance.get(`/canvas/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCanvas = async (id, canvas) => {
  try {
    const response = await axiosInstance.put(`/canvas/update/${id}`, canvas);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCanvas = async (id) => {
  try {
    await axiosInstance.delete(`/canvas/delete/${id}`);
  } catch (error) {
    throw error;
  }
};
