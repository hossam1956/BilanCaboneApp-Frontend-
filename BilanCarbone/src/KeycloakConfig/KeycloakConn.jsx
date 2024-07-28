import axios from 'axios';

const token = sessionStorage.getItem('token');
export const apiClient = axios.create({
  baseURL: 'http://localhost:8081/api',
  headers: {
    Authorization: `${token}`
  }
});


