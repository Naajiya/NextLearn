import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Attach token to every request
api.interceptors.request.use((config) => {
  const token = Cookies.get('access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle 401 → try refresh token
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      const refresh = Cookies.get('refresh_token');
      if (refresh) {
        // Call refresh endpoint if available, else redirect to login
        Cookies.remove('access_token');
        window.location.href = '/auth';
      }
    }
    return Promise.reject(error);
  }
);

export default api;