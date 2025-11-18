import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { MENUS } from "@pages/my-page/components/constants/menus";
import { ROUTES } from "@router/constants/routes";
import { deleteProfile } from "../apis/delete-profile";
import { removeUserId } from "@utils/auth";

export const useMenu = (userId: number) => {
  const [selectedMenu, setSelectedMenu] = useState<string>(MENUS[0].key);
  const navigate = useNavigate();
  const handleSelectMenu = (key: string) => {
    setSelectedMenu(key);
    if (key === "LOGOUT") {
      handleLogout();
    }
    if (key === "WITHDRAWAL") {
      handleWithdrawal();
    }
  };

  const handleLogout = () => {
    removeUserId();
    alert("로그아웃 되었습니다.");
    navigate(ROUTES.LOG_IN);
  };
  const handleWithdrawal = async () => {
    try {
      await deleteProfile(Number(userId));
      removeUserId();
      alert("회원탈퇴 되었습니다.");
    } catch (error) {
      console.error(error);
    }
    navigate(ROUTES.LOG_IN);
  };

  return { selectedMenu, handleSelectMenu };
};
