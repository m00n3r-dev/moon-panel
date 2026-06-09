"use client";

import { motion } from "framer-motion";

export function StatCard({
  label,
  value,
  trend,
  index = 0,
}: {
  label: string;
  value: string;
  trend?: { direction: "up" | "down"; text: string };
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 * index, duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className="rounded-xl border border-outline-variant/30 bg-surface-container p-5 transition-colors hover:bg-surface-container-high"
    >
      <p className="text-sm text-on-surface-variant">{label}</p>
      <p className="mt-1 text-2xl font-semibold tracking-tight text-on-surface">
        {value}
      </p>
      {trend && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.08 * index + 0.2, duration: 0.3 }}
          className={`mt-1 text-xs ${
            trend.direction === "up" ? "text-tertiary" : "text-error"
          }`}
        >
          {trend.text}
        </motion.p>
      )}
    </motion.div>
  );
}
