import type { ErrorResponse } from "@type/error-response";

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

type Primitive = string | number | boolean;
export type ParamValue = Primitive | Primitive[] | null | undefined;

export interface ApiRequestProps {
  endPoint: string;
  method?: RequestMethod;
  data?: unknown;
  params?: Record<string, ParamValue>;
}

const SERVER_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

class ApiRequestError extends Error {
  public status: number;
  public code?: string;

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = "ApiRequestError";
    this.status = status;
    this.code = code;
  }
}

export const apiRequest = async <T = unknown | ErrorResponse>({
  endPoint,
  method = "GET",
  data,
  params,
}: ApiRequestProps): Promise<T> => {
  if (!SERVER_API_BASE_URL) {
    throw new ApiRequestError(
      "API 서버 URL이 설정되지 않았습니다.",
      500,
      "MISSING_API_URL"
    );
  }

  const queryParams = params
    ? Object.entries(params)
        .filter(([, value]) => value !== null && value !== undefined)
        .flatMap(([key, value]) => {
          if (Array.isArray(value)) {
            return value.map((v) => `${key}=${encodeURIComponent(v)}`);
          }
          return `${key}=${encodeURIComponent(value as Primitive)}`;
        })
    : [];

  const queryString = queryParams.length > 0 ? `?${queryParams.join("&")}` : "";

  const requestUrl = `${SERVER_API_BASE_URL}${endPoint}${queryString}`;

  const fetchOptions: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : undefined,
  };

  const response = await fetch(requestUrl, fetchOptions);
  const responseData = await response.json();

  if (!response.ok) {
    const errorMessage =
      responseData?.message || `API 요청 실패: ${response.statusText}`;
    const errorCode = responseData?.code;
    throw new ApiRequestError(errorMessage, response.status, errorCode);
  }

  return responseData;
};

export { ApiRequestError };
