export interface Profile {
  id?: string;
  userId?: string;
  bio?: string;
  skills?: string[];
  hourlyRate?: number;
  availability?: string;
  profileImage?: string | File | null;
  [key: string]: any; // optional: to allow flexible keys
}
export interface ProfileState {
  profile: Profile;
  loading: boolean;
  error: string | null;
}

export interface jobs {
  id?: string;
  userId?: string;
  title?: string;
  description?: string;
  category?: string;
  budget?: number;
}
export interface jobState {
  jobs: Profile;
  loading: boolean;
  error: string | null;
}
