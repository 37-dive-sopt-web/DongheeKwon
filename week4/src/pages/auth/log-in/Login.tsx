import { Link } from "react-router-dom";
import { ROUTES } from "@router/constants/routes";

import { useLogin } from "@pages/auth/log-in/hooks/use-login";
import { PLACEHOLDER } from "@pages/auth/constants/index";
import { Button, Input } from "@components/index";

export default function Login() {
  const {
    id,
    password,
    error,
    handleIdChange,
    handlePasswordChange,
    handleLogin,
  } = useLogin();
  return (
    <div className="flex flex-col gap-[2rem]">
      <h1 className="text-primary-900 heading-sb-30">Login</h1>
      <div className="flex flex-col gap-[1.5rem]">
        <Input
          placeholder={PLACEHOLDER.ID}
          value={id}
          onChange={handleIdChange}
        />
        <Input
          placeholder={PLACEHOLDER.PASSWORD}
          value={password}
          onChange={handlePasswordChange}
        />
        {error && <p className="text-red body-size-14">{error}</p>}
        <div className="flex flex-col gap-[1rem]">
          <Button type="submit">로그인</Button>
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
