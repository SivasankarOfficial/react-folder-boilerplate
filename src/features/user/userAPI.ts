import apiService from "../../api/apiService";
import { User } from "../../types/user.types";

// GET: Fetch user by ID
export const getUserById = (id: any): Promise<User> => {
  return apiService.get<User>(`/users/${id}`);
};

// POST: Create a new user
export const createUser = (userData: any): Promise<User> => {
  return apiService.post<User>("/users", userData);
};

// PUT: Update an existing user
export const updateUser = (id: any, userData: any): Promise<User> => {
  return apiService.put<User>(`/users/${id}`, userData);
};

// DELETE: Delete a user
export const deleteUser = (id: any): Promise<{ message: any }> => {
  return apiService.delete<{ message: string }>(`/users/${id}`);
};
