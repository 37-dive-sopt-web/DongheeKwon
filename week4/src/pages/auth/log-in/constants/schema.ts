import { z } from "zod";
import { baseProfileSchema } from "@constants/index";

export const loginSchema = baseProfileSchema.pick({
  username: true,
  password: true,
});

export type LoginData = z.infer<typeof loginSchema>;
