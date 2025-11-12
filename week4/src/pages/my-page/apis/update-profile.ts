import { apiRequest } from "@/api/apiRequest";
import type { ProfileResponse } from "./get-profile";
import type { ProfileUpdateData } from "../constants/shema.";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@constants/query-key";

export const updateProfile = async (
  userId: number,
  data: ProfileUpdateData
) => {
  const response = await apiRequest<ProfileResponse>({
    endPoint: `/api/v1/users/${userId}`,
    method: "PATCH",
    data,
  });
  if ("success" in response && response.success === false) {
    throw new Error(response.message);
  }
  return response.data;
};

export const useUpdateProfile = (userId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ProfileUpdateData) => updateProfile(userId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.USER(userId.toString()),
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
