import axios from 'axios';
const token = sessionStorage.getItem('token');
export const apiClient = axios.create({
  baseURL: 'http://localhost:8081/api',
  headers: {
    Authorization: `Bearer ${token}`
  
  },
  withCredentials: true 
});
export const apikeycloak = axios.create({
  baseURL: 'http://localhost:8080/admin/realms/BilanCarbone',
  headers: {
    Authorization: `Bearer ${token}`
  
  },
  withCredentials: true 
});




