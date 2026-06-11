"use client";

import { motion } from "framer-motion";
import { Home, Rocket } from "lucide-react";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-4" style={{ background: "#05070a" }}>
      {/* Background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orb-primary rounded-full blur-[120px]" />
        <div className="absolute top-[40%] right-[-5%] w-[30%] h-[50%] bg-orb-tertiary rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative flex flex-col items-center text-center"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
          className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary-container shadow-[0_0_15px_rgba(5,102,217,0.4)] mb-6"
        >
          <Rocket className="h-7 w-7 text-white" />
        </motion.div>

        {/* Large 404 */}
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
          className="text-[7rem] font-bold leading-none tracking-tight text-white/10 sm:text-[9rem]"
        >
          404
        </motion.span>

        {/* Glass card with message */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="glass-card rounded-2xl px-8 py-6 mt-4 max-w-sm"
        >
          <p className="text-base font-semibold text-primary">
            Page not found
          </p>
          <p className="mt-1 text-sm text-on-surface-variant">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>

          <Link
            href="/"
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-95"
          >
            <Home className="h-4 w-4" />
            Go Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
