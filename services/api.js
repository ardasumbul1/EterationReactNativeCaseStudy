// services/api.js
import axios from 'axios';

export const fetchData = async (page, pageSize = 12) => {
  try {
    const response = await axios.get(`https://5fc9346b2af77700165ae514.mockapi.io/products`, {
      params: {
        page,
        limit: pageSize
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};