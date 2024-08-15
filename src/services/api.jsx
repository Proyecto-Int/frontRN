import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiUrl = 'http://192.168.10.102:8080/api'; // Ajusta según tu URL

const api = axios.create({
  baseURL: apiUrl,
  timeout: 10000, // Tiempo de espera en milisegundos
});

// Interceptor para agregar el token de autenticación en las solicitudes
api.interceptors.request.use(
  async config => {
    try {
      const token = await AsyncStorage.getItem('token'); // Obtén el token desde AsyncStorage
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error getting token from AsyncStorage:', error);
    }
    return config;
  },
  error => Promise.reject(error)
);

export default api;
