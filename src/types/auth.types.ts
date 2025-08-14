export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: "client" | "freelancer" | "admin";
}

export interface AuthState {
  user: {};
  loading: boolean;
  error: string | null;
  selectedRole: "client" | "freelancer" | "admin" | null;
}
