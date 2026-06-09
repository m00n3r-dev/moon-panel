import { Loader2 } from "lucide-react";

export default function PageLoader() {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-surface/60 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <p className="text-sm text-on-surface-variant">Loading…</p>
      </div>
    </div>
  );
}

