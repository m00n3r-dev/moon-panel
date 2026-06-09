"use client";

import { motion } from "framer-motion";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthProvider, type User } from "@/lib/auth-context";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

type AuthState =
  | { status: "loading" }
  | { status: "authenticated"; user: User }
  | { status: "redirecting" };

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;

    async function checkAuth() {
      const token = localStorage.getItem("jwt_token");

      if (!token) {
        router.replace("/login");
        return;
      }

      try {
        const { data } = await apiClient.post("/api/auth/validate-token", {
          jwtToken: token,
        });

        if (cancelled) return;

        if (!data.valid) {
          localStorage.removeItem("jwt_token");
          localStorage.removeItem("refresh_token");
          router.replace("/login");
          return;
        }

        setAuthState({
          status: "authenticated",
          user: {
            user_id: data.userId ?? data.user_id,
            email: data.email,
            first_name: data.firstName ?? data.first_name ?? "",
            last_name: data.lastName ?? data.last_name ?? "",
          },
        });
      } catch {
        if (cancelled) return;
        localStorage.removeItem("jwt_token");
        localStorage.removeItem("refresh_token");
        router.replace("/login");
      }
    }

    checkAuth();

    return () => {
      cancelled = true;
    };
  }, [router]);

  if (authState.status === "loading") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex min-h-dvh items-center justify-center bg-surface"
      >
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="flex flex-col items-center gap-3"
        >
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <p className="text-sm text-on-surface-variant">Verifying session…</p>
        </motion.div>
      </motion.div>
    );
  }

  if (authState.status !== "authenticated") {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <AuthProvider user={authState.user}>{children}</AuthProvider>
    </motion.div>
  );
}
