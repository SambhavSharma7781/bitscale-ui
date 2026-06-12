"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import {
  Menu, Bell, ChevronDown, Moon, Sun, Coins
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useToast } from "@/app/context/ToastContext";

interface TopBarProps {
  onMenuClick: () => void;
}

export function TopBar({ onMenuClick }: TopBarProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const { showToast } = useToast();

  const creditsUsed = 450000;
  const creditsTotal = 5500000;

  const formatCredits = (n: number) =>
    n >= 1_000_000
      ? `${(n / 1_000_000).toFixed(1)}M`
      : n >= 1_000
      ? `${(n / 1_000).toFixed(0)}K`
      : n.toString();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 w-full items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 md:px-6">
      {/* Left side — mobile menu only */}
      <div className="flex items-center">
        <button
          onClick={onMenuClick}
          className="flex h-8 w-8 items-center justify-center rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200 cursor-pointer transition-colors lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Right — credits, badge, actions, avatar */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Credits & Booster Plan pill */}
        <div className="hidden sm:flex items-center gap-3 rounded-full bg-[#f1f5f2] dark:bg-[#1a2332] pl-3 pr-1.5 py-1.5 border border-transparent dark:border-[#2a3a4a]">
          <div className="flex items-center gap-2 pl-1">
            <Coins className="h-[18px] w-[18px] text-[#42795a] dark:text-[#7db898]" strokeWidth={2} />
            <span className="text-[15px] font-medium text-[#42795a] dark:text-[#a8c5b0] tracking-tight">
              {formatCredits(creditsUsed)}/{formatCredits(creditsTotal)}
            </span>
          </div>
          <button className="flex items-center justify-center rounded-full bg-[#42795a] dark:bg-[#2d5a40] px-3.5 py-1.5 hover:bg-[#36634a] dark:hover:bg-[#3a6e4e] cursor-pointer transition-colors">
            <span className="text-[13px] font-medium text-white tracking-wide">Booster Plan</span>
          </button>
        </div>

        {/* Divider */}
        <div className="hidden md:block h-6 w-px bg-gray-200 dark:bg-gray-700" />

        {/* Dark mode toggle */}
        <button
          id="theme-toggle-btn"
          type="button"
          onClick={toggleTheme}
          className="relative flex h-8 w-8 items-center justify-center rounded-md text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer transition-colors"
          aria-label="Toggle dark mode"
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </button>

        {/* Notification bell */}
        <button className="relative flex h-8 w-8 items-center justify-center rounded-md text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer transition-colors">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-blue-500" />
        </button>

        {/* User avatar */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen((p) => !p)}
            className="flex items-center gap-2 rounded-lg p-1 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
          >
            <Avatar className="h-7 w-7 ring-2 ring-white dark:ring-gray-900 shadow-sm">
              <AvatarImage src="" alt="Sambhav Sharma" />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-violet-600 text-white text-[11px] font-bold">
                SS
              </AvatarFallback>
            </Avatar>
            <ChevronDown
              className={cn(
                "hidden sm:block h-3.5 w-3.5 text-gray-400 dark:text-gray-500 transition-transform duration-200",
                isProfileOpen && "rotate-180"
              )}
            />
          </button>

          {/* Profile dropdown */}
          {isProfileOpen && (
            <div className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg shadow-gray-200/80 dark:shadow-black/40 ring-1 ring-black/5 py-1.5 z-50">
              <div className="px-3 py-2 border-b border-gray-100 dark:border-gray-800 mb-1">
                <p className="text-[13px] font-semibold text-gray-900 dark:text-gray-100">Sambhav Sharma</p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">sambhav@bitscale.ai</p>
              </div>
              {[
                { label: "Profile settings" },
                { label: "Billing & plans" },
                { label: "Team management" },
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => {
                    setIsProfileOpen(false);
                    showToast("Coming Soon 🚀");
                  }}
                  className="w-full text-left block px-3 py-2 text-[13px] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <div className="border-t border-gray-100 dark:border-gray-800 mt-1 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setIsProfileOpen(false);
                    showToast("Sign out coming soon 🚀");
                  }}
                  className="w-full text-left px-3 py-2 text-[13px] text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 cursor-pointer transition-colors"
                >
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
