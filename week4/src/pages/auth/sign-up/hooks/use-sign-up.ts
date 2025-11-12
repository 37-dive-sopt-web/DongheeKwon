import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import {
  signUpSchema,
  type SignUpData,
} from "@pages/auth/sign-up/constants/schema";
import { signIn } from "@pages/auth/apis/sign-in";
import { ROUTES } from "@router/constants/routes";

export const useSignUp = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"username" | "password" | "details">(
    "username"
  );

  const {
    handleSubmit: handleSubmitForm,
    setValue,
    control,
    trigger,
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

  const handleSubmit = handleSubmitForm(async (data) => {
    try {
      await signIn(data);
      alert("회원가입이 완료되었습니다. 로그인을 진행하세요.");
      navigate(ROUTES.LOG_IN);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "회원가입 중 오류가 발생했습니다.";
      alert(errorMessage);
      handleStep("username");
    }
  });

  const handleStep = async (nextStep: "username" | "password" | "details") => {
    if (nextStep === "password") {
      const isValid = await trigger("username");
      if (!isValid) {
        return;
      }
    }
    if (nextStep === "details") {
      const isValid = await trigger(["password", "confirmPassword"]);
      if (!isValid) {
        return;
      }
    }
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
