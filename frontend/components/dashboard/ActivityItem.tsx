"use client";

import { motion } from "framer-motion";

export function ActivityItem({
  title,
  subtitle,
  time,
  index = 0,
}: {
  title: string;
  subtitle: string;
  time: string;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.05 * index, duration: 0.3, ease: "easeOut" }}
      className="flex items-start gap-3 border-b border-outline-variant/20 pb-3 last:border-0 last:pb-0"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.05 * index + 0.15, duration: 0.2 }}
        className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-primary"
      />
      <div className="flex-1 min-w-0">
        <p className="truncate text-sm font-medium text-on-surface">{title}</p>
        <p className="truncate text-xs text-on-surface-variant">{subtitle}</p>
      </div>
      <span className="shrink-0 text-xs text-on-surface-variant">{time}</span>
    </motion.div>
  );
}
