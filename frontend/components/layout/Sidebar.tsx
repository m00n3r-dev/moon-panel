"use client";

import {
  LayoutDashboard,
  MessageSquare,
  KeyRound,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Dispatch, SetStateAction } from "react";

const navItems = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Conversations", href: "/conversations", icon: MessageSquare },
  { label: "API Keys", href: "/api-keys", icon: KeyRound },
  { label: "Users", href: "/users", icon: Users },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar({
  expanded,
  onToggle,
}: {
  expanded: boolean;
  onToggle: Dispatch<SetStateAction<boolean>>;
}) {
  const pathname = usePathname();

  return (
    <aside
      className={`flex flex-col border-r border-outline-variant/30 bg-surface-container-low transition-all duration-300 ${
        expanded ? "w-60" : "w-16"
      }`}
    >
      {/* Logo area */}
      <div className="flex h-14 items-center border-b border-outline-variant/30 px-4">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/20">
            <span className="text-sm font-bold text-primary">M</span>
          </div>
          <span
            className={`text-sm font-semibold text-on-surface whitespace-nowrap transition-opacity duration-300 ${
              expanded ? "opacity-100" : "opacity-0"
            }`}
          >
            Moon Panel
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary/15 text-primary"
                  : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
              }`}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span
                className={`whitespace-nowrap transition-opacity duration-300 ${
                  expanded ? "opacity-100" : "opacity-0"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="border-t border-outline-variant/30 p-2">
        <button
          onClick={() => onToggle((prev) => !prev)}
          className="flex w-full items-center justify-center gap-2 rounded-lg px-2.5 py-2 text-sm text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
        >
          {expanded ? (
            <>
              <ChevronLeft className="h-4 w-4 shrink-0" />
              <span className="whitespace-nowrap">Collapse</span>
            </>
          ) : (
            <ChevronRight className="h-4 w-4 shrink-0" />
          )}
        </button>
      </div>
    </aside>
  );
}
