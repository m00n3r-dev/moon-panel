"use client";

import { useState } from "react";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  return (
    <AuthGuard>
      <div className="flex min-h-dvh bg-surface">
        <Sidebar expanded={sidebarExpanded} onToggle={setSidebarExpanded} />

        <div className="flex flex-1 flex-col">
          <Header />
          <main className="flex-1 overflow-auto p-6">{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
}
