import { z } from "zod";

export const formSchema = z
  .object({
    bio: z.string().min(50, "Bio must be at least 50 characters long"),

    skills: z.array(z.string()).min(1, "Please add at least one skill"),

    hourlyRate: z.number().positive("Please enter a valid hourly rate").optional(),

    userRole: z.enum(["FREELANCER", "CLIENT"]),
  })
  .refine((data) => data.userRole !== "FREELANCER" || (data.hourlyRate && data.hourlyRate > 0), {
    path: ["hourlyRate"],
    message: "Please enter a valid hourly rate",
  });
