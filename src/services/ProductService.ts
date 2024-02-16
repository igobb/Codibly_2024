import { ApiResponse, ApiResponseWithFilter } from './productServiceTypes';
import axios from 'axios';

const API_URL = import.meta.env.VITE_BASE_URL;

const ProductService = {
  getProducts: async (page: number, perPage: number): Promise<ApiResponse> => {
    try {
      const response = await axios.get(
        `${API_URL}?page=${page}&per_page=${perPage}`,
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch products');
    }
  },

  getProductById: async (productId: number): Promise<ApiResponseWithFilter> => {
    try {
      const response = await axios.get(`${API_URL}?id=${productId}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch product by ID');
    }
  },
};

export default ProductService;
