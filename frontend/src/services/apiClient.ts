import axios, { type AxiosRequestConfig } from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api/v1";

export type ApiResponse<T> = {
  success: boolean;
  data: T;
  count?: number;
  message?: string;
};

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiFetch = async <T>(
  path: string,
  options: AxiosRequestConfig = {},
): Promise<ApiResponse<T>> => {
  const response = await apiClient.request<ApiResponse<T>>({
    url: path,
    ...options,
  });

  return response.data;
};