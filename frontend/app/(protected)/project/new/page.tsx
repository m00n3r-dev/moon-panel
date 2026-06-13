"use client";

import { CreateProjectForm } from "@/components/project/CreateProjectForm";
import { motion } from "framer-motion";
import { ArrowLeft, Rocket } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NewProjectPage() {
  const router = useRouter();

  return (
    <div className="mx-auto max-w-lg space-y-6">
      {/* Header with back button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-4"
      >
        <button
          onClick={() => router.push("/")}
          className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-container text-on-surface-variant transition-all hover:bg-surface-container-high hover:text-primary"
          aria-label="Back to Dashboard"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary-container shadow-[0_0_15px_rgba(5,102,217,0.4)]">
          <Rocket className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-primary">New Project</h1>
          <p className="text-xs text-on-surface-variant">
            Configure your project details
          </p>
        </div>
      </motion.div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
      >
        <CreateProjectForm />
      </motion.div>
    </div>
  );
}
