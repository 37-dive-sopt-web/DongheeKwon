import { useSignUp } from "@pages/auth/sign-up/hooks/use-sign-up";
import { Step1, Step2, Step3 } from "@pages/auth/sign-up/@step/index";

export default function SignUp() {
  const {
    step,
    formData,
    errors,
    handleStep,
    updateUsernameChange,
    updatePasswordChange,
    updateConfirmPasswordChange,
    handleSubmit,
    updateNameChange,
    updateEmailChange,
    updateAgeChange,
  } = useSignUp();

  return (
    <div className="flex flex-col gap-[2rem]">
      <h1 className="text-primary-900 heading-sb-30">SignUp</h1>
      {step === "username" && (
        <Step1
          updateUsernameChange={updateUsernameChange}
          handleStep={handleStep}
          username={formData.username ?? ""}
          error={errors.username}
        />
      )}
      {step === "password" && (
        <Step2
          handleStep={handleStep}
          password={formData.password ?? ""}
          confirmPassword={formData.confirmPassword ?? ""}
          handlePasswordChange={updatePasswordChange}
          handleConfirmPasswordChange={updateConfirmPasswordChange}
          error={errors.password}
        />
      )}
      {step === "details" && (
        <Step3
          handleSubmit={handleSubmit}
          name={formData.name ?? ""}
          email={formData.email ?? ""}
          age={formData.age ?? ""}
          handleNameChange={updateNameChange}
          handleEmailChange={updateEmailChange}
          handleAgeChange={updateAgeChange}
          errors={{
            name: errors.name,
            email: errors.email,
            age: errors.age,
          }}
        />
      )}
    </div>
  );
}
