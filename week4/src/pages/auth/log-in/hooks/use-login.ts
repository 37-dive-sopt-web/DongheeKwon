import { useState } from "react";

import { ERRORS } from "@pages/auth/constants/index";

export const useLogin = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id) {
      setError(ERRORS.ID_REQUIRED);
      return;
    }
    if (!password) {
      setError(ERRORS.PASSWORD_REQUIRED);
      return;
    }
    console.log(id, password);
  };

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return {
    id,
    password,
    handleLogin,
    handleIdChange,
    handlePasswordChange,
    error,
  };
};
