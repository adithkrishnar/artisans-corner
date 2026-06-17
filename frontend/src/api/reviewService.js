import API from './axios';

export const getProductReviews = (productId) => API.get(`/reviews/${productId}`);
export const createReview = (productId, data) => API.post(`/reviews/${productId}`, data);