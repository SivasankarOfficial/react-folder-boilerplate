export interface User {
  id: string;
  name: string;
  email: string;
}

export enum UserRole {
  Admin = "admin",
  User = "user",
}
