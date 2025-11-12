import { Button, Input } from "@components/index";
import { useProfile } from "@pages/my-page/hooks/use-profile";

interface ProfileProps {
  userId: number;
  username: string;
  name: string;
  email: string;
  age: number;
}

export default function Profile({
  userId,
  username,
  name,
  email,
  age,
}: ProfileProps) {
  const {
    formData,
    updateNameChange,
    updateEmailChange,
    updateAgeChange,
    handleSubmit,
    errors,
  } = useProfile(
    {
      name: name ?? "",
      email: email ?? "",
      age: age.toString(),
    },
    Number(userId)
  );

  return (
    <div className="flex flex-col gap-[1.5rem]">
      <h2 className="flex justify-between heading-sb-20 text-grayscale-900">
        <span>아이디</span>
        <span>@{username}</span>
      </h2>

      <div className="flex flex-col gap-[1.5rem]">
        <div className="flex flex-col gap-[0.5rem]">
          <label htmlFor="name" className="body-size-14 text-grayscale-900">
            이름
          </label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => updateNameChange(e.target.value)}
          />
          {errors.name && (
            <p className="text-red body-size-14">{errors.name}</p>
          )}
        </div>
        <div className="flex flex-col gap-[0.5rem]">
          <label htmlFor="email" className="body-size-14 text-grayscale-900">
            이메일
          </label>
          <Input
            id="email"
            value={formData.email}
            onChange={(e) => updateEmailChange(e.target.value)}
          />
          {errors.email && (
            <p className="text-red body-size-14">{errors.email}</p>
          )}
        </div>
        <div className="flex flex-col gap-[0.5rem]">
          <label htmlFor="age" className="body-size-14 text-grayscale-900">
            나이
          </label>
          <Input
            id="age"
            value={formData.age}
            onChange={(e) => updateAgeChange(e.target.value)}
          />
          {errors.age && <p className="text-red body-size-14">{errors.age}</p>}
        </div>
      </div>
      <Button onClick={handleSubmit}>저장</Button>
    </div>
  );
}
