import { z } from "zod";

import { ERRORS } from "@pages/auth/constants/index";

const baseProfileSchema = z.object({
  username: z.string().min(1, ERRORS.ID_REQUIRED),
  password: z.string().min(1, ERRORS.PASSWORD_REQUIRED),
  confirmPassword: z.string().min(1, ERRORS.CONFIRM_PASSWORD_REQUIRED),
  name: z.string().min(1, ERRORS.NAME_REQUIRED),
  email: z.string().min(1, ERRORS.EMAIL_REQUIRED).email(ERRORS.INVALID_EMAIL),
  age: z
    .string()
    .min(1, ERRORS.AGE_REQUIRED)
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: ERRORS.INVALID_AGE,
    }),
});

export const signUpSchema = baseProfileSchema.refine(
  (data) => data.confirmPassword === data.password,
  {
    message: ERRORS.CONFIRM_PASSWORD_REQUIRED,
    path: ["confirmPassword"],
  }
);

export const profileUpdateSchema = baseProfileSchema.pick({
  name: true,
  email: true,
  age: true,
});

export type SignUpData = z.infer<typeof signUpSchema>;
export type ProfileUpdateData = z.infer<typeof profileUpdateSchema>;
