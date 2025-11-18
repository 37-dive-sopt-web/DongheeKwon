import { apiRequest } from "@api/apiRequest";

export type LoginResponse = {
  success: boolean;
  code: string;
  message: string;
  data: {
    userId: number;
    message: string;
  };
};

export const logIn = async (
  username: string,
  password: string
): Promise<number> => {
  const response = await apiRequest<LoginResponse>({
    endPoint: "/api/v1/auth/login",
    method: "POST",
    data: { username, password },
  });

  if ("success" in response && response.success === false) {
    throw new Error(response.message);
  }

  return response.data?.userId ?? 0;
};
