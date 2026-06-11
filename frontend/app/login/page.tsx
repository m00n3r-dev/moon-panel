"use client";

import { useLogin } from "@/hooks/use-login";
import { Loader2, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = useLogin();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    login.mutate({ email, password });
  }

  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden px-4" style={{ background: "#05070a" }}>
      {/* Background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orb-primary rounded-full blur-[120px]" />
        <div className="absolute top-[40%] right-[-5%] w-[30%] h-[50%] bg-orb-tertiary rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative w-full max-w-sm"
      >
        {/* Branding */}
        <div className="mb-10 flex flex-col items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary-container shadow-[0_0_15px_rgba(5,102,217,0.4)]">
            <Rocket className="h-7 w-7 text-white" />
          </div>
          <p className="mt-4 text-sm text-on-surface-variant">
            Sign in to your account
          </p>
        </div>

        {/* Glass card */}
        <div className="glass-card rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-xs font-medium text-on-surface-variant uppercase tracking-wider"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-lg bg-white/5 px-3.5 py-2.5 text-sm text-on-surface placeholder:text-on-surface-variant/40 outline-none transition-all focus:bg-white/10 focus:ring-1 focus:ring-secondary-container/50"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password"
                className="text-xs font-medium text-on-surface-variant uppercase tracking-wider"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-lg bg-white/5 px-3.5 py-2.5 text-sm text-on-surface placeholder:text-on-surface-variant/40 outline-none transition-all focus:bg-white/10 focus:ring-1 focus:ring-secondary-container/50"
              />
            </div>

            {/* Error */}
            {login.error && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg bg-error/10 px-3.5 py-2.5 text-sm text-error"
              >
                {login.error instanceof Error
                  ? login.error.message
                  : "An unexpected error occurred"}
              </motion.div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={login.isPending}
              className="mt-1 flex h-10 w-full cursor-pointer items-center justify-center rounded-lg bg-primary font-semibold text-sm text-on-primary transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] disabled:cursor-not-allowed disabled:opacity-50 active:scale-95"
            >
              {login.isPending ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing in…
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
