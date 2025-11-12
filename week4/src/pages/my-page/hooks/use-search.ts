import { useState } from "react";
import { getProfile } from "@pages/my-page/apis/get-profile";
import type { ProfileResponse } from "@pages/my-page/apis/get-profile";

export const useSearch = () => {
  const [userId, setUserId] = useState<number | null>(null);
  const [profile, setProfile] = useState<ProfileResponse["data"] | null>(null);

  const handleSearch = (value: string) => {
    setUserId(Number(value));
  };

  const handleSearchClick = async () => {
    try {
      const response = await getProfile(userId ?? 0);
      setProfile(response);
    } catch (error) {
      console.error(error);
      setProfile(null);
    }
  };
  return { userId, handleSearch, handleSearchClick, profile };
};
