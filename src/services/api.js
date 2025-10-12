const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to make API calls
const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...options,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API call failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    // Return mock data for development if API fails
    if (endpoint.includes('/orders')) {
      return { data: { orders: [] } };
    }
    if (endpoint.includes('/analytics')) {
      return { data: { summary: { totalRevenue: 0, totalOrders: 0 } } };
    }
    throw error;
  }
};

// Auth API
export const authAPI = {
  login: (email, password) => 
    apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  
  getMe: () => apiCall('/auth/me'),
  
  logout: () => apiCall('/auth/logout', { method: 'POST' }),
};

// Orders API
export const ordersAPI = {
  getAll: () => apiCall('/orders'),
  
  getById: (id) => apiCall(`/orders/${id}`),
  
  create: (orderData) => 
    apiCall('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    }),
  
  update: (id, orderData) => 
    apiCall(`/orders/${id}`, {
      method: 'PUT',
      body: JSON.stringify(orderData),
    }),
  
  updateStatus: (id, status, comment) => 
    apiCall(`/orders/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status, comment }),
    }),
  
  delete: (id) => 
    apiCall(`/orders/${id}`, {
      method: 'DELETE',
    }),
  
  getStats: () => apiCall('/orders/stats/overview'),
};

// Clients API
export const clientsAPI = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`/clients${queryString ? `?${queryString}` : ''}`);
  },
  
  getById: (id) => apiCall(`/clients/${id}`),
  
  create: (clientData) => 
    apiCall('/clients', {
      method: 'POST',
      body: JSON.stringify(clientData),
    }),
  
  update: (id, clientData) => 
    apiCall(`/clients/${id}`, {
      method: 'PUT',
      body: JSON.stringify(clientData),
    }),
  
  updateMeasurements: (id, measurements) => 
    apiCall(`/clients/${id}/measurements`, {
      method: 'PUT',
      body: JSON.stringify(measurements),
    }),
  
  delete: (id) => 
    apiCall(`/clients/${id}`, {
      method: 'DELETE',
    }),
  
  getStats: () => apiCall('/clients/stats'),
};

// Payments API
export const paymentsAPI = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`/payments${queryString ? `?${queryString}` : ''}`);
  },
  
  getById: (id) => apiCall(`/payments/${id}`),
  
  create: (paymentData) => 
    apiCall('/payments', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    }),
  
  update: (id, paymentData) => 
    apiCall(`/payments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(paymentData),
    }),
  
  processRefund: (id, amount, reason) => 
    apiCall(`/payments/${id}/refund`, {
      method: 'POST',
      body: JSON.stringify({ amount, reason }),
    }),
  
  getStats: () => apiCall('/payments/stats/overview'),
};

// Analytics API
export const analyticsAPI = {
  getDashboard: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`/analytics/dashboard${queryString ? `?${queryString}` : ''}`);
  },
  
  getRevenue: (period = 'month') => 
    apiCall(`/analytics/revenue?period=${period}`),
  
  getClients: () => apiCall('/analytics/clients'),
  
  getOrders: () => apiCall('/analytics/orders'),
};

// Invoices API
export const invoicesAPI = {
  generatePDF: (orderId) => 
    apiCall(`/invoices/${orderId}`, {
      method: 'GET',
      responseType: 'blob',
    }),
  
  getData: (orderId) => apiCall(`/invoices/${orderId}/data`),
};

export default {
  auth: authAPI,
  orders: ordersAPI,
  clients: clientsAPI,
  payments: paymentsAPI,
  analytics: analyticsAPI,
  invoices: invoicesAPI,
};
