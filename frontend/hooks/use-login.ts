"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

interface LoginInput {
  email: string;
  password: string;
}

interface LoginResponse {
  jwt_token: string;
  refresh_token: string;
}

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (input: LoginInput) => {
      try {
        const { data } = await apiClient.post<LoginResponse>(
          "/api/auth/login",
          input,
        );
        return data;
      } catch (error) {
        if (
          axios.isAxiosError<{ message?: string | string[] }>(error) &&
          error.response?.data?.message
        ) {
          const backendMessage = error.response.data.message;
          throw new Error(
            Array.isArray(backendMessage) ? backendMessage[0] : backendMessage,
          );
        }
        throw error;
      }
    },
    onSuccess(data) {
      localStorage.setItem("jwt_token", data.jwt_token);
      if (data.refresh_token) {
        localStorage.setItem("refresh_token", data.refresh_token);
      }
      router.push("/");
    },
  });
}
