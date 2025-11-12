import { clsx } from "clsx";

export const cn = (...classes: (string | undefined | null | boolean)[]) => {
  return clsx(...classes);
};
