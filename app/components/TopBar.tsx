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

  const formatCredits = (n: number) => n.toString();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-10 flex h-14 w-full items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 md:px-6">
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

        {/* Credits & Booster Plan pill */}
        <div className="hidden sm:flex items-center gap-3 rounded-[8px] bg-[#edf2ef] dark:bg-[#1a2332] pl-2.5 pr-1.5 py-1.5 border border-transparent dark:border-[#2a3a4a] ml-1">
          <div className="flex items-center gap-1.5 pl-0.5">
            <Coins className="h-4 w-4 text-[#3d7756] dark:text-[#7db898]" strokeWidth={2} />
            <span className="text-[13px] font-medium text-[#3d7756] dark:text-[#a8c5b0] tracking-tight">
              {formatCredits(creditsUsed)}/{formatCredits(creditsTotal)}
            </span>
          </div>
          <button className="flex items-center justify-center rounded-[6px] bg-[#42795a] dark:bg-[#2d5a40] px-3 py-1 hover:bg-[#36634a] dark:hover:bg-[#3a6e4e] cursor-pointer transition-colors">
            <span className="text-[12px] font-medium text-white tracking-wide">Booster Plan</span>
          </button>
        </div>

        {/* User avatar */}
        <div className="relative ml-2">
          <button
            onClick={() => setIsProfileOpen((p) => !p)}
            className="flex items-center rounded-full hover:ring-2 hover:ring-gray-100 dark:hover:ring-gray-800 cursor-pointer transition-all"
          >
            <Avatar className="h-7 w-7 border border-gray-200 dark:border-gray-700 shadow-sm">
              <AvatarImage src="/avatar.png" alt="User Avatar" />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-violet-600 text-white text-[11px] font-bold">
                SS
              </AvatarFallback>
            </Avatar>
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
