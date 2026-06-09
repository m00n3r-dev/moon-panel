import { ActivityItem } from "@/components/dashboard/ActivityItem";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { StatCard } from "@/components/dashboard/StatCard";

const activityItems = [
  {
    title: "New conversation created",
    subtitle: "User 'alice@example.com' started a new chat",
    time: "2m ago",
  },
  {
    title: "API key rotated",
    subtitle: "Key 'Production - v2' was regenerated",
    time: "15m ago",
  },
  {
    title: "User registered",
    subtitle: "New account: 'bob@example.com'",
    time: "1h ago",
  },
  {
    title: "Token threshold reached",
    subtitle: "Daily limit warning at 80%",
    time: "2h ago",
  },
  {
    title: "Conversation exported",
    subtitle: "Export 'Q1 Report' completed",
    time: "3h ago",
  },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div>
        <h1 className="text-xl font-semibold text-on-surface">Dashboard</h1>
        <p className="mt-1 text-sm text-on-surface-variant">
          Overview of your platform activity
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard index={0} label="Total Conversations" value="1,284" trend={{ direction: "up", text: "+12% from last month" }} />
        <StatCard index={1} label="Active Users" value="48" trend={{ direction: "up", text: "+3 new this week" }} />
        <StatCard index={2} label="API Calls Today" value="3,521" trend={{ direction: "up", text: "+8% from yesterday" }} />
        <StatCard index={3} label="Token Usage" value="2.4M" trend={{ direction: "down", text: "-5% from last week" }} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <div className="rounded-xl border border-outline-variant/30 bg-surface-container p-5">
          <h2 className="mb-4 text-sm font-semibold text-on-surface">
            Recent Activity
          </h2>
          <div className="space-y-3">
            {activityItems.map((item, index) => (
              <ActivityItem key={index} index={index} {...item} />
            ))}
          </div>
        </div>

        <QuickActions />
      </div>
    </div>
  );
}
