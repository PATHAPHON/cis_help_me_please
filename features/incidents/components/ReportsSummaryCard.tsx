"use client";

import { useRouter } from "next/navigation";
import MaterialIcon from "@/shared/components/icons/MaterialIcon";
import { categoryMeta } from "@/features/incidents/utils/categoryMeta";
import type { Incident } from "@/shared/types";

interface ReportsSummaryCardProps {
  reports: Incident[];
}

export default function ReportsSummaryCard({ reports }: ReportsSummaryCardProps) {
  const router = useRouter();

  // Find the latest report based on createdAt timestamp
  const latestReport = reports.length > 0
    ? [...reports].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0]
    : null;

  if (!latestReport) {
    return (
      <div
        className="flex items-center gap-3 rounded-3xl px-4 py-3"
        style={{ backgroundColor: "var(--color-card-yellow)" }}
      >
        {/* Default icon */}
        <span
          className="flex items-center justify-center rounded-full shrink-0"
          style={{ width: 44, height: 44, backgroundColor: "rgba(255, 255, 255, 0.7)" }}
        >
          <MaterialIcon
            name="assignment"
            size={22}
            style={{ color: "var(--color-on-surface-low)" }}
          />
        </span>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-on-surface truncate">รายงานเหตุของคุณ</p>
          <p className="text-xs" style={{ color: "var(--color-on-surface-mid)" }}>
            ยังไม่มีประวัติการแจ้งเหตุของคุณ
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => router.push("/report/new")}
            className="flex items-center justify-center w-10 h-10 rounded-full transition-all active:scale-90"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
            aria-label="แจ้งเหตุ"
          >
            <MaterialIcon
              name="add"
              size={20}
              style={{ color: "var(--color-on-surface)" }}
            />
          </button>
          <button
            onClick={() => router.push("/my-reports")}
            className="flex items-center justify-center w-10 h-10 rounded-full transition-all active:scale-90"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
            aria-label="รายการทั้งหมด"
          >
            <MaterialIcon
              name="list"
              size={20}
              style={{ color: "var(--color-on-surface)" }}
            />
          </button>
        </div>
      </div>
    );
  }

  const catM = categoryMeta[latestReport.category];

  return (
    <div
      className="flex items-center gap-3 rounded-3xl px-4 py-3"
      style={{ backgroundColor: "var(--color-card-yellow)" }}
    >
      {/* Category icon */}
      <span
        className="flex items-center justify-center rounded-full shrink-0"
        style={{ width: 44, height: 44, backgroundColor: "rgba(255, 255, 255, 0.7)" }}
      >
        <MaterialIcon
          name={catM.icon}
          filled
          size={22}
          style={{ color: catM.color }}
        />
      </span>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-on-surface truncate">
          รายงานล่าสุด: {catM.label}
        </p>
        <p className="text-xs truncate" style={{ color: "var(--color-on-surface-mid)" }}>
          {latestReport.description}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => router.push(`/report/${latestReport.id}`)}
          className="flex items-center justify-center w-10 h-10 rounded-full transition-all active:scale-90"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
          aria-label="ดูรายละเอียด"
        >
          <MaterialIcon
            name="visibility"
            size={20}
            style={{ color: "var(--color-on-surface)" }}
          />
        </button>
        <button
          onClick={() => router.push("/my-reports")}
          className="flex items-center justify-center w-10 h-10 rounded-full transition-all active:scale-90"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
          aria-label="รายการทั้งหมด"
        >
          <MaterialIcon
            name="list"
            size={20}
            style={{ color: "var(--color-on-surface)" }}
          />
        </button>
      </div>
    </div>
  );
}
