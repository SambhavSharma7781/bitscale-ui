"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Play,
  Building2,
  Users,
  Star,
  MoreHorizontal,
  LayoutList,
  LayoutGrid,
  ChevronUp,
  CheckCircle2,
  Circle,
  Clock,
  Pencil,
  Copy,
  Trash2,
  FolderSearch,
} from "lucide-react";
import { useModal } from "@/app/context/ModalContext";
import { useGrids } from "@/app/context/GridContext";

// ─── Data ─────────────────────────────────────────────────────────────────────

const checklistItems = [
  { id: 1, label: "Create your data list", done: true },
  { id: 2, label: "Learn about BitAgent", done: true },
  { id: 3, label: "Connect an integration", done: true },
  { id: 4, label: "Customise waterfall providers", done: false },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function VideoCard() {
  return (
    <div className="rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm overflow-hidden transition-colors">
      {/* Card header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800">
        <span className="text-[13px] font-semibold text-gray-800 dark:text-gray-100">Latest from Bitscale</span>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-gray-300 dark:bg-gray-600" />
          <span className="h-2 w-2 rounded-full bg-gray-300 dark:bg-gray-600" />
          <span className="h-2 w-2 rounded-full bg-blue-500" />
        </div>
      </div>
      {/* Content */}
      <div className="flex gap-3 p-4">
        {/* Video thumbnail */}
        <div className="relative shrink-0 h-[70px] w-[110px] rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 overflow-hidden group cursor-pointer">
          {/* Simulated screenshot lines */}
          <div className="absolute inset-0 flex flex-col gap-0.5 p-1.5 opacity-30">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-1 rounded-full bg-white/60" style={{ width: `${70 + (i % 3) * 15}%` }} />
            ))}
          </div>
          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30 group-hover:bg-white/30 transition-all">
              <Play className="h-3.5 w-3.5 text-white fill-white ml-0.5" />
            </div>
          </div>
        </div>
        {/* Text */}
        <div className="flex flex-col justify-between min-w-0">
          <div>
            <p className="text-[13px] font-semibold text-gray-900 dark:text-gray-50 leading-snug line-clamp-1">
              How to Integrate 2 Way HubSpot
            </p>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 leading-relaxed line-clamp-3">
              Prerequisites for this Integration is that you should have a HubSpot account and Copy the API key. We simple add our API key via the integrations pa...
            </p>
          </div>
          <div className="flex items-center gap-1.5 mt-1.5">
            <Clock className="h-3 w-3 text-gray-400 dark:text-gray-500" />
            <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">Posted today</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function OnboardingCard() {
  return (
    <div className="rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm overflow-hidden transition-colors">
      {/* Header */}
      <div className="flex items-start gap-3 px-4 py-3 border-b border-gray-100 dark:border-gray-800">
        <div className="h-8 w-8 rounded-lg bg-gray-900 dark:bg-gray-700 flex items-center justify-center shrink-0 mt-0.5">
          <CheckCircle2 className="h-4 w-4 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold text-gray-900 dark:text-gray-50">Complete product demo</p>
          <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 leading-snug">
            92% of users nailed BitScale after this walkthrough
          </p>
          {/* Progress bar */}
          <div className="mt-2 flex items-center gap-2">
            <div className="flex-1 h-1.5 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all"
                style={{ width: "75%" }}
              />
            </div>
            <span className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 tabular-nums">75%</span>
          </div>
        </div>
      </div>
      {/* Checklist grid */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 px-4 py-3">
        {checklistItems.map((item) => (
          <div key={item.id} className="flex items-center gap-2">
            {item.done ? (
              <CheckCircle2 className="h-3.5 w-3.5 text-green-500 dark:text-green-400 shrink-0" />
            ) : (
              <Circle className="h-3.5 w-3.5 text-gray-300 dark:text-gray-600 shrink-0" />
            )}
            <span
              className={`text-[12px] leading-tight ${
                item.done ? "text-gray-700 dark:text-gray-300" : "text-gray-400 dark:text-gray-500"
              }`}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const { openFindPeople, openFindCompanies, openNewGrid } = useModal();
  const { grids, toggleStar, deleteGrid } = useGrids();
  
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"grids" | "starred">("grids");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const filteredRows = grids.filter((row) => {
    const matchesSearch = row.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "grids" || row.starred;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* ── Page header ── */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50 tracking-tight">
            Welcome back, Sambhav! 👋
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Here's your daily scoop on Bitscale!
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          <button
            type="button"
            id="dashboard-find-companies-btn"
            onClick={openFindCompanies}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3.5 py-2 text-[13px] font-medium text-gray-700 dark:text-gray-300 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all"
          >
            <Building2 className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
            Find Companies
          </button>
          <button
            type="button"
            id="dashboard-find-people-btn"
            onClick={openFindPeople}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3.5 py-2 text-[13px] font-medium text-gray-700 dark:text-gray-300 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all"
          >
            <Users className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
            Find People
          </button>
          <button
            type="button"
            onClick={openNewGrid}
            id="dashboard-new-grid-btn"
            className="inline-flex items-center gap-2 rounded-lg bg-gray-900 dark:bg-gray-100 px-3.5 py-2 text-[13px] font-semibold text-white dark:text-gray-900 shadow-sm hover:bg-gray-800 dark:hover:bg-white active:bg-gray-950 transition-all"
          >
            <Plus className="h-3.5 w-3.5" />
            New Grid
          </button>
        </div>
      </div>

      {/* ── Top content cards ── */}
      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 h-[142px] animate-pulse" />
          <div className="rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 h-[142px] animate-pulse" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 animate-in fade-in duration-500">
          <VideoCard />
          <OnboardingCard />
        </div>
      )}

      {/* ── Grids section ── */}
      <div className="rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm overflow-hidden transition-colors">
        {/* Tabs + search + toggle */}
        <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-gray-100 dark:border-gray-800 flex-wrap">
          {/* Tabs */}
          <div className="flex items-center gap-0">
            {(["grids", "starred"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-[13px] font-semibold capitalize transition-colors border-b-2 -mb-px ${
                  activeTab === tab
                    ? "border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-500"
                    : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                {tab === "grids" ? "My Grids" : "Starred"}
              </button>
            ))}
          </div>

          {/* Search + view toggle */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 dark:text-gray-500 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search grids and workbooks..."
                className="h-8 w-56 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 pl-8 pr-3 text-[12px] text-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:border-gray-300 dark:focus:border-gray-600 focus:bg-white dark:focus:bg-gray-900 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-800 transition-all"
              />
            </div>
            <div className="flex items-center rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-0.5">
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={`flex h-6 w-6 items-center justify-center rounded-md transition-all ${
                  viewMode === "list" ? "bg-white dark:bg-gray-700 shadow-sm text-gray-700 dark:text-gray-200" : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                }`}
              >
                <LayoutList className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`flex h-6 w-6 items-center justify-center rounded-md transition-all ${
                  viewMode === "grid" ? "bg-white dark:bg-gray-700 shadow-sm text-gray-700 dark:text-gray-200" : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                }`}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Table / Skeletons */}
        {loading ? (
          <div className="p-4 space-y-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 py-2 animate-pulse">
                <div className="h-7 w-7 rounded-md bg-gray-100 dark:bg-gray-800 shrink-0" />
                <div className="h-4 w-48 rounded bg-gray-100 dark:bg-gray-800" />
                <div className="h-4 w-24 rounded bg-gray-100 dark:bg-gray-800 ml-auto" />
                <div className="h-4 w-24 rounded bg-gray-100 dark:bg-gray-800" />
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto animate-in fade-in duration-500">
            <table className="w-full">
              {/* Column headers */}
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/40 dark:bg-gray-800/40">
                  <th className="px-5 py-2.5 text-left">
                    <button
                      type="button"
                      onClick={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                    >
                      Name
                      <ChevronUp
                        className={`h-3 w-3 transition-transform ${sortDir === "desc" ? "rotate-180" : ""}`}
                      />
                    </button>
                  </th>
                  <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Edited by
                  </th>
                  <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Last edited
                  </th>
                  <th className="px-5 py-2.5 w-[110px]" />
                </tr>
              </thead>

              {/* Rows */}
              <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
                {filteredRows.map((row) => (
                  <tr
                    key={row.id}
                    className="group hover:bg-gray-50/80 dark:hover:bg-gray-800/40 transition-colors cursor-pointer"
                    onClick={() => setOpenMenuId(null)}
                  >
                    {/* Name */}
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        {/* Star */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleStar(row.id);
                          }}
                          className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label="Toggle star"
                        >
                          <Star
                            className={`h-3.5 w-3.5 transition-colors ${
                              row.starred
                                ? "fill-amber-400 text-amber-400"
                                : "text-gray-300 dark:text-gray-600 hover:text-amber-400"
                            }`}
                          />
                        </button>

                        {/* Icon badge */}
                        <div
                          className={`h-7 w-7 rounded-md ${row.iconBg} flex items-center justify-center text-[10px] font-bold ${row.iconColor} shrink-0`}
                        >
                          {row.icon}
                        </div>

                        {/* Name text */}
                        <span className="text-[13px] font-medium text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate max-w-[260px]">
                          {row.name}
                        </span>
                      </div>
                    </td>

                    {/* Edited by */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div
                          className={`h-6 w-6 rounded-full ${row.editedBy.color} flex items-center justify-center text-[10px] font-bold text-white shrink-0`}
                        >
                          {row.editedBy.initials}
                        </div>
                        <span className="text-[12px] text-gray-600 dark:text-gray-400">{row.editedBy.name}</span>
                      </div>
                    </td>

                    {/* Last edited */}
                    <td className="px-4 py-3">
                      <span className="text-[12px] text-gray-500 dark:text-gray-400">{row.lastEdited}</span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-150 relative">
                        <button
                          type="button"
                          title="Edit"
                          className="flex h-6 w-6 items-center justify-center rounded-md text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          title="Duplicate"
                          className="flex h-6 w-6 items-center justify-center rounded-md text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Copy className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          title="Delete"
                          className="flex h-6 w-6 items-center justify-center rounded-md text-gray-400 dark:text-gray-500 hover:bg-red-50 dark:hover:bg-red-950/40 hover:text-red-500 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteGrid(row.id);
                          }}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredRows.length === 0 && (
              <div className="py-20 flex flex-col items-center justify-center text-center px-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-50 dark:bg-gray-800 mb-3">
                  <FolderSearch className="h-6 w-6 text-gray-400 dark:text-gray-500" />
                </div>
                <h3 className="text-[14px] font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  No grids found
                </h3>
                <p className="text-[13px] text-gray-500 dark:text-gray-400 max-w-sm">
                  {searchQuery 
                    ? `We couldn't find any grids matching "${searchQuery}". Try a different term or create a new grid.` 
                    : "You haven't created any grids yet. Create your first grid to get started!"}
                </p>
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="mt-4 text-[13px] font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors"
                  >
                    Clear search
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
