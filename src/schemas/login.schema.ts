import { z } from "zod";

export const loginSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
