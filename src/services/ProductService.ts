import { ValidationError } from './productServiceTypes';
import axios from 'axios';

const API_URL = import.meta.env.VITE_BASE_URL;

const ProductService = {
  getProducts: async (page: Number) => {
    try {
      const response = await axios.get(`${API_URL}?page=${page}&per_page=5`);

      return response.data;
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        console.log(error.status);
        console.error(error.response);

        return error;
      } else {
        console.error(error);
      }
    }
  },

  getProductById: async (productId: number) => {
    try {
      const response = await axios.get(`${API_URL}?id=${productId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        console.log(error.status);
        console.error(error.response);

        return error;
      } else {
        console.error(error);
      }
    }
  },
};

export default ProductService;
