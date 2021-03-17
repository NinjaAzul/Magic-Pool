import axios from 'axios';

const api = axios.create({
  baseURL: 'http://18.228.241.53:4001',
  //baseURL: 'http://192.168.0.108:4001',
});

export default api;
