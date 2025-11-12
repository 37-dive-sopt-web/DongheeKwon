import { apiRequest } from "@api/apiRequest";
import type { LoginData } from "@pages/auth/log-in/constants/schema";

type SignInResponse = {
  success: boolean;
  code: string;
  message: string;
  data: {
    userId: number;
    message: string;
  };
};

export const signIn = async (data: LoginData): Promise<number> => {
  const response = await apiRequest<SignInResponse>({
    endPoint: "/api/v1/users",
    method: "POST",
    data,
  });

  if ("success" in response && response.success === false) {
    throw new Error(response.message);
  }

  return response.data?.userId ?? 0;
};
