"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Bell, ChevronDown, LogOut, UserCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useUser } from "@/lib/auth-context";

const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/conversations": "Conversations",
  "/api-keys": "API Keys",
  "/users": "Users",
  "/settings": "Settings",
  "/profile": "Profile",
};

function getInitials(firstName: string, lastName: string): string {
  const first = firstName?.charAt(0) ?? "";
  const last = lastName?.charAt(0) ?? "";
  return (first + last).toUpperCase() || "?";
}

function handleLogout() {
  localStorage.removeItem("jwt_token");
  localStorage.removeItem("refresh_token");
  window.location.href = "/login";
}

export function Header() {
  const pathname = usePathname();
  const user = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex h-14 items-center justify-between border-b border-outline-variant/30 bg-surface-container-low px-6"
    >
      <motion.h2
        key={pathname}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="text-sm font-medium text-on-surface"
      >
        {pageTitles[pathname] ?? "Dashboard"}
      </motion.h2>

      <div className="flex items-center gap-3">
        {/* Notifications */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
        >
          <Bell className="h-5 w-5" />
        </motion.button>

        {/* Avatar with dropdown */}
        <div ref={dropdownRef} className="relative">
          <motion.button
            onClick={() => setDropdownOpen((prev) => !prev)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="flex cursor-pointer items-center gap-1.5 rounded-lg pr-1.5 transition-colors hover:bg-surface-container-high"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-xs font-semibold text-primary">
              {getInitials(user.first_name, user.last_name)}
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-on-surface-variant" />
          </motion.button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -4, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.95 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute right-0 top-full z-50 mt-1.5 w-48 overflow-hidden rounded-xl border border-outline-variant/30 bg-surface-container py-1 shadow-lg"
              >
                {/* User info */}
                <div className="border-b border-outline-variant/20 px-3 py-2">
                  <p className="truncate text-sm font-medium text-on-surface">
                    {user.first_name} {user.last_name}
                  </p>
                  <p className="truncate text-xs text-on-surface-variant">
                    {user.email}
                  </p>
                </div>

                {/* Profile */}
                <Link
                  href="/profile"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
                >
                  <UserCircle className="h-4 w-4" />
                  Profile
                </Link>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-error"
                >
                  <LogOut className="h-4 w-4" />
                  Log Out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
}
