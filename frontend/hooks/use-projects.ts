"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";

export interface Project {
  id: string;
  name: string;
  status: "live" | "syncing" | "offline" | "error";
  type: string;
  url: string;
  uptime: string;
  lastDeployed: string;
  domain: string;
}

interface ProjectRow {
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

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`;
  return `${Math.floor(days / 30)} month${days >= 60 ? "s" : ""} ago`;
}

function mapProject(row: ProjectRow): Project {
  return {
    id: row.id,
    name: row.name,
    status: (["live", "syncing", "offline", "error"].includes(row.status)
      ? row.status
      : "live") as Project["status"],
    type: row.type === "nodejs" ? "Node.js"
      : row.type === "php" ? "PHP"
      : row.type === "reverse-proxy" ? "Reverse Proxy"
      : row.type,
    url: row.url,
    domain: row.domain || new URL(row.url).hostname,
    uptime: "—",
    lastDeployed: timeAgo(row.updatedAt),
  };
}

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data } = await apiClient.get<ProjectRow[]>("/api/project/list");
      return data.map(mapProject);
    },
  });
}
