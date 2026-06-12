"use client";

import { useEffect, useRef, useState, KeyboardEvent } from "react";
import { X, Grid3X3, Users, FileSpreadsheet } from "lucide-react";
import { cn } from "@/lib/utils";
import { useModal } from "@/app/context/ModalContext";
import { useGrids } from "@/app/context/GridContext";
import { useToast } from "@/app/context/ToastContext";

// ─── Source types ─────────────────────────────────────────────────────────────

interface SourceType {
  id: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bg: string;
  border: string;
  selectedBorder: string;
  selectedBg: string;
  gridIcon: string;
  gridIconBg: string;
}

// Custom LinkedIn icon as SVG component
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function SalesNavIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

const sourceTypes: SourceType[] = [
  {
    id: "linkedin",
    label: "LinkedIn",
    description: "Import from LinkedIn search",
    icon: LinkedInIcon,
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950",
    border: "border-gray-200 dark:border-gray-700",
    selectedBorder: "border-blue-500",
    selectedBg: "bg-blue-50 dark:bg-blue-950/60",
    gridIcon: "LI",
    gridIconBg: "bg-blue-600 dark:bg-blue-600",
  },
  {
    id: "salesnav",
    label: "Sales Nav",
    description: "LinkedIn Sales Navigator",
    icon: SalesNavIcon,
    color: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-50 dark:bg-orange-950",
    border: "border-gray-200 dark:border-gray-700",
    selectedBorder: "border-orange-500",
    selectedBg: "bg-orange-50 dark:bg-orange-950/60",
    gridIcon: "SN",
    gridIconBg: "bg-violet-600 dark:bg-violet-600",
  },
  {
    id: "findpeople",
    label: "Find People",
    description: "Search our people database",
    icon: Users,
    color: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-50 dark:bg-violet-950",
    border: "border-gray-200 dark:border-gray-700",
    selectedBorder: "border-violet-500",
    selectedBg: "bg-violet-50 dark:bg-violet-950/60",
    gridIcon: "FP",
    gridIconBg: "bg-purple-500 dark:bg-purple-500",
  },
  {
    id: "importcsv",
    label: "Import CSV",
    description: "Upload a CSV file",
    icon: FileSpreadsheet,
    color: "text-gray-600 dark:text-gray-400",
    bg: "bg-gray-100 dark:bg-gray-800",
    border: "border-gray-200 dark:border-gray-700",
    selectedBorder: "border-gray-500",
    selectedBg: "bg-gray-100 dark:bg-gray-800/60",
    gridIcon: "IC",
    gridIconBg: "bg-gray-700 dark:bg-gray-600",
  },
];

// ─── NewGridModal ─────────────────────────────────────────────────────────────

export function NewGridModal() {
  const { newGridOpen, closeNewGrid } = useModal();
  const { addGrid } = useGrids();
  const { showToast } = useToast();

  const [gridName, setGridName] = useState("");
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (newGridOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [newGridOpen]);

  // Escape to close
  useEffect(() => {
    if (!newGridOpen) return;
    const handler = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [newGridOpen]);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = newGridOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [newGridOpen]);

  const handleClose = () => {
    closeNewGrid();
    setTimeout(() => {
      setGridName("");
      setSelectedSource(null);
    }, 200); // Clear after animation finishes
  };

  const handleCreate = () => {
    if (!gridName.trim() || !selectedSource) {
      inputRef.current?.focus();
      return;
    }
    
    const sourceData = sourceTypes.find((s) => s.id === selectedSource)!;

    addGrid({
      id: Date.now(),
      name: gridName.trim(),
      icon: sourceData.gridIcon,
      iconBg: sourceData.gridIconBg,
      iconColor: "text-white",
      starred: false,
      editedBy: { name: "Sambhav Sharma", initials: "SS", color: "bg-blue-500" },
      lastEdited: "Just now",
      status: "draft",
      rows: 0,
    });

    showToast("Grid created successfully! 🎉");
    handleClose();
  };

  const canCreate = gridName.trim().length > 0 && selectedSource !== null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/50 backdrop-blur-[2px] transition-opacity duration-200",
          newGridOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Create New Grid"
        className={cn(
          "fixed left-1/2 top-1/2 z-50 w-full max-w-[480px] -translate-x-1/2 -translate-y-1/2",
          "rounded-2xl bg-white dark:bg-gray-900 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.28),0_0_0_1px_rgba(0,0,0,0.06)] dark:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.08)]",
          "transition-all duration-200",
          newGridOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-900 dark:bg-gray-700">
              <Grid3X3 className="h-4 w-4 text-white" />
            </div>
            <h2 className="text-[15px] font-bold text-gray-900 dark:text-gray-50 tracking-tight">
              Create New Grid
            </h2>
          </div>
          <button
            id="new-grid-modal-close"
            type="button"
            onClick={handleClose}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5">
          {/* Grid Name input */}
          <div>
            <label
              htmlFor="grid-name-input"
              className="block text-[12px] font-semibold text-gray-700 dark:text-gray-300 mb-1.5"
            >
              Grid Name
            </label>
            <input
              ref={inputRef}
              id="grid-name-input"
              type="text"
              value={gridName}
              onChange={(e) => setGridName(e.target.value)}
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter" && canCreate) handleCreate();
              }}
              placeholder="e.g. Series B SaaS Companies"
              className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3.5 py-2.5 text-[13px] text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:border-gray-400 dark:focus:border-gray-500 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-800 transition-all"
            />
          </div>

          {/* Source type cards */}
          <div>
            <p className="text-[12px] font-semibold text-gray-700 dark:text-gray-300 mb-2.5">
              Source Type
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              {sourceTypes.map((source) => {
                const Icon = source.icon;
                const isSelected = selectedSource === source.id;
                return (
                  <button
                    key={source.id}
                    type="button"
                    id={`source-type-${source.id}`}
                    onClick={() => setSelectedSource(source.id)}
                    className={cn(
                      "relative flex flex-col items-start gap-2 rounded-xl border-2 p-3.5 text-left transition-all duration-150 group",
                      isSelected
                        ? `${source.selectedBorder} ${source.selectedBg} shadow-sm`
                        : `${source.border} bg-white dark:bg-gray-800/50 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800`
                    )}
                  >
                    {/* Selected checkmark */}
                    {isSelected && (
                      <div className="absolute top-2.5 right-2.5 h-4 w-4 rounded-full bg-gray-900 dark:bg-gray-100 flex items-center justify-center">
                        <svg className="h-2.5 w-2.5 text-white dark:text-gray-900" fill="none" viewBox="0 0 12 12">
                          <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    )}
                    <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg", source.bg)}>
                      <Icon className={cn("h-4 w-4", source.color)} />
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-gray-900 dark:text-gray-100 leading-tight">
                        {source.label}
                      </p>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                        {source.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2.5 px-6 py-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-900/60 rounded-b-2xl">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-[13px] font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all"
          >
            Cancel
          </button>
          <button
            id="create-grid-btn"
            type="button"
            onClick={handleCreate}
            disabled={!canCreate}
            className={cn(
              "rounded-lg px-5 py-2 text-[13px] font-semibold text-white transition-all",
              canCreate
                ? "bg-gray-900 dark:bg-gray-100 dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-white active:bg-gray-950 shadow-sm"
                : "bg-gray-300 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed"
            )}
          >
            Create Grid
          </button>
        </div>
      </div>
    </>
  );
}
