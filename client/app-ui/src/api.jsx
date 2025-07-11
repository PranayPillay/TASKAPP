import axios from 'axios';
import cors from 'cors';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Auth
export const signup = (data) => API.post('/auth/signup', data);
export const login = (data) => API.post('/auth/login', data);

// Tasks
export const getTasks = (token) => {
  console.log("API request header token:", token);
  return API.get('/tasks/view', { headers: { Authorization: `Bearer ${token}` } });
};
export const createTask = (data, token) => API.post('/tasks/create', data, { headers: { Authorization: `Bearer ${token}` } });
export const updateTask = (id, data, token) => API.put(`/tasks/update/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });
export const deleteTask = (id, token) => API.delete(`/tasks/delete/${id}`, { headers: { Authorization: `Bearer ${token}` } });
