import axios from 'axios';
// import { env } from '../config/environment.js';

const axiosClient = axios.create({
  baseURL: 'http://localhost:4000/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosClient;
