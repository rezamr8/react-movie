import http from './httpService';
import { apiUrl } from '../config.json';

const API_USERS = `${apiUrl}/users`;

export function register(user) {
  return http.post(API_USERS, {
    email: user.username,
    name: user.name,
    password: user.password,
  });
}
