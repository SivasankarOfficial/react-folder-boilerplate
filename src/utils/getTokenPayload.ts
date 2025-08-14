// utils/auth.ts
import { jwtDecode } from "jwt-decode";
interface TokenPayload {
  id: string;
  name: string;
  email: string;
  role: string;
}

export const getTokenPayload = (): TokenPayload | null => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode<TokenPayload>(token);
    console.log("Decoded token payload:", decoded);

    return decoded;
  } catch (error) {
    console.error("Invalid token");
    return null;
  }
};
