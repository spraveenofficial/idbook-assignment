import { z } from "zod";

export const addEmployeeSchema = z.object({
    first_name: z
      .string()
      .min(1, "First name is required")
      .max(50, "First name must be at most 50 characters long"),
    last_name: z
      .string()
      .min(1, "Last name is required")
      .max(50, "Last name must be at most 50 characters long"),
    email: z.string().email("Invalid email address"),
  });