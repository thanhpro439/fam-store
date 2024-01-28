import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;
console.log(import.meta.env);

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default axiosClient;
