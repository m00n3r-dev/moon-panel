"use client";

import { motion } from "framer-motion";
import {
  Plus,
  Search,
  ExternalLink,
  Clock,
  Activity,
  Server,
  Globe,
} from "lucide-react";
import Link from "next/link";
import { useState, useMemo } from "react";
import { useProjects, type Project } from "@/hooks/use-projects";

const statusConfig = {
  Live: {
    dot: "glow-dot-success",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    text: "text-emerald-400",
  },
  Syncing: {
    dot: "glow-dot-blue",
    bg: "bg-secondary-container/10",
    border: "border-secondary-container/20",
    text: "text-secondary-fixed-dim",
  },
  Offline: {
    dot: "",
    bg: "bg-white/5",
    border: "border-white/10",
    text: "text-on-surface-variant",
  },
  Error: {
    dot: "glow-dot-error",
    bg: "bg-error/10",
    border: "border-error/20",
    text: "text-error",
  },
};

const typeIcons: Record<string, React.ElementType> = {
  "Node.js": Server,
  PHP: Globe,
  "Reverse Proxy": ExternalLink,
};

const statusFilters = ["All", "Live", "Syncing", "Offline", "Error"] as const;
type StatusFilter = (typeof statusFilters)[number];

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const style = statusConfig[project.status];
  const TypeIcon = typeIcons[project.type] ?? Server;

  return (
    <Link href={`/projects/${project.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.06 * index, duration: 0.35, ease: "easeOut" }}
        whileHover={{ y: -3, transition: { duration: 0.2 } }}
        className="glass-card rounded-2xl p-6 group cursor-pointer h-full"
      >
        <div className="flex items-start justify-between mb-4">
          <span
            className={`flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-tighter ${style.bg} ${style.border} border ${style.text}`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${style.dot || "bg-on-surface-variant"}`}
            />
            {project.status}
          </span>
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-surface-container-high text-on-surface-variant transition-colors group-hover:bg-secondary-container/10 group-hover:text-secondary-fixed-dim">
            <TypeIcon className="h-3.5 w-3.5" />
          </div>
        </div>

        <h3 className="text-base font-semibold text-primary truncate">
          {project.name}
        </h3>
        <p className="mt-0.5 text-xs text-on-surface-variant truncate">
          {project.domain}
        </p>

        <div className="my-4 h-px bg-white/5" />

        <div className="flex items-center justify-between text-xs text-on-surface-variant">
          <div className="flex items-center gap-1.5">
            <Activity className="h-3.5 w-3.5 text-emerald-400" />
            <span>{project.uptime}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            <span>{project.lastDeployed}</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default function ProjectsPage() {
  const projects = useProjects();
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<StatusFilter>("All");

  const filtered = useMemo(
    () =>
      projects.filter((p) => {
        const matchesSearch =
          !search ||
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.domain.toLowerCase().includes(search.toLowerCase());
        const matchesFilter =
          activeFilter === "All" || p.status === activeFilter;
        return matchesSearch && matchesFilter;
      }),
    [projects, search, activeFilter],
  );

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-primary">Projects</h1>
          <p className="mt-1 text-sm text-on-surface-variant">
            Manage and monitor all your deployed projects
          </p>
        </div>
        <Link
          href="/projects/new"
          className="inline-flex h-10 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-on-primary shadow-lg transition-all hover:shadow-[0_0_24px_rgba(255,255,255,0.2)]"
        >
          <Plus className="h-4 w-4" />
          New Project
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.3 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-on-surface-variant/60" />
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-white/5 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-on-surface placeholder:text-on-surface-variant/40 outline-none transition-all focus:border-secondary-container/40 focus:bg-white/10 focus:shadow-[0_0_12px_rgba(5,102,217,0.15)] focus:ring-1 focus:ring-secondary-container/50"
          />
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {statusFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                activeFilter === filter
                  ? "bg-secondary-container/10 text-secondary-fixed-dim border border-secondary-container/30"
                  : "text-on-surface-variant hover:text-on-surface border border-transparent"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.12, duration: 0.3 }}
        className="text-xs text-on-surface-variant/60"
      >
        {filtered.length} {filtered.length === 1 ? "project" : "projects"}
        {search && ` matching "${search}"`}
      </motion.p>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-12 text-center"
        >
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-surface-container-high">
            <Search className="h-6 w-6 text-on-surface-variant/40" />
          </div>
          <h3 className="text-lg font-semibold text-primary">No projects found</h3>
          <p className="mt-1 text-sm text-on-surface-variant">
            {search
              ? "Try a different search or filter"
              : "Get started by creating your first project"}
          </p>
          {!search && (
            <Link
              href="/projects/new"
              className="mt-6 inline-flex h-10 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-on-primary shadow-lg transition-all hover:shadow-[0_0_24px_rgba(255,255,255,0.2)]"
            >
              <Plus className="h-4 w-4" />
              New Project
            </Link>
          )}
        </motion.div>
      )}
    </div>
  );
}
