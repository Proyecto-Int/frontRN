import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configura la URL base para la API
const API_URL = 'http://192.168.10.102:8080/api'; // Ajusta según tu dominio

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir el token JWT a las solicitudes
axiosInstance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token'); // O la clave que estés usando para almacenar el token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
