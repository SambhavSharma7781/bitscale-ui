"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface GridRow {
  id: number;
  name: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  starred: boolean;
  editedBy: { name: string; initials: string; color: string };
  lastEdited: string;
  status: string; // "completed" | "running" | "draft"
  rows: number;
}

const initialGrids: GridRow[] = [
  {
    id: 1,
    name: "Series B SaaS Companies — EU",
    icon: "LI",
    iconBg: "bg-blue-600 dark:bg-blue-600",
    iconColor: "text-white",
    starred: false,
    editedBy: { name: "Chris Parker", initials: "CP", color: "bg-emerald-500" },
    lastEdited: "2 hours ago",
    status: "completed",
    rows: 842,
  },
  {
    id: 2,
    name: "VP Engineering Outreach — SF Bay",
    icon: "SN",
    iconBg: "bg-violet-600 dark:bg-violet-600",
    iconColor: "text-white",
    starred: false,
    editedBy: { name: "Jone Doe", initials: "JD", color: "bg-orange-400" },
    lastEdited: "Running now",
    status: "running",
    rows: 314,
  },
  {
    id: 3,
    name: "YC W24 Founders",
    icon: "FC",
    iconBg: "bg-emerald-500 dark:bg-emerald-500",
    iconColor: "text-white",
    starred: true,
    editedBy: { name: "Alex Morgan", initials: "AM", color: "bg-purple-500" },
    lastEdited: "Yesterday",
    status: "completed",
    rows: 127,
  },
  {
    id: 4,
    name: "Healthcare AI — Series A",
    icon: "IC",
    iconBg: "bg-gray-700 dark:bg-gray-600",
    iconColor: "text-white",
    starred: false,
    editedBy: { name: "Drew Wilson", initials: "DW", color: "bg-red-500" },
    lastEdited: "3 days ago",
    status: "draft",
    rows: 0,
  },
  {
    id: 5,
    name: "Fintech CFOs — APAC",
    icon: "FP",
    iconBg: "bg-blue-500 dark:bg-blue-500",
    iconColor: "text-white",
    starred: false,
    editedBy: { name: "Jone Doe", initials: "JD", color: "bg-orange-400" },
    lastEdited: "4 days ago",
    status: "completed",
    rows: 2103,
  },
];

interface GridContextValue {
  grids: GridRow[];
  addGrid: (grid: GridRow) => void;
  deleteGrid: (id: number) => void;
  toggleStar: (id: number) => void;
}

const GridContext = createContext<GridContextValue | null>(null);

export function GridProvider({ children }: { children: ReactNode }) {
  const [grids, setGrids] = useState<GridRow[]>(initialGrids);

  const addGrid = (grid: GridRow) => {
    setGrids((prev) => [grid, ...prev]);
  };

  const deleteGrid = (id: number) => {
    setGrids((prev) => prev.filter((g) => g.id !== id));
  };

  const toggleStar = (id: number) => {
    setGrids((prev) =>
      prev.map((g) => (g.id === id ? { ...g, starred: !g.starred } : g))
    );
  };

  return (
    <GridContext.Provider value={{ grids, addGrid, deleteGrid, toggleStar }}>
      {children}
    </GridContext.Provider>
  );
}

export const useGrids = () => {
  const ctx = useContext(GridContext);
  if (!ctx) throw new Error("useGrids must be used within GridProvider");
  return ctx;
};
