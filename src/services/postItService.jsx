import axiosInstance from './api';

export const getPostItsByCanvasId = async (canvasId, quadrantId) => {
  try {
    const response = await axiosInstance.get('/postit', { params: { canvasId, quadrantId } });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createPostIt = async (postIt) => {
  try {
    const response = await axiosInstance.post('/postit/create', postIt);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updatePostIt = async (id, postIt) => {
  try {
    const response = await axiosInstance.put(`/postit/update/${id}`, postIt);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deletePostIt = async (id) => {
  try {
    await axiosInstance.delete(`/postit/delete/${id}`);
  } catch (error) {
    throw error;
  }
};
