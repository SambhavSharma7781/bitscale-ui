"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  Search,
  Plus,
  Play,
  Building2,
  Users,
  Star,
  LayoutList,
  ChevronUp,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Circle,
  Clock,
  Pencil,
  Copy,
  Trash2,
  FolderSearch,
  MoreHorizontal,
} from "lucide-react";
import { useModal } from "@/app/context/ModalContext";
import { useGrids } from "@/app/context/GridContext";
import { GridIcon } from "@/app/components/GridIcon";

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
    <div className="rounded-xl border border-gray-100 dark:border-gray-800 bg-[#f6f9fc] dark:bg-gray-900 shadow-sm overflow-hidden transition-colors">
      {/* Card header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800">
        <span className="text-[13px] font-semibold text-gray-800 dark:text-gray-100">Latest from Bitscale</span>
        <div className="flex items-center gap-1.5">
          {/* Active slide — wide pill */}
          <span className="h-2 w-6 rounded-full bg-[#4f7cac]" />
          {/* Inactive slides — small circles */}
          <span className="h-2 w-2 rounded-full bg-[#9db8d4]" />
          <span className="h-2 w-2 rounded-full bg-[#9db8d4]" />
          <span className="h-2 w-2 rounded-full bg-[#9db8d4]" />
        </div>
      </div>
      {/* Content */}
      <div className="flex gap-3 p-4">
        {/* Video thumbnail */}
        <div className="relative shrink-0 h-[96px] w-[152px] flex items-center justify-center cursor-pointer group">
          <Image
            src="/Container.svg"
            alt="Latest from Bitscale Video"
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-sm"
            priority
          />
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
    <div className="rounded-xl border border-gray-100 dark:border-gray-800 bg-[#f6f9fc] dark:bg-gray-900 shadow-sm overflow-hidden transition-colors">
      {/* Header */}
      <div className="flex items-start gap-3 px-4 pt-4 pb-2">
        <div className="h-9 w-9 rounded-full bg-[#3c4758] dark:bg-gray-700 flex items-center justify-center shrink-0">
          <CheckCircle2 className="h-5 w-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[14px] font-semibold text-gray-900 dark:text-gray-50 tracking-tight">Complete product demo</p>
          <p className="text-[12px] text-gray-500 dark:text-gray-400 mt-0.5 leading-snug">
            92% of users nailed BitScale after this walkthrough
          </p>

          {/* Progress bar */}
          <div className="flex items-center gap-3 mt-4">
            <div className="flex-1 h-[5px] bg-[#e2e8f0] dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-[#487f5e] rounded-full" style={{ width: "75%" }} />
            </div>
            <span className="text-[12px] font-semibold text-[#487f5e] dark:text-green-400">75%</span>
          </div>
        </div>
      </div>

      {/* Checklist */}
      <div className="px-4 pb-4 pt-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4 ml-2 sm:ml-12">
          {checklistItems.map((item) => (
            <div key={item.id} className="flex items-center gap-2.5">
              {item.done ? (
                <CheckCircle2 className="h-[16px] w-[16px] text-white fill-[#357ba8] shrink-0" />
              ) : (
                <Circle className="h-[16px] w-[16px] text-gray-300 dark:text-gray-600 shrink-0" />
              )}
              <span className={cn(
                "text-[13px] font-medium tracking-tight",
                item.done ? "text-[#1e293b] dark:text-gray-300" : "text-[#64748b] dark:text-gray-500"
              )}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
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
            Welcome back, Sambhav!
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
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3.5 py-2 text-[13px] font-medium text-gray-700 dark:text-gray-300 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer transition-all"
          >
            <Building2 className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
            Find Companies
          </button>
          <button
            type="button"
            id="dashboard-find-people-btn"
            onClick={openFindPeople}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3.5 py-2 text-[13px] font-medium text-gray-700 dark:text-gray-300 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer transition-all"
          >
            <Users className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
            Find People
          </button>
          <button
            type="button"
            onClick={openNewGrid}
            id="dashboard-new-grid-btn"
            className="inline-flex items-center gap-2 rounded-lg bg-gray-900 dark:bg-[#1e2d3d] px-3.5 py-2 text-[13px] font-semibold text-white dark:text-gray-100 shadow-sm hover:bg-gray-800 dark:hover:bg-[#253648] active:bg-gray-950 dark:border dark:border-[#2a3a4a] cursor-pointer transition-all"
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
      <div>
        {/* Tabs + search + toggle */}
        <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-gray-100 dark:border-gray-800 flex-wrap">
          {/* Tabs */}
          <div className="flex items-center gap-0">
            {(["grids", "starred"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-[13px] font-semibold capitalize cursor-pointer transition-colors border-b-2 -mb-px ${activeTab === tab
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
            <div className="relative flex-1 sm:flex-none w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 dark:text-gray-500 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search grids and workbooks..."
                className="h-9 w-full sm:w-64 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 pl-9 pr-4 text-[12px] text-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:border-gray-300 dark:focus:border-gray-600 focus:bg-white dark:focus:bg-gray-900 cursor-text transition-all"
              />
            </div>
            {/* Single list-view icon button — matches screenshot */}
            <button
              type="button"
              onClick={() => setViewMode(viewMode === "list" ? "grid" : "list")}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200 cursor-pointer transition-all"
              aria-label="Toggle view"
            >
              <LayoutList className="h-4 w-4" />
            </button>
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
            <table className="w-full table-fixed min-w-[700px]">
              {/* Column headers */}
              <colgroup>
                <col className="w-auto" />
                <col style={{ width: "200px" }} />
                <col style={{ width: "160px" }} />
                <col style={{ width: "110px" }} />
              </colgroup>
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <th className="px-5 py-3 text-left">
                    <button
                      type="button"
                      onClick={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))}
                      className="inline-flex items-center gap-1 text-[13px] font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer transition-colors"
                    >
                      Name
                      <ChevronUp
                        className={`h-3 w-3 transition-transform ${sortDir === "desc" ? "rotate-180" : ""}`}
                      />
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left text-[13px] font-medium text-gray-500 dark:text-gray-400">
                    Edited by
                  </th>
                  <th className="px-4 py-3 text-left text-[13px] font-medium text-gray-500 dark:text-gray-400">
                    Last edited
                  </th>
                  <th className="px-5 py-3 text-right text-[13px] font-medium text-gray-500 dark:text-gray-400">Actions</th>
                </tr>
              </thead>


              {/* Rows */}
              <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
                {filteredRows.map((row) => (
                  <tr
                    key={row.id}
                    className="group hover:bg-gray-50/80 dark:hover:bg-gray-800/40 transition-colors cursor-pointer"
                  >
                    {/* Name */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        {/* Chevron placeholder — always same width so stars align */}
                        <div className="shrink-0 w-4 h-4 flex items-center justify-center">
                          {row.isWorkbook && (
                            <ChevronDown className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                          )}
                        </div>

                        {/* Star */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleStar(row.id);
                          }}
                          className="shrink-0 cursor-pointer"
                          aria-label="Toggle star"
                        >
                          <Star
                            className={`h-3.5 w-3.5 transition-colors ${row.starred
                                ? "fill-amber-400 text-amber-400"
                                : "text-gray-300 dark:text-gray-600 hover:text-amber-400"
                              }`}
                          />
                        </button>

                        <GridIcon row={row} />

                        {/* Name text */}
                        <span className="text-[13px] font-medium text-gray-900 dark:text-gray-100 truncate max-w-[360px]">
                          {row.name}
                        </span>
                      </div>
                    </td>


                    {/* Edited by */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        {row.editedBy.avatar ? (
                          <img
                            src={row.editedBy.avatar}
                            alt={row.editedBy.name}
                            className="h-6 w-6 rounded-full object-cover border border-gray-100 dark:border-gray-700 shrink-0"
                          />
                        ) : (
                          <div className={`h-6 w-6 rounded-full ${row.editedBy.color} flex items-center justify-center text-[10px] font-bold text-white shrink-0`}>
                            {row.editedBy.initials}
                          </div>
                        )}
                        <span className="text-[13px] text-gray-700 dark:text-gray-300">{row.editedBy.name}</span>
                      </div>
                    </td>

                    {/* Last edited */}
                    <td className="px-4 py-3.5">
                      <span className="text-[13px] text-gray-500 dark:text-gray-400">{row.lastEdited}</span>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-3.5 text-right">
                      <button
                        type="button"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer transition-colors"
                        aria-label="More actions"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
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
                    className="mt-4 text-[13px] font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 cursor-pointer transition-colors"
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
