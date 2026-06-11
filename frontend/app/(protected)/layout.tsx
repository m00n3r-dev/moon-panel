"use client";

import { AuthGuard } from "@/components/auth/AuthGuard";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      {/* Background atmospheric orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orb-primary rounded-full blur-[120px]" />
        <div className="absolute top-[40%] right-[-5%] w-[30%] h-[50%] bg-orb-tertiary rounded-full blur-[100px]" />
      </div>

      <Sidebar />
      <Header />

      <main className="ml-72 min-h-dvh pt-20 px-8 pb-12">
        {children}
      </main>
    </AuthGuard>
  );
}
