import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="flex mx-auto min-h-dvh items-center justify-center">
      <div className="max-w-[60rem] w-full">
        <Outlet />
      </div>
    </div>
  );
}
