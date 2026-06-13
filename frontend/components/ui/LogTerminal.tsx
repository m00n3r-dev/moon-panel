"use client";

import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { useEffect, useRef } from "react";

export interface LogEntry {
  timestamp: string;
  level: "info" | "warn" | "error" | "success";
  message: string;
}

const levelStyles: Record<string, string> = {
  info: "text-blue-300",
  warn: "text-yellow-300",
  error: "text-red-300",
  success: "text-emerald-300",
};

export function LogTerminal({
  logs,
  title = "Logs",
}: {
  logs: LogEntry[];
  title?: string;
}) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.4 }}
      className="glass-card rounded-2xl overflow-hidden"
    >
      {/* Terminal header */}
      <div className="flex items-center gap-2 border-b border-white/5 px-5 py-3">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        </div>
        <div className="flex flex-1 items-center justify-center gap-2">
          <Terminal className="h-3.5 w-3.5 text-on-surface-variant" />
          <span className="text-xs text-on-surface-variant">{title}</span>
        </div>
      </div>

      {/* Log body */}
      <div
        className="h-64 overflow-y-auto bg-[#0a0c0e] p-4 font-mono text-xs leading-relaxed custom-scrollbar"
        style={{ background: "#0a0c0e" }}
      >
        {logs.length === 0 ? (
          <p className="text-on-surface-variant/40 italic">Waiting for logs...</p>
        ) : (
          logs.map((log, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.02 * index, duration: 0.2 }}
              className="flex gap-2 py-0.5"
            >
              <span className="shrink-0 text-on-surface-variant/40">
                {log.timestamp}
              </span>
              <span className={`shrink-0 ${levelStyles[log.level]}`}>
                [{log.level.toUpperCase()}]
              </span>
              <span className="text-gray-200">{log.message}</span>
            </motion.div>
          ))
        )}
        <div ref={bottomRef} />
      </div>
    </motion.div>
  );
}
