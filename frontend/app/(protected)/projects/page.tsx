"use client";

import { motion } from "framer-motion";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { useState, useCallback, useEffect, useRef } from "react";
import { useProjectsTable } from "@/hooks/use-projects-table";
import { ProjectsTable } from "@/components/project/ProjectsTable";

const statusFilters = ["all", "live", "syncing", "offline", "error"] as const;

function statusLabel(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const searchTimer = useRef<ReturnType<typeof setTimeout>>();

  const { data, isLoading, error } = useProjectsTable({
    page,
    limit,
    search: debouncedSearch || undefined,
    status: activeFilter === "all" ? undefined : activeFilter,
  });

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => {
      setDebouncedSearch(value);
      setPage(1);
    }, 300);
  }, []);

  const handleLimitChange = useCallback((newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  }, []);

  useEffect(() => {
    return () => clearTimeout(searchTimer.current);
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
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

      {/* Search + Filters */}
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
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full rounded-xl border border-white/5 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-on-surface placeholder:text-on-surface-variant/40 outline-none transition-all focus:border-secondary-container/40 focus:bg-white/10 focus:shadow-[0_0_12px_rgba(5,102,217,0.15)] focus:ring-1 focus:ring-secondary-container/50"
          />
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {statusFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => { setActiveFilter(filter); setPage(1); }}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                activeFilter === filter
                  ? "bg-secondary-container/10 text-secondary-fixed-dim border border-secondary-container/30"
                  : "text-on-surface-variant hover:text-on-surface border border-transparent"
              }`}
            >
              {filter === "all" ? "All" : statusLabel(filter)}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Error state */}
      {error ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-12 text-center"
        >
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-error/10">
            <Search className="h-6 w-6 text-error" />
          </div>
          <h3 className="text-lg font-semibold text-primary">Failed to load projects</h3>
          <p className="mt-1 text-sm text-on-surface-variant">
            {error instanceof Error ? error.message : "An unexpected error occurred"}
          </p>
        </motion.div>
      ) : (
        <>
          {/* Table */}
          <ProjectsTable
            data={data?.data ?? []}
            page={data?.page ?? 1}
            limit={data?.limit ?? limit}
            total={data?.total ?? 0}
            totalPages={data?.totalPages ?? 0}
            onPageChange={setPage}
            onLimitChange={handleLimitChange}
            isLoading={isLoading}
          />

          {/* Empty state when table shows no data and loading is done */}
          {!isLoading && data?.total === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mt-4"
            >
              <p className="text-sm text-on-surface-variant">
                {debouncedSearch || activeFilter !== "all"
                  ? "Try a different search or filter"
                  : "Get started by creating your first project"}
              </p>
              {!debouncedSearch && activeFilter === "all" && (
                <Link
                  href="/projects/new"
                  className="mt-4 inline-flex h-10 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-on-primary shadow-lg transition-all hover:shadow-[0_0_24px_rgba(255,255,255,0.2)]"
                >
                  <Plus className="h-4 w-4" />
                  New Project
                </Link>
              )}
            </motion.div>
          )}
        </>
      )}
    </div>
  );
}
