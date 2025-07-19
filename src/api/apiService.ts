import axios from "./axiosInstance";

const apiService = {
  get: async <T>(url: string, config = {}): Promise<T> => {
    const response = await axios.get<T>(url, config);
    return response.data;
  },

  post: async <T>(url: string, data: any, config = {}): Promise<T> => {
    const response = await axios.post<T>(url, data, config);
    return response.data;
  },

  put: async <T>(url: string, data: any, config = {}): Promise<T> => {
    const response = await axios.put<T>(url, data, config);
    return response.data;
  },

  delete: async <T>(url: string, config = {}): Promise<T> => {
    const response = await axios.delete<T>(url, config);
    return response.data;
  },
};

export default apiService;
