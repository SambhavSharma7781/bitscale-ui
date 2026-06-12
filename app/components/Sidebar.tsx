"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  LayoutDashboard,
  BookOpen,
  Plug,
  FileText,
  Settings,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/app/context/ToastContext";

// ─── Nav config ────────────────────────────────────────────────────────────────

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  built: boolean;
  badge?: string;
}

const navItemsHome: NavItem[] = [
  { label: "Home", href: "/", icon: Home, built: true },
  { label: "My Dashboard", href: "/dashboard", icon: LayoutDashboard, built: true },
];

const navItemsPlaybooks: NavItem[] = [
  { label: "Playbooks", href: "/playbooks", icon: BookOpen, built: false, badge: "🚀" },
  { label: "Integrations", href: "/integrations", icon: Plug, built: false },
];

const navItemsOther: NavItem[] = [
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
  const { showToast } = useToast();

  const isActive = (item: NavItem) => {
    if (item.href === "/") return pathname === "/";
    return pathname.startsWith(item.href);
  };

  const renderNavList = (items: NavItem[]) => {
    return items.map((item) => {
      const active = isActive(item);
      const Icon = item.icon;

      if (!item.built) {
        return (
          <button
            key={item.href}
            type="button"
            onClick={() => {
              if (window.innerWidth < 1024) onClose();
              showToast("Coming Soon 🚀");
            }}
            className={cn(
              "w-full group flex items-center gap-3 rounded-md px-3 py-2 text-[13px] font-medium",
              "transition-all duration-150 ease-out",
              "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"
            )}
          >
            <span className="flex h-[18px] w-[18px] items-center justify-center shrink-0 text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
              <Icon className="h-4 w-4" />
            </span>
            <span className="truncate text-left">{item.label}</span>
            {item.badge && <span className="ml-auto text-[14px] leading-none">{item.badge}</span>}
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
            "group flex items-center gap-3 rounded-md px-3 py-2 text-[13px] font-medium",
            "transition-all duration-150 ease-out",
            active
              ? "bg-blue-50/80 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-semibold"
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
            <Icon className="h-4 w-4" />
          </span>
          <span className="truncate">{item.label}</span>
          {item.badge && <span className="ml-auto text-[14px] leading-none">{item.badge}</span>}
        </Link>
      );
    });
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
          "fixed top-0 left-0 z-30 flex h-screen w-60 flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-transform duration-300 ease-in-out",
          "lg:relative lg:translate-x-0 lg:z-auto lg:shadow-none",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* ── Logo & Workspace Header ── */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between px-5 h-16 shrink-0 border-b border-gray-200 dark:border-gray-800">
            <span className="text-[22px] font-bold italic tracking-tight text-gray-900 dark:text-white">
              Bitscale
            </span>
            <button
              onClick={onClose}
              className="flex h-7 w-7 items-center justify-center rounded-md text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-600 dark:hover:text-gray-300 transition-colors lg:hidden"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="p-3 border-b border-gray-200 dark:border-gray-800">
            <button className="flex w-full items-center justify-between rounded-lg px-2 py-2 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors group">
              <div className="flex items-center gap-2.5">
                <div className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 flex items-center justify-center text-[10px] font-bold">
                  GT
                </div>
                <span className="text-[13px] font-semibold text-gray-900 dark:text-gray-100">
                  GTM Spaces
                </span>
              </div>
              <div className="flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300">
                <ChevronUp className="h-2.5 w-2.5 -mb-1" />
                <ChevronDown className="h-2.5 w-2.5" />
              </div>
            </button>
          </div>
        </div>

        {/* ── Navigation ── */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {/* Home Section */}
          <div className="space-y-0.5">
            <p className="px-3 mb-1 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
              Home
            </p>
            {renderNavList(navItemsHome)}
            {renderNavList(navItemsPlaybooks)}
          </div>

          {/* Other Section */}
          <div className="space-y-0.5">
            <p className="px-3 mb-1 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
              Other
            </p>
            {renderNavList(navItemsOther)}
          </div>
        </nav>

        {/* ── Bottom Card Section ── */}
        <div className="mt-auto">
          <div className="mx-2 mb-2 p-3 rounded-xl bg-gray-100 dark:bg-gray-800/80 flex items-center justify-between shadow-sm cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
            <div className="flex flex-col text-left">
              <span className="text-[14px] font-bold italic text-gray-900 dark:text-gray-100 leading-tight">
                Bitscale
              </span>
              <a
                href="https://bitscale.ai/support"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-medium text-gray-500 dark:text-gray-400 mt-0.5 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                Get Support at Bitscale
              </a>
            </div>
            <ChevronUp className="h-4 w-4 text-gray-400 dark:text-gray-500 shrink-0" />
          </div>
        </div>
      </aside>
    </>
  );
}
