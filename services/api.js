import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://5fc9346b2af77700165ae514.mockapi.io',
});

export const fetchData = () => {
  return apiClient.get('/products');
};
