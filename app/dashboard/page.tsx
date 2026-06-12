"use client";

import { useState } from "react";
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
} from "lucide-react";
import { useModal } from "@/app/context/ModalContext";

// ─── Data ─────────────────────────────────────────────────────────────────────

const gridRows = [
  {
    id: 1,
    name: "LinkedIn",
    icon: "LI",
    iconBg: "bg-blue-600",
    iconColor: "text-white",
    starred: false,
    editedBy: { name: "Chris Parker", initials: "CP", color: "bg-emerald-500" },
    lastEdited: "06 Aug, 2025",
  },
  {
    id: 2,
    name: "Sales nav",
    icon: "SN",
    iconBg: "bg-violet-600",
    iconColor: "text-white",
    starred: false,
    editedBy: { name: "Jone Doe", initials: "JD", color: "bg-orange-400" },
    lastEdited: "06 Aug, 2025",
  },
  {
    id: 3,
    name: "find company",
    icon: "FC",
    iconBg: "bg-emerald-500",
    iconColor: "text-white",
    starred: false,
    editedBy: { name: "Alex Morgan", initials: "AM", color: "bg-purple-500" },
    lastEdited: "06 Aug, 2025",
  },
  {
    id: 4,
    name: "import csv",
    icon: "IC",
    iconBg: "bg-gray-700",
    iconColor: "text-white",
    starred: false,
    editedBy: { name: "Drew Wilson", initials: "DW", color: "bg-red-500" },
    lastEdited: "06 Aug, 2025",
  },
  {
    id: 5,
    name: "Find people",
    icon: "FP",
    iconBg: "bg-blue-500",
    iconColor: "text-white",
    starred: false,
    editedBy: { name: "Jone Doe", initials: "JD", color: "bg-orange-400" },
    lastEdited: "06 Aug, 2025",
  },
  {
    id: 6,
    name: "Google maps",
    icon: "GM",
    iconBg: "bg-green-500",
    iconColor: "text-white",
    starred: false,
    editedBy: { name: "Jone Doe", initials: "JD", color: "bg-orange-400" },
    lastEdited: "06 Aug, 2025",
  },
  {
    id: 7,
    name: "google search results",
    icon: "GS",
    iconBg: "bg-blue-400",
    iconColor: "text-white",
    starred: false,
    editedBy: { name: "Jone Doe", initials: "JD", color: "bg-orange-400" },
    lastEdited: "06 Aug, 2025",
  },
  {
    id: 8,
    name: "factors",
    icon: "FA",
    iconBg: "bg-rose-500",
    iconColor: "text-white",
    starred: false,
    editedBy: { name: "Jone Doe", initials: "JD", color: "bg-orange-400" },
    lastEdited: "06 Aug, 2025",
  },
  {
    id: 9,
    name: "Hubspot List - 10 (05 Aug 25)",
    icon: "HL",
    iconBg: "bg-orange-500",
    iconColor: "text-white",
    starred: false,
    editedBy: { name: "Jone Doe", initials: "JD", color: "bg-orange-400" },
    lastEdited: "06 Aug, 2025",
  },
];

