import { Link } from "react-router-dom";

import { PLACEHOLDER } from "@constants/index";
import { Button, Input } from "@components/index";
import { ROUTES } from "@router/constants/routes";

interface Step3Props {
  handleSubmit: () => void;
  name: string;
  email: string;
  age: string;
  handleNameChange: (_name: string) => void;
  handleEmailChange: (_email: string) => void;
  handleAgeChange: (_age: string) => void;
  error?: string;
}
export default function Step3({
  handleSubmit,
  name,
  email,
  age,
  handleNameChange,
  handleEmailChange,
  handleAgeChange,
  error,
}: Step3Props) {
  return (
    <div className="flex flex-col gap-[1.5rem]">
      <Input
        placeholder={PLACEHOLDER.NAME}
        value={name}
        onChange={(e) => handleNameChange(e.target.value.trim())}
      />
      <Input
        placeholder={PLACEHOLDER.EMAIL}
        value={email}
        onChange={(e) => handleEmailChange(e.target.value.trim())}
      />
      <Input
        placeholder={PLACEHOLDER.AGE}
        value={age}
        onChange={(e) => handleAgeChange(e.target.value.trim())}
      />
      {error && <p className="text-red body-size-14">{error}</p>}
      <div className="flex flex-col gap-[1rem]">
        <Button onClick={handleSubmit}>회원가입</Button>
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
