import axios from 'axios';

const ADMIN_API_URL = 'http://localhost:8080/api/admin';

export const adminApi = {
  getAllCustomers: async () => {
    const response = await axios.get(`${ADMIN_API_URL}/customers`);
    return response.data;
  },
  
  getAllTransactions: async () => {
    const response = await axios.get(`${ADMIN_API_URL}/transactions`);
    return response.data;
  }
};
