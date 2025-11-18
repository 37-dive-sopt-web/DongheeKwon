import { useNavigate } from "react-router-dom";

import { logIn } from "@pages/auth/apis/log-in";
import { ROUTES } from "@router/constants/routes";
import {
  loginSchema,
  type LoginData,
} from "@pages/auth/log-in/constants/schema";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { setUserId } from "@utils/auth";

export const useLogin = () => {
  const navigate = useNavigate();
  const {
    setValue,
    control,
    trigger,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onChange",
  });

  const formData = useWatch({ control });

  const handleLogin = async () => {
    const isValid = await trigger();
    if (!isValid) {
      return;
    }
    try {
      const userId = await logIn(
        formData.username ?? "",
        formData.password ?? ""
      );
      setUserId(userId);
      navigate(`${ROUTES.MY_PAGE}?userId=${userId}`);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "로그인 중 오류가 발생했습니다.";
      alert(errorMessage);
    }
  };

  const handleUsernameChange = (username: string) => {
    setValue("username", username, { shouldValidate: true });
  };
  const handlePasswordChange = (password: string) => {
    setValue("password", password, { shouldValidate: true });
  };

  const compatibleErrors = {
    username: errors.username?.message,
    password: errors.password?.message,
  };

  return {
    formData,
    handleLogin,
    handleUsernameChange,
    handlePasswordChange,
    errors: compatibleErrors,
  };
};
