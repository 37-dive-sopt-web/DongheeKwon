import { apiRequest } from "@/api/apiRequest";

export type DeleteProfileResponse = {
  success: boolean;
  code: string;
  message: string;
  data: Record<string, never>;
};

export const deleteProfile = async (userId: number) => {
  const response = await apiRequest<DeleteProfileResponse>({
    endPoint: `/api/v1/users/${userId}`,
    method: "DELETE",
  });
  if ("success" in response && response.success === false) {
    throw new Error(response.message);
  }
  return response.success;
};
