export type ErrorResponse = {
  success: false;
  code: string;
  message: string;
  data?: {
    code: string;
    message: string;
    errors?: Array<{
      field: string;
      value: string;
      reason: string;
    }>;
  };
};
