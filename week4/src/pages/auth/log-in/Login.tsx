import { Link } from "react-router-dom";
import { ROUTES } from "@router/constants/routes";

import { useLogin } from "@pages/auth/log-in/hooks/use-login";
import { PLACEHOLDER } from "@constants/index";
import { Button, Input } from "@components/index";

export default function Login() {
  const {
    formData,
    errors,
    handleLogin,
    handleUsernameChange,
    handlePasswordChange,
  } = useLogin();
  return (
    <div className="flex flex-col gap-[2rem]">
      <h1 className="text-primary-900 heading-sb-30">Login</h1>
      <div className="flex flex-col gap-[1.5rem]">
        <Input
          placeholder={PLACEHOLDER.USERNAME}
          value={formData.username ?? ""}
          onChange={(e) => handleUsernameChange(e.target.value)}
        />
        <Input
          type="password"
          placeholder={PLACEHOLDER.PASSWORD}
          value={formData.password ?? ""}
          onChange={(e) => handlePasswordChange(e.target.value)}
        />
        {errors.username && (
          <p className="text-red body-size-14">{errors.username}</p>
        )}
        {errors.password && (
          <p className="text-red body-size-14">{errors.password}</p>
        )}
        <div className="flex flex-col gap-[1rem]">
          <Button onClick={handleLogin}>로그인</Button>
          <Link
            to={ROUTES.SIGN_UP}
            className="text-primary-900 body-size-14 text-center"
          >
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}
