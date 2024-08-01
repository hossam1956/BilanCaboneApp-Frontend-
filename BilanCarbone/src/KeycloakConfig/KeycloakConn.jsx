import axios from 'axios';
const token = sessionStorage.getItem('token');
console.log("token :"+token)
export const apiClient = axios.create({
  baseURL: 'http://localhost:8081/api',
  headers: {
    Authorization: `Bearer ${token}`
  
  },
  withCredentials: true 
});





