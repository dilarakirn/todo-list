import axios from 'axios';

export default axios.create({
  baseURL: "https://todoexapp.herokuapp.com" || "http://localhost:8000"
});