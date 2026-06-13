"use client";

export interface Project {
  id: string;
  name: string;
  status: "Live" | "Syncing" | "Offline" | "Error";
  type: string;
  url: string;
  uptime: string;
  lastDeployed: string;
  domain: string;
}

export function useProjects(): Project[] {
  // TODO: Replace with React Query query once the API is ready
  return [
    {
      id: "proj_001",
      name: "Project Alpha-Global",
      status: "Live",
      type: "Node.js",
      url: "https://alpha-global.example.com",
      uptime: "99.98%",
      lastDeployed: "2 hours ago",
      domain: "alpha-global.example.com",
    },
    {
      id: "proj_002",
      name: "Nebula-ML Core",
      status: "Syncing",
      type: "PHP",
      url: "https://nebula-ml.example.com",
      uptime: "99.92%",
      lastDeployed: "15 min ago",
      domain: "nebula-ml.example.com",
    },
    {
      id: "proj_003",
      name: "API Gateway",
      status: "Live",
      type: "Reverse Proxy",
      url: "https://api-gateway.example.com",
      uptime: "99.99%",
      lastDeployed: "1 day ago",
      domain: "api-gateway.example.com",
    },
    {
      id: "proj_004",
      name: "Archived Repository",
      status: "Offline",
      type: "Node.js",
      url: "https://archive.example.com",
      uptime: "—",
      lastDeployed: "12 days ago",
      domain: "archive.example.com",
    },
    {
      id: "proj_005",
      name: "Auth Service",
      status: "Live",
      type: "Node.js",
      url: "https://auth.example.com",
      uptime: "99.97%",
      lastDeployed: "4 hours ago",
      domain: "auth.example.com",
    },
    {
      id: "proj_006",
      name: "Legacy CMS",
      status: "Error",
      type: "PHP",
      url: "https://cms.example.com",
      uptime: "95.3%",
      lastDeployed: "3 days ago",
      domain: "cms.example.com",
    },
  ];
}
