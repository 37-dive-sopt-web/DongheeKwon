import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  signUpSchema,
  type SignUpData,
} from "@pages/auth/sign-up/constants/schema";

export const useSignUp = () => {
  const [step, setStep] = useState<"username" | "password" | "details">(
    "username"
  );

  const {
    handleSubmit: handleSubmitForm,
    setValue,
    control,
    formState: { errors },
  } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      name: "",
      email: "",
      age: "",
    },
    mode: "onChange",
  });

  const formData = useWatch({ control });

  const handleSubmit = handleSubmitForm((data) => {
    console.log(data);
  });

  const handleStep = (nextStep: "username" | "password" | "details") => {
    setStep(nextStep);
  };

  const updateUsernameChange = (username: string) => {
    setValue("username", username, { shouldValidate: true });
  };

  const updatePasswordChange = (password: string) => {
    setValue("password", password, { shouldValidate: true });
  };

  const updateConfirmPasswordChange = (confirmPassword: string) => {
    setValue("confirmPassword", confirmPassword, {
      shouldValidate: true,
    });
  };

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
    username: errors.username?.message,
    password: errors.password?.message,
    confirmPassword: errors.confirmPassword?.message,
    name: errors.name?.message,
    email: errors.email?.message,
    age: errors.age?.message,
  };

  return {
    step,
    formData,
    errors: compatibleErrors,
    handleStep,
    updateUsernameChange,
    updatePasswordChange,
    updateConfirmPasswordChange,
    updateNameChange,
    updateEmailChange,
    updateAgeChange,
    handleSubmit,
  };
};
