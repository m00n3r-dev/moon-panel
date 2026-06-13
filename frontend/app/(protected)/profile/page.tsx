"use client";

import { motion } from "framer-motion";
import { Mail, User as UserIcon, Fingerprint, ShieldCheck, Copy, Check } from "lucide-react";
import { useUser } from "@/lib/auth-context";
import { useState } from "react";

function GlassCard({
  children,
  className = "",
  index = 0,
}: {
  children: React.ReactNode;
  className?: string;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 * index, duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className={`glass-card rounded-2xl p-6 relative overflow-hidden group ${className}`}
    >
      <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-secondary-container/10 rounded-full blur-2xl group-hover:bg-secondary-container/20 transition-all duration-500" />
      {children}
    </motion.div>
  );
}

function DetailCard({
  icon: Icon,
  label,
  value,
  index = 0,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  index?: number;
}) {
  return (
    <GlassCard index={index}>
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary-container/10 group-hover:bg-secondary-container/20 transition-colors duration-300">
          <Icon className="h-5 w-5 text-secondary-fixed-dim" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">
            {label}
          </p>
          <p className="mt-0.5 truncate text-base font-semibold text-primary">
            {value}
          </p>
        </div>
      </div>
    </GlassCard>
  );
}

export default function ProfilePage() {
  const user = useUser();
  const [copied, setCopied] = useState(false);

  const copyUserId = async () => {
    await navigator.clipboard.writeText(user.user_id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-bold text-primary">Profile</h1>
        <p className="mt-1 text-sm text-on-surface-variant">
          Your account details and personal information
        </p>
      </motion.div>

      {/* Avatar card */}
      <GlassCard index={0}>
        <div className="flex flex-col items-center gap-5 py-4">
          {/* Avatar with glow */}
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-secondary-container/30 blur-xl" />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
              className="relative flex h-24 w-24 items-center justify-center rounded-full bg-linear-to-br from-secondary-container to-blue-900 text-3xl font-bold text-white shadow-[0_0_30px_rgba(5,102,217,0.4)]"
            >
              {user.first_name.charAt(0)}
              {user.last_name.charAt(0)}
            </motion.div>
          </div>

          {/* Name & email */}
          <div className="text-center">
            <h2 className="text-xl font-bold text-primary">
              {user.first_name} {user.last_name}
            </h2>
            <p className="mt-1 text-sm text-on-surface-variant">{user.email}</p>
          </div>
        </div>
      </GlassCard>

      {/* Details grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DetailCard
          icon={UserIcon}
          label="First Name"
          value={user.first_name}
          index={1}
        />
        <DetailCard
          icon={UserIcon}
          label="Last Name"
          value={user.last_name}
          index={2}
        />
        <DetailCard icon={Mail} label="Email" value={user.email} index={3} />
        <GlassCard index={4}>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary-container/10 group-hover:bg-secondary-container/20 transition-colors duration-300">
              <Fingerprint className="h-5 w-5 text-secondary-fixed-dim" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">
                User ID
              </p>
              <p className="mt-0.5 truncate font-mono text-sm font-semibold text-primary">
                {user.user_id}
              </p>
            </div>
            <button
              onClick={copyUserId}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface-container-high text-on-surface-variant transition-all hover:bg-secondary-container/20 hover:text-secondary-fixed-dim"
              aria-label={copied ? "Copied" : "Copy user ID"}
            >
              {copied ? (
                <Check className="h-4 w-4 text-emerald-400" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          </div>
        </GlassCard>
      </div>

      {/* Account meta */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        className="flex items-center justify-center gap-2 text-xs text-on-surface-variant/60"
      >
        <ShieldCheck className="h-3.5 w-3.5" />
        <span>Protected account — information is encrypted in transit</span>
      </motion.div>
    </div>
  );
}
