import axios from 'axios';
import { BASE_URL } from '../utils/config';

const api = axios.create({
  baseURL: BASE_URL,
});

export const getMovies = async () => {
  const response = await api.get('/movies');
  return response.data;
};

export const addMovie = async (movieData) => {
  const response = await api.post('/movies', movieData);
  return response.data;
};
