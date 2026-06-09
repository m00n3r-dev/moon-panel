export function ActivityItem({
  title,
  subtitle,
  time,
}: {
  title: string;
  subtitle: string;
  time: string;
}) {
  return (
    <div className="flex items-start gap-3 border-b border-outline-variant/20 pb-3 last:border-0 last:pb-0">
      <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
      <div className="flex-1 min-w-0">
        <p className="truncate text-sm font-medium text-on-surface">{title}</p>
        <p className="truncate text-xs text-on-surface-variant">{subtitle}</p>
      </div>
      <span className="shrink-0 text-xs text-on-surface-variant">{time}</span>
    </div>
  );
}
