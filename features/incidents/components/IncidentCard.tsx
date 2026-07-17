"use client";

import { useRouter } from "next/navigation";
import MaterialIcon from "@/shared/components/icons/MaterialIcon";
import { categoryMeta } from "@/features/incidents/utils/categoryMeta";
import { statusMeta } from "@/features/incidents/utils/statusMeta";
import { formatRelativeTime } from "@/shared/utils/formatDate";
import type { Incident } from "@/shared/types";

interface IncidentCardProps {
  incident: Incident;
  detailHref?: string;
  showReporter?: boolean;
}

export default function IncidentCard({
  incident,
  detailHref,
  showReporter = false,
}: IncidentCardProps) {
  const router = useRouter();
  const catM = categoryMeta[incident.category];
  const statM = statusMeta[incident.status];
  const href = detailHref ?? `/incidents/${incident.id}`;

  return (
    <button
      onClick={() => router.push(href)}
      className="text-left w-full rounded-3xl overflow-hidden transition-all active:scale-[0.98]"
      style={{
        backgroundColor: "var(--color-surface)",
        boxShadow: "var(--shadow-sm)",
        border: `3px solid ${catM.bg}`,
      }}
    >
      {/* ── White content area ───────────────────────────────────── */}
      <div className="p-5 rounded-t-2xl" style={{ backgroundColor: "var(--color-surface)" }}>
        {/* Brand row — category icon + label (like company logo) */}
        <div className="flex items-center gap-2 mb-3">
          <span
            className="flex items-center justify-center rounded-lg shrink-0"
            style={{ width: 28, height: 28, backgroundColor: catM.bg }}
          >
            <MaterialIcon name={catM.icon} filled size={18} style={{ color: catM.color }} />
          </span>
          <span
            className="text-sm font-bold tracking-tight"
            style={{ color: catM.color }}
          >
            {catM.label}
          </span>
        </div>

        {/* Big title — description */}
        <p
          className="text-lg font-bold leading-snug line-clamp-2 mb-1"
          style={{ color: "var(--color-on-surface)" }}
        >
          {incident.description}
        </p>

        {/* Sub — location (like salary line) */}
        <p
          className="text-sm mb-3 truncate"
          style={{ color: "var(--color-on-surface-low)" }}
        >
          📍 {incident.locationName}
        </p>

        {/* Tag pills row */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Status pill */}
          <span
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider"
            style={{
              border: `1.5px solid ${statM.color}`,
              color: statM.color,
              backgroundColor: "transparent",
            }}
          >
            {statM.label}
          </span>

          {/* Reporter pill (staff/admin view) */}
          {showReporter && (
            <span
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider"
              style={{
                border: "1.5px solid var(--color-outline-strong)",
                color: "var(--color-on-surface-mid)",
              }}
            >
              {incident.reporterName.split(" ")[0]}
            </span>
          )}

          {/* GPS pill if available */}
          {incident.latitude && (
            <span
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider"
              style={{
                border: "1.5px solid var(--color-outline-strong)",
                color: "var(--color-on-surface-mid)",
              }}
            >
              GPS
            </span>
          )}
        </div>
      </div>

      {/* ── Footer strip (category-colored, like "POSTED X DAY AGO") ─── */}
      <div
        className="px-5 py-3 rounded-b-2xl"
        style={{
          backgroundColor: catM.bg,
        }}
      >
        <p
          className="text-[11px] font-bold uppercase tracking-widest text-center"
          style={{ color: catM.color, opacity: 0.85 }}
        >
          แจ้งเมื่อ {formatRelativeTime(incident.createdAt)}
        </p>
      </div>
    </button>
  );
}
