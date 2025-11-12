import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { MENUS } from "@pages/my-page/components/constants/menus";
import { ROUTES } from "@router/constants/routes";

export const useMenu = () => {
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
    alert("로그아웃");
    navigate(ROUTES.LOG_IN);
    console.log("로그아웃");
  };
  const handleWithdrawal = () => {
    alert("회원탈퇴");
    navigate(ROUTES.LOG_IN);
    console.log("회원탈퇴");
  };

  return { selectedMenu, handleSelectMenu };
};
