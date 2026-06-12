"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Home,
  LayoutDashboard,
  BookOpen,
  Plug,
  FileText,
  Settings,
  ExternalLink,
  X,
  ChevronUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/app/context/ToastContext";

// ─── Nav config ────────────────────────────────────────────────────────────────

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  built: boolean; // false = show "Coming Soon" toast
}

const navItems: NavItem[] = [
  { label: "Home", href: "/", icon: Home, built: true },
  { label: "My Dashboard", href: "/dashboard", icon: LayoutDashboard, built: true },
  { label: "Playbooks", href: "/playbooks", icon: BookOpen, built: false },
  { label: "Integrations", href: "/integrations", icon: Plug, built: false },
  { label: "Documentation", href: "/documentation", icon: FileText, built: false },
  { label: "Settings", href: "/settings", icon: Settings, built: false },
];

// ─── Sidebar ──────────────────────────────────────────────────────────────────

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [bottomExpanded, setBottomExpanded] = useState(true);
  const { showToast } = useToast();

  const isActive = (item: NavItem) => {
    if (item.href === "/") return pathname === "/";
    return pathname.startsWith(item.href);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-30 flex h-screen w-60 flex-col bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 shadow-sm transition-transform duration-300 ease-in-out",
          "lg:relative lg:translate-x-0 lg:z-auto lg:shadow-none",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* ── Logo ── */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 shadow-md">
              <span className="text-xs font-bold text-white tracking-tight">B</span>
            </div>
            <span className="text-[15px] font-bold text-gray-900 dark:text-gray-50 tracking-tight">
              Bitscale
            </span>
          </div>
          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-md text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-600 dark:hover:text-gray-300 transition-colors lg:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* ── Navigation ── */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
          {navItems.map((item) => {
            const active = isActive(item);
            const Icon = item.icon;

            if (!item.built) {
              // Non-built pages: button that shows toast instead of navigating
              return (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => {
                    if (window.innerWidth < 1024) onClose();
                    showToast("Coming Soon 🚀");
                  }}
                  className={cn(
                    "w-full group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium",
                    "transition-all duration-150 ease-out hover:translate-x-0.5",
                    "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"
                  )}
                >
                  <span className="flex h-[18px] w-[18px] items-center justify-center shrink-0 text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                  <span className="truncate text-left">{item.label}</span>
                </button>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => {
                  if (window.innerWidth < 1024) onClose();
                }}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium",
                  "transition-all duration-150 ease-out hover:translate-x-0.5",
                  active
                    ? "bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"
                )}
              >
                <span
                  className={cn(
                    "flex h-[18px] w-[18px] items-center justify-center shrink-0 transition-colors duration-150",
                    active
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300"
                  )}
                >
                  <Icon className="h-[18px] w-[18px]" />
                </span>
                <span className="truncate">{item.label}</span>
                {active && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* ── Bottom Section ── */}
        <div className="border-t border-gray-100 dark:border-gray-800">
          {/* User / workspace row */}
          <button
            type="button"
            onClick={() => setBottomExpanded((v) => !v)}
            className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors"
          >
            {/* "BS" avatar */}
            <div className="h-7 w-7 rounded-full bg-gray-900 dark:bg-gray-100 flex items-center justify-center shrink-0 shadow-sm ring-2 ring-white dark:ring-gray-900">
              <span className="text-[10px] font-bold text-white dark:text-gray-900 tracking-tight leading-none">
                BS
              </span>
            </div>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-[12px] font-semibold text-gray-900 dark:text-gray-100 leading-none truncate">
                Bitscale
              </p>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5 leading-none">
                Booster Plan active
              </p>
            </div>
            <ChevronUp
              className={cn(
                "h-3.5 w-3.5 text-gray-400 dark:text-gray-500 shrink-0 transition-transform duration-200",
                !bottomExpanded && "rotate-180"
              )}
            />
          </button>

          {/* Support link — collapsible */}
          <div
            className={cn(
              "overflow-hidden transition-all duration-200 ease-in-out",
              bottomExpanded ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
            )}
          >
            <div className="px-3 pb-3">
              <a
                href="https://bitscale.ai/support"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200 transition-all duration-150 hover:translate-x-0.5 group"
              >
                <ExternalLink className="h-3.5 w-3.5 shrink-0 text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400 transition-colors" />
                <span className="text-[12px] font-medium">Get Support at Bitscale</span>
              </a>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
