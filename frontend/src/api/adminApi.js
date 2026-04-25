import axios from 'axios';

const ADMIN_API_URL = 'http://localhost:8080/api/admin';

export const adminApi = {
  login: async (email, pin) => {
    const response = await axios.post(`${ADMIN_API_URL}/login`, null, {
      params: { email, pin }
    });
    return response.data;
  },

  getAllCustomers: async () => {
    const response = await axios.get(`${ADMIN_API_URL}/customers`);
    return response.data;
  },
  
  getAllTransactions: async () => {
    const response = await axios.get(`${ADMIN_API_URL}/transactions`);
    return response.data;
  }
};
