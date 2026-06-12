"use client";

import { useState } from "react";
import { Menu, Bell, ChevronDown, Plus, Search, Users, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface TopBarProps {
  onMenuClick: () => void;
}

export function TopBar({ onMenuClick }: TopBarProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const creditsUsed = 450000;
  const creditsTotal = 5500000;
  const creditPercent = Math.round((creditsUsed / creditsTotal) * 100);

  const formatCredits = (n: number) =>
    n >= 1_000_000
      ? `${(n / 1_000_000).toFixed(1)}M`
      : n >= 1_000
      ? `${(n / 1_000).toFixed(0)}K`
      : n.toString();

  return (
    <header className="sticky top-0 z-10 flex h-[60px] w-full items-center justify-between gap-4 border-b border-gray-100 bg-white px-4 md:px-6">
      {/* Left — hamburger + page title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="text-[15px] font-semibold text-gray-900 tracking-tight hidden sm:block">
          Dashboard
        </h1>
      </div>

      {/* Right — credits, badge, actions, avatar */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Credit counter */}
        <div className="hidden sm:flex items-center gap-2.5 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5">
          <div className="flex flex-col items-end gap-0.5">
            <span className="text-[11px] font-medium text-gray-500 leading-none">Credits</span>
            <span className="text-[13px] font-semibold text-gray-800 leading-none tabular-nums">
              {formatCredits(creditsUsed)}
              <span className="font-normal text-gray-400 text-[11px]">/{formatCredits(creditsTotal)}</span>
            </span>
          </div>
          {/* Mini progress bar */}
          <div className="h-8 w-px bg-gray-200" />
          <div className="flex flex-col gap-1">
            <div className="h-1.5 w-16 rounded-full bg-gray-200 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500 transition-all"
                style={{ width: `${creditPercent}%` }}
              />
            </div>
            <span className="text-[10px] text-gray-400 leading-none">{creditPercent}% used</span>
          </div>
        </div>

        {/* Booster Plan badge */}
        <Badge className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-2.5 py-1 text-[12px] font-semibold text-green-700 shadow-none hover:bg-green-100 transition-colors cursor-pointer">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
          Booster Plan
        </Badge>

        {/* Divider */}
        <div className="hidden md:block h-6 w-px bg-gray-200" />

        {/* Find Companies */}
        <Button
          variant="outline"
          size="sm"
          className="hidden md:inline-flex items-center gap-2 border-gray-200 bg-white text-gray-700 text-[13px] font-medium shadow-none hover:bg-gray-50 hover:border-gray-300 transition-all h-8 px-3 rounded-lg"
        >
          <Building2 className="h-3.5 w-3.5 text-gray-500" />
          Find Companies
        </Button>

        {/* Find People */}
        <Button
          variant="outline"
          size="sm"
          className="hidden md:inline-flex items-center gap-2 border-gray-200 bg-white text-gray-700 text-[13px] font-medium shadow-none hover:bg-gray-50 hover:border-gray-300 transition-all h-8 px-3 rounded-lg"
        >
          <Users className="h-3.5 w-3.5 text-gray-500" />
          Find People
        </Button>

        {/* + New Grid (primary) */}
        <Button
          size="sm"
          className="inline-flex items-center gap-1.5 bg-gray-900 text-white text-[13px] font-semibold hover:bg-gray-800 active:bg-gray-950 transition-all h-8 px-3 rounded-lg shadow-sm"
        >
          <Plus className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">New Grid</span>
        </Button>

        {/* Notification bell */}
        <button className="relative flex h-8 w-8 items-center justify-center rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-blue-500" />
        </button>

        {/* User avatar */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen((p) => !p)}
            className="flex items-center gap-2 rounded-lg p-1 hover:bg-gray-50 transition-colors"
          >
            <Avatar className="h-7 w-7 ring-2 ring-white shadow-sm">
              <AvatarImage src="" alt="User Avatar" />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-violet-600 text-white text-[11px] font-bold">
                SB
              </AvatarFallback>
            </Avatar>
            <ChevronDown
              className={cn(
                "hidden sm:block h-3.5 w-3.5 text-gray-400 transition-transform duration-200",
                isProfileOpen && "rotate-180"
              )}
            />
          </button>

          {/* Profile dropdown */}
          {isProfileOpen && (
            <div className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-gray-100 bg-white shadow-lg shadow-gray-200/80 ring-1 ring-black/5 py-1.5 z-50">
              <div className="px-3 py-2 border-b border-gray-100 mb-1">
                <p className="text-[13px] font-semibold text-gray-900">Sambhav Sharma</p>
                <p className="text-[11px] text-gray-500 truncate">sambhav@bitscale.ai</p>
              </div>
              {[
                { label: "Profile settings", href: "/settings" },
                { label: "Billing & plans", href: "/billing" },
                { label: "Team management", href: "/team" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsProfileOpen(false)}
                  className="block px-3 py-2 text-[13px] text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <div className="border-t border-gray-100 mt-1 pt-1">
                <button className="w-full text-left px-3 py-2 text-[13px] text-red-500 hover:bg-red-50 transition-colors">
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
