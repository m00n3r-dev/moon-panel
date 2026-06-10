"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const { data } = await apiClient.post("/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("jwt_token", data.jwt_token);
      if (data.refreshToken) {
        localStorage.setItem("refresh_token", data.refresh_token);
      }

      router.push("/");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (axios.isAxiosError(err) && err.response) {
        setError(`Login failed (${err.response.status})`);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-surface px-4">
      <div className="w-full max-w-sm">
        {/* Branding */}
        <div className="mb-10 text-center">
          <h1 className="text-display-xl text-on-surface">Moon Panel</h1>
          <p className="mt-2 text-body-md text-on-surface-variant">
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
                className="text-label-md text-on-surface-variant"
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
                className="rounded-lg border border-outline-variant bg-surface-container-low px-3.5 py-2.5 text-body-md text-on-surface placeholder:text-on-surface-variant/50 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password"
                className="text-label-md text-on-surface-variant"
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
                className="rounded-lg border border-outline-variant bg-surface-container-low px-3.5 py-2.5 text-body-md text-on-surface placeholder:text-on-surface-variant/50 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-lg bg-error-container/20 px-3.5 py-2.5 text-body-md text-error">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="mt-1 flex h-11 cursor-pointer items-center justify-center rounded-lg bg-primary font-semibold text-on-primary transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? (
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

        {/* Register link */}
        <p className="mt-6 text-center text-body-md text-on-surface-variant">
          Don&apos;t have an account?{" "}
          <a
            href="/register"
            className="font-medium text-primary transition-colors hover:text-primary/80"
          >
            Create one
          </a>
        </p>
      </div>
    </div>
  );
}
