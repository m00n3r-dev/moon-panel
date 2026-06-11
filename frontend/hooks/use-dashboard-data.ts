"use client";

export interface DashboardData {
  activeServices: { running: number; stopped: number; failed: number };
  systemHealth: {
    cpu: number;
    ram: number;
    disk: number;
    network: { inbound: string; outbound: string };
  };
  nodes: Array<{ id: string; name: string; online: boolean; load: number }>;
  uptime: { status: "operational" | "degraded" | "down"; sla: string };
}

export function useDashboardData(): DashboardData {
  // TODO: Replace with React Query query once the API is ready
  return {
    activeServices: { running: 12, stopped: 2, failed: 1 },
    systemHealth: {
      cpu: 43,
      ram: 67,
      disk: 52,
      network: { inbound: "1.2 Gbps", outbound: "340 Mbps" },
    },
    nodes: [
      { id: "node-1", name: "node-01", online: true, load: 34 },
      { id: "node-2", name: "node-02", online: true, load: 58 },
      { id: "node-3", name: "node-03", online: false, load: 0 },
      { id: "node-4", name: "node-04", online: true, load: 72 },
    ],
    uptime: { status: "operational", sla: "99.97%" },
  };
}
