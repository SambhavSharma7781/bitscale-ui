"use client";

import Image from "next/image";
import { GridRow } from "@/app/context/GridContext";

// Map: row.icon key → public SVG path
const SVG_MAP: Record<string, string> = {
  LI:        "/Linkedin.svg",
  SN:        "/salesNav.svg",
  Building2: "/findCompany.svg",
  FileText:  "/importCSV.svg",
  Users:     "/findPeople.svg",
  MapPin:    "/googleMaps.svg",
  Google:    "/googleSearch.svg",
  Zap:       "/factors.svg",
  Hubspot:   "/hubSpot.svg",
};

const SIZE = 32;

export function GridIcon({ row }: { row: GridRow }) {
  // ── Workbook: 3 overlapping icons using their native SVG styling ──────────────
  // The workbook SVGs have their own white card bg + shadow baked in (29×29 viewBox)
  // so we render them at native size WITHOUT overflow-hidden or clipping
  if (row.isWorkbook) {
    return (
      <div className="flex items-center shrink-0">
        {["/workbook1.svg", "/workbook2.svg", "/workbook3.svg"].map((src, i) => (
          <div
            key={src}
            className="shrink-0"
            style={{ zIndex: i + 1, marginLeft: i === 0 ? 0 : -12 }}
          >
            <Image
              src={src}
              alt=""
              width={29}
              height={29}
              className="block"
              style={{ display: "block" }}
            />
          </div>
        ))}
      </div>
    );
  }

  // ── Known SVG asset — fill container fully ────────────────────────────────────
  const svgSrc = SVG_MAP[row.icon];
  if (svgSrc) {
    return (
      <div
        className="shrink-0 rounded-[8px] overflow-hidden"
        style={{ width: SIZE, height: SIZE }}
      >
        <Image
          src={svgSrc}
          alt={row.icon}
          width={SIZE}
          height={SIZE}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  // ── Fallback: colored badge with text ─────────────────────────────────────────
  return (
    <div
      className={`shrink-0 rounded-[8px] ${row.iconBg ?? "bg-gray-200"} flex items-center justify-center text-[11px] font-bold ${row.iconColor ?? "text-white"}`}
      style={{ width: SIZE, height: SIZE }}
    >
      {row.icon}
    </div>
  );
}
