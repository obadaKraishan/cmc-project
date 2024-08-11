import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001', // Adjust the baseURL according to your backend server
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
