"use client";

import { useEffect, useRef, useState, KeyboardEvent } from "react";
import {
  X,
  Search,
  ChevronDown,
  ChevronUp,
  Eye,
  BookmarkPlus,
  Lock,
  Users,
  Briefcase,
  Globe,
  MapPin,
  Building2,
  BarChart2,
  Layers,
  ClipboardList,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useModal } from "@/app/context/ModalContext";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FilterSection {
  id: string;
  label: string;
  placeholder: string;
  hint: string;
  icon: React.ComponentType<{ className?: string }>;
}

// ─── Filter config ────────────────────────────────────────────────────────────

const filterSections: FilterSection[] = [
  {
    id: "jobTitle",
    label: "Job Title",
    placeholder: "Type and press Enter…",
    hint: "E.g: Manager, Software Engineer",
    icon: Briefcase,
  },
  {
    id: "companyWebsite",
    label: "Company Website",
    placeholder: "Type and press Enter…",
    hint: "Eg: Google.com, LinkedIn.com",
    icon: Globe,
  },
  {
    id: "personLocation",
    label: "Person Location",
    placeholder: "Type and press Enter…",
    hint: "Eg: London, Great New York City",
    icon: MapPin,
  },
  {
    id: "companyLocation",
    label: "Company Location",
    placeholder: "Type and press Enter…",
    hint: "E.g: United States, UAE",
    icon: Building2,
  },
  {
    id: "companyHeadcount",
    label: "Company Headcount",
    placeholder: "Type and press Enter…",
    hint: "E.g: 11-50, 10000+",
    icon: BarChart2,
  },
  {
    id: "managementLevel",
    label: "Management Level",
    placeholder: "Type and press Enter…",
    hint: "E.g: Owner, Founder",
    icon: Layers,
  },
];

// ─── Tag input component ──────────────────────────────────────────────────────

function TagInput({
  tags,
  onAdd,
  onRemove,
  placeholder,
}: {
  tags: string[];
  onAdd: (tag: string) => void;
  onRemove: (tag: string) => void;
  placeholder: string;
}) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && value.trim()) {
      e.preventDefault();
      onAdd(value.trim());
      setValue("");
    } else if (e.key === "Backspace" && !value && tags.length > 0) {
      onRemove(tags[tags.length - 1]);
    }
  };

  return (
    <div
      className="min-h-[38px] flex flex-wrap gap-1.5 rounded-lg border border-gray-200 bg-white px-2.5 py-2 cursor-text focus-within:border-gray-400 focus-within:ring-2 focus-within:ring-gray-100 transition-all"
      onClick={() => inputRef.current?.focus()}
    >
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-2 py-0.5 text-[12px] font-medium text-gray-700"
        >
          {tag}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove(tag);
            }}
            className="ml-0.5 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-2.5 w-2.5" />
          </button>
        </span>
      ))}
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={tags.length === 0 ? placeholder : ""}
        className="flex-1 min-w-[120px] bg-transparent text-[12px] text-gray-700 placeholder:text-gray-400 outline-none"
      />
    </div>
  );
}

// ─── Collapsible filter row ───────────────────────────────────────────────────

