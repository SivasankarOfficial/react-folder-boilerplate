import apiService from "../../api/apiService";
import { User } from "../../types/user.types";

// GET: Fetch user by ID
export const getJobsById = (id: any): Promise<User> => {
  return apiService.get<User>(`/api/jobs/${id}`);
};

export const getJAllobs = (id: any): Promise<User> => {
  return apiService.get<User>(`/api/jobs/${id}`);
};

// POST: Create a new user
export const createJobs = (jobsData: any): any => {
  console.log("JobsData in profileAPI:", jobsData);
  return apiService.post<User>("/api/jobs", jobsData);
};

// PUT: Update an existing user
export const updateJobs = (id: any, userData: any): Promise<User> => {
  return apiService.put<User>(`/api/jobs`, userData);
};
