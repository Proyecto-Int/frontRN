import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAllCanvases = async () => {
  try {
    const response = await api.get('/canvas/all');
    return response.data;
  } catch (error) {
    console.error('Error fetching canvases:', error);
    throw error;
  }
};

export const createCanvas = async (canvas) => {
  try {
    // Recupera el token de AsyncStorage
    const token = await AsyncStorage.getItem('token');

    // Configura el encabezado con el token JWT
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    // Envía la solicitud POST para crear el canvas
    const response = await api.post('/canvas/create', canvas, { headers });

    return response.data;
  } catch (error) {
    console.error('Error creating canvas:', error);
    throw error;
  }
};

export const getCanvasById = async (id) => {
  try {
    const response = await api.get(`/canvas/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching canvas by ID:', error);
    throw error;
  }
};

export const updateCanvas = async (id, canvas) => {
  try {
    const response = await api.put(`/canvas/update/${id}`, canvas);
    return response.data;
  } catch (error) {
    console.error('Error updating canvas:', error);
    throw error;
  }
};

export const deleteCanvas = async (id) => {
  try {
    await api.delete(`/canvas/delete/${id}`);
  } catch (error) {
    console.error('Error deleting canvas:', error);
    throw error;
  }
};
