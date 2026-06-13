"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";

export interface ProjectRow {
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

interface PaginatedResponse {
  data: ProjectRow[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export function useProjectsTable(params: { page: number; limit: number; search?: string; status?: string }) {
  return useQuery({
    queryKey: ["projects-table", params],
    queryFn: async () => {
      const searchParams = new URLSearchParams({
        page: String(params.page),
        limit: String(params.limit),
      });
      if (params.search) searchParams.set("search", params.search);
      if (params.status && params.status !== "all") searchParams.set("status", params.status);

      const { data } = await apiClient.get<PaginatedResponse>(
        `/api/project/list?${searchParams.toString()}`,
      );
      return data;
    },
    placeholderData: (prev) => prev,
  });
}
