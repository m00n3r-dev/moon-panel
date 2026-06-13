"use client";

import { Select } from "@/components/ui/Select";
import { useCreateProject } from "@/hooks/use-create-project";
import { motion } from "framer-motion";
import { Loader2, Plus } from "lucide-react";
import { FormEvent, useState } from "react";

const projectTypes = [
  { value: "nodejs", label: "Node.js" },
  { value: "php", label: "PHP" },
  { value: "reverse-proxy", label: "Reverse Proxy" },
] as const;

const versionOptions: Record<
  string,
  { value: string; label: string; numeric: number }[]
> = {
  nodejs: [
    { value: "18", label: "18.x", numeric: 18 },
    { value: "20", label: "20.x", numeric: 20 },
    { value: "22", label: "22.x", numeric: 22 },
  ],
  php: [
    { value: "81", label: "8.1", numeric: 81 },
    { value: "82", label: "8.2", numeric: 82 },
    { value: "83", label: "8.3", numeric: 83 },
  ],
  "reverse-proxy": [
    { value: "124", label: "Nginx 1.24", numeric: 124 },
    { value: "126", label: "Nginx 1.26", numeric: 126 },
    { value: "24", label: "Apache 2.4", numeric: 24 },
  ],
};

export function CreateProjectForm() {
  const createProject = useCreateProject();

  const [name, setName] = useState("");
  const [type, setType] = useState<string>("nodejs");
  const [url, setUrl] = useState("");

  const versions = versionOptions[type] ?? [];
  const [version, setVersion] = useState(versions[0]?.value ?? "");

  function handleTypeChange(nextType: string) {
    setType(nextType);
    setVersion(versionOptions[nextType]?.[0]?.value ?? "");
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const selectedVersion = versions.find((option) => option.value === version);
    if (!selectedVersion) return;

    createProject.mutate({
      name,
      type: type as "nodejs" | "php" | "reverse-proxy",
      version: selectedVersion.numeric,
      url,
    });
  }

  return (
    <div className="glass-card rounded-2xl p-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">
            Project Type
          </label>
          <div className="grid grid-cols-3 gap-2">
            {projectTypes.map((projectType) => (
              <motion.button
                key={projectType.value}
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleTypeChange(projectType.value)}
                className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition-all ${
                  type === projectType.value
                    ? "border-secondary-container/50 bg-secondary-container/10 text-secondary-fixed-dim"
                    : "border-white/5 bg-white/5 text-on-surface-variant hover:bg-white/10"
                }`}
              >
                {projectType.label}
              </motion.button>
            ))}
          </div>
        </div>

        <Select
          label="Language Version"
          options={versions}
          value={version}
          onChange={setVersion}
        />

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

        {createProject.error && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg bg-error/10 px-3.5 py-2.5 text-sm text-error"
          >
            {createProject.error instanceof Error
              ? createProject.error.message
              : "An unexpected error occurred"}
          </motion.div>
        )}

        <motion.button
          type="submit"
          disabled={createProject.isPending}
          whileHover={{ scale: createProject.isPending ? 1 : 1.01 }}
          whileTap={{ scale: createProject.isPending ? 1 : 0.98 }}
          className="mt-2 flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary text-sm font-semibold text-on-primary transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {createProject.isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Creating…
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" />
              Create Project
            </>
          )}
        </motion.button>
      </form>
    </div>
  );
}
