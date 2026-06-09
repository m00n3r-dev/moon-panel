"use client";

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
            user_id: data.user_id,
            email: data.email,
            first_name: data.first_name,
            last_name: data.last_name,
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
      <div className="flex min-h-dvh items-center justify-center bg-surface">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <p className="text-sm text-on-surface-variant">Verifying session…</p>
        </div>
      </div>
    );
  }

  if (authState.status !== "authenticated") {
    return null;
  }

  return <AuthProvider user={authState.user}>{children}</AuthProvider>;
}
