import API from './axios';

export const getVendorAnalytics = () => API.get('/analytics/vendor');
export const getVendorOrders = () => API.get('/analytics/orders');