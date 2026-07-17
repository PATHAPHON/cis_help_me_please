"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/shared/components/AppShell";
import Card from "@/shared/components/ui/Card";
import Button from "@/shared/components/ui/Button";
import { StatusBadge, Divider } from "@/shared/components/ui";
import MaterialIcon from "@/shared/components/icons/MaterialIcon";
import { useIncidents } from "@/features/incidents/hooks/useIncidents";

import { categoryMeta } from "@/features/incidents/utils/categoryMeta";
import { formatDate, formatRelativeTime } from "@/shared/utils/formatDate";

export default function StaffIncidentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const { getById, updateStatus } = useIncidents();
  const [claiming, setClaiming] = useState(false);

  const incident = getById(id);

  if (!incident) {
    return (
      <AppShell>
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <MaterialIcon name="report_off" size={56} style={{ color: "var(--color-outline-strong)" }} />
          <p style={{ color: "var(--color-on-surface-low)" }}>ไม่พบรายการแจ้งเหตุนี้</p>
        </div>
      </AppShell>
    );
  }

  const catM = categoryMeta[incident.category];

  const handleClaim = async () => {
    setClaiming(true);
    await new Promise((r) => setTimeout(r, 500));
    updateStatus(incident.id, "processing");
    setClaiming(false);
  };

  /* ── Action config per status ────────────────────────────────────── */
  const primaryAction =
    incident.status === "pending"
      ? {
          label: "รับเรื่อง",
          icon: "directions_run",
          bg: "var(--color-processing)",
          onClick: handleClaim,
          loading: claiming,
        }
      : incident.status === "processing"
      ? {
          label: "ปิดงาน",
          icon: "check_circle",
          bg: "var(--color-resolved)",
          onClick: () => router.push(`/incidents/${id}/log`),
          loading: false,
        }
      : null;

  return (
    <AppShell>
      <div className="px-4 py-4 flex flex-col gap-4 fade-up">
        {/* ── Hero Card ───────────────────────────────────────────── */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            backgroundColor: "var(--color-surface)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          {/* Media Area — image first (if any), then map */}
          <div className="p-3 flex flex-col gap-2">
            {/* Attached image */}
            {incident.imageUrl && (
              <div className="rounded-xl overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={incident.imageUrl}
                  alt="ภาพประกอบเหตุการณ์"
                  className="w-full object-cover"
                  style={{ maxHeight: 200 }}
                />
              </div>
            )}
            {/* Map */}
            <div
              className="rounded-xl overflow-hidden flex items-center justify-center relative"
              style={{
                height: 200,
                backgroundColor: catM.bg,
              }}
            >
              {incident.latitude && incident.longitude ? (
                <iframe
                  title={`แผนที่: ${incident.locationName}`}
                  src={`https://maps.google.com/maps?q=${incident.latitude},${incident.longitude}&z=17&output=embed`}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              ) : (
                <MaterialIcon
                  name={catM.icon}
                  filled
                  size={100}
                  style={{ color: catM.color, opacity: 0.7 }}
                />
              )}
            </div>
          </div>

          {/* Content */}
          <div className="px-5 pb-5 pt-1">
            {/* Title row */}
            <div className="flex items-center gap-2 mb-2">
              <h2
                className="text-2xl font-bold leading-tight"
                style={{ color: "var(--color-on-surface)" }}
              >
                {catM.label}
              </h2>
              {/* Status badge (verified-style pill) */}
              <span
                className="flex items-center justify-center rounded-full shrink-0"
                style={{
                  width: 26,
                  height: 26,
                  backgroundColor:
                    incident.status === "resolved"
                      ? "var(--color-resolved)"
                      : incident.status === "processing"
                      ? "var(--color-processing)"
                      : "var(--color-pending)",
                }}
                aria-label={incident.status}
              >
                <MaterialIcon
                  name={
                    incident.status === "resolved"
                      ? "check"
                      : incident.status === "processing"
                      ? "directions_run"
                      : "priority_high"
                  }
                  filled
                  size={16}
                  style={{ color: "white" }}
                />
              </span>
            </div>

            {/* Description */}
            <p
              className="text-base leading-relaxed"
              style={{ color: "var(--color-on-surface-low)" }}
            >
              {incident.description}
            </p>

            {/* Location info */}
            <div className="flex items-center gap-2 mt-4">
              <MaterialIcon
                name="location_on"
                filled
                size={16}
                style={{ color: "var(--color-primary)" }}
              />
              <p className="text-sm" style={{ color: "var(--color-on-surface-mid)" }}>
                {incident.locationName}
              </p>
            </div>

            {/* Time info */}
            <div className="flex items-center gap-2 mt-2">
              <MaterialIcon
                name="schedule"
                size={16}
                style={{ color: "var(--color-on-surface-faint)" }}
              />
              <p className="text-xs" style={{ color: "var(--color-on-surface-faint)" }}>
                {formatRelativeTime(incident.createdAt)} • {formatDate(incident.createdAt)}
              </p>
            </div>

            {incident.latitude && incident.longitude && (
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${incident.latitude},${incident.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-3 text-sm font-medium"
                style={{ color: "var(--color-primary)" }}
              >
                <MaterialIcon name="directions" size={16} style={{ color: "var(--color-primary)" }} />
                นำทางด้วย Google Maps
              </a>
            )}

            {/* Bottom row — stats + action */}
            <div className="flex items-center justify-between gap-3 mt-6">
              {/* Stats */}
              <div className="flex items-center gap-5">
                <div className="flex items-center gap-1.5">
                  <MaterialIcon
                    name="person"
                    size={20}
                    style={{ color: "var(--color-on-surface-low)" }}
                  />
                  <span
                    className="text-base font-semibold"
                    style={{ color: "var(--color-on-surface)" }}
                  >
                    {incident.reporterName.split(" ")[0]}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MaterialIcon
                    name="fact_check"
                    size={20}
                    style={{ color: "var(--color-on-surface-low)" }}
                  />
                  <span
                    className="text-base font-semibold"
                    style={{ color: "var(--color-on-surface)" }}
                  >
                    {incident.rescueLogs.length}
                  </span>
                </div>
              </div>

              {/* Primary Action Button */}
              {primaryAction ? (
                <button
                  onClick={primaryAction.onClick}
                  disabled={primaryAction.loading}
                  className="flex items-center gap-2 px-5 h-11 rounded-full font-medium text-sm transition-all active:scale-[0.97] shrink-0 disabled:opacity-60"
                  style={{
                    backgroundColor: "var(--color-surface-variant)",
                    color: "var(--color-on-surface)",
                  }}
                >
                  {primaryAction.loading ? (
                    <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      {primaryAction.label}
                      <MaterialIcon
                        name={primaryAction.icon}
                        size={18}
                        style={{ color: "var(--color-on-surface)" }}
                      />
                    </>
                  )}
                </button>
              ) : (
                <StatusBadge status={incident.status} />
              )}
            </div>
          </div>
        </div>

        {/* ── Rescue Logs ────────────────────────────────────────── */}
        {incident.rescueLogs.length > 0 && (
          <Card elevated padding="md">
            <p
              className="text-sm font-medium mb-3"
              style={{ color: "var(--color-on-surface-mid)" }}
            >
              บันทึกการช่วยเหลือ ({incident.rescueLogs.length})
            </p>
            <div className="flex flex-col gap-3">
              {incident.rescueLogs.map((log, idx) => (
                <div key={log.id}>
                  {idx > 0 && <Divider className="mb-3" />}
                  <div className="flex items-start gap-3">
                    <span
                      className="flex items-center justify-center rounded-full shrink-0"
                      style={{
                        width: 36,
                        height: 36,
                        backgroundColor: "var(--color-resolved-bg)",
                      }}
                    >
                      <MaterialIcon
                        name="security"
                        filled
                        size={18}
                        style={{ color: "var(--color-resolved)" }}
                      />
                    </span>
                    <div>
                      <p
                        className="text-sm font-medium"
                        style={{ color: "var(--color-on-surface)" }}
                      >
                        {log.staffName}
                      </p>
                      <p
                        className="text-sm mt-1 leading-relaxed"
                        style={{ color: "var(--color-on-surface-low)" }}
                      >
                        {log.actionTaken}
                      </p>
                      <p
                        className="text-xs mt-1"
                        style={{ color: "var(--color-on-surface-faint)" }}
                      >
                        {formatDate(log.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* ── Secondary log button when processing ───────────────── */}
        {incident.status === "processing" && (
          <Button
            variant="tonal"
            size="lg"
            fullWidth
            onClick={() => router.push(`/incidents/${id}/log`)}
          >
            <MaterialIcon name="edit_note" size={20} />
            บันทึกการดำเนินการ
          </Button>
        )}
      </div>
    </AppShell>
  );
}
