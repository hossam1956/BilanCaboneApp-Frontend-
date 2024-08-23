import axios from 'axios';


export const apiClientWithoutToken = axios.create({
  baseURL: import.meta.env.VITE_AXIOS_URL,
  withCredentials: false 
});
// Create Axios instances
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_AXIOS_URL,
  withCredentials: true 
});

export const apikeycloak = axios.create({
  baseURL: import.meta.env.VITE_KEYCLOAK_URL,
  withCredentials: true 
});

// Add a request interceptor to inject the token
const injectToken = (config) => {
  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
};

// Use the interceptor in both Axios instances
apiClient.interceptors.request.use(injectToken, (error) => Promise.reject(error));
apikeycloak.interceptors.request.use(injectToken, (error) => Promise.reject(error));
