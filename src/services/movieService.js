import http from './httpService';
import { apiUrl } from '../config.json';

const API_MOVIES = `${apiUrl}/movies`;
export function getMovies() {
  return http.get(API_MOVIES);
}
export function deleteMovie(movieId) {
  return http.delete(`${API_MOVIES}/${movieId}`);
}

export function getMovie(id) {
  return http.get(`${API_MOVIES}/${id}`);
}

export function saveMovie(movie) {
  // update or save
  if (movie._id) {
    const body = { ...movie };
    delete body._id;

    return http.put(`${API_MOVIES}/${movie._id}`, body);
  }
  return http.post(`${API_MOVIES}`, movie);
}
