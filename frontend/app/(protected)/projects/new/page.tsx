"use client";

import { Select } from "@/components/ui/Select";
import { motion } from "framer-motion";
import { ArrowLeft, Plus, Rocket } from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";

const projectTypes = [
  { value: "nodejs", label: "Node.js" },
  { value: "php", label: "PHP" },
  { value: "reverse-proxy", label: "Reverse Proxy" },
];

const versionOptions: Record<string, { value: string; label: string }[]> = {
  nodejs: ["18.x", "20.x", "22.x"].map((v) => ({ value: v, label: v })),
  php: ["8.1", "8.2", "8.3"].map((v) => ({ value: v, label: v })),
  "reverse-proxy": ["Nginx 1.24", "Nginx 1.26", "Apache 2.4"].map((v) => ({ value: v, label: v })),
};

export default function NewProjectPage() {
  const [name, setName] = useState("");
  const [type, setType] = useState("nodejs");
  const [url, setUrl] = useState("");

  const versions = versionOptions[type] ?? [];
  const [version, setVersion] = useState(versions[0]?.value ?? "");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    // TODO: submit project creation
  }

  return (
    <div className="mx-auto max-w-lg">
      {/* Back link */}
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-on-surface-variant transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary-container shadow-[0_0_15px_rgba(5,102,217,0.4)]">
            <Rocket className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-primary">New Project</h1>
            <p className="text-sm text-on-surface-variant">
              Configure your project details
            </p>
          </div>
        </div>

        {/* Form card */}
        <div className="glass-card rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Project Name */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="name"
                className="text-xs font-medium text-on-surface-variant uppercase tracking-wider"
              >
                Project Name
              </label>
              <input
                id="name"
                type="text"
                required
                placeholder="my-awesome-app"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full rounded-lg bg-white/5 px-3.5 py-2.5 text-sm text-on-surface placeholder:text-on-surface-variant/40 outline-none transition-all focus:bg-white/10 focus:ring-1 focus:ring-secondary-container/50"
              />
            </div>

            {/* Project Type */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">
                Project Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                {projectTypes.map((projectType) => (
                  <button
                    key={projectType.value}
                    type="button"
                    onClick={() => {
                      setType(projectType.value);
                      setVersion(versionOptions[projectType.value]?.[0]?.value ?? "");
                    }}
                    className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition-all ${
                      type === projectType.value
                        ? "border-secondary-container/50 bg-secondary-container/10 text-secondary-fixed-dim"
                        : "border-white/5 bg-white/5 text-on-surface-variant hover:bg-white/10"
                    }`}
                  >
                    {projectType.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Language Version */}
            <Select
              label="Language Version"
              options={versions}
              value={version}
              onChange={setVersion}
            />

            {/* URL */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="url"
                className="text-xs font-medium text-on-surface-variant uppercase tracking-wider"
              >
                URL
              </label>
              <input
                id="url"
                type="url"
                required
                placeholder="https://my-app.example.com"
                value={url}
                onChange={(event) => setUrl(event.target.value)}
                className="w-full rounded-lg bg-white/5 px-3.5 py-2.5 text-sm text-on-surface placeholder:text-on-surface-variant/40 outline-none transition-all focus:bg-white/10 focus:ring-1 focus:ring-secondary-container/50"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="mt-2 flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-semibold text-on-primary transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-95"
            >
              <Plus className="h-4 w-4" />
              Create Project
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
