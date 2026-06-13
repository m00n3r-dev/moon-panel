"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
} from "@tanstack/react-table";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Server,
  Globe,
  Activity,
} from "lucide-react";
import Link from "next/link";
import { type ProjectRow } from "@/hooks/use-projects-table";

const statusStyles: Record<string, { dot: string; text: string; bg: string }> = {
  live: { dot: "glow-dot-success", text: "text-emerald-400", bg: "bg-emerald-500/10" },
  syncing: { dot: "glow-dot-blue", text: "text-secondary-fixed-dim", bg: "bg-secondary-container/10" },
  offline: { dot: "", text: "text-on-surface-variant", bg: "bg-white/5" },
  error: { dot: "glow-dot-error", text: "text-error", bg: "bg-error/10" },
};

function typeIcon(type: string) {
  switch (type) {
    case "nodejs": return Server;
    case "php": return Globe;
    case "reverse-proxy": return ExternalLink;
    default: return Server;
  }
}

function statusLabel(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function typeLabel(s: string) {
  switch (s) {
    case "nodejs": return "Node.js";
    case "php": return "PHP";
    case "reverse-proxy": return "Reverse Proxy";
    default: return s;
  }
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

const columnHelper = createColumnHelper<ProjectRow>();

const columns = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => {
      const row = info.row.original;
      const Icon = typeIcon(row.type);
      return (
        <Link
          href={`/projects/${row.id}`}
          className="flex items-center gap-3 group"
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface-container-high text-on-surface-variant transition-colors group-hover:bg-secondary-container/10 group-hover:text-secondary-fixed-dim">
            <Icon className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-primary group-hover:text-secondary-fixed-dim transition-colors">
              {info.getValue()}
            </p>
            <p className="truncate text-xs text-on-surface-variant">
              {row.domain}
            </p>
          </div>
        </Link>
      );
    },
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => {
      const s = info.getValue();
      const style = statusStyles[s] ?? statusStyles.live;
      return (
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-tighter ${style.bg} ${style.text}`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${style.dot || "bg-on-surface-variant"}`}
          />
          {statusLabel(s)}
        </span>
      );
    },
  }),
  columnHelper.accessor("type", {
    header: "Type",
    cell: (info) => (
      <span className="text-sm text-on-surface-variant">{typeLabel(info.getValue())}</span>
    ),
  }),
  columnHelper.accessor("updatedAt", {
    header: "Last Deployed",
    cell: (info) => (
      <span className="text-sm text-on-surface-variant">{timeAgo(info.getValue())}</span>
    ),
  }),
];

export function ProjectsTable({
  data,
  page,
  limit,
  total,
  totalPages,
  onPageChange,
  onLimitChange,
  isLoading,
}: {
  data: ProjectRow[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  isLoading: boolean;
}) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: totalPages,
  });

  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-5 py-3.5 text-left text-xs font-medium text-on-surface-variant/60 uppercase tracking-wider border-b border-white/5"
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: Math.min(limit, 6) }).map((_, i) => (
                <tr key={`skeleton-${i}`}>
                  {Array.from({ length: 4 }).map((_, j) => (
                    <td key={j} className="px-5 py-4">
                      <div
                        className={`animate-pulse rounded bg-white/5 ${
                          j === 0 ? "h-8 w-48" : j === 1 ? "h-5 w-16" : j === 2 ? "h-4 w-20" : "h-4 w-16"
                        }`}
                      />
                    </td>
                  ))}
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-5 py-16 text-center">
                  <p className="text-sm text-on-surface-variant">No projects found</p>
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row, i) => (
                <motion.tr
                  key={row.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.03 * i, duration: 0.2 }}
                  className="border-b border-white/5 last:border-b-0 hover:bg-white/[0.02] transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-5 py-3.5">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between gap-4 border-t border-white/5 px-5 py-3.5">
        <div className="flex items-center gap-2">
          <span className="text-xs text-on-surface-variant/60">Rows per page</span>
          <select
            value={limit}
            onChange={(e) => onLimitChange(Number(e.target.value))}
            className="rounded-md border border-white/5 bg-surface-container-high px-2 py-1 text-xs text-on-surface outline-none focus:border-secondary-container/40"
          >
            {[6, 12, 24, 48].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-on-surface-variant/60">
            {total === 0 ? "0" : `${(page - 1) * limit + 1}–${Math.min(page * limit, total)}`} of {total}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => onPageChange(page - 1)}
              disabled={page <= 1 || isLoading}
              className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md text-on-surface-variant transition-all hover:bg-surface-container-high hover:text-primary disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => onPageChange(page + 1)}
              disabled={page >= totalPages || isLoading}
              className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md text-on-surface-variant transition-all hover:bg-surface-container-high hover:text-primary disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
