"use client";

import { Bell } from "lucide-react";
import { usePathname } from "next/navigation";

const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/conversations": "Conversations",
  "/api-keys": "API Keys",
  "/users": "Users",
  "/settings": "Settings",
};

export function Header() {
  const pathname = usePathname();

  return (
    <header className="flex h-14 items-center justify-between border-b border-outline-variant/30 bg-surface-container-low px-6">
      <h2 className="text-sm font-medium text-on-surface">
        {pageTitles[pathname] ?? "Dashboard"}
      </h2>

      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button className="flex h-8 w-8 items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface">
          <Bell className="h-5 w-5" />
        </button>

        {/* Avatar */}
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-xs font-semibold text-primary">
          JD
        </div>
      </div>
    </header>
  );
}
