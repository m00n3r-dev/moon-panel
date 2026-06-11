"use client";

import { motion } from "framer-motion";
import { Cpu, MemoryStick, HardDrive, Network } from "lucide-react";

function MiniGauge({
  icon: Icon,
  label,
  value,
  unit,
  index = 0,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  unit: string;
  index?: number;
}) {
  const barColor =
    value < 60 ? "bg-tertiary" : value < 85 ? "bg-yellow-400" : "bg-error";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 + 0.06 * index, duration: 0.35 }}
      className="rounded-lg border border-outline-variant/20 bg-surface-container px-4 py-3"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-primary" />
          <span className="text-xs text-on-surface-variant">{label}</span>
        </div>
        <span className="text-sm font-semibold text-on-surface">
          {value}
          <span className="text-xs font-normal text-on-surface-variant">{unit}</span>
        </span>
      </div>
      <div className="mt-2.5 h-1 w-full overflow-hidden rounded-full bg-surface-container-high">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ delay: 0.3 + 0.06 * index, duration: 0.6 }}
          className={`h-full rounded-full ${barColor}`}
        />
      </div>
    </motion.div>
  );
}

export function SystemHealthGrid({
  cpu,
  ram,
  disk,
  network,
}: {
  cpu: number;
  ram: number;
  disk: number;
  network: { inbound: string; outbound: string };
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.4 }}
      className="rounded-lg border border-outline-variant/20 bg-surface-container px-4 py-3"
    >
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
          System Health
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <MiniGauge icon={Cpu} label="CPU" value={cpu} unit="%" index={0} />
        <MiniGauge icon={MemoryStick} label="RAM" value={ram} unit="%" index={1} />
        <MiniGauge icon={HardDrive} label="Disk" value={disk} unit="%" index={2} />
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.33, duration: 0.35 }}
          className="rounded-lg border border-outline-variant/20 bg-surface-container px-4 py-3"
        >
          <div className="flex items-center gap-2">
            <Network className="h-4 w-4 text-primary" />
            <span className="text-xs text-on-surface-variant">Network</span>
          </div>
          <div className="mt-1.5 grid grid-cols-2 gap-2 text-center">
            <div>
              <p className="text-xs text-on-surface-variant/60">In</p>
              <p className="text-sm font-semibold text-on-surface">{network.inbound}</p>
            </div>
            <div>
              <p className="text-xs text-on-surface-variant/60">Out</p>
              <p className="text-sm font-semibold text-on-surface">{network.outbound}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
