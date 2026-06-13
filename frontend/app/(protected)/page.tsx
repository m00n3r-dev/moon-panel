"use client";

import { Cpu, MemoryStick, HardDrive, Play, Square, AlertOctagon, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useDashboardData } from "@/hooks/use-dashboard-data";

const projects = [
  { name: "Project Alpha-Global", status: "Live" as const, uptime: "99.98%", description: "Production · Deployment v2.4.1" },
  { name: "Nebula-ML Core", status: "Syncing" as const, uptime: "99.92%", description: "Staging · Processing Data Stream" },
  { name: "Archived Repository", status: "Offline" as const, uptime: "—", description: "Paused · Last modified 12d ago" },
];

const projectStyles = {
  Live: { dot: "glow-dot-success", bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-400" },
  Syncing: { dot: "glow-dot-blue", bg: "bg-secondary-container/10", border: "border-secondary-container/20", text: "text-secondary-fixed-dim" },
  Offline: { dot: "", bg: "bg-white/5", border: "border-white/10", text: "text-on-surface-variant" },
};

function GlassCard({ children, className = "", index = 0 }: { children: React.ReactNode; className?: string; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 * index, duration: 0.4, ease: "easeOut" }}
      className={`glass-card rounded-2xl p-6 relative overflow-hidden group ${className}`}
    >
      <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-secondary-container/10 rounded-full blur-2xl group-hover:bg-secondary-container/20 transition-all" />
      {children}
    </motion.div>
  );
}

function HealthGauge({ icon: Icon, label, value, unit, sublabel, subvalue, index = 0 }: {
  icon: React.ElementType; label: string; value: number; unit: string;
  sublabel?: string; subvalue?: string; index?: number;
}) {
  return (
    <GlassCard index={index}>
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">{label}</p>
          <h3 className="text-3xl font-bold text-primary mt-0.5">
            {value}<span className="text-lg font-normal text-on-surface-variant">{unit}</span>
          </h3>
        </div>
        <Icon className="h-6 w-6 text-secondary-fixed-dim" />
      </div>
      {sublabel && subvalue && (
        <div className="flex justify-between text-xs font-medium mb-2">
          <span className="text-on-surface-variant">{sublabel}</span>
          <span className="text-emerald-400">{subvalue}</span>
        </div>
      )}
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ delay: 0.3 + 0.08 * index, duration: 0.6 }}
          className={`h-full rounded-full shadow-[0_0_8px_rgba(5,102,217,0.5)] ${
            value < 60 ? "bg-secondary-container" : value < 85 ? "bg-yellow-400" : "bg-error"
          }`}
        />
      </div>
    </GlassCard>
  );
}

export default function DashboardPage() {
  const data = useDashboardData();

  return (
    <div className="space-y-8">
      {/* Header section */}
      <section className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <h2 className="text-4xl font-bold text-primary mb-2">Systems Overview</h2>

        </div>
        <div className="glass-card rounded-xl px-6 py-3 flex items-center gap-8 shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full glow-dot-success" />
            <Play className="h-4 w-4 text-emerald-400" />
            <span className="text-lg font-bold text-primary">{data.activeServices.running}</span>
            <span className="text-xs text-on-surface-variant">Running</span>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-on-surface-variant/40" />
            <Square className="h-4 w-4 text-on-surface-variant" />
            <span className="text-lg font-bold text-primary">{data.activeServices.stopped}</span>
            <span className="text-xs text-on-surface-variant">Stopped</span>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full glow-dot-error" />
            <AlertOctagon className="h-4 w-4 text-red-400" />
            <span className="text-lg font-bold text-primary">{data.activeServices.failed}</span>
            <span className="text-xs text-on-surface-variant">Failed</span>
          </div>
        </div>
      </section>

      {/* 3-column health grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <HealthGauge icon={Cpu} label="CPU Usage" value={data.systemHealth.cpu} unit="%" sublabel="Core 1-4 Performance" subvalue="Optimized" index={0} />
        <HealthGauge icon={MemoryStick} label="Memory Allocation" value={data.systemHealth.ram} unit="%" sublabel="Available: 32GB" subvalue={`${100 - data.systemHealth.ram}% Free`} index={1} />
        <HealthGauge icon={HardDrive} label="Disk Storage" value={data.systemHealth.disk} unit="%" sublabel="Capacity: 2TB" subvalue={`${100 - data.systemHealth.disk}% Free`} index={2} />
      </section>

      {/* Recent Projects */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-primary">Recent Projects</h3>
          <Link href="/projects" className="text-xs text-secondary-fixed-dim hover:text-primary transition-colors">View All</Link>
        </div>
        <div className="space-y-3">
          {projects.map((project, index) => {
            const style = projectStyles[project.status];
            return (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + 0.06 * index, duration: 0.35 }}
                className="glass-card rounded-2xl p-4 flex items-center gap-5 group hover:-translate-y-0.5 transition-transform"
              >
                <div className={`w-11 h-11 rounded-xl bg-linear-to-br from-secondary-container to-blue-900 flex items-center justify-center shrink-0`}>
                  <Play className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-primary">{project.name}</h4>
                  <p className="text-xs text-on-surface-variant mt-0.5">{project.description}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-on-surface-variant">{project.uptime}</span>
                  <span className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-tighter ${style.bg} ${style.border} border ${style.text}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${style.dot || "bg-on-surface-variant"}`} />
                    {project.status}
                  </span>
                  <button className="flex items-center gap-1 rounded-lg bg-white/5 hover:bg-white/10 px-3 py-1.5 text-xs font-medium text-primary border border-white/5 transition-all">
                    <span>Manage</span>
                    <ExternalLink className="h-3 w-3" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
