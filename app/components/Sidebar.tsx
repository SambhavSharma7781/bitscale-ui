"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Plug,
  FileText,
  Settings,
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  ChevronRight,
  Rocket,
  Sidebar as SidebarIcon,
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
  { label: "My Dashboard", href: "/dashboard", icon: LayoutDashboard, built: true },
  { label: "Playbooks",    href: "/playbooks",    icon: SidebarIcon,     built: false, badge: "rocket" },
  { label: "Integrations", href: "/integrations", icon: Plug,            built: false },
];

const navItemsOther: NavItem[] = [
  { label: "Documentation", href: "/documentation", icon: FileText, built: false },
  { label: "Settings",      href: "/settings",      icon: Settings, built: false },
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
              "w-full group flex items-center gap-3 rounded-md px-3 py-2 text-[13px] font-medium cursor-pointer",
              "transition-all duration-150 ease-out",
              "text-gray-700 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"
            )}
          >
            <span className="flex h-[18px] w-[18px] items-center justify-center shrink-0 text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
              <Icon className="h-4 w-4" />
            </span>
            <span className="truncate text-left">{item.label}</span>
            {item.badge === "rocket" && (
              <div className="ml-auto flex items-center justify-center bg-[#faeddd] text-[#c2842c] rounded-full px-2 py-0.5">
                <Rocket className="h-3 w-3" />
              </div>
            )}
            {item.badge && item.badge !== "rocket" && <span className="ml-auto text-[13px] leading-none">{item.badge}</span>}
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
            "group flex items-center gap-3 rounded-md px-3 py-2 text-[13px] font-medium cursor-pointer",
            "transition-all duration-150 ease-out",
            active
              ? "bg-gray-100/80 dark:bg-gray-800/80 text-blue-600 dark:text-blue-400"
              : "text-gray-700 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"
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
          {active && <ChevronRight className="ml-auto h-3.5 w-3.5 text-blue-600 dark:text-blue-400 shrink-0" />}
          {item.badge === "rocket" && (
            <div className="ml-auto flex items-center justify-center bg-[#faeddd] text-[#c2842c] rounded-full px-2 py-0.5">
              <Rocket className="h-3 w-3" />
            </div>
          )}
          {item.badge && item.badge !== "rocket" && <span className="ml-auto text-[13px] leading-none">{item.badge}</span>}
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
          <div className="flex items-center justify-between px-5 h-14 shrink-0 border-b border-gray-200 dark:border-gray-800">
            <Image
              src="/bitscale-logo-light.svg"
              alt="Bitscale"
              width={120}
              height={32}
              className="w-auto h-7 dark:invert"
              priority
            />
            <button
              onClick={onClose}
              className="flex h-7 w-7 items-center justify-center rounded-md text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer transition-colors lg:hidden"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="px-3 pt-2 pb-1 border-b border-gray-200 dark:border-gray-800">
            <button className="flex w-full items-center justify-between rounded-xl px-2 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-800/60 cursor-pointer transition-colors group">
              <div className="flex items-center gap-3">
                {/* Two overlapping circular avatars */}
                <div className="flex items-center shrink-0">
                  <div className="h-6 w-6 rounded-full overflow-hidden ring-2 ring-white dark:ring-gray-900 shadow-sm relative z-0">
                    <img src="/avatar.png" alt="Member 1" className="h-full w-full object-cover" />
                  </div>
                  <div className="h-6 w-6 rounded-full overflow-hidden ring-2 ring-white dark:ring-gray-900 shadow-sm -ml-2 relative z-10">
                    <img src="/avatar2.png" alt="Member 2" className="h-full w-full object-cover" />
                  </div>
                </div>
                <span className="text-[14px] font-semibold text-gray-800 dark:text-gray-100 tracking-tight">
                  GTM Spaces
                </span>
              </div>
              {/* Up/down chevron */}
              <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                <ChevronsUpDown className="h-3.5 w-3.5" />
              </div>
            </button>
          </div>

        </div>

        {/* ── Navigation ── */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {/* Home Section */}
          <div className="space-y-0.5">
            <p className="px-3 mb-2 text-[12px] font-medium text-gray-500 dark:text-gray-400">
              Home
            </p>
            {renderNavList(navItemsHome)}
          </div>

          {/* Other Section */}
          <div className="space-y-0.5 mt-8">
            <p className="px-3 mb-2 text-[12px] font-medium text-gray-500 dark:text-gray-400">
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
                className="text-[11px] font-medium text-gray-500 dark:text-gray-400 mt-0.5 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer transition-colors"
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
