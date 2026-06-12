import { Building2, FileText, Users, MapPin, Zap } from "lucide-react";
import { GridRow } from "@/app/context/GridContext";

export function GridIcon({ row }: { row: GridRow }) {
  if (row.isWorkbook) {
    return (
      <div className="flex items-center -space-x-1.5 shrink-0">
        <div className="h-5 w-5 rounded-full border-2 border-white dark:border-gray-900 bg-red-400 z-10" />
        <div className="h-5 w-5 rounded-full border-2 border-white dark:border-gray-900 bg-blue-500 z-20" />
        <div className="h-5 w-5 rounded-full border-2 border-white dark:border-gray-900 bg-green-500 z-30" />
      </div>
    );
  }

  if (row.icon === "Google") {
    return (
      <div className={`h-7 w-7 rounded-md ${row.iconBg} flex items-center justify-center shrink-0 border border-gray-200 dark:border-gray-700`}>
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-blue-500 dark:text-blue-400">
          <path
            fill="currentColor"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="currentColor"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="currentColor"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="currentColor"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
      </div>
    );
  }

  if (row.icon === "Hubspot") {
    return (
      <div className={`h-7 w-7 rounded-md ${row.iconBg} flex items-center justify-center shrink-0`}>
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-white">
          <path
            fill="currentColor"
            d="M11.996 0c6.626 0 11.996 5.37 11.996 11.996 0 6.627-5.37 11.996-11.996 11.996C5.37 23.992 0 18.623 0 11.996 0 5.37 5.37 0 11.996 0zM19.34 9.112c-.752 0-1.361.61-1.361 1.36 0 .363.143.693.376.94l-2.618 3.522a1.35 1.35 0 01-.84.28 1.35 1.35 0 01-1.282-.924l-1.954-1.368a1.357 1.357 0 01-.137-.156l-3.328-1.574A1.36 1.36 0 117.9 9.112c.751 0 1.36.61 1.36 1.36 0 .198-.043.385-.12.554l3.364 1.59a1.348 1.348 0 01.32.062l1.93 1.35a1.353 1.353 0 011.088-.535c.29 0 .556.092.776.248l2.61-3.511a1.363 1.363 0 01-.248-.778c0-.75.61-1.36 1.36-1.36.75 0 1.36.61 1.36 1.36z"
          />
        </svg>
      </div>
    );
  }

  const LucideIcons: any = { Building2, FileText, Users, MapPin, Zap };
  if (LucideIcons[row.icon]) {
    const IconComponent = LucideIcons[row.icon];
    return (
      <div className={`h-7 w-7 rounded-md ${row.iconBg} flex items-center justify-center ${row.iconColor} shrink-0`}>
        <IconComponent className="h-3.5 w-3.5" />
      </div>
    );
  }

  return (
    <div className={`h-7 w-7 rounded-md ${row.iconBg} flex items-center justify-center text-[10px] font-bold ${row.iconColor} shrink-0`}>
      {row.icon}
    </div>
  );
}
