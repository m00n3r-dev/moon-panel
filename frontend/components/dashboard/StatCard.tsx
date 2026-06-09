export function StatCard({
  label,
  value,
  trend,
}: {
  label: string;
  value: string;
  trend?: { direction: "up" | "down"; text: string };
}) {
  return (
    <div className="rounded-xl border border-outline-variant/30 bg-surface-container p-5 transition-colors hover:bg-surface-container-high">
      <p className="text-sm text-on-surface-variant">{label}</p>
      <p className="mt-1 text-2xl font-semibold tracking-tight text-on-surface">
        {value}
      </p>
      {trend && (
        <p
          className={`mt-1 text-xs ${
            trend.direction === "up" ? "text-tertiary" : "text-error"
          }`}
        >
          {trend.text}
        </p>
      )}
    </div>
  );
}
