import apiService from "../../api/apiService";
import { User } from "../../types/user.types";

// GET: Fetch user by ID
export const getUserById = (id: any): Promise<User> => {
  return apiService.get<User>(`/profile/me/${id}`);
};

// POST: Create a new user
export const createProfile = (userData: any): any => {
  //   delete userData.profileImage; // Remove skills from userData
  console.log("userData in profileAPI:", userData);

  //   return;
  return apiService.post<User>("/profile", userData);
};

// PUT: Update an existing user
export const updateProfile = (id: any, userData: any): Promise<User> => {
  return apiService.put<User>(`/profile`, userData);
};

// DELETE: Delete a user
export const deleteUser = (id: any): Promise<{ message: any }> => {
  return apiService.delete<{ message: string }>(`/users/${id}`);
};
