import { createBrowserRouter } from "react-router-dom";

import Home from "@pages/Home";
import { ROUTES } from "@router/constants/routes";
import AuthLayout from "@pages/auth/AuthLayout";
import SignUp from "@pages/auth/sign-up/SignUp";
import Login from "@pages/auth/log-in/Login";
import MyPage from "@pages/my-page/MyPage";
import ProtectedRoute from "@router/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Home />,
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: ROUTES.SIGN_UP,
        element: <SignUp />,
      },
      {
        path: ROUTES.LOG_IN,
        element: <Login />,
      },
    ],
  },
  {
    path: ROUTES.MY_PAGE,
    element: (
      <ProtectedRoute>
        <MyPage />
      </ProtectedRoute>
    ),
  },
]);
