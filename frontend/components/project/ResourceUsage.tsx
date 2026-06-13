"use client";

import { motion } from "framer-motion";
import { Cpu, MemoryStick, HardDrive } from "lucide-react";

interface ResourceGaugeProps {
  label: string;
  icon: React.ElementType;
  used: number;
  total: number;
  unit: string;
  index: number;
}

function ResourceGauge({ label, icon: Icon, used, total, unit, index }: ResourceGaugeProps) {
  const percentage = Math.min(Math.round((used / total) * 100), 100);

  const barColor =
    percentage < 60
      ? "bg-secondary-container"
      : percentage < 85
        ? "bg-yellow-400"
        : "bg-error";

  const glowColor =
    percentage >= 85 ? "rgba(239,68,68,0.5)" : percentage >= 60 ? "rgba(245,158,11,0.5)" : "rgba(5,102,217,0.5)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 * index, duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className="glass-card rounded-2xl p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary-container/10">
          <Icon className="h-5 w-5 text-secondary-fixed-dim" />
        </div>
        <div>
          <p className="text-xs text-on-surface-variant uppercase tracking-wider">
            {label}
          </p>
          <p className="text-xl font-semibold text-primary">
            {used.toFixed(1)}
            <span className="text-sm font-normal text-on-surface-variant">
              /{total}{unit}
            </span>
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-high">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ delay: 0.15 + 0.08 * index, duration: 0.7, ease: "easeOut" }}
          className={`h-full rounded-full ${barColor}`}
          style={{ boxShadow: `0 0 8px ${glowColor}` }}
        />
      </div>

      <div className="mt-2 flex justify-between text-xs text-on-surface-variant">
        <span>{percentage}% used</span>
        <span>{(total - used).toFixed(1)}{unit} free</span>
      </div>
    </motion.div>
  );
}

export function ResourceUsage({
  cpu,
  ram,
  disk,
}: {
  cpu: { used: number; total: number };
  ram: { used: number; total: number };
  disk: { used: number; total: number };
}) {
  return (
    <div>
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
        className="text-sm font-semibold text-on-surface-variant uppercase tracking-wider mb-4"
      >
        Resource Usage
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ResourceGauge
          label="CPU"
          icon={Cpu}
          used={cpu.used}
          total={cpu.total}
          unit=" cores"
          index={0}
        />
        <ResourceGauge
          label="RAM"
          icon={MemoryStick}
          used={ram.used}
          total={ram.total}
          unit=" GB"
          index={1}
        />
        <ResourceGauge
          label="Disk"
          icon={HardDrive}
          used={disk.used}
          total={disk.total}
          unit=" GB"
          index={2}
        />
      </div>
    </div>
  );
}
