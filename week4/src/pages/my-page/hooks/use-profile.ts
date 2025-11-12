import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  profileUpdateSchema,
  type ProfileUpdateData,
} from "@pages/my-page/constants/shema.";
import { updateProfile } from "@pages/my-page/apis/update-profile";

export const useProfile = (initialData: ProfileUpdateData, userId: number) => {
  const {
    handleSubmit: handleSubmitForm,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm<ProfileUpdateData>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: initialData,
    mode: "onChange",
  });

  const formData = useWatch({ control });

  useEffect(() => {
    reset(initialData);
  }, [initialData, reset]);

  const handleSubmit = handleSubmitForm(async (data) => {
    try {
      await updateProfile(userId, data);
      alert("프로필 업데이트가 완료되었습니다.");
    } catch (error) {
      console.error(error);
    }
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
