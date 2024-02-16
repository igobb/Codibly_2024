import axios from 'axios';

export interface Product {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
}

export interface ApiResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: Product[];
  support: {
    url: string;
    text: string;
  };
}

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

  getProductById: async (productId: number): Promise<Product> => {
    try {
      const response = await axios.get(`${API_URL}?id=${productId}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch product by ID');
    }
  },
};

export default ProductService;
