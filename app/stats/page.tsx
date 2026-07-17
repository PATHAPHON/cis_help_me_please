"use client";

import AppShell from "@/shared/components/AppShell";
import MaterialIcon from "@/shared/components/icons/MaterialIcon";
import PastelStatCard from "@/features/incidents/components/PastelStatCard";
import { useIncidents } from "@/features/incidents/hooks/useIncidents";
import { categoryMeta } from "@/features/incidents/utils/categoryMeta";
import { statusMeta } from "@/features/incidents/utils/statusMeta";
import type { IncidentCategory } from "@/shared/types";

const CATEGORIES: IncidentCategory[] = [
  "accident", "sickness", "fire", "violence", "fight", "other",
];

export default function StatsPage() {
  const { incidents } = useIncidents();

  const total = incidents.length;
  const pending = incidents.filter((i) => i.status === "pending").length;
  const processing = incidents.filter((i) => i.status === "processing").length;
  const resolved = incidents.filter((i) => i.status === "resolved").length;

  // Avg response time
  const resolvedList = incidents.filter((i) => i.status === "resolved");
  const avgMs =
    resolvedList.length > 0
      ? resolvedList.reduce(
          (sum, i) =>
            sum + (new Date(i.updatedAt).getTime() - new Date(i.createdAt).getTime()),
          0
        ) / resolvedList.length
      : 0;
  const avgMins = Math.floor(avgMs / 60000);

  // Category breakdown
  const categoryCounts = CATEGORIES.map((cat) => ({
    cat,
    count: incidents.filter((i) => i.category === cat).length,
  }));
  const maxCount = Math.max(...categoryCounts.map((c) => c.count), 1);

  // Resolved rate
  const resolvedRate = total > 0 ? Math.round((resolved / total) * 100) : 0;

  return (
    <AppShell>
      <div className="flex flex-col gap-4 px-4 pt-6 pb-4 fade-up mx-auto w-full max-w-[480px]">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-xs" style={{ color: "var(--color-on-surface-low)" }}>
              ภาพรวมระบบ
            </p>
            <p className="text-base font-bold text-on-surface truncate">
              สถิติเหตุการณ์
            </p>
          </div>

          <span
            className="flex items-center justify-center w-10 h-10 rounded-full shrink-0"
            style={{
              backgroundColor: "var(--color-primary-light)",
              color: "var(--color-primary)",
              boxShadow: "0 1px 3px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.05)",
            }}
          >
            <MaterialIcon name="bar_chart" filled size={20} />
          </span>
        </div>

        {/* Hero card — total incidents + resolved rate */}
        <div
          className="relative rounded-3xl p-5 overflow-hidden"
          style={{ backgroundColor: "var(--color-card-green)" }}
        >
          <div className="flex gap-4">
            <div className="flex-1 flex flex-col justify-between min-h-[160px]">
              <span
                className="flex items-center justify-center w-11 h-11 rounded-full"
                style={{ backgroundColor: "rgba(255,255,255,0.7)" }}
              >
                <MaterialIcon
                  name="insights"
                  size={22}
                  style={{ color: "var(--color-on-surface)" }}
                />
              </span>

              <div>
                <p
                  className="text-xs font-medium mb-1"
                  style={{ color: "var(--color-on-surface-mid)" }}
                >
                  เหตุการณ์ทั้งหมด
                </p>
                <h2 className="text-3xl font-bold text-on-surface leading-none mb-2">
                  {total}
                  <span
                    className="text-sm font-normal ml-1"
                    style={{ color: "var(--color-on-surface-low)" }}
                  >
                    รายการ
                  </span>
                </h2>
                <p
                  className="text-xs"
                  style={{ color: "var(--color-on-surface-mid)" }}
                >
                  แก้ไขสำเร็จ {resolvedRate}%
                </p>
              </div>
            </div>

            {/* Circular progress */}
            <div
              className="flex items-center justify-center rounded-2xl shrink-0"
              style={{
                width: 120,
                height: 160,
                backgroundColor: "rgba(255,255,255,0.85)",
              }}
            >
              <div className="relative flex items-center justify-center" style={{ width: 100, height: 100 }}>
                <svg width="100" height="100" viewBox="0 0 100 100" style={{ transform: "rotate(-90deg)" }}>
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="rgba(0,0,0,0.08)"
                    strokeWidth="10"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="var(--color-resolved)"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={`${(resolvedRate / 100) * 264} 264`}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span
                    className="text-2xl font-bold leading-none"
                    style={{ color: "var(--color-on-surface)" }}
                  >
                    {resolvedRate}
                  </span>
                  <span
                    className="text-[10px]"
                    style={{ color: "var(--color-on-surface-low)" }}
                  >
                    %
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pastel stat cards */}
        <div className="grid grid-cols-2 gap-3">
          <PastelStatCard
            variant="yellow"
            label="รอดำเนินการ"
            value={pending}
            unit="รายการ"
            icon="schedule"
          />
          <PastelStatCard
            variant="blue"
            label="กำลังดำเนินการ"
            value={processing}
            unit="รายการ"
            icon="directions_run"
          />
        </div>

        {/* Avg response time — pastel purple card */}
        <div
          className="rounded-3xl p-5"
          style={{ backgroundColor: "var(--color-card-purple)" }}
        >
          <div className="flex items-center gap-4">
            <span
              className="flex items-center justify-center rounded-2xl shrink-0"
              style={{
                width: 56,
                height: 56,
                backgroundColor: "rgba(255,255,255,0.85)",
              }}
            >
              <MaterialIcon
                name="timer"
                filled
                size={32}
                style={{ color: "var(--color-violence)" }}
              />
            </span>
            <div className="flex-1 min-w-0">
              <p
                className="text-xs font-medium mb-1"
                style={{ color: "var(--color-on-surface-mid)" }}
              >
                เวลาตอบสนองเฉลี่ย
              </p>
              <p
                className="text-3xl font-bold leading-none"
                style={{ color: "var(--color-on-surface)" }}
              >
                {avgMins > 0 ? avgMins : "—"}
                {avgMins > 0 && (
                  <span
                    className="text-sm font-normal ml-1"
                    style={{ color: "var(--color-on-surface-low)" }}
                  >
                    นาที
                  </span>
                )}
              </p>
              <p
                className="text-xs mt-1"
                style={{ color: "var(--color-on-surface-mid)" }}
              >
                จาก {resolvedList.length} เหตุการณ์ที่เสร็จสิ้น
              </p>
            </div>
          </div>
        </div>

        {/* Category breakdown — white card */}
        <div
          className="rounded-3xl bg-surface p-5"
          style={{
            boxShadow: "0 1px 3px rgba(0,0,0,.06), 0 1px 2px rgba(0,0,0,.04)",
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <MaterialIcon
              name="category"
              size={18}
              style={{ color: "var(--color-on-surface-mid)" }}
            />
            <p
              className="text-sm font-semibold"
              style={{ color: "var(--color-on-surface)" }}
            >
              เหตุการณ์แยกตามประเภท
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {categoryCounts.map(({ cat, count }) => {
              const meta = categoryMeta[cat];
              const pct = maxCount > 0 ? (count / maxCount) * 100 : 0;
              return (
                <div key={cat} className="flex items-center gap-3">
                  <span
                    className="flex items-center justify-center rounded-2xl shrink-0"
                    style={{ width: 36, height: 36, backgroundColor: meta.bg }}
                  >
                    <MaterialIcon
                      name={meta.icon}
                      filled
                      size={18}
                      style={{ color: meta.color }}
                    />
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className="text-xs font-medium"
                        style={{ color: "var(--color-on-surface-mid)" }}
                      >
                        {meta.label}
                      </span>
                      <span
                        className="text-xs font-bold"
                        style={{ color: meta.color }}
                      >
                        {count}
                      </span>
                    </div>
                    <div
                      className="w-full rounded-full overflow-hidden"
                      style={{ height: 8, backgroundColor: "var(--color-surface-variant)" }}
                    >
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${pct}%`,
                          backgroundColor: meta.color,
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Status breakdown — white card */}
        <div
          className="rounded-3xl bg-surface p-5"
          style={{
            boxShadow: "0 1px 3px rgba(0,0,0,.06), 0 1px 2px rgba(0,0,0,.04)",
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <MaterialIcon
              name="donut_large"
              size={18}
              style={{ color: "var(--color-on-surface-mid)" }}
            />
            <p
              className="text-sm font-semibold"
              style={{ color: "var(--color-on-surface)" }}
            >
              สัดส่วนตามสถานะ
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {(["pending", "processing", "resolved"] as const).map((s) => {
              const meta = statusMeta[s];
              const count = incidents.filter((i) => i.status === s).length;
              const pct = total > 0 ? Math.round((count / total) * 100) : 0;
              return (
                <div key={s} className="flex items-center gap-3">
                  <span
                    className="flex items-center justify-center rounded-2xl shrink-0"
                    style={{
                      width: 36,
                      height: 36,
                      backgroundColor: "rgba(0,0,0,0.04)",
                    }}
                  >
                    <MaterialIcon
                      name={meta.icon}
                      filled
                      size={18}
                      style={{ color: meta.color }}
                    />
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className="text-xs font-medium"
                        style={{ color: "var(--color-on-surface-mid)" }}
                      >
                        {meta.label}
                      </span>
                      <span
                        className="text-xs"
                        style={{ color: "var(--color-on-surface-faint)" }}
                      >
                        {count} ({pct}%)
                      </span>
                    </div>
                    <div
                      className="w-full rounded-full overflow-hidden"
                      style={{ height: 8, backgroundColor: "var(--color-surface-variant)" }}
                    >
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${pct}%`, backgroundColor: meta.color }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
