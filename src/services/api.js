import axios from 'axios';

const BASE = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';
const api = axios.create({ baseURL: BASE, headers: { 'Content-Type': 'application/json' } });

export const fetchJobs = () => api.get('/jobs');
export const fetchJob = (id) => api.get(`/jobs/${id}`);
export const createJob = (job) => api.post('/jobs', job);
export const updateJob = (id, job) => api.put(`/jobs/${id}`, job);
export const deleteJob = (id) => api.delete(`/jobs/${id}`);