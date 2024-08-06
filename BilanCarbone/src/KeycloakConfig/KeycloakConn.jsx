import axios from 'axios';
const token = sessionStorage.getItem('token');
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_AXIOS_URL,
  headers: {
    Authorization: token?`Bearer ${token}`:null
  
  },
  withCredentials: true 
});
export const apikeycloak = axios.create({
  baseURL: import.meta.env.VITE_KEYCLOAK_URL,
  headers: {
    Authorization: `Bearer ${token}`
  
  },
  withCredentials: true 
});




