"use client";

import { motion } from "framer-motion";
import { Server } from "lucide-react";

export function NodeStatusCard({
  nodes,
}: {
  nodes: Array<{
    id: string;
    name: string;
    online: boolean;
    load: number;
  }>;
}) {
  const onlineCount = nodes.filter((node) => node.online).length;
  const offlineCount = nodes.length - onlineCount;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25, duration: 0.4 }}
      className="rounded-lg border border-outline-variant/20 bg-surface-container px-4 py-3"
    >
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
          Nodes
        </h2>
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-tertiary" />
            <span className="text-on-surface-variant">{onlineCount} online</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-on-surface-variant/30" />
            <span className="text-on-surface-variant">{offlineCount} offline</span>
          </span>
        </div>
      </div>
      <div className="space-y-1">
        {nodes.map((node, index) => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + 0.05 * index, duration: 0.25 }}
            className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-surface-container-high transition-colors"
          >
            <Server
              className={`h-3.5 w-3.5 shrink-0 ${
                node.online ? "text-tertiary" : "text-on-surface-variant/30"
              }`}
            />
            <span
              className={`flex-1 text-sm ${
                node.online ? "text-on-surface" : "text-on-surface-variant/40 line-through"
              }`}
            >
              {node.name}
            </span>
            {node.online && (
              <div className="flex items-center gap-2">
                <div className="h-1 w-16 overflow-hidden rounded-full bg-surface-container-high sm:w-24">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${node.load}%` }}
                    transition={{ delay: 0.4 + 0.05 * index, duration: 0.5 }}
                    className={`h-full rounded-full ${
                      node.load < 50 ? "bg-tertiary" : node.load < 80 ? "bg-yellow-400" : "bg-error"
                    }`}
                  />
                </div>
                <span className="w-8 text-right text-xs text-on-surface-variant">
                  {node.load}%
                </span>
              </div>
            )}
            {!node.online && (
              <span className="text-xs text-on-surface-variant/40">Offline</span>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
