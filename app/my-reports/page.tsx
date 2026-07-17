"use client";

import { useState } from "react";
import AppShell from "@/shared/components/AppShell";
import { Chip, EmptyState } from "@/shared/components/ui";
import { IncidentCard } from "@/features/incidents";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useIncidents } from "@/features/incidents/hooks/useIncidents";
import type { IncidentStatus } from "@/shared/types";

const FILTERS: { label: string; value: IncidentStatus | "all" }[] = [
  { label: "ทั้งหมด", value: "all" },
  { label: "รอดำเนินการ", value: "pending" },
  { label: "กำลังดำเนินการ", value: "processing" },
  { label: "เสร็จสิ้น", value: "resolved" },
];

export default function MyReportsPage() {
  const { user } = useAuth();
  const { getByReporter } = useIncidents();
  const [filter, setFilter] = useState<IncidentStatus | "all">("all");

  const allReports = user ? getByReporter(user.id) : [];
  const filtered =
    filter === "all" ? allReports : allReports.filter((i) => i.status === filter);

  return (
    <AppShell>
      <div className="flex flex-col fade-up">
        {/* Filter chips */}
        <div
          className="flex gap-2 px-4 py-3 overflow-x-auto scrollbar-hide"
        >
          {FILTERS.map((f) => (
            <Chip
              key={f.value}
              label={f.label}
              selected={filter === f.value}
              onClick={() => setFilter(f.value)}
            />
          ))}
        </div>

        {/* Count */}
        <div className="px-4 py-2">
          <p className="text-xs" style={{ color: "var(--color-on-surface-faint)" }}>
            {filtered.length} รายการ
          </p>
        </div>

        {/* Incident cards */}
        <div className="flex flex-col gap-4 px-4 pb-4">
          {filtered.length === 0 ? (
            <EmptyState
              icon="report_off"
              title="ไม่มีรายการ"
              description="ยังไม่มีรายการแจ้งเหตุในหมวดนี้"
            />
          ) : (
            filtered.map((inc) => (
              <IncidentCard key={inc.id} incident={inc} detailHref={`/report/${inc.id}`} />
            ))
          )}
        </div>
      </div>
    </AppShell>
  );
}
