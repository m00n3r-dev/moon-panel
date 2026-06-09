import { MessageSquarePlus, KeyRound, Users, Settings } from "lucide-react";
import Link from "next/link";

const actions = [
  { label: "New Chat", href: "/conversations", icon: MessageSquarePlus },
  { label: "Create Key", href: "/api-keys", icon: KeyRound },
  { label: "Manage Users", href: "/users", icon: Users },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function QuickActions() {
  return (
    <div className="rounded-xl border border-outline-variant/30 bg-surface-container p-5">
      <h2 className="mb-4 text-sm font-semibold text-on-surface">
        Quick Actions
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.href}
              href={action.href}
              className="flex flex-col items-center gap-2 rounded-lg border border-outline-variant/30 bg-surface-container-low p-4 text-center transition-colors hover:bg-surface-container-high"
            >
              <Icon className="h-5 w-5 text-primary" />
              <span className="text-xs font-medium text-on-surface">
                {action.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
