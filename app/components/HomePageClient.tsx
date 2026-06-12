"use client";

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
  Pencil,
  Copy,
  Trash2,
  ChevronRight,
} from "lucide-react";
import { AnimatedCounter } from "@/app/components/AnimatedCounter";
import { QuickActionsSection } from "@/app/components/QuickActionsSection";
import { useGrids } from "@/app/context/GridContext";
import { GridIcon } from "@/app/components/GridIcon";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Stat {
  label: string;
  value: number;
  displayValue: string;
  change: string;
  icon: string;
  color: string;
}

// ─── Icon map ─────────────────────────────────────────────────────────────────

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Grid3X3, Building2, Users, Zap,
};

const colorMap: Record<string, string> = {
  blue: "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400",
  violet: "bg-violet-50 dark:bg-violet-950 text-violet-600 dark:text-violet-400",
  emerald: "bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400",
  amber: "bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400",
};

const statusConfig = {
  completed: {
    label: "Completed",
    icon: CheckCircle2,
    class: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950",
  },
  running: {
    label: "Running",
    icon: TrendingUp,
    class: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950",
  },
  draft: {
    label: "Draft",
    icon: CircleDashed,
    class: "text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800",
  },
};

// ─── HomePageClient ───────────────────────────────────────────────────────────

export function HomePageClient({ stats }: { stats: Stat[] }) {
  const { grids, deleteGrid } = useGrids();
  
  // Show only top 5 grids for the "Recent Grids" table on the home page
  const recentGrids = grids.slice(0, 5);

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Welcome header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50 tracking-tight">
            Good morning, Sambhav 👋
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Here's what's happening with your workspace today.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2">
          <Clock className="h-3.5 w-3.5" />
          <span>Last synced 2 minutes ago</span>
        </div>
      </div>

      {/* Animated stats grid */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = iconMap[stat.icon];
          return (
            <div
              key={stat.label}
              className="rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm hover:shadow-md hover:border-gray-200 dark:hover:border-gray-700 transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className={`h-9 w-9 rounded-lg flex items-center justify-center ${colorMap[stat.color]}`}>
                    {Icon && <Icon className="h-[18px] w-[18px]" />}
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-gray-300 dark:text-gray-600 group-hover:text-gray-400 dark:group-hover:text-gray-500 transition-colors" />
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-50 tabular-nums">
                  <AnimatedCounter target={stat.value} formatter={(v) => v.toLocaleString()} />
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{stat.label}</p>
              </div>
              <p className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 mt-3">{stat.change}</p>
            </div>
          );
        })}
      </div>

      {/* Quick actions */}
      <QuickActionsSection />

      {/* Recent grids table */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Recent Grids</h2>
          <a
            href="/dashboard"
            className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 cursor-pointer transition-colors"
          >
            View all
            <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>

        <div className="rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[600px]">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-800/40">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Grid Name
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Status
                  </th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Rows
                  </th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Updated
                  </th>
                  <th className="px-4 py-3 w-[110px]" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                {recentGrids.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-[13px] text-gray-500 dark:text-gray-400">
                      No grids yet.
                    </td>
                  </tr>
                ) : (
                  recentGrids.map((grid, idx) => {
                    const statusKey = grid.status as keyof typeof statusConfig;
                    const status = statusConfig[statusKey] || statusConfig.completed;
                    const StatusIcon = status.icon;
                    return (
                      <tr
                        key={grid.id}
                        className="hover:bg-gray-50/80 dark:hover:bg-gray-800/40 transition-colors group cursor-pointer"
                      >
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2.5">
                            {grid.isWorkbook && (
                              <ChevronRight className="h-4 w-4 text-gray-400 dark:text-gray-500 -mr-1 shrink-0" />
                            )}
                            <GridIcon row={grid} />
                            <span className="font-medium text-gray-900 dark:text-gray-100 text-[13px] truncate max-w-[180px] sm:max-w-xs">
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
                          <span className="text-[13px] font-semibold text-gray-700 dark:text-gray-300 tabular-nums">
                            {grid.rows > 0 ? grid.rows.toLocaleString() : "—"}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <span className="text-[12px] text-gray-400 dark:text-gray-500">{grid.lastEdited}</span>
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-150">
                            <button
                              type="button"
                              title="Edit"
                              className="flex h-6 w-6 items-center justify-center rounded-md text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Pencil className="h-3.5 w-3.5" />
                            </button>
                            <button
                              type="button"
                              title="Duplicate"
                              className="flex h-6 w-6 items-center justify-center rounded-md text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Copy className="h-3.5 w-3.5" />
                            </button>
                            <button
                              type="button"
                              title="Delete"
                              className="flex h-6 w-6 items-center justify-center rounded-md text-gray-400 dark:text-gray-500 hover:bg-red-50 dark:hover:bg-red-950/40 hover:text-red-500 cursor-pointer transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteGrid(grid.id);
                              }}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Credits usage card */}
      <div className="rounded-xl border border-blue-100 dark:border-blue-900 bg-gradient-to-r from-blue-50 dark:from-blue-950 to-violet-50 dark:to-violet-950 p-5 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Credit Usage</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            450,000 of 5,500,000 credits used this billing cycle
          </p>
          <div className="mt-3 h-2 w-full rounded-full bg-white/70 dark:bg-white/10 border border-blue-100 dark:border-blue-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-500"
              style={{ width: "8.18%" }}
            />
          </div>
          <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-1.5">8% used · Resets in 22 days</p>
        </div>
        <a
          href="/billing"
          className="shrink-0 inline-flex items-center gap-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-2 text-[13px] font-semibold text-gray-700 dark:text-gray-300 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer transition-all"
        >
          Manage Plan
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}
