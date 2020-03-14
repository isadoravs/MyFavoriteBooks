import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.googleapis.com/books/v1/',
  headers: {
    Accept: 'application/json',
  },
});

export default api;
