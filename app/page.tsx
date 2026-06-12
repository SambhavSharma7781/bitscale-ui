import { Metadata } from "next";
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

export default function HomePage() {
  return <HomePageClient stats={stats} />;
}
