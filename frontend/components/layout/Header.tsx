"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Bell, ChevronDown, LogOut, Settings, UserCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useUser } from "@/lib/auth-context";

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
  const user = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
      className="glass-header fixed top-3 z-30 flex items-center justify-end rounded-xl px-6 py-2.5 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]"
      style={{ left: "calc(16rem + 1.5rem)", right: "0.75rem" }}
    >
      {/* Right side */}
      <div className="flex items-center gap-4">
        <button className="flex h-8 w-8 items-center justify-center rounded-full text-on-surface-variant transition-all hover:bg-white/5 hover:text-primary">
          <Bell className="h-5 w-5" />
        </button>
        <button className="flex h-8 w-8 items-center justify-center rounded-full text-on-surface-variant transition-all hover:bg-white/5 hover:text-primary">
          <Settings className="h-5 w-5" />
        </button>

        {/* Avatar dropdown */}
        <div ref={dropdownRef} className="relative">
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex cursor-pointer items-center gap-1.5 rounded-full border border-white/20 p-0.5 pr-2 transition-all hover:bg-white/5"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary-container text-xs font-semibold text-white">
              {getInitials(user.first_name, user.last_name)}
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-on-surface-variant" />
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -4, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.95 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute right-0 top-full z-50 mt-2 w-48 overflow-hidden rounded-xl border border-white/10 bg-surface py-1 shadow-xl backdrop-blur-2xl"
              >
                <div className="border-b border-white/10 px-3 py-2">
                  <p className="truncate text-sm font-medium text-on-surface">
                    {user.first_name} {user.last_name}
                  </p>
                  <p className="truncate text-xs text-on-surface-variant">
                    {user.email}
                  </p>
                </div>
                <Link
                  href="/profile"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-on-surface-variant transition-colors hover:bg-white/5 hover:text-on-surface"
                >
                  <UserCircle className="h-4 w-4" />
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm text-on-surface-variant transition-colors hover:bg-white/5 hover:text-error"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
}
