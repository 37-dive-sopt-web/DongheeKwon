import { Link } from "react-router-dom";

import { ROUTES } from "@router/constants/routes";
import { PLACEHOLDER } from "@pages/auth/constants/index";
import { Button, Input } from "@components/index";

interface Step1Props {
  handleStep: (_nextStep: "password") => void;
  updateIdChange: (id: string) => void;
  id: string;
  error?: string;
}

export default function Step1({
  handleStep,
  updateIdChange,
  id,
  error,
}: Step1Props) {
  return (
    <div className="flex flex-col gap-[1.5rem]">
      <Input
        placeholder={PLACEHOLDER.ID}
        value={id}
        onChange={(e) => updateIdChange(e.target.value)}
      />
      {error && <p className="text-red body-size-14">{error}</p>}
      <div className="flex flex-col gap-[1rem]">
        <Button onClick={() => handleStep("password")}>다음</Button>
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
