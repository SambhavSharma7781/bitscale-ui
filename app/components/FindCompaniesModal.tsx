"use client";

import { useEffect, useRef, useState, KeyboardEvent } from "react";
import {
  X, Search, ChevronDown, Eye, BookmarkPlus, Lock,
  Building2, Briefcase, MapPin, BarChart2, TrendingUp, Cpu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useModal } from "@/app/context/ModalContext";

interface FilterSection {
  id: string;
  label: string;
  hint: string;
  icon: React.ComponentType<{ className?: string }>;
}

const filterSections: FilterSection[] = [
  { id: "industry",         label: "Industry",          hint: "E.g: Software Development, Retail", icon: Briefcase  },
  { id: "companyLocation",  label: "Company Location",  hint: "Eg: London, Great New York City",   icon: MapPin     },
  { id: "companyHeadcount", label: "Company Headcount", hint: "E.g: 11-50, 10000+",               icon: BarChart2  },
  { id: "fundingStage",     label: "Funding Stage",     hint: "E.g: Series A, Seed",               icon: TrendingUp },
  { id: "technologiesUsed", label: "Technologies Used", hint: "E.g: React, AWS, Salesforce",       icon: Cpu        },
];

function TagInput({ tags, onAdd, onRemove }: { tags: string[]; onAdd: (t: string) => void; onRemove: (t: string) => void }) {
  const [val, setVal] = useState("");
  const ref = useRef<HTMLInputElement>(null);

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && val.trim()) {
      e.preventDefault(); onAdd(val.trim()); setVal("");
    } else if (e.key === "Backspace" && !val && tags.length) onRemove(tags[tags.length - 1]);
  };

  return (
    <div
      className="min-h-[34px] flex flex-wrap gap-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-2.5 py-1.5 cursor-text focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-50 transition-all"
      onClick={() => ref.current?.focus()}
    >
      {tags.map(t => (
        <span key={t} className="inline-flex items-center gap-1 rounded bg-gray-100 dark:bg-gray-700 px-2 py-0.5 text-xs font-medium text-gray-700 dark:text-gray-200">
          {t}
          <button type="button" onClick={e => { e.stopPropagation(); onRemove(t); }} className="text-gray-400 hover:text-gray-700 cursor-pointer">
            <X className="h-2.5 w-2.5" />
          </button>
        </span>
      ))}
      <input
        ref={ref} value={val} onChange={e => setVal(e.target.value)} onKeyDown={onKey}
        placeholder={tags.length ? "" : "Type and press Enter…"}
        className="flex-1 min-w-[80px] bg-transparent text-sm text-gray-700 dark:text-gray-200 placeholder:text-gray-400 outline-none"
      />
    </div>
  );
}

