const USER_ID_KEY = "userId";

export const getUserId = (): number | null => {
  const userId = localStorage.getItem(USER_ID_KEY);
  return userId ? Number(userId) : null;
};

export const setUserId = (userId: number): void => {
  localStorage.setItem(USER_ID_KEY, userId.toString());
};

export const removeUserId = (): void => {
  localStorage.removeItem(USER_ID_KEY);
};

export const isAuthenticated = (): boolean => {
  return getUserId() !== null;
};

