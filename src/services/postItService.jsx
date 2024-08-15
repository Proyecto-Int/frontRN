import api from './api';

export const getPostItsByCanvasId = async (canvasId, quadrantId) => {
  try {
    const response = await api.get('/postit', {
      params: { canvasId, quadrantId }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching post-its:', error);
    throw error;
  }
};

export const createPostIt = async (postIt) => {
  try {
    const response = await api.post('/postit/create', postIt);
    return response.data;
  } catch (error) {
    console.error('Error creating post-it:', error);
    throw error;
  }
};

export const updatePostIt = async (id, postIt) => {
  try {
    const response = await api.put(`/postit/update/${id}`, postIt);
    return response.data;
  } catch (error) {
    console.error('Error updating post-it:', error);
    throw error;
  }
};

export const deletePostIt = async (id) => {
  try {
    await api.delete(`/postit/delete/${id}`);
  } catch (error) {
    console.error('Error deleting post-it:', error);
    throw error;
  }
};
