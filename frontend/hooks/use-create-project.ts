"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api-client";

export interface CreateProjectInput {
  name: string;
  type: "nodejs" | "php" | "reverse-proxy";
  version: number;
  url: string;
}

interface CreateProjectResponse {
  message: string;
  id: string;
}

export function useCreateProject() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (input: CreateProjectInput) => {
      try {
        const { data } = await apiClient.post<CreateProjectResponse>(
          "/api/project/create",
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
    onSuccess() {
      router.push("/");
    },
  });
}
