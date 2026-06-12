import { Metadata } from "next";
import {
  ArrowUpRight,
  Building2,
  Users,
  Zap,
  TrendingUp,
  Grid3X3,
  Clock,
  CheckCircle2,
  CircleDashed,
  BarChart3,
} from "lucide-react";
import { QuickActionsSection } from "@/app/components/QuickActionsSection";
import { HomePageClient } from "@/app/components/HomePageClient";

export const metadata: Metadata = {
  title: "Home — Bitscale Clone",
  description: "Your Bitscale dashboard home. View recent grids, metrics, and activity.",
};

export const stats = [
  {
    label: "Total Grids",
    value: 24,
    displayValue: "24",
    change: "+3 this week",
    icon: "Grid3X3",
    color: "blue",
  },
  {
    label: "Companies Found",
    value: 12847,
    displayValue: "12,847",
    change: "+1,204 today",
    icon: "Building2",
    color: "violet",
  },
  {
    label: "People Enriched",
    value: 8391,
    displayValue: "8,391",
    change: "+489 today",
    icon: "Users",
    color: "emerald",
  },
  {
    label: "Automations Run",
    value: 156,
    displayValue: "156",
    change: "Last 30 days",
    icon: "Zap",
    color: "amber",
  },
];

export const recentGrids = [
  {
    id: 1,
    name: "Series B SaaS Companies — EU",
    status: "completed",
    rows: 842,
    updatedAt: "2 hours ago",
  },
  {
    id: 2,
    name: "VP Engineering Outreach — SF Bay",
    status: "running",
    rows: 314,
    updatedAt: "Running now",
  },
  {
    id: 3,
    name: "YC W24 Founders",
    status: "completed",
    rows: 127,
    updatedAt: "Yesterday",
  },
  {
    id: 4,
    name: "Healthcare AI — Series A",
    status: "draft",
    rows: 0,
    updatedAt: "3 days ago",
  },
  {
    id: 5,
    name: "Fintech CFOs — APAC",
    status: "completed",
    rows: 2103,
    updatedAt: "4 days ago",
  },
];

export default function HomePage() {
  return <HomePageClient stats={stats} recentGrids={recentGrids} />;
}
