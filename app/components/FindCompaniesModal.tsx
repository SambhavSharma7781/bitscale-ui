"use client";

import Image from "next/image";
import { useEffect, useRef, useState, KeyboardEvent } from "react";
import {
  X, Search, ChevronDown, Eye, BookmarkPlus, Unlock,
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
    <div>
      <button
        type="button" onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-5 py-3 hover:bg-gray-50/70 dark:hover:bg-gray-800/50 cursor-pointer transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <Icon strokeWidth={2.5} className="h-[18px] w-[18px] text-gray-900 dark:text-gray-100 shrink-0" />
          <div>
            <p className="text-[14px] font-bold text-gray-900 dark:text-gray-100 leading-snug">{section.label}</p>
            {(!open || tags.length === 0) && (
              <p className="text-[13px] font-medium text-gray-400 dark:text-gray-500 mt-0.5">{section.hint}</p>
            )}
            {open && tags.length > 0 && (
              <p className="text-xs text-blue-500 mt-0.5">{tags.length} filter{tags.length > 1 ? "s" : ""} applied</p>
            )}
          </div>
        </div>
        <ChevronDown strokeWidth={3} className={cn("h-4 w-4 text-gray-900 dark:text-gray-100 shrink-0 transition-transform duration-200", open && "rotate-180")} />
      </button>
      <div className={cn("overflow-hidden transition-all duration-200", open ? "max-h-48" : "max-h-0")}>
        <div className="px-5 pb-4">
          <TagInput tags={tags} onAdd={t => onAdd(section.id, t)} onRemove={t => onRemove(section.id, t)} />
        </div>
      </div>
      <div className="h-px bg-gray-100 dark:bg-gray-800 mx-5" />
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center px-6 select-none text-center">
      <Image
        src="/empty-state.svg"
        alt="Empty State Illustration"
        width={320}
        height={220}
        className="w-auto h-44 object-contain mb-5 mix-blend-multiply dark:mix-blend-normal"
        priority
      />
      <div className="mt-5 flex flex-col items-center gap-1.5">
        <p className="text-[13px] font-medium text-slate-400 dark:text-slate-500 max-w-[420px] leading-relaxed text-center">
          Start your Company search , preview, and import companies<br/>for enrichment by applying any filter in the left panel.
        </p>
        <p className="text-[13px] font-medium text-slate-400 dark:text-slate-500 my-1">OR</p>
        <p className="text-[13px] font-medium text-slate-400 dark:text-slate-500">Import companies from saved Search.</p>
      </div>
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
        className="relative z-10 flex flex-col w-[95vw] max-w-[1040px] h-[88vh] max-h-[760px] rounded-[16px] bg-white dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden mt-10 sm:mt-0"
      >
        {/* ── Full Height Split Layout ── */}
        <div className="flex flex-col md:flex-row flex-1 min-h-0 h-full">

          {/* LEFT PANEL */}
          <div className="flex flex-col w-full md:w-[340px] shrink-0 bg-white dark:bg-gray-900 z-10">
            {/* Left Panel Header */}
            <div className="flex items-center justify-between px-6 py-5 shrink-0">
              <h2 className="text-[20px] font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">Find Companies</h2>
              <button
                onClick={() => setSavedOpen(v => !v)}
                className="flex items-center gap-1.5 rounded-md bg-gray-50 dark:bg-gray-800 px-3 py-1.5 text-[13px] font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors border border-transparent"
              >
                <ChevronDown className="h-4 w-4" /> Saved Search
              </button>
              {savedOpen && (
                <div className="absolute left-6 top-16 mt-1 w-48 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg py-1.5 z-30">
                  <p className="px-3 py-2 text-xs text-gray-400 text-center">No saved searches yet</p>
                  <div className="border-t border-gray-100 dark:border-gray-800 mx-3 my-1" />
                  <button className="w-full text-left px-3 py-2 text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors flex items-center gap-2">
                    <BookmarkPlus className="h-3.5 w-3.5 text-gray-400" />
                    Save current search
                  </button>
                </div>
              )}
            </div>

            {/* Company Keyword */}
            <div className="px-5 pt-5 shrink-0">
              <div className="flex items-center gap-2.5 mb-4">
                <Building2 className="h-5 w-5 text-gray-800 dark:text-gray-200 shrink-0" />
                <span className="text-[14.5px] font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">Company Keyword</span>
              </div>
              <div className="flex items-center pb-4">
                <Search className="h-3.5 w-3.5 text-gray-400 shrink-0 mr-2" />
                <input
                  type="text" value={keyword} onChange={e => setKeyword(e.target.value)}
                  placeholder="Enter single keyword here..."
                  className="w-full bg-transparent text-[13px] text-gray-800 dark:text-gray-100 placeholder:text-gray-400 outline-none"
                />
              </div>
            </div>
            
            <div className="h-px bg-gray-100 dark:bg-gray-800 mx-5" />

            {/* Filter sections */}
            <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {filterSections.map(s => (
                <FilterRow key={s.id} section={s} tags={filterTags[s.id]} onAdd={addTag} onRemove={removeTag} />
              ))}
            </div>

            {/* Bottom bar */}
            <div className="bg-white dark:bg-gray-900 px-4 py-3 flex items-center gap-2 shrink-0">
              <button className="h-9 flex-1 whitespace-nowrap inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-transparent text-[12px] font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors px-2">
                <BookmarkPlus className="h-4 w-4 text-gray-500 shrink-0" />
                Save Search
              </button>
              <button className="h-9 flex-1 whitespace-nowrap inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#1e293b] dark:bg-white text-[12px] font-bold text-white dark:text-gray-900 hover:bg-slate-800 dark:hover:bg-gray-100 cursor-pointer transition-colors px-2">
                <Eye className="h-4 w-4 shrink-0" />
                Preview Result
              </button>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="flex flex-1 flex-col overflow-hidden bg-white dark:bg-gray-900 p-6 pt-5 min-h-[300px] md:min-h-0 relative">
            
            {/* Absolute Close button in top right */}
            <button
              onClick={closeFindCompanies}
              className="absolute top-4 right-4 flex h-6 w-6 items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-700 cursor-pointer transition-colors z-20"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Top Right Yellow Badge */}
            <div className="flex justify-end mb-4 mr-6 shrink-0">
              <div className="flex items-center gap-1.5 rounded-full bg-[#faeedd] dark:bg-amber-900/20 px-3 py-1.5 shrink-0 border border-[#f2ddc2] dark:border-amber-800/50">
                <Search className="h-3 w-3 text-[#cc822b] shrink-0" />
                <span className="text-[12px] font-semibold text-[#cc822b] whitespace-nowrap tabular-nums">
                  8000/50000
                </span>
              </div>
            </div>

            {/* Info bar — SINGLE row matching screenshot */}
            <div className="flex items-center justify-between gap-3 mb-4 shrink-0">
              <p className="text-[13px] font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap">
                Found 0 companies. Click preview to view results
              </p>
              <div className="flex items-center gap-1.5 shrink-0">
                <Unlock className="h-3.5 w-3.5 text-[#cc822b] shrink-0" />
                <p className="text-[13px] font-medium text-[#cc822b] dark:text-[#d97706] whitespace-nowrap">
                  Unlock <span className="font-bold">100,000 leads</span> with Enterprise Plan*
                </p>
              </div>
            </div>

            {/* Main Content Box (Table Headers + Empty State) */}
            <div className="flex flex-col border border-gray-100 dark:border-gray-800 rounded-lg overflow-hidden shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)] mb-auto">
              <div className="bg-[#f8fafc] dark:bg-gray-800/40 px-6 shrink-0">
                <div className="flex items-center overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {[
                    { label: "COMPANY NAME", w: 120 },
                    { label: "INDUSTRY",     w: 100 },
                    { label: "LOCATION",     w: 100 },
                    { label: "HEADCOUNT",    w: 100 },
                    { label: "FUNDING STAGE",w: 120 },
                    { label: "WEBSITE",      w: 100 },
                  ].map(({ label, w }) => (
                    <div key={label} style={{ minWidth: w }} className="shrink-0 py-3.5 pr-4 text-[11px] font-bold text-gray-500 dark:text-gray-400 tracking-wide uppercase">
                      {label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Empty state */}
              <div className="flex flex-col items-center justify-center overflow-y-auto bg-white dark:bg-gray-900 pt-8 pb-14">
                <EmptyState />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
