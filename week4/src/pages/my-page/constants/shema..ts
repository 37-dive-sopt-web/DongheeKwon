import { z } from "zod";
import { baseProfileSchema } from "@constants/index";

export const profileUpdateSchema = baseProfileSchema.pick({
  name: true,
  email: true,
  age: true,
});

export type ProfileUpdateData = z.infer<typeof profileUpdateSchema>;
