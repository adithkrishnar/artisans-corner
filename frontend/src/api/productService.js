import API from './axios';

export const getAllProducts = (params) => API.get('/products', { params });
export const getProductById = (id) => API.get(`/products/${id}`);
export const getMyProducts = () => API.get('/products/my-products');

export const createProduct = (data) =>
  API.post('/products', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const updateProduct = (id, data) =>
  API.put(`/products/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const deleteProduct = (id) => API.delete(`/products/${id}`);