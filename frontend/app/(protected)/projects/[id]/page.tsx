"use client";

import { ArrowLeft, Globe, Rocket, Server, Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { LogTerminal, type LogEntry } from "@/components/ui/LogTerminal";
import { ResourceUsage } from "@/components/project/ResourceUsage";
import { useProject } from "@/hooks/use-project";
import { motion } from "framer-motion";

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

function typeLabel(type: string): string {
  switch (type) {
    case "nodejs": return "Node.js";
    case "php": return "PHP";
    case "reverse-proxy": return "Reverse Proxy";
    default: return type;
  }
}

function statusLabel(status: string): string {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export default function ProjectViewPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data: project, isLoading, error } = useProject(id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-secondary-fixed-dim" />
          <p className="text-sm text-on-surface-variant">Loading project...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="glass-card rounded-2xl p-12 text-center max-w-md">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-error/10">
            <Server className="h-6 w-6 text-error" />
          </div>
          <h2 className="text-lg font-semibold text-primary">Project not found</h2>
          <p className="mt-1 text-sm text-on-surface-variant">
            {error instanceof Error ? error.message : "Could not load project details"}
          </p>
          <button
            onClick={() => router.push("/projects")}
            className="mt-6 inline-flex h-10 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-on-primary transition-all hover:shadow-[0_0_24px_rgba(255,255,255,0.2)]"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header with back button */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push("/")}
          className="flex h-14 w-14 items-center justify-center rounded-xl bg-surface-container text-on-surface-variant transition-all hover:bg-surface-container-high hover:text-primary"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary-container shadow-[0_0_15px_rgba(5,102,217,0.4)]">
          <Rocket className="h-7 w-7 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-primary">{project.name}</h1>
          <p className="text-sm text-on-surface-variant">
            ID: <span className="font-mono text-secondary-fixed-dim">{project.id}</span>
          </p>
        </div>
      </div>

      {/* Info cards */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary-container/10">
              <Server className="h-5 w-5 text-secondary-fixed-dim" />
            </div>
            <div>
              <p className="text-xs text-on-surface-variant uppercase tracking-wider">Status</p>
              <p className="text-sm font-semibold text-primary">{statusLabel(project.status)}</p>
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
              <p className="text-sm font-semibold text-primary truncate">{project.url}</p>
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
              <p className="text-sm font-semibold text-primary">{typeLabel(project.type)}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Resource Usage */}
      <ResourceUsage
        cpu={{ used: project.cpu, total: Math.max(project.cpu, 4) }}
        ram={{ used: project.memory, total: Math.max(project.memory, 8) }}
        disk={{ used: project.storage, total: Math.max(project.storage, 100) }}
      />

      {/* Log terminal */}
      <LogTerminal logs={mockLogs} title="Deployment Logs" />
    </div>
  );
}
