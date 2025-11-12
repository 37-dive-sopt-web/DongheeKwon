import { z } from "zod";

import { ERRORS } from "@pages/auth/constants/index";

export const signUpSchema = z
  .object({
    id: z.string().min(1, ERRORS.ID_REQUIRED),
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
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: ERRORS.CONFIRM_PASSWORD_REQUIRED,
    path: ["confirmPassword"],
  });

export type SignUpData = z.infer<typeof signUpSchema>;
