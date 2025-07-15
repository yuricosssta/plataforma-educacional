import axios from 'axios';
import { store } from '@/lib/redux/store'; // Importa a store para pegar o estado

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Pega o estado mais recente do token da store do Redux
    const token = store.getState().auth.token;

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;