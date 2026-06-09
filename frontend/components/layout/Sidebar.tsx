"use client";

import { motion } from "framer-motion";
import {
  LayoutDashboard,
  MessageSquare,
  KeyRound,
  Users,
  Settings,
  UserCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { Dispatch, SetStateAction } from "react";

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

const sidebarVariants = {
  expanded: { width: 240 },
  collapsed: { width: 64 },
};

const labelVariants = {
  expanded: { opacity: 1, x: 0 },
  collapsed: { opacity: 0, x: -8, transition: { duration: 0.15 } },
};

const navItemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.05 * index, duration: 0.3, ease: "easeOut" },
  }),
};

function handleLogout() {
  localStorage.removeItem("jwt_token");
  localStorage.removeItem("refresh_token");
  window.location.href = "/login";
}

export function Sidebar({
  expanded,
  onToggle,
}: {
  expanded: boolean;
  onToggle: Dispatch<SetStateAction<boolean>>;
}) {
  const pathname = usePathname();

  return (
    <motion.aside
      initial={false}
      animate={expanded ? "expanded" : "collapsed"}
      variants={sidebarVariants}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex flex-col border-r border-outline-variant/30 bg-surface-container-low overflow-hidden"
    >
      {/* Logo area */}
      <div className="flex h-14 items-center border-b border-outline-variant/30 px-4">
        <div className="flex items-center gap-3 overflow-hidden">
          <motion.div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-sm font-bold text-primary">M</span>
          </motion.div>
          <motion.span
            initial={false}
            animate={expanded ? "expanded" : "collapsed"}
            variants={labelVariants}
            className="text-sm font-semibold text-on-surface whitespace-nowrap"
          >
            Moon Panel
          </motion.span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navItems.map((item, index) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <motion.div
              key={item.href}
              variants={navItemVariants}
              initial="hidden"
              animate="visible"
              custom={index}
            >
              <Link
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary/15 text-primary"
                    : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                }`}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <motion.span
                  initial={false}
                  animate={expanded ? "expanded" : "collapsed"}
                  variants={labelVariants}
                  className="whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Bottom nav */}
      <nav className="space-y-1 px-2 pb-1">
        {bottomNavItems.map((item, index) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <motion.div
              key={item.href}
              variants={navItemVariants}
              initial="hidden"
              animate="visible"
              custom={index}
            >
              <Link
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary/15 text-primary"
                    : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                }`}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <motion.span
                  initial={false}
                  animate={expanded ? "expanded" : "collapsed"}
                  variants={labelVariants}
                  className="whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-outline-variant/30 px-2 pt-2">
        <motion.button
          onClick={handleLogout}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-sm font-medium text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-error"
        >
          <LogOut className="h-5 w-5 shrink-0" />
          <motion.span
            initial={false}
            animate={expanded ? "expanded" : "collapsed"}
            variants={labelVariants}
            className="whitespace-nowrap"
          >
            Log Out
          </motion.span>
        </motion.button>
      </div>

      {/* Collapse toggle */}
      <div className="p-2">
        <motion.button
          onClick={() => onToggle((prev) => !prev)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex w-full items-center justify-center gap-2 rounded-lg px-2.5 py-2 text-sm text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
        >
          {expanded ? (
            <>
              <ChevronLeft className="h-4 w-4 shrink-0" />
              <motion.span
                initial={false}
                animate={expanded ? "expanded" : "collapsed"}
                variants={labelVariants}
                className="whitespace-nowrap"
              >
                Collapse
              </motion.span>
            </>
          ) : (
            <ChevronRight className="h-4 w-4 shrink-0" />
          )}
        </motion.button>
      </div>
    </motion.aside>
  );
}
