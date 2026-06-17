import API from './axios';

export const createStore = (data) =>
  API.post('/store/create', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const getMyStore = () => API.get('/store/my-store');

export const updateStore = (data) =>
  API.put('/store/update', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const getStoreById = (id) => API.get(`/store/${id}`);