"use client";

import { Select } from "@/components/ui/Select";
import { useCreateProject } from "@/hooks/use-create-project";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Plus, Pencil, Globe, Server, Code2, ExternalLink, Cpu, MemoryStick, HardDrive } from "lucide-react";
import { FormEvent, useState } from "react";

const projectTypes = [
  {
    value: "nodejs",
    label: "Node.js",
    description: "JavaScript runtime",
    icon: Code2,
  },
  {
    value: "php",
    label: "PHP",
    description: "Server-side scripting",
    icon: Server,
  },
  {
    value: "reverse-proxy",
    label: "Reverse Proxy",
    description: "Nginx / Apache",
    icon: ExternalLink,
  },
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

function ResourceSlider({
  label,
  icon: Icon,
  value,
  onChange,
  min,
  max,
  step = 0.5,
  unit,
}: {
  label: string;
  icon: React.ElementType;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  unit: string;
}) {
  const percentage = ((value - min) / (max - min)) * 100;
  const barColor =
    percentage < 50
      ? "bg-secondary-container"
      : percentage < 75
        ? "bg-yellow-400"
        : "bg-error";

  return (
    <div className="flex flex-col gap-2 rounded-xl border border-white/5 bg-white/5 px-4 py-3.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-secondary-fixed-dim" />
          <span className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">
            {label}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <input
            type="number"
            value={value}
            onChange={(e) => {
              const v = parseFloat(e.target.value);
              if (!isNaN(v)) onChange(Math.min(max, Math.max(min, v)));
            }}
            className="w-16 rounded-md border border-white/5 bg-surface-container-high px-2 py-1 text-right text-sm font-semibold text-on-surface outline-none transition-all focus:border-secondary-container/40 focus:shadow-[0_0_8px_rgba(5,102,217,0.1)]"
          />
          <span className="text-xs text-on-surface-variant/60">{unit}</span>
        </div>
      </div>
      <div className="relative h-2 w-full">
        <div className="absolute inset-0 rounded-full bg-surface-container-high" />
        <div
          className={`absolute inset-y-0 left-0 rounded-full ${barColor}`}
          style={{ width: `${percentage}%`, boxShadow: percentage >= 50 ? `0 0 6px ${percentage >= 75 ? 'rgba(239,68,68,0.4)' : 'rgba(245,158,11,0.4)'}` : '0 0 6px rgba(5,102,217,0.4)' }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="absolute inset-0 w-full cursor-pointer opacity-0"
        />
      </div>
      <div className="flex justify-between text-[10px] text-on-surface-variant/40">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  );
}

function FormField({
  label,
  icon: Icon,
  children,
  error,
}: {
  label: string;
  icon: React.ElementType;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">
        <span className="flex items-center gap-1.5">
          <Icon className="h-3.5 w-3.5" />
          {label}
        </span>
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            className="text-xs text-error"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export function CreateProjectForm() {
  const createProject = useCreateProject();

  const [name, setName] = useState("");
  const [type, setType] = useState<string>("nodejs");
  const [url, setUrl] = useState("");
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [cpu, setCpu] = useState(2);
  const [memory, setMemory] = useState(4);
  const [storage, setStorage] = useState(50);

  const versions = versionOptions[type] ?? [];
  const [version, setVersion] = useState(versions[0]?.value ?? "");

  const errors: Record<string, string> = {};
  if (touched.name && !name.trim()) errors.name = "Project name is required";
  if (touched.url && !url.trim()) errors.url = "URL is required";

  function handleTypeChange(nextType: string) {
    setType(nextType);
    setVersion(versionOptions[nextType]?.[0]?.value ?? "");
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    setTouched({ name: true, url: true });
    if (!name.trim() || !url.trim()) return;

    const selectedVersion = versions.find((option) => option.value === version);
    if (!selectedVersion) return;

    createProject.mutate({
      name,
      type: type as "nodejs" | "php" | "reverse-proxy",
      version: selectedVersion.numeric,
      url,
      cpu,
      memory,
      storage,
    });
  }

  return (
    <div className="glass-card rounded-2xl p-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Project Name & URL — side by side on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Project Name" icon={Pencil} error={errors.name}>
            <input
              id="name"
              type="text"
              required
              placeholder="my-awesome-app"
              value={name}
              onChange={(event) => setName(event.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
              className="w-full rounded-lg border border-white/5 bg-white/5 px-4 py-3 text-sm text-on-surface placeholder:text-on-surface-variant/40 outline-none transition-all focus:border-secondary-container/40 focus:bg-white/10 focus:shadow-[0_0_12px_rgba(5,102,217,0.15)] focus:ring-1 focus:ring-secondary-container/50"
            />
          </FormField>

          <FormField label="URL" icon={Globe} error={errors.url}>
            <input
              id="url"
              type="url"
              required
              placeholder="https://my-app.example.com"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, url: true }))}
              className="w-full rounded-lg border border-white/5 bg-white/5 px-4 py-3 text-sm text-on-surface placeholder:text-on-surface-variant/40 outline-none transition-all focus:border-secondary-container/40 focus:bg-white/10 focus:shadow-[0_0_12px_rgba(5,102,217,0.15)] focus:ring-1 focus:ring-secondary-container/50"
            />
          </FormField>
        </div>

        {/* Project Type + Version — side by side on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Project Type */}
          <div className="flex flex-col gap-1.5">
            <label className="flex items-center gap-1.5 text-xs font-medium text-on-surface-variant uppercase tracking-wider">
              <Server className="h-3.5 w-3.5" />
              Project Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {projectTypes.map((projectType) => {
                const Icon = projectType.icon;
                const isActive = type === projectType.value;
                return (
                  <motion.button
                    key={projectType.value}
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleTypeChange(projectType.value)}
                    className={`group flex flex-col items-center gap-1.5 rounded-xl border px-3 py-3.5 text-center transition-all ${
                      isActive
                        ? "border-secondary-container/50 bg-secondary-container/10 shadow-[0_0_12px_rgba(5,102,217,0.1)]"
                        : "border-white/5 bg-white/5 hover:border-white/10 hover:bg-white/10"
                    }`}
                  >
                    <Icon
                      className={`h-5 w-5 ${
                        isActive
                          ? "text-secondary-fixed-dim"
                          : "text-on-surface-variant group-hover:text-on-surface"
                      } transition-colors`}
                    />
                    <span
                      className={`text-xs font-medium ${
                        isActive
                          ? "text-secondary-fixed-dim"
                          : "text-on-surface-variant"
                      }`}
                    >
                      {projectType.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Language Version */}
          <div className="self-end">
            <Select
              label="Language Version"
              options={versions}
              value={version}
              onChange={setVersion}
            />
          </div>
        </div>

        {/* Resource Allocation */}
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-1.5 text-xs font-medium text-on-surface-variant uppercase tracking-wider">
            <Server className="h-3.5 w-3.5" />
            Resource Allocation
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <ResourceSlider
              label="CPU"
              icon={Cpu}
              value={cpu}
              onChange={setCpu}
              min={0.5}
              max={8}
              step={0.5}
              unit=" cores"
            />
            <ResourceSlider
              label="RAM"
              icon={MemoryStick}
              value={memory}
              onChange={setMemory}
              min={1}
              max={32}
              step={1}
              unit=" GB"
            />
            <ResourceSlider
              label="Storage"
              icon={HardDrive}
              value={storage}
              onChange={setStorage}
              min={5}
              max={500}
              step={5}
              unit=" GB"
            />
          </div>
        </div>

        {/* Server error */}
        <AnimatePresence>
          {createProject.error && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="rounded-lg border border-error/20 bg-error/10 px-4 py-3 text-sm text-error"
            >
              {createProject.error instanceof Error
                ? createProject.error.message
                : "An unexpected error occurred"}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit button */}
        <div className="flex justify-end">
          <motion.button
            type="submit"
            disabled={createProject.isPending}
            whileHover={{ scale: createProject.isPending ? 1 : 1.01 }}
            whileTap={{ scale: createProject.isPending ? 1 : 0.98 }}
            className="flex h-11 w-full md:w-auto min-w-45 cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-8 text-sm font-semibold text-on-primary shadow-lg transition-all hover:shadow-[0_0_24px_rgba(255,255,255,0.2)] disabled:cursor-not-allowed disabled:opacity-50"
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
        </div>
      </form>
    </div>
  );
}
