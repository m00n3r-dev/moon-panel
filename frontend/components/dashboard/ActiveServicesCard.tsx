"use client";

import { motion } from "framer-motion";
import { Play, Square, AlertOctagon } from "lucide-react";

const stats = [
  { label: "Running", value: 12, icon: Play, color: "text-tertiary" },
  { label: "Stopped", value: 2, icon: Square, color: "text-on-surface-variant" },
  { label: "Failed", value: 1, icon: AlertOctagon, color: "text-error" },
];

export function ActiveServicesCard() {
  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + 0.06 * index, duration: 0.35, ease: "easeOut" }}
            className="rounded-lg border border-outline-variant/20 bg-surface-container px-4 py-3"
          >
            <div className="flex items-center gap-2">
              <Icon className={`h-4 w-4 ${stat.color}`} />
              <span className="text-xs text-on-surface-variant">{stat.label}</span>
            </div>
            <p className="mt-1.5 text-2xl font-semibold tracking-tight text-on-surface">
              {stat.value}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}
