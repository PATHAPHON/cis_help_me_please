"use client";

import MaterialIcon from "@/shared/components/icons/MaterialIcon";
import { categoryMeta } from "@/features/incidents/utils/categoryMeta";
import { formatRelativeTime } from "@/shared/utils/formatDate";
import type { Incident } from "@/shared/types";

interface HeroSummaryCardProps {
  latestIncident: Incident | null;
  onDetailClick: () => void;
}

export default function HeroSummaryCard({
  latestIncident,
  onDetailClick,
}: HeroSummaryCardProps) {
  const catM = latestIncident ? categoryMeta[latestIncident.category] : null;

  return (
    <div
      className="relative rounded-3xl p-5 overflow-hidden"
      style={{ backgroundColor: "var(--color-card-green)" }}
    >
      <div className="flex gap-4">
        {/* Left content */}
        <div className="flex-1 flex flex-col justify-between min-h-[180px]">
          {/* Icon badge */}
          <span
            className="flex items-center justify-center w-11 h-11 rounded-full"
            style={{ backgroundColor: "rgba(255,255,255,0.7)" }}
          >
            <MaterialIcon name="monitor_heart" size={22} style={{ color: "var(--color-on-surface)" }} />
          </span>

          {/* Text */}
          <div>
            <h2 className="text-xl font-bold text-on-surface mb-1">สรุปเหตุ</h2>
            {latestIncident ? (
              <p className="text-xs leading-relaxed" style={{ color: "var(--color-on-surface-mid)" }}>
                เหตุล่าสุด: {catM?.label}
                <br />
                {formatRelativeTime(latestIncident.createdAt)}
              </p>
            ) : (
              <p className="text-xs" style={{ color: "var(--color-on-surface-mid)" }}>
                ยังไม่มีเหตุใหม่
              </p>
            )}
          </div>

          {/* Button */}
          <button
            onClick={onDetailClick}
            className="self-start mt-3 px-4 py-2 rounded-full border text-xs font-medium transition-all active:scale-95"
            style={{
              borderColor: "var(--color-on-surface)",
              color: "var(--color-on-surface)",
              backgroundColor: "transparent",
            }}
          >
            ดูรายละเอียด
          </button>
        </div>

        {/* Right — category icon in white card */}
        <div
          className="flex items-center justify-center rounded-2xl shrink-0"
          style={{
            width: 140,
            height: 180,
            backgroundColor: "rgba(255,255,255,0.85)",
          }}
        >
          {catM ? (
            <MaterialIcon
              name={catM.icon}
              filled
              size={72}
              style={{ color: catM.color }}
            />
          ) : (
            <MaterialIcon
              name="check_circle"
              filled
              size={72}
              style={{ color: "var(--color-success)" }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
