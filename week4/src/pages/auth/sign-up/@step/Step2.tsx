import { Link } from "react-router-dom";

import { PLACEHOLDER } from "@pages/auth/constants/index";
import { Button, Input } from "@components/index";
import { ROUTES } from "@router/constants/routes";

interface Step2Props {
  handleStep: (_nextStep: "details") => void;
  password: string;
  confirmPassword: string;
  handlePasswordChange: (_password: string) => void;
  handleConfirmPasswordChange: (_confirmPassword: string) => void;
  error?: string;
}

export default function Step2({
  handleStep,
  password,
  confirmPassword,
  handlePasswordChange,
  handleConfirmPasswordChange,
  error,
}: Step2Props) {
  return (
    <div className="flex flex-col gap-[1.5rem]">
      <Input
        placeholder={PLACEHOLDER.PASSWORD}
        value={password}
        type="password"
        onChange={(e) => handlePasswordChange(e.target.value)}
      />
      <Input
        placeholder={PLACEHOLDER.CONFIRM_PASSWORD}
        value={confirmPassword}
        type="password"
        onChange={(e) => handleConfirmPasswordChange(e.target.value)}
      />
      {error && <p className="text-red body-size-14">{error}</p>}
      <div className="flex flex-col gap-[1rem]">
        <Button onClick={() => handleStep("details")}>다음</Button>
        <Link
          to={ROUTES.LOG_IN}
          className="text-primary-900 body-size-14 text-center"
        >
          로그인
        </Link>
      </div>
    </div>
  );
}
