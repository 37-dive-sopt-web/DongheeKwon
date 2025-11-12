import { z } from "zod";
import { baseProfileSchema } from "@/constants/auth-schema";

export const profileUpdateSchema = baseProfileSchema.pick({
  name: true,
  email: true,
  age: true,
});

export type ProfileUpdateData = z.infer<typeof profileUpdateSchema>;
