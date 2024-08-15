import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const signin = async (username, password) => {
  try {
    // Realiza la solicitud de inicio de sesión
    const response = await api.post('/auth/signin', { username, password });
    const { token, id } = response.data; // Desestructura el token y el ID del usuario de la respuesta

    // Almacena el token y el ID del usuario en AsyncStorage
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('id', id.toString()); // Asegúrate de convertir el ID a string

    return { token, id }; // Retorna los datos si es necesario
  } catch (error) {
    console.error('Error during sign-in:', error);
    throw error;
  }
};


export const signup = async (username, email, password) => {
  try {
    const response = await api.post('/auth/signup', { username, email, password });
    return response.data;
  } catch (error) {
    console.error('Error during sign-up:', error);
    throw error;
  }
};

export const resetPassword = async (email) => {
  try {
    const response = await api.post('/auth/reset-password', { email });
    return response.data;
  } catch (error) {
    console.error('Error during password reset:', error);
    throw error;
  }
};
