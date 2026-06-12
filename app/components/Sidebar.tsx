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
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },
  {
    label: "My Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Playbooks",
    href: "/playbooks",
    icon: BookOpen,
  },
  {
    label: "Integrations",
    href: "/integrations",
    icon: Plug,
  },
  {
    label: "Documentation",
    href: "/documentation",
    icon: FileText,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-30 flex h-screen w-60 flex-col bg-white border-r border-gray-100 shadow-sm transition-transform duration-300 ease-in-out",
          "lg:relative lg:translate-x-0 lg:z-auto lg:shadow-none",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo / Brand */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 shadow-md">
              <span className="text-xs font-bold text-white tracking-tight">B</span>
            </div>
            <span className="text-[15px] font-bold text-gray-900 tracking-tight">
              Bitscale
            </span>
          </div>
          {/* Close button on mobile */}
          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors lg:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => {
                  if (window.innerWidth < 1024) onClose();
                }}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150",
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <span
                  className={cn(
                    "flex h-[18px] w-[18px] items-center justify-center shrink-0",
                    isActive
                      ? "text-blue-600"
                      : "text-gray-400 group-hover:text-gray-600"
                  )}
                >
                  <Icon className="h-[18px] w-[18px]" />
                </span>
                <span className="truncate">{item.label}</span>
                {isActive && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-500" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="border-t border-gray-100 px-4 py-4 space-y-3">
          {/* Plan badge */}
          <div className="rounded-lg bg-gradient-to-r from-blue-50 to-violet-50 border border-blue-100 px-3 py-2.5">
            <p className="text-xs font-semibold text-gray-800 mb-0.5">Bitscale</p>
            <p className="text-[11px] text-gray-500">Booster Plan active</p>
          </div>

          {/* Support link */}
          <a
            href="https://bitscale.ai/support"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors group"
          >
            <ExternalLink className="h-4 w-4 shrink-0 text-gray-400 group-hover:text-gray-500 transition-colors" />
            <span className="text-[13px] font-medium">Get Support at Bitscale</span>
          </a>
        </div>
      </aside>
    </>
  );
}
