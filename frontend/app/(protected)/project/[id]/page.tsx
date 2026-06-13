"use client";

import { ArrowLeft, Globe, Rocket, Server } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { LogTerminal, type LogEntry } from "@/components/ui/LogTerminal";
import { ResourceUsage } from "@/components/project/ResourceUsage";

const mockLogs: LogEntry[] = [
  { timestamp: "2026-06-13 14:23:01", level: "info", message: "Project created successfully" },
  { timestamp: "2026-06-13 14:23:02", level: "info", message: "Cloning repository..." },
  { timestamp: "2026-06-13 14:23:04", level: "success", message: "Repository cloned (main branch)" },
  { timestamp: "2026-06-13 14:23:04", level: "info", message: "Installing dependencies..." },
  { timestamp: "2026-06-13 14:23:12", level: "info", message: "Dependencies installed (42 packages)" },
  { timestamp: "2026-06-13 14:23:12", level: "info", message: "Building project..." },
  { timestamp: "2026-06-13 14:23:28", level: "success", message: "Build completed successfully" },
  { timestamp: "2026-06-13 14:23:28", level: "info", message: "Deploying to production..." },
  { timestamp: "2026-06-13 14:23:31", level: "success", message: "Deployment live at https://my-app.example.com" },
  { timestamp: "2026-06-13 14:23:32", level: "info", message: "Running health check..." },
  { timestamp: "2026-06-13 14:23:35", level: "success", message: "Health check passed (200 OK)" },
];

export default function ProjectViewPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="space-y-8">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-on-surface-variant transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Link>

      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary-container shadow-[0_0_15px_rgba(5,102,217,0.4)]">
          <Rocket className="h-7 w-7 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-primary">Project Overview</h1>
          <p className="text-sm text-on-surface-variant">
            ID: <span className="font-mono text-secondary-fixed-dim">{id}</span>
          </p>
        </div>
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary-container/10">
              <Server className="h-5 w-5 text-secondary-fixed-dim" />
            </div>
            <div>
              <p className="text-xs text-on-surface-variant uppercase tracking-wider">Status</p>
              <p className="text-sm font-semibold text-primary">Live</p>
            </div>
          </div>
        </div>
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary-container/10">
              <Globe className="h-5 w-5 text-secondary-fixed-dim" />
            </div>
            <div>
              <p className="text-xs text-on-surface-variant uppercase tracking-wider">URL</p>
              <p className="text-sm font-semibold text-primary truncate">—</p>
            </div>
          </div>
        </div>
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary-container/10">
              <Rocket className="h-5 w-5 text-secondary-fixed-dim" />
            </div>
            <div>
              <p className="text-xs text-on-surface-variant uppercase tracking-wider">Type</p>
              <p className="text-sm font-semibold text-primary">—</p>
            </div>
          </div>
        </div>
      </div>

      {/* Resource Usage */}
      <ResourceUsage
        cpu={{ used: 2.4, total: 4 }}
        ram={{ used: 5.2, total: 8 }}
        disk={{ used: 42.5, total: 100 }}
      />

      {/* Log terminal */}
      <LogTerminal logs={mockLogs} title="Deployment Logs" />
    </div>
  );
}
