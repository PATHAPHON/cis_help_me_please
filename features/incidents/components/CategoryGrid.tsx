"use client";

import MaterialIcon from "@/shared/components/icons/MaterialIcon";
import { categoryMeta } from "@/features/incidents/utils/categoryMeta";
import type { IncidentCategory } from "@/shared/types";

const CATEGORIES: IncidentCategory[] = [
  "accident", "sickness", "fire", "violence", "fight", "other",
];

interface CategoryGridProps {
  selected: IncidentCategory | "";
  onSelect: (cat: IncidentCategory) => void;
  /** columns — 2 (default, for form) or 3 (for home shortcuts) */
  cols?: 2 | 3;
}

export default function CategoryGrid({
  selected,
  onSelect,
  cols = 2,
}: CategoryGridProps) {
  return (
    <div className={`grid gap-3 ${cols === 3 ? "grid-cols-3" : "grid-cols-2"}`}>
      {CATEGORIES.map((cat) => {
        const meta = categoryMeta[cat];
        const isSelected = selected === cat;

        return (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className="flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all active:scale-[0.97]"
            style={{
              borderColor: isSelected ? meta.color : "var(--color-outline)",
              backgroundColor: isSelected ? meta.bg : "var(--color-surface)",
            }}
          >
            <span
              className="flex items-center justify-center rounded-2xl"
              style={{
                width: cols === 3 ? 40 : 52,
                height: cols === 3 ? 40 : 52,
                backgroundColor: isSelected ? meta.color : meta.bg,
              }}
            >
              <MaterialIcon
                name={meta.icon}
                filled
                size={cols === 3 ? 22 : 28}
                style={{ color: isSelected ? "white" : meta.color }}
              />
            </span>
            <span
              className="text-sm font-medium text-center leading-tight"
              style={{
                color: isSelected ? meta.color : "var(--color-on-surface-mid)",
              }}
            >
              {meta.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
