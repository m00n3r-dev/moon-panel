"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";

export interface ProjectDetail {
  id: string;
  name: string;
  status: string;
  type: string;
  version: number;
  url: string;
  domain: string;
  cpu: number;
  memory: number;
  storage: number;
  createdAt: string;
  updatedAt: string;
}

export function useProject(id: string) {
  return useQuery({
    queryKey: ["project", id],
    queryFn: async () => {
      const { data } = await apiClient.get<ProjectDetail>(`/api/project/${id}`);
      return data;
    },
    enabled: !!id,
  });
}
