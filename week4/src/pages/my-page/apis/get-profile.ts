import { apiRequest } from "@/api/apiRequest";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "@constants/query-key";

export type ProfileResponse = {
  success: boolean;
  code: string;
  message: string;
  data: {
    id: number;
    username: string;
    name: string;
    email: string;
    age: number;
    status: string;
  };
};

export const getProfile = async (userId: number) => {
  const response = await apiRequest<ProfileResponse>({
    endPoint: `/api/v1/users/${userId}`,
    method: "GET",
  });
  if ("success" in response && response.success === false) {
    throw new Error(response.message);
  }
  return response.data;
};

export const useGetProfile = (userId: number) => {
  return useQuery({
    queryKey: QUERY_KEY.USER(userId.toString()),
    queryFn: () => getProfile(userId),
    enabled: !isNaN(userId),
  });
};
