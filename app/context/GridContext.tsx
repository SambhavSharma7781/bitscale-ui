"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface GridRow {
  id: number;
  name: string;
  icon: string;
  iconBg?: string;
  iconColor?: string;
  isWorkbook?: boolean;
  starred: boolean;
  editedBy: { name: string; initials: string; color: string };
  lastEdited: string;
  status: string; // "completed" | "running" | "draft"
  rows: number;
}

const initialGrids: GridRow[] = [
  {
    id: 1,
    name: "Workbook - Testing design Ideas for grid and workbook",
    icon: "Workbook",
    isWorkbook: true,
    starred: false,
    editedBy: { name: "Sam Taylor", initials: "ST", color: "bg-blue-500" },
    lastEdited: "06 Aug, 2025",
    status: "completed",
    rows: 0,
  },
  {
    id: 2,
    name: "LinkedIn",
    icon: "LI",
    iconBg: "bg-blue-600 dark:bg-blue-600",
    iconColor: "text-white",
    starred: false,
    editedBy: { name: "Chris Parker", initials: "CP", color: "bg-emerald-500" },
    lastEdited: "06 Aug, 2025",
    status: "completed",
    rows: 842,
  },
  {
    id: 3,
    name: "Sales nav",
    icon: "SN",
    iconBg: "bg-violet-600 dark:bg-violet-600",
    iconColor: "text-white",
    starred: false,
    editedBy: { name: "Jone Doe", initials: "JD", color: "bg-orange-400" },
    lastEdited: "06 Aug, 2025",
    status: "running",
    rows: 314,
  },
  {
    id: 4,
    name: "find company",
    icon: "Building2",
    iconBg: "bg-emerald-500 dark:bg-emerald-500",
    iconColor: "text-white",
    starred: false,
    editedBy: { name: "Alex Morgan", initials: "AM", color: "bg-purple-500" },
    lastEdited: "06 Aug, 2025",
    status: "completed",
    rows: 127,
  },
  {
    id: 5,
    name: "import csv",
    icon: "FileText",
    iconBg: "bg-gray-700 dark:bg-gray-600",
    iconColor: "text-white",
    starred: false,
    editedBy: { name: "Drew Wilson", initials: "DW", color: "bg-red-500" },
    lastEdited: "06 Aug, 2025",
    status: "draft",
    rows: 0,
  },
  {
    id: 6,
    name: "Find people",
    icon: "Users",
    iconBg: "bg-purple-500 dark:bg-purple-500",
    iconColor: "text-white",
    starred: false,
    editedBy: { name: "Jone Doe", initials: "JD", color: "bg-orange-400" },
    lastEdited: "06 Aug, 2025",
    status: "completed",
    rows: 2103,
  },
  {
    id: 7,
    name: "Google maps",
    icon: "MapPin",
    iconBg: "bg-green-500 dark:bg-green-500",
    iconColor: "text-white",
    starred: false,
    editedBy: { name: "Jone Doe", initials: "JD", color: "bg-orange-400" },
    lastEdited: "06 Aug, 2025",
    status: "completed",
    rows: 45,
  },
  {
    id: 8,
    name: "google search results",
    icon: "Google",
    iconBg: "bg-blue-400 dark:bg-blue-400",
    iconColor: "text-white",
    starred: false,
    editedBy: { name: "Jone Doe", initials: "JD", color: "bg-orange-400" },
    lastEdited: "06 Aug, 2025",
    status: "completed",
    rows: 88,
  },
  {
    id: 9,
    name: "factors",
    icon: "Zap",
    iconBg: "bg-rose-500 dark:bg-rose-500",
    iconColor: "text-white",
    starred: false,
    editedBy: { name: "Jone Doe", initials: "JD", color: "bg-orange-400" },
    lastEdited: "06 Aug, 2025",
    status: "completed",
    rows: 12,
  },
  {
    id: 10,
    name: "Hubspot List - 10 (05 Aug 25)",
    icon: "Hubspot",
    iconBg: "bg-orange-500 dark:bg-orange-500",
    iconColor: "text-white",
    starred: false,
    editedBy: { name: "Jone Doe", initials: "JD", color: "bg-orange-400" },
    lastEdited: "06 Aug, 2025",
    status: "completed",
    rows: 156,
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