function FilterRow({
  section,
  tags,
  onAdd,
  onRemove,
}: {
  section: FilterSection;
  tags: string[];
  onAdd: (id: string, tag: string) => void;
  onRemove: (id: string, tag: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const Icon = section.icon;

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-gray-50/70 transition-colors group"
      >
        <div className="flex items-start gap-3 text-left">
          <Icon className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" />
          <div>
            <p className="text-[13px] font-semibold text-gray-800 leading-tight">
              {section.label}
            </p>
            {!open && (
              <p className="text-[11px] text-gray-400 mt-0.5">{section.hint}</p>
            )}
            {open && tags.length > 0 && (
              <p className="text-[11px] text-blue-500 mt-0.5">
                {tags.length} filter{tags.length > 1 ? "s" : ""} applied
              </p>
            )}
          </div>
        </div>
        {open ? (
          <ChevronUp className="h-4 w-4 text-gray-400 shrink-0" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-400 shrink-0" />
        )}
      </button>

      {/* Animated expand */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-200 ease-in-out",
          open ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-5 pb-3.5">
          <TagInput
            tags={tags}
            onAdd={(tag) => onAdd(section.id, tag)}
            onRemove={(tag) => onRemove(section.id, tag)}
            placeholder={section.placeholder}
          />
          <p className="text-[10px] text-gray-400 mt-1.5">
            Press <kbd className="rounded bg-gray-100 px-1 py-0.5 font-mono text-[10px]">Enter</kbd> or{" "}
            <kbd className="rounded bg-gray-100 px-1 py-0.5 font-mono text-[10px]">,</kbd> to add
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Empty state illustration ─────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full py-16 px-8 select-none">
      {/* Clipboard SVG illustration */}
      <svg
        viewBox="0 0 200 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-36 h-36 mb-6"
        aria-hidden="true"
      >
        {/* Shadow ellipse */}
        <ellipse cx="100" cy="205" rx="55" ry="8" fill="#E5E7EB" />

        {/* Clipboard body */}
        <rect x="34" y="30" width="132" height="168" rx="10" fill="#F9FAFB" stroke="#E5E7EB" strokeWidth="2" />

        {/* Clip top */}
        <rect x="72" y="22" width="56" height="22" rx="6" fill="#E5E7EB" stroke="#D1D5DB" strokeWidth="1.5" />
        <rect x="84" y="27" width="32" height="10" rx="3" fill="#D1D5DB" />

        {/* Lines */}
        <rect x="54" y="72" width="92" height="8" rx="4" fill="#E5E7EB" />
        <rect x="54" y="90" width="72" height="8" rx="4" fill="#EEF2FF" />
        <rect x="54" y="108" width="84" height="8" rx="4" fill="#E5E7EB" />
        <rect x="54" y="126" width="60" height="8" rx="4" fill="#EEF2FF" />
        <rect x="54" y="144" width="76" height="8" rx="4" fill="#E5E7EB" />

        {/* Checkboxes */}
        <rect x="54" y="72" width="12" height="8" rx="2" fill="#DBEAFE" stroke="#93C5FD" strokeWidth="1" />
        <path d="M56 76l2.5 2.5 4-4" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="54" y="90" width="12" height="8" rx="2" fill="#DBEAFE" stroke="#93C5FD" strokeWidth="1" />
        <path d="M56 94l2.5 2.5 4-4" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="54" y="108" width="12" height="8" rx="2" fill="#E5E7EB" stroke="#D1D5DB" strokeWidth="1" />
        <rect x="54" y="126" width="12" height="8" rx="2" fill="#E5E7EB" stroke="#D1D5DB" strokeWidth="1" />
        <rect x="54" y="144" width="12" height="8" rx="2" fill="#E5E7EB" stroke="#D1D5DB" strokeWidth="1" />

        {/* Person figure */}
        <circle cx="158" cy="90" r="12" fill="#DBEAFE" stroke="#93C5FD" strokeWidth="1.5" />
        <path d="M146 120 Q158 110 170 120 L172 145 H144 Z" fill="#EEF2FF" stroke="#A5B4FC" strokeWidth="1.5" />
        {/* Arms */}
        <path d="M146 125 L136 135" stroke="#A5B4FC" strokeWidth="2" strokeLinecap="round" />
        <path d="M170 125 L180 115" stroke="#A5B4FC" strokeWidth="2" strokeLinecap="round" />
        {/* Hand pointing at clipboard */}
        <circle cx="134" cy="137" r="4" fill="#DBEAFE" stroke="#93C5FD" strokeWidth="1.5" />
      </svg>

      <p className="text-[13px] font-semibold text-gray-700 text-center leading-relaxed max-w-[280px]">
        Start your search, preview, and import companies for enrichment by applying any filter in the left panel.
      </p>
      <p className="text-[12px] text-gray-400 mt-2">OR</p>
      <p className="text-[12px] text-gray-400">Import companies from saved Search.</p>
    </div>
  );
}

// ─── Main modal ───────────────────────────────────────────────────────────────

export function FindPeopleModal() {
  const { findPeopleOpen, closeFindPeople } = useModal();

  const [keyword, setKeyword] = useState("");
  const [filterTags, setFilterTags] = useState<Record<string, string[]>>(
    () => Object.fromEntries(filterSections.map((s) => [s.id, []]))
  );
  const [savedSearchOpen, setSavedSearchOpen] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    if (!findPeopleOpen) return;
    const handler = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") closeFindPeople();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [findPeopleOpen, closeFindPeople]);

  // Lock body scroll when open
  useEffect(() => {
    if (findPeopleOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [findPeopleOpen]);

  const addTag = (id: string, tag: string) => {
    setFilterTags((prev) => ({
      ...prev,
      [id]: prev[id].includes(tag) ? prev[id] : [...prev[id], tag],
    }));
  };

  const removeTag = (id: string, tag: string) => {
    setFilterTags((prev) => ({
      ...prev,
      [id]: prev[id].filter((t) => t !== tag),
    }));
  };

  const totalFilters =
    (keyword.trim() ? 1 : 0) +
    Object.values(filterTags).reduce((acc, arr) => acc + arr.length, 0);

  const handleReset = () => {
    setKeyword("");
    setFilterTags(Object.fromEntries(filterSections.map((s) => [s.id, []])));
  };

  return (
    <>
      {/* ── Backdrop ── */}
      <div
        ref={overlayRef}
        className={cn(
          "fixed inset-0 z-50 bg-black/50 backdrop-blur-[2px] transition-opacity duration-200",
          findPeopleOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={closeFindPeople}
        aria-hidden="true"
      />

      {/* ── Modal panel ── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Find People"
        className={cn(
          "fixed inset-4 sm:inset-8 md:inset-[5vh_5vw] z-50 flex rounded-2xl bg-white shadow-2xl shadow-black/20 ring-1 ring-black/8 overflow-hidden transition-all duration-200",
          findPeopleOpen
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        )}
      >
        {/* ════════════════════════ LEFT PANEL ════════════════════════ */}
        <div className="flex w-[340px] md:w-[380px] shrink-0 flex-col border-r border-gray-100 bg-white">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-100">
                <Users className="h-4 w-4 text-violet-600" />
              </div>
              <h2 className="text-[15px] font-bold text-gray-900 tracking-tight">
                Find People
              </h2>
              {totalFilters > 0 && (
                <span className="inline-flex items-center justify-center h-5 min-w-5 rounded-full bg-violet-600 text-white text-[10px] font-bold px-1.5">
                  {totalFilters}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {/* Saved Search dropdown */}
              <div className="relative">
                <button
                  id="saved-search-btn"
                  type="button"
                  onClick={() => setSavedSearchOpen((v) => !v)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-[12px] font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all"
                >
                  <BookmarkPlus className="h-3.5 w-3.5 text-gray-400" />
                  Saved Search
                  <ChevronDown
                    className={cn(
                      "h-3 w-3 text-gray-400 transition-transform duration-150",
                      savedSearchOpen && "rotate-180"
                    )}
                  />
                </button>

                {savedSearchOpen && (
                  <div className="absolute right-0 top-full mt-1.5 w-48 rounded-xl border border-gray-100 bg-white shadow-lg shadow-gray-200/80 ring-1 ring-black/5 py-1.5 z-10">
                    <p className="px-3 py-2 text-[11px] text-gray-400 text-center">
                      No saved searches yet
                    </p>
                    <div className="border-t border-gray-100 mx-2 my-1" />
                    <button className="w-full text-left px-3 py-2 text-[12px] text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2">
                      <BookmarkPlus className="h-3.5 w-3.5 text-gray-400" />
                      Save current search
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* People Keyword */}
          <div className="border-b border-gray-100 px-5 py-4">
            <div className="flex items-center gap-2 mb-2.5">
              <Users className="h-3.5 w-3.5 text-gray-400" />
              <span className="text-[12px] font-semibold text-gray-700">People Keyword</span>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 pointer-events-none" />
              <input
                id="people-keyword-input"
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Enter single keyword here..."
                className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-9 pr-3 text-[13px] text-gray-800 placeholder:text-gray-400 outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all"
              />
            </div>
          </div>

          {/* Filter sections — scrollable */}
          <div className="flex-1 overflow-y-auto">
            {filterSections.map((section) => (
              <FilterRow
                key={section.id}
                section={section}
                tags={filterTags[section.id]}
                onAdd={addTag}
                onRemove={removeTag}
              />
            ))}
          </div>

          {/* Sticky bottom bar */}
          <div className="border-t border-gray-100 bg-white px-5 py-3.5">
            <div className="flex items-center gap-2.5">
              {totalFilters > 0 && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-[12px] text-gray-400 hover:text-gray-600 transition-colors underline underline-offset-2 mr-auto"
                >
                  Reset all
                </button>
              )}
              <button
                id="save-search-btn"
                type="button"
                className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-[13px] font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
              >
                <BookmarkPlus className="h-3.5 w-3.5 text-gray-500" />
                Save Search
              </button>
              <button
                id="preview-result-btn"
                type="button"
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-[13px] font-semibold text-white hover:bg-gray-800 active:bg-gray-950 transition-all shadow-sm"
              >
                <Eye className="h-3.5 w-3.5" />
                Preview Result
              </button>
            </div>
          </div>
        </div>

        {/* ════════════════════════ RIGHT PANEL ════════════════════════ */}
        <div className="flex flex-1 flex-col min-w-0 bg-gray-50/40">
          {/* Top info bar */}
          <div className="flex items-center justify-between gap-4 border-b border-gray-100 bg-white px-5 py-3">
            <div className="flex items-center gap-2 min-w-0">
              {/* Close button */}
              <button
                id="modal-close-btn"
                type="button"
                onClick={closeFindPeople}
                className="mr-1 flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>
              <span className="text-[13px] text-gray-500 truncate">
                Found{" "}
                <span className="font-semibold text-gray-800">0 companies.</span>{" "}
                Click preview to view results
              </span>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {/* Unlock banner */}
              <div className="hidden sm:flex items-center gap-1.5 rounded-lg border border-orange-200 bg-orange-50 px-3 py-1.5">
                <Lock className="h-3.5 w-3.5 text-orange-500 shrink-0" />
                <span className="text-[12px] text-orange-700">
                  Unlock{" "}
                  <span className="font-bold">100,000 leads</span>{" "}
                  with{" "}
                  <span className="font-bold text-orange-600 cursor-pointer hover:underline">
                    Enterprise Plan★
                  </span>
                </span>
              </div>

              {/* Credit counter */}
              <div className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                <span className="text-[12px] font-semibold text-gray-700 tabular-nums">
                  8,000
                  <span className="font-normal text-gray-400">/50,000</span>
                </span>
              </div>
            </div>
          </div>

          {/* Column headers */}
          <div className="border-b border-gray-100 bg-white px-5">
            <div className="flex items-center gap-0 overflow-x-auto">
              {[
                "NAME",
                "TITLE",
                "HEADLINE",
                "LINKEDIN URL",
                "COMPANY",
                "COMPANY URL",
              ].map((col, i) => (
                <div
                  key={col}
                  className={cn(
                    "shrink-0 py-2.5 pr-8 text-[11px] font-semibold text-gray-400 tracking-widest uppercase",
                    i === 0 && "min-w-[140px]",
                    i === 1 && "min-w-[120px]",
                    i === 2 && "min-w-[160px]",
                    i === 3 && "min-w-[140px]",
                    i === 4 && "min-w-[130px]",
                    i === 5 && "min-w-[130px]"
                  )}
                >
                  {col}
                </div>
              ))}
            </div>
          </div>

          {/* Empty state */}
          <div className="flex flex-1 items-center justify-center overflow-y-auto">
            <EmptyState />
          </div>
        </div>
      </div>
    </>
  );
}
