import axios from 'axios';

const axiosConfig = {
  baseURL: 'https://api.themoviedb.org',
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_API_KEY5}`,
    accept: 'application/json',
  },
  params: {
    query: '',
    include_adult: false,
    language: 'en-US',
  },
  signal: null,
};
export const getPopular = async signal => {
  axiosConfig.signal = signal;
  const response = await axios.get('/3/trending/movie/day', axiosConfig);
  return response.data;
};
export const getMoviesByName = async (query, signal) => {
  axiosConfig.signal = signal;
  axiosConfig.params.query = query;
  const response = await axios.get('/3/search/movie', axiosConfig);
  return response.data;
};
export const getMovieById = async (id, signal) => {
  axiosConfig.signal = signal;
  const response = await axios.get(`/3/movie/${id}`, axiosConfig);
  return response.data;
};
export const getCast = async (id, signal) => {
  axiosConfig.signal = signal;
  const response = await axios.get(`/3/movie/${id}/credits`, axiosConfig);
  return response.data;
};
export const getReviews = async (id, signal) => {
  axiosConfig.signal = signal;
  const response = await axios.get(`/3/movie/${id}/reviews`, axiosConfig);
  return response.data;
};
