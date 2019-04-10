import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api',
  timeout: 1000,
  crossDomain: true,

});

export default API;
