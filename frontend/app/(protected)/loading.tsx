import "./moon-loader.css";

export default function PageLoader() {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-surface/60 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-5">
        {/* Crescent moon spinner */}
        <div className="moon-loader relative flex h-10 w-10 items-center justify-center">
          <div className="moon-glow absolute inset-0 rounded-full" />
          <div className="moon-body relative h-9 w-9 overflow-hidden rounded-full bg-primary/30">
            <div className="moon-shadow absolute inset-0 rounded-full bg-surface" />
          </div>
        </div>

        <p className="text-sm tracking-wide text-on-surface-variant animate-pulse">
          Loading…
        </p>
      </div>
    </div>
  );
}

