import { z } from "zod";
import { baseProfileSchema } from "@/constants/auth-schema";

export const loginSchema = baseProfileSchema.pick({
  username: true,
  password: true,
});

export type LoginData = z.infer<typeof loginSchema>;
