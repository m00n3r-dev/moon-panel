"use client";

import { motion } from "framer-motion";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";

const statusConfig = {
  operational: {
    icon: CheckCircle,
    label: "All systems operational",
    dotColor: "bg-tertiary",
    textColor: "text-tertiary",
  },
  degraded: {
    icon: AlertTriangle,
    label: "Degraded performance",
    dotColor: "bg-yellow-400",
    textColor: "text-yellow-400",
  },
  down: {
    icon: XCircle,
    label: "System outage detected",
    dotColor: "bg-error",
    textColor: "text-error",
  },
};

export function SystemHealthBanner({
  status,
  sla,
}: {
  status: "operational" | "degraded" | "down";
  sla: string;
}) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex items-center justify-between rounded-lg border border-outline-variant/20 bg-surface-container px-4 py-3"
    >
      <div className="flex items-center gap-2.5">
        <span className={`flex h-2 w-2 rounded-full ${config.dotColor}`} />
        <Icon className={`h-4 w-4 ${config.textColor}`} />
        <span className={`text-sm ${config.textColor}`}>{config.label}</span>
      </div>
      <span className="text-xs text-on-surface-variant/60">
        SLA: {sla} uptime
      </span>
    </motion.div>
  );
}
