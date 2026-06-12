import { Metadata } from "next";
import {
  ArrowUpRight,
  Building2,
  Users,
  Zap,
  TrendingUp,
  Grid3X3,
  Clock,
  CheckCircle2,
  CircleDashed,
  BarChart3,
} from "lucide-react";
import { QuickActionsSection } from "@/app/components/QuickActionsSection";

export const metadata: Metadata = {
  title: "Home — Bitscale Clone",
  description: "Your Bitscale dashboard home. View recent grids, metrics, and activity.",
};

const stats = [
  {
    label: "Total Grids",
    value: "24",
    change: "+3 this week",
    icon: Grid3X3,
    color: "blue",
  },
  {
    label: "Companies Found",
    value: "12,847",
    change: "+1,204 today",
    icon: Building2,
    color: "violet",
  },
  {
    label: "People Enriched",
    value: "8,391",
    change: "+489 today",
    icon: Users,
    color: "emerald",
  },
  {
    label: "Automations Run",
    value: "156",
    change: "Last 30 days",
    icon: Zap,
    color: "amber",
  },
];

const recentGrids = [
  {
    id: 1,
    name: "Series B SaaS Companies — EU",
    status: "completed",
    rows: 842,
    updatedAt: "2 hours ago",
  },
  {
    id: 2,
    name: "VP Engineering Outreach — SF Bay",
    status: "running",
    rows: 314,
    updatedAt: "Running now",
  },
  {
    id: 3,
    name: "YC W24 Founders",
    status: "completed",
    rows: 127,
    updatedAt: "Yesterday",
  },
  {
    id: 4,
    name: "Healthcare AI — Series A",
    status: "draft",
    rows: 0,
    updatedAt: "3 days ago",
  },
  {
    id: 5,
    name: "Fintech CFOs — APAC",
    status: "completed",
    rows: 2103,
    updatedAt: "4 days ago",
  },
];

const statusConfig = {
  completed: {
    label: "Completed",
    icon: CheckCircle2,
    class: "text-emerald-600 bg-emerald-50",
  },
  running: {
    label: "Running",
    icon: TrendingUp,
    class: "text-blue-600 bg-blue-50",
  },
  draft: {
    label: "Draft",
    icon: CircleDashed,
    class: "text-gray-500 bg-gray-100",
  },
};

const colorMap: Record<string, string> = {
  blue: "bg-blue-50 text-blue-600",
  violet: "bg-violet-50 text-violet-600",
  emerald: "bg-emerald-50 text-emerald-600",
  amber: "bg-amber-50 text-amber-600",
};

export default function HomePage() {
  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Welcome header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Good morning, Sambhav 👋
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Here's what's happening with your workspace today.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400 bg-white border border-gray-200 rounded-lg px-3 py-2">
          <Clock className="h-3.5 w-3.5" />
          <span>Last synced 2 minutes ago</span>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-200 group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`h-9 w-9 rounded-lg flex items-center justify-center ${colorMap[stat.color]}`}>
                  <Icon className="h-[18px] w-[18px]" />
                </div>
                <ArrowUpRight className="h-4 w-4 text-gray-300 group-hover:text-gray-400 transition-colors" />
              </div>
              <p className="text-2xl font-bold text-gray-900 tabular-nums">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
              <p className="text-[11px] font-medium text-emerald-600 mt-2">{stat.change}</p>
            </div>
          );
        })}
      </div>

      {/* Quick actions — client component so it can open modals */}
      <QuickActionsSection />

      {/* Recent grids */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-700">Recent Grids</h2>
          <a
            href="/dashboard"
            className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
          >
            View all
            <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/60">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Grid Name
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Status
                  </th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Rows
                  </th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Updated
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentGrids.map((grid, idx) => {
                  const status = statusConfig[grid.status as keyof typeof statusConfig];
                  const StatusIcon = status.icon;
                  return (
                    <tr
                      key={grid.id}
                      className="hover:bg-gray-50/80 transition-colors group cursor-pointer"
                    >
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="h-7 w-7 rounded-md bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500 shrink-0">
                            {String(idx + 1).padStart(2, "0")}
                          </div>
                          <span className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors text-[13px] truncate max-w-[200px] sm:max-w-xs">
                            {grid.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${status.class}`}
                        >
                          <StatusIcon className="h-3 w-3" />
                          {status.label}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <span className="text-[13px] font-semibold text-gray-700 tabular-nums">
                          {grid.rows > 0 ? grid.rows.toLocaleString() : "—"}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <span className="text-[12px] text-gray-400">{grid.updatedAt}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Credits usage card */}
      <div className="rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50 to-violet-50 p-5 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-gray-900">Credit Usage</h3>
          <p className="text-xs text-gray-500 mt-0.5">
            450,000 of 5,500,000 credits used this billing cycle
          </p>
          <div className="mt-3 h-2 w-full rounded-full bg-white/70 border border-blue-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-500"
              style={{ width: "8.18%" }}
            />
          </div>
          <p className="text-[11px] text-gray-400 mt-1.5">8% used · Resets in 22 days</p>
        </div>
        <a
          href="/billing"
          className="shrink-0 inline-flex items-center gap-2 rounded-lg bg-white border border-gray-200 px-4 py-2 text-[13px] font-semibold text-gray-700 shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-all"
        >
          Manage Plan
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}