const checklistItems = [
  { id: 1, label: "Create your data list", done: true },
  { id: 2, label: "Learn about BitAgent", done: true },
  { id: 3, label: "Connect an integration", done: true },
  { id: 4, label: "Customise waterfall providers", done: false },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function VideoCard() {
  return (
    <div className="rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden">
      {/* Card header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <span className="text-[13px] font-semibold text-gray-800">Latest from Bitscale</span>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-gray-300" />
          <span className="h-2 w-2 rounded-full bg-gray-300" />
          <span className="h-2 w-2 rounded-full bg-blue-500" />
        </div>
      </div>
      {/* Content */}
      <div className="flex gap-3 p-4">
        {/* Video thumbnail */}
        <div className="relative shrink-0 h-[70px] w-[110px] rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden group cursor-pointer">
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
            <p className="text-[13px] font-semibold text-gray-900 leading-snug line-clamp-1">
              How to Integrate 2 Way HubSpot
            </p>
            <p className="text-[11px] text-gray-500 mt-1 leading-relaxed line-clamp-3">
              Prerequisites for this Integration is that you should have a HubSpot account and Copy the API key. We simple add our API key via the integrations pa...
            </p>
          </div>
          <div className="flex items-center gap-1.5 mt-1.5">
            <Clock className="h-3 w-3 text-gray-400" />
            <span className="text-[10px] text-gray-400 font-medium">Posted today</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function OnboardingCard() {
  return (
    <div className="rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-start gap-3 px-4 py-3 border-b border-gray-100">
        <div className="h-8 w-8 rounded-lg bg-gray-900 flex items-center justify-center shrink-0 mt-0.5">
          <CheckCircle2 className="h-4 w-4 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold text-gray-900">Complete product demo</p>
          <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">
            92% of users nailed BitScale after this walkthrough
          </p>
          {/* Progress bar */}
          <div className="mt-2 flex items-center gap-2">
            <div className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all"
                style={{ width: "75%" }}
              />
            </div>
            <span className="text-[10px] font-semibold text-gray-500 tabular-nums">75%</span>
          </div>
        </div>
      </div>
      {/* Checklist grid */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 px-4 py-3">
        {checklistItems.map((item) => (
          <div key={item.id} className="flex items-center gap-2">
            {item.done ? (
              <CheckCircle2 className="h-3.5 w-3.5 text-green-500 shrink-0" />
            ) : (
              <Circle className="h-3.5 w-3.5 text-gray-300 shrink-0" />
            )}
            <span
              className={`text-[12px] leading-tight ${
                item.done ? "text-gray-700" : "text-gray-400"
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
  const { openFindPeople, openFindCompanies } = useModal();
  const [activeTab, setActiveTab] = useState<"grids" | "starred">("grids");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [starredIds, setStarredIds] = useState<Set<number>>(new Set());
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const toggleStar = (id: number) => {
    setStarredIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredRows = gridRows.filter((row) => {
    const matchesSearch = row.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "grids" || starredIds.has(row.id);
    return matchesSearch && matchesTab;
  });

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* ── Page header ── */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Welcome back, Tim! 👋
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Here's your daily scoop on Bitscale!
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          <button
            type="button"
            id="dashboard-find-companies-btn"
            onClick={openFindCompanies}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-[13px] font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-all"
          >
            <Building2 className="h-3.5 w-3.5 text-gray-500" />
            Find Companies
          </button>
          <button
            type="button"
            id="dashboard-find-people-btn"
            onClick={openFindPeople}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-[13px] font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-all"
          >
            <Users className="h-3.5 w-3.5 text-gray-500" />
            Find People
          </button>
          <button
            type="button"
            id="dashboard-new-grid-btn"
            className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-3.5 py-2 text-[13px] font-semibold text-white shadow-sm hover:bg-gray-800 active:bg-gray-950 transition-all"
          >
            <Plus className="h-3.5 w-3.5" />
            New Grid
          </button>
        </div>
      </div>

      {/* ── Top content cards ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <VideoCard />
        <OnboardingCard />
      </div>

      {/* ── Grids section ── */}
      <div className="rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        {/* Tabs + search + toggle */}
        <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-gray-100 flex-wrap">
          {/* Tabs */}
          <div className="flex items-center gap-0">
            {(["grids", "starred"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-[13px] font-semibold capitalize transition-colors border-b-2 -mb-px ${
                  activeTab === tab
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab === "grids" ? "My Grids" : "Starred"}
              </button>
            ))}
          </div>

          {/* Search + view toggle */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search grids and workbooks..."
                className="h-8 w-56 rounded-lg border border-gray-200 bg-gray-50 pl-8 pr-3 text-[12px] text-gray-700 placeholder:text-gray-400 outline-none focus:border-gray-300 focus:bg-white focus:ring-2 focus:ring-gray-100 transition-all"
              />
            </div>
            <div className="flex items-center rounded-lg border border-gray-200 bg-gray-50 p-0.5">
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={`flex h-6 w-6 items-center justify-center rounded-md transition-all ${
                  viewMode === "list" ? "bg-white shadow-sm text-gray-700" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <LayoutList className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`flex h-6 w-6 items-center justify-center rounded-md transition-all ${
                  viewMode === "grid" ? "bg-white shadow-sm text-gray-700" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Column headers */}
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/40">
                <th className="px-5 py-2.5 text-left">
                  <button
                    type="button"
                    onClick={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-gray-500 uppercase tracking-wide hover:text-gray-700 transition-colors"
                  >
                    Name
                    <ChevronUp
                      className={`h-3 w-3 transition-transform ${sortDir === "desc" ? "rotate-180" : ""}`}
                    />
                  </button>
                </th>
                <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
                  Edited by
                </th>
                <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
                  Last edited
                </th>
                <th className="px-5 py-2.5 text-right text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>

            {/* Rows */}
            <tbody className="divide-y divide-gray-50">
              {filteredRows.map((row) => (
                <tr
                  key={row.id}
                  className="group hover:bg-gray-50/60 transition-colors cursor-pointer"
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
                            starredIds.has(row.id)
                              ? "fill-amber-400 text-amber-400"
                              : "text-gray-300 hover:text-amber-400"
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
                      <span className="text-[13px] font-medium text-gray-800 group-hover:text-blue-600 transition-colors truncate max-w-[260px]">
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
                      <span className="text-[12px] text-gray-600">{row.editedBy.name}</span>
                    </div>
                  </td>

                  {/* Last edited */}
                  <td className="px-4 py-3">
                    <span className="text-[12px] text-gray-500">{row.lastEdited}</span>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-3 text-right">
                    <div className="relative inline-block">
                      <button
                        type="button"
                        id={`row-menu-${row.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenuId(openMenuId === row.id ? null : row.id);
                        }}
                        className="flex h-6 w-6 items-center justify-center rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors opacity-0 group-hover:opacity-100"
                        aria-label="Open menu"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </button>

                      {/* Dropdown menu */}
                      {openMenuId === row.id && (
                        <div
                          className="absolute right-0 top-full mt-1 z-20 w-40 rounded-xl border border-gray-100 bg-white shadow-lg shadow-gray-200/80 ring-1 ring-black/5 py-1.5"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {["Open", "Rename", "Duplicate", "Share"].map((action) => (
                            <button
                              key={action}
                              type="button"
                              className="w-full text-left px-3 py-2 text-[12px] text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                              {action}
                            </button>
                          ))}
                          <div className="border-t border-gray-100 my-1" />
                          <button
                            type="button"
                            className="w-full text-left px-3 py-2 text-[12px] text-red-500 hover:bg-red-50 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredRows.length === 0 && (
            <div className="py-16 text-center text-[13px] text-gray-400">
              {searchQuery ? `No grids matching "${searchQuery}"` : "No grids yet. Create your first grid!"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