function FilterRow({ section, tags, onAdd, onRemove }: {
  section: FilterSection; tags: string[];
  onAdd: (id: string, t: string) => void; onRemove: (id: string, t: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const Icon = section.icon;

  return (
    <div className="border-b border-gray-100 dark:border-gray-800">
      <button
        type="button" onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-5 py-3 hover:bg-gray-50/70 dark:hover:bg-gray-800/50 cursor-pointer transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <Icon className="h-4 w-4 text-gray-400 dark:text-gray-500 shrink-0" />
          <div>
            <p className="text-[13.5px] font-semibold text-gray-800 dark:text-gray-100 leading-snug">{section.label}</p>
            {(!open || tags.length === 0) && (
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{section.hint}</p>
            )}
            {open && tags.length > 0 && (
              <p className="text-xs text-blue-500 mt-0.5">{tags.length} filter{tags.length > 1 ? "s" : ""} applied</p>
            )}
          </div>
        </div>
        <ChevronDown className={cn("h-4 w-4 text-gray-400 shrink-0 transition-transform duration-200", open && "rotate-180")} />
      </button>
      <div className={cn("overflow-hidden transition-all duration-200", open ? "max-h-48" : "max-h-0")}>
        <div className="px-5 pb-4">
          <TagInput tags={tags} onAdd={t => onAdd(section.id, t)} onRemove={t => onRemove(section.id, t)} />
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-6 select-none text-center">
      <svg viewBox="0 0 180 190" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-36 h-36 mb-4" aria-hidden="true">
        <ellipse cx="90" cy="182" rx="52" ry="7" fill="#e9ecef"/>
        <rect x="32" y="26" width="108" height="148" rx="9" fill="#f8fafc" stroke="#dde1e7" strokeWidth="1.8"/>
        <rect x="64" y="18" width="52" height="20" rx="5" fill="#f0f4f8" stroke="#dde1e7" strokeWidth="1.5"/>
        <rect x="74" y="22" width="32" height="10" rx="3" fill="#c9d4df"/>
        <rect x="50" y="60" width="76" height="6.5" rx="3.25" fill="#e2e8f0"/>
        <rect x="50" y="76" width="58" height="6.5" rx="3.25" fill="#dbeafe"/>
        <rect x="50" y="92" width="68" height="6.5" rx="3.25" fill="#e2e8f0"/>
        <rect x="50" y="108" width="46" height="6.5" rx="3.25" fill="#dbeafe"/>
        <rect x="50" y="124" width="62" height="6.5" rx="3.25" fill="#e2e8f0"/>
        <rect x="50" y="60" width="9" height="6.5" rx="2" fill="#3b82f6"/>
        <path d="M52.5 63l1.5 1.5 2.5-2.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="50" y="76" width="9" height="6.5" rx="2" fill="#3b82f6"/>
        <path d="M52.5 79l1.5 1.5 2.5-2.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="50" y="92" width="9" height="6.5" rx="2" fill="#e2e8f0"/>
        <rect x="50" y="108" width="9" height="6.5" rx="2" fill="#e2e8f0"/>
        <rect x="50" y="124" width="9" height="6.5" rx="2" fill="#e2e8f0"/>
        <circle cx="146" cy="84" r="13" fill="#c7d7fe" stroke="#a5b4fc" strokeWidth="1.5"/>
        <path d="M135 79 Q146 69 157 79" fill="#818cf8"/>
        <path d="M130 118 Q146 105 162 118 L163 142 H129 Z" fill="#e0e7ff" stroke="#a5b4fc" strokeWidth="1.5"/>
        <line x1="130" y1="122" x2="119" y2="131" stroke="#a5b4fc" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="117" cy="133" r="4" fill="#c7d7fe" stroke="#a5b4fc" strokeWidth="1.5"/>
        <ellipse cx="24" cy="152" rx="9" ry="16" fill="#bbf7d0" transform="rotate(-22 24 152)"/>
        <ellipse cx="18" cy="148" rx="7" ry="12" fill="#6ee7b7" transform="rotate(-42 18 148)"/>
        <ellipse cx="156" cy="148" rx="9" ry="16" fill="#bbf7d0" transform="rotate(22 156 148)"/>
        <ellipse cx="162" cy="144" rx="7" ry="12" fill="#6ee7b7" transform="rotate(42 162 144)"/>
      </svg>
      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-[240px] leading-relaxed">
        Start your Company search, preview, and import companies for enrichment by applying any filter in the left panel.
      </p>
      <p className="text-xs text-gray-400 mt-2 font-medium">OR</p>
      <p className="text-xs text-gray-400 mt-1">Import companies from saved Search.</p>
    </div>
  );
}

export function FindCompaniesModal() {
  const { findCompaniesOpen, closeFindCompanies } = useModal();
  const [keyword, setKeyword] = useState("");
  const [filterTags, setFilterTags] = useState<Record<string, string[]>>(
    () => Object.fromEntries(filterSections.map(s => [s.id, []]))
  );
  const [savedOpen, setSavedOpen] = useState(false);

  useEffect(() => {
    if (!findCompaniesOpen) return;
    const h = (e: globalThis.KeyboardEvent) => { if (e.key === "Escape") closeFindCompanies(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [findCompaniesOpen, closeFindCompanies]);

  useEffect(() => {
    document.body.style.overflow = findCompaniesOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [findCompaniesOpen]);

  const addTag    = (id: string, tag: string) => setFilterTags(p => ({ ...p, [id]: p[id].includes(tag) ? p[id] : [...p[id], tag] }));
  const removeTag = (id: string, tag: string) => setFilterTags(p => ({ ...p, [id]: p[id].filter(t => t !== tag) }));

  if (!findCompaniesOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center sm:items-center p-4 sm:p-6">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-[2px] cursor-default" onClick={closeFindCompanies} aria-hidden="true" />

      {/* Modal card */}
      <div
        role="dialog" aria-modal="true" aria-label="Find Companies"
        className="relative z-10 flex flex-col w-[90vw] max-w-[820px] h-[88vh] max-h-[680px] rounded-2xl bg-white dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden mt-10 sm:mt-0"
      >
        {/* ── Modal Header ── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800 shrink-0">
          <div className="flex items-center gap-3">
            <h2 className="text-[16px] font-bold text-gray-900 dark:text-gray-100">Find Companies</h2>
            <div className="relative">
              <button
                onClick={() => setSavedOpen(v => !v)}
                className="flex items-center gap-1.5 rounded-lg border border-gray-200 dark:border-gray-700 px-2.5 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
              >
                <ChevronDown className="h-3 w-3" /> Saved Search
              </button>
              {savedOpen && (
                <div className="absolute left-0 top-full mt-1.5 w-48 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg py-1.5 z-30">
                  <p className="px-3 py-2 text-xs text-gray-400 text-center">No saved searches yet</p>
                  <div className="border-t border-gray-100 dark:border-gray-800 mx-3 my-1" />
                  <button className="w-full text-left px-3 py-2 text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors flex items-center gap-2">
                    <BookmarkPlus className="h-3.5 w-3.5 text-gray-400" />
                    Save current search
                  </button>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={closeFindCompanies}
            className="flex h-7 w-7 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 cursor-pointer transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* ── Body ── */}
        <div className="flex flex-1 min-h-0">

          {/* LEFT PANEL */}
          <div className="flex flex-col w-[300px] shrink-0 border-r border-gray-100 dark:border-gray-800">

            {/* Company Keyword */}
            <div className="px-5 pt-4 pb-3 shrink-0">
              <div className="flex items-center gap-2 mb-3">
                <Building2 className="h-4 w-4 text-gray-500 dark:text-gray-400 shrink-0" />
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">Company Keyword</span>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 pointer-events-none" />
                <input
                  type="text" value={keyword} onChange={e => setKeyword(e.target.value)}
                  placeholder="Enter single keyword here..."
                  className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-2 pl-9 pr-3 text-sm text-gray-800 dark:text-gray-100 placeholder:text-gray-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 cursor-text transition-all"
                />
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-100 dark:bg-gray-800" />

            {/* Filter sections */}
            <div className="flex-1 overflow-y-auto">
              {filterSections.map(s => (
                <FilterRow key={s.id} section={s} tags={filterTags[s.id]} onAdd={addTag} onRemove={removeTag} />
              ))}
            </div>

            {/* Bottom bar */}
            <div className="border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-3 flex items-center gap-2 shrink-0">
              <button className="h-9 flex-1 whitespace-nowrap inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-transparent text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors px-2">
                <BookmarkPlus className="h-3.5 w-3.5 text-gray-500 shrink-0" />
                Save Search
              </button>
              <button className="h-9 flex-1 whitespace-nowrap inline-flex items-center justify-center gap-1.5 rounded-lg bg-gray-900 dark:bg-white text-xs font-semibold text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 cursor-pointer transition-colors px-2">
                <Eye className="h-3.5 w-3.5 shrink-0" />
                Preview Result
              </button>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="flex flex-1 flex-col overflow-hidden bg-white dark:bg-gray-900">

            {/* Info bar — TWO rows */}
            <div className="border-b border-gray-100 dark:border-gray-800 px-5 py-3 shrink-0 space-y-1">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  Found 0 companies. Click preview to view results
                </p>
                <div className="flex items-center gap-1.5 rounded-full border border-orange-200 dark:border-orange-700 bg-orange-50 dark:bg-orange-900/20 px-2.5 py-1 shrink-0">
                  <Lock className="h-3 w-3 text-orange-500 shrink-0" />
                  <span className="text-xs font-semibold text-orange-600 dark:text-orange-400 whitespace-nowrap tabular-nums">
                    8000/50000
                  </span>
                </div>
              </div>
              <p className="text-xs text-orange-500 dark:text-orange-400">
                🔒 Unlock <span className="font-bold text-orange-600 dark:text-orange-300">100,000 companies</span> with Enterprise Plan★
              </p>
            </div>

            {/* Column headers */}
            <div className="border-b border-gray-100 dark:border-gray-800 px-5 shrink-0">
              <div className="flex items-center overflow-x-auto">
                {[
                  { label: "COMPANY NAME",  w: 120 },
                  { label: "INDUSTRY",      w: 100 },
                  { label: "LOCATION",      w: 100 },
                  { label: "HEADCOUNT",     w: 95  },
                  { label: "FUNDING STAGE", w: 115 },
                  { label: "WEBSITE",       w: 100 },
                ].map(({ label, w }) => (
                  <div key={label} style={{ minWidth: w }} className="shrink-0 py-2.5 pr-5 text-[10px] font-bold text-gray-400 dark:text-gray-500 tracking-widest uppercase">
                    {label}
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
      </div>
    </div>
  );
}
