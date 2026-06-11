"use client";

import { Cpu, MemoryStick, HardDrive, Play, Square, AlertOctagon, Server, Network } from "lucide-react";
import { motion } from "framer-motion";
import { useDashboardData } from "@/hooks/use-dashboard-data";

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

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-0.5">{label}</p>
      <p className="text-xl font-bold text-primary">{value}</p>
    </div>
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
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full glow-dot-success" />
            <span className="text-sm font-medium text-secondary-fixed-dim">
              All systems operational &middot; SLA {data.uptime.sla} uptime
            </span>
          </div>
        </div>
        <div className="glass-card rounded-xl px-6 py-4 flex items-center gap-8">
          <StatPill label="Active Users" value="12,842" />
          <div className="w-px h-10 bg-white/10" />
          <StatPill label="Latency" value="24ms" />
        </div>
      </section>

      {/* 3-column health grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <HealthGauge icon={Cpu} label="CPU Usage" value={data.systemHealth.cpu} unit="%" sublabel="Core 1-4 Performance" subvalue="Optimized" index={0} />
        <HealthGauge icon={MemoryStick} label="Memory Allocation" value={data.systemHealth.ram} unit="%" sublabel="Available: 32GB" subvalue={`${100 - data.systemHealth.ram}% Free`} index={1} />
        <HealthGauge icon={HardDrive} label="Disk Storage" value={data.systemHealth.disk} unit="%" sublabel="Capacity: 2TB" subvalue={`${100 - data.systemHealth.disk}% Free`} index={2} />
      </section>

      {/* Bottom row: services, network, nodes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Services */}
        <GlassCard index={3}>
          <h4 className="text-sm font-semibold text-primary mb-5 flex items-center gap-2">
            <Play className="h-4 w-4 text-secondary-fixed-dim" />
            Active Services
          </h4>
          <div className="space-y-3">
            {[
              { icon: Play, label: "Running", value: data.activeServices.running, color: "text-emerald-400", glow: "glow-dot-success" },
              { icon: Square, label: "Stopped", value: data.activeServices.stopped, color: "text-on-surface-variant", glow: "" },
              { icon: AlertOctagon, label: "Failed", value: data.activeServices.failed, color: "text-red-400", glow: "glow-dot-error" },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full ${s.glow || "bg-on-surface-variant/40"}`} />
                  <Icon className={`h-4 w-4 ${s.color}`} />
                  <span className="flex-1 text-sm text-on-surface-variant">{s.label}</span>
                  <span className="text-lg font-bold text-primary">{s.value}</span>
                </div>
              );
            })}
          </div>
        </GlassCard>

        {/* Network + Deployment Queue */}
        <GlassCard index={4}>
          <h4 className="text-sm font-semibold text-primary mb-5 flex items-center gap-2">
            <Network className="h-4 w-4 text-secondary-fixed-dim" />
            Network Traffic
          </h4>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-on-surface-variant mb-1">Inbound</p>
              <p className="text-2xl font-bold text-primary">{data.systemHealth.network.inbound}</p>
            </div>
            <div>
              <p className="text-xs text-on-surface-variant mb-1">Outbound</p>
              <p className="text-2xl font-bold text-primary">{data.systemHealth.network.outbound}</p>
            </div>
          </div>
          <div className="mt-6 glass-card rounded-xl px-4 py-3 bg-linear-to-br from-secondary-container/20 to-transparent">
            <div className="flex items-center gap-3 mb-2">
              <Server className="h-4 w-4 text-secondary-fixed-dim" />
              <span className="text-xs font-semibold text-primary">Security Pulse</span>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              No unauthorized access detected in the last 72 hours.
            </p>
          </div>
        </GlassCard>

        {/* Nodes */}
        <GlassCard index={5}>
          <h4 className="text-sm font-semibold text-primary mb-5 flex items-center gap-2">
            <Server className="h-4 w-4 text-secondary-fixed-dim" />
            Nodes
          </h4>
          <div className="flex items-center gap-4 mb-4 text-xs">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full glow-dot-success" />
              {data.nodes.filter(n => n.online).length} online
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-on-surface-variant/30" />
              {data.nodes.filter(n => !n.online).length} offline
            </span>
          </div>
          <div className="space-y-2">
            {data.nodes.map((node, i) => (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + 0.05 * i, duration: 0.25 }}
                className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0"
              >
                <Server className={`h-3.5 w-3.5 shrink-0 ${node.online ? "text-secondary-fixed-dim" : "text-on-surface-variant/30"}`} />
                <span className={`flex-1 text-sm ${node.online ? "text-primary" : "text-on-surface-variant/40 line-through"}`}>
                  {node.name}
                </span>
                {node.online ? (
                  <div className="flex items-center gap-2">
                    <div className="h-1 w-16 overflow-hidden rounded-full bg-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${node.load}%` }}
                        transition={{ delay: 0.5 + 0.05 * i, duration: 0.5 }}
                        className={`h-full rounded-full ${node.load < 50 ? "bg-secondary-container" : node.load < 80 ? "bg-yellow-400" : "bg-error"}`}
                      />
                    </div>
                    <span className="w-8 text-right text-xs text-on-surface-variant">{node.load}%</span>
                  </div>
                ) : (
                  <span className="text-xs text-on-surface-variant/40">Offline</span>
                )}
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
