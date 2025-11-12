import { z } from "zod";

import { ERRORS } from "@pages/auth/constants/index";

export const baseProfileSchema = z.object({
  username: z.string().min(1, ERRORS.ID_REQUIRED),
  password: z
    .string()
    .min(1, ERRORS.PASSWORD_REQUIRED)
    .refine((val) => val.length >= 8 && val.length <= 64, {
      message: ERRORS.PASSWORD_INVALID,
    })
    .refine((val) => !/\s/.test(val), {
      message: ERRORS.PASSWORD_INVALID,
    })
    .refine((val) => /[A-Z]/.test(val), {
      message: ERRORS.PASSWORD_INVALID,
    })
    .refine((val) => /[a-z]/.test(val), {
      message: ERRORS.PASSWORD_INVALID,
    })
    .refine((val) => /[0-9]/.test(val), {
      message: ERRORS.PASSWORD_INVALID,
    })
    .refine((val) => /[^A-Za-z0-9]/.test(val), {
      message: ERRORS.PASSWORD_INVALID,
    }),
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
