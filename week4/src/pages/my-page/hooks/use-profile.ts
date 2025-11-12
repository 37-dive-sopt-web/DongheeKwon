import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  profileUpdateSchema,
  type ProfileUpdateData,
} from "@pages/auth/sign-up/constants/schema";

export const useProfile = (initialData: ProfileUpdateData) => {
  const {
    handleSubmit: handleSubmitForm,
    setValue,
    control,
    formState: { errors },
  } = useForm<ProfileUpdateData>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: initialData,
    mode: "onChange",
  });

  const formData = useWatch({ control });

  const handleSubmit = handleSubmitForm((data) => {
    console.log(data);
  });

  const updateNameChange = (name: string) => {
    setValue("name", name, { shouldValidate: true });
  };

  const updateEmailChange = (email: string) => {
    setValue("email", email, { shouldValidate: true });
  };

  const updateAgeChange = (age: string) => {
    setValue("age", age, { shouldValidate: true });
  };

  const compatibleErrors = {
    name: errors.name?.message,
    email: errors.email?.message,
    age: errors.age?.message,
  };

  return {
    formData,
    errors: compatibleErrors,
    updateNameChange,
    updateEmailChange,
    updateAgeChange,
    handleSubmit,
  };
};
