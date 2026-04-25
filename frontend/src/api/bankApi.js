import axios from 'axios';

const API_URL = 'http://localhost:8080/api/customers';

export const bankApi = {
  register: async (customerData) => {
    const response = await axios.post(`${API_URL}/register`, customerData);
    return response.data;
  },
  
  login: async (email, pin) => {
    const response = await axios.post(`${API_URL}/login`, null, {
      params: { email, pin }
    });
    return response.data;
  },

  getBalance: async (accountNumber) => {
    const response = await axios.get(`${API_URL}/${accountNumber}/balance`);
    return response.data;
  },

  getStatement: async (accountNumber) => {
    const response = await axios.get(`${API_URL}/${accountNumber}/statement`);
    return response.data;
  },

  credit: async (accountNumber, amount) => {
    const response = await axios.post(`${API_URL}/${accountNumber}/credit`, null, {
      params: { amount }
    });
    return response.data;
  },

  debit: async (accountNumber, amount) => {
    const response = await axios.post(`${API_URL}/${accountNumber}/debit`, null, {
      params: { amount }
    });
    return response.data;
  }
};
