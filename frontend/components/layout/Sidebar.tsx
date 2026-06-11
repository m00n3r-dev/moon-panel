"use client";

import {
  LayoutDashboard,
  MessageSquare,
  KeyRound,
  Users,
  Settings,
  UserCircle,
  LogOut,
  Rocket,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Conversations", href: "/conversations", icon: MessageSquare },
  { label: "API Keys", href: "/api-keys", icon: KeyRound },
  { label: "Users", href: "/users", icon: Users },
  { label: "Settings", href: "/settings", icon: Settings },
];

const bottomNavItems = [
  { label: "Profile", href: "/profile", icon: UserCircle },
];

function handleLogout() {
  localStorage.removeItem("jwt_token");
  localStorage.removeItem("refresh_token");
  window.location.href = "/login";
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="glass-sidebar fixed left-0 top-0 z-50 flex h-dvh w-64 flex-col rounded-xl p-4 m-3 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
      {/* Branding */}
      <div className="mb-8 flex items-center gap-3 px-2 py-1">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary-container shadow-[0_0_15px_rgba(5,102,217,0.4)]">
          <Rocket className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-sm font-bold leading-tight text-primary">
            Moon Panel
          </h1>
          <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
            Enterprise Tier
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-1 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-all hover:translate-x-1 ${
                isActive
                  ? "bg-secondary-container text-on-secondary-container shadow-[0_0_15px_rgba(5,102,217,0.3)]"
                  : "text-on-surface-variant hover:bg-white/10"
              }`}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}

        {/* New Chat button */}
        <div className="mt-6 px-1">
          <Link
            href="/conversations"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-on-primary shadow-xl transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-95"
          >
            <MessageSquare className="h-4 w-4" />
            <span>New Chat</span>
          </Link>
        </div>
      </nav>

      {/* Bottom section */}
      <div className="mt-auto flex flex-col gap-1 border-t border-white/5 pt-4">
        {bottomNavItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? "bg-secondary-container text-on-secondary-container"
                  : "text-on-surface-variant hover:bg-white/10"
              }`}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-on-surface-variant transition-all hover:bg-white/10"
        >
          <LogOut className="h-5 w-5 shrink-0" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
