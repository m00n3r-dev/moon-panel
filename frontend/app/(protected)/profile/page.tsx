"use client";

import { motion } from "framer-motion";
import { Mail, User as UserIcon, Shield, Calendar } from "lucide-react";
import { useUser } from "@/lib/auth-context";

function DetailRow({
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
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index, duration: 0.3, ease: "easeOut" }}
      className="flex items-center gap-3 rounded-lg border border-outline-variant/20 bg-surface-container-low p-3.5"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-on-surface-variant">{label}</p>
        <p className="truncate text-sm font-medium text-on-surface">{value}</p>
      </div>
    </motion.div>
  );
}

export default function ProfilePage() {
  const user = useUser();

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="text-xl font-semibold text-on-surface">Profile</h1>
        <p className="mt-1 text-sm text-on-surface-variant">
          Your account details
        </p>
      </div>

      {/* Avatar card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex flex-col items-center gap-4 rounded-xl border border-outline-variant/30 bg-surface-container p-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.15, duration: 0.4, ease: "easeOut" }}
          className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 text-2xl font-bold text-primary"
        >
          {user.first_name.charAt(0)}
          {user.last_name.charAt(0)}
        </motion.div>
        <div className="text-center">
          <h2 className="text-lg font-semibold text-on-surface">
            {user.first_name} {user.last_name}
          </h2>
          <p className="text-sm text-on-surface-variant">{user.email}</p>
        </div>
      </motion.div>

      {/* Details */}
      <div className="space-y-3">
        <DetailRow
          icon={UserIcon}
          label="First Name"
          value={user.first_name}
          index={0}
        />
        <DetailRow
          icon={UserIcon}
          label="Last Name"
          value={user.last_name}
          index={1}
        />
        <DetailRow icon={Mail} label="Email" value={user.email} index={2} />
        <DetailRow
          icon={Shield}
          label="User ID"
          value={user.user_id}
          index={3}
        />
      </div>
    </div>
  );
}
