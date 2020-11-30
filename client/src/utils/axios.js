import axios from 'axios';

export default axios.create({
  baseURL: process.env.baseURL || "http://localhost:8000"
});