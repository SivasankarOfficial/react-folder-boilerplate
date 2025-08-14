// schemas/loginSchema.ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" })
    .regex(/[A-Z]/, { message: "Must contain an uppercase letter" })
    .regex(/[a-z]/, { message: "Must contain a lowercase letter" })
    .regex(/[0-9]/, { message: "Must contain a number" })
    .regex(/[^A-Za-z0-9]/, { message: "Must contain a special character" }),
});
