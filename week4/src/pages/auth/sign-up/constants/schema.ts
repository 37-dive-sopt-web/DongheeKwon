import { z } from "zod";
import { baseProfileSchema } from "@/constants/auth-schema";
import { ERRORS } from "../../constants/errors";

export const signUpSchema = baseProfileSchema.refine(
  (data) => data.confirmPassword === data.password,
  {
    message: ERRORS.CONFIRM_PASSWORD_REQUIRED,
    path: ["confirmPassword"],
  }
);

export type SignUpData = z.infer<typeof signUpSchema>;
