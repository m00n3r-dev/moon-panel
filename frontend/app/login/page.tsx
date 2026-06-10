"use client";

import { useLogin } from "@/hooks/use-login";
import Image from "next/image";
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
    <div className="flex min-h-dvh items-center justify-center bg-surface px-4">
      <div className="w-full max-w-sm">
        {/* Branding */}
        <div className="mb-10 flex flex-col items-center text-center">
          <Image
            src="/logo.png"
            alt="Moon Panel"
            width={56}
            height={56}
            className="rounded-2xl"
          />
          <p className="mt-4 text-base text-on-surface-variant">
            Sign in to your account
          </p>
        </div>

        {/* Card */}
        <div className="rounded-xl border border-outline-variant bg-surface-container p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-sm font-medium text-on-surface-variant"
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
                className="rounded-lg border border-outline-variant bg-surface-container-low px-3.5 py-2.5 text-base text-on-surface placeholder:text-on-surface-variant/50 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password"
                className="text-sm font-medium text-on-surface-variant"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="rounded-lg border border-outline-variant bg-surface-container-low px-3.5 py-2.5 text-base text-on-surface placeholder:text-on-surface-variant/50 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Error */}
            {login.error && (
              <div className="rounded-lg bg-error-container/20 px-3.5 py-2.5 text-base text-error">
                {login.error instanceof Error
                  ? login.error.message
                  : "An unexpected error occurred"}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={login.isPending}
              className="mt-1 flex h-11 cursor-pointer items-center justify-center rounded-lg bg-primary font-semibold text-on-primary transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {login.isPending ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Signing in…
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
