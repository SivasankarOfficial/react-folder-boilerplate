import apiService from "../apiService";

// Generic SWR fetcher for GET requests
export const fetcher = <T>(url: string): Promise<T> => {
  return apiService.get<T>(url);
};
