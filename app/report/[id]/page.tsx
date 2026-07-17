"use client";

import { use } from "react";
import AppShell from "@/shared/components/AppShell";
import Card from "@/shared/components/ui/Card";
import { StatusBadge, Divider } from "@/shared/components/ui/index";
import MaterialIcon from "@/shared/components/icons/MaterialIcon";
import { useIncidents } from "@/features/incidents/hooks/useIncidents";
import { categoryMeta } from "@/features/incidents/utils/categoryMeta";
import { formatDate, formatRelativeTime } from "@/shared/utils/formatDate";
import type { IncidentStatus } from "@/shared/types";

const STATUS_STEPS: { status: IncidentStatus; label: string; icon: string }[] = [
  { status: "pending", label: "รับเรื่องแล้ว", icon: "schedule" },
  { status: "processing", label: "กำลังดำเนินการ", icon: "directions_run" },
  { status: "resolved", label: "ช่วยเหลือสำเร็จ", icon: "check_circle" },
];

const STATUS_ORDER: Record<IncidentStatus, number> = {
  pending: 0,
  processing: 1,
  resolved: 2,
};

export default function ReportDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { getById } = useIncidents();
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
  const currentStep = STATUS_ORDER[incident.status];

  return (
    <AppShell>
      <div className="flex flex-col gap-4 px-4 py-4 fade-up">
        {/* Header Card */}
        <Card elevated padding="md">
          <div className="flex items-start gap-3">
            <span
              className="flex items-center justify-center rounded-xl shrink-0"
              style={{ width: 52, height: 52, backgroundColor: catM.bg }}
            >
              <MaterialIcon name={catM.icon} filled size={30} style={{ color: catM.color }} />
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <p className="font-semibold text-base text-on-surface">{catM.label}</p>
                <StatusBadge status={incident.status} />
              </div>
              <div className="flex items-center gap-1">
                <MaterialIcon name="location_on" size={14} style={{ color: "var(--color-on-surface-faint)" }} />
                <p className="text-sm truncate" style={{ color: "var(--color-on-surface-low)" }}>
                  {incident.locationName}
                </p>
              </div>
              <p className="text-xs mt-1" style={{ color: "var(--color-on-surface-faint)" }}>
                {formatRelativeTime(incident.createdAt)}
              </p>
            </div>
          </div>
        </Card>

        {/* Status Timeline */}
        <Card elevated padding="md">
          <p className="text-sm font-medium mb-4" style={{ color: "var(--color-on-surface-mid)" }}>
            สถานะการช่วยเหลือ
          </p>
          <div className="flex flex-col gap-0">
            {STATUS_STEPS.map((step, idx) => {
              const stepOrder = STATUS_ORDER[step.status];
              const isDone = stepOrder < currentStep;
              const isCurrent = stepOrder === currentStep;
              const isPending = stepOrder > currentStep;
              const isLast = idx === STATUS_STEPS.length - 1;

              return (
                <div key={step.status} className="flex gap-4">
                  {/* Timeline dot + line */}
                  <div className="flex flex-col items-center" style={{ width: 24 }}>
                    <span
                      className="flex items-center justify-center rounded-full shrink-0"
                      style={{
                        width: 28,
                        height: 28,
                        backgroundColor: isPending
                          ? "var(--color-surface-variant)"
                          : isCurrent
                          ? "var(--color-primary-light)"
                          : "var(--color-resolved-bg)",
                        border: isCurrent
                          ? "2px solid var(--color-primary)"
                          : "2px solid transparent",
                      }}
                    >
                      <MaterialIcon
                        name={isDone ? "check" : step.icon}
                        filled={!isPending}
                        size={14}
                        style={{
                          color: isPending
                            ? "var(--color-outline-strong)"
                            : isCurrent
                            ? "var(--color-primary)"
                            : "var(--color-resolved)",
                        }}
                      />
                    </span>
                    {!isLast && (
                      <div
                        className="w-0.5 flex-1 min-h-[24px]"
                        style={{
                          backgroundColor: isDone
                            ? "var(--color-resolved)"
                            : "var(--color-outline)",
                        }}
                      />
                    )}
                  </div>

                  {/* Label */}
                  <div className={`pb-5 ${isLast ? "" : ""}`}>
                    <p
                      className="text-sm font-medium leading-7"
                      style={{
                        color: isPending
                          ? "var(--color-on-surface-faint)"
                          : isCurrent
                          ? "var(--color-primary)"
                          : "var(--color-resolved)",
                      }}
                    >
                      {step.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Description + Image */}
        <Card elevated padding="md">
          <p className="text-sm font-medium mb-2" style={{ color: "var(--color-on-surface-mid)" }}>
            รายละเอียดเหตุการณ์
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface)" }}>
            {incident.description}
          </p>
          {incident.imageUrl && (
            <div className="mt-3 rounded-2xl overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={incident.imageUrl}
                alt="ภาพประกอบเหตุการณ์"
                className="w-full object-cover"
                style={{ maxHeight: 220 }}
              />
            </div>
          )}
        </Card>

        {/* Location + Map */}
        <Card elevated padding="md">
          <div className="flex items-center gap-2 mb-2">
            <MaterialIcon name="location_on" size={18} style={{ color: "var(--color-primary)" }} />
            <p className="text-sm font-medium" style={{ color: "var(--color-on-surface-mid)" }}>
              สถานที่เกิดเหตุ
            </p>
          </div>
          <p className="text-sm mb-3" style={{ color: "var(--color-on-surface)" }}>
            {incident.locationName}
          </p>
          {incident.latitude && incident.longitude ? (
            <>
              <div className="rounded-2xl overflow-hidden" style={{ height: 200 }}>
                <iframe
                  title={`แผนที่: ${incident.locationName}`}
                  src={`https://maps.google.com/maps?q=${incident.latitude},${incident.longitude}&z=17&output=embed`}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
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
            </>
          ) : (
            <div
              className="rounded-2xl flex items-center justify-center"
              style={{ height: 100, backgroundColor: "var(--color-surface-variant)" }}
            >
              <p className="text-xs" style={{ color: "var(--color-on-surface-faint)" }}>
                ไม่มีพิกัด GPS
              </p>
            </div>
          )}
        </Card>

        {/* Rescue Logs */}
        {incident.rescueLogs.length > 0 && (
          <Card elevated padding="md">
            <p className="text-sm font-medium mb-3" style={{ color: "var(--color-on-surface-mid)" }}>
              บันทึกการช่วยเหลือ
            </p>
            <div className="flex flex-col gap-3">
              {incident.rescueLogs.map((log, idx) => (
                <div key={log.id}>
                  {idx > 0 && <Divider className="mb-3" />}
                  <div className="flex items-start gap-3">
                    <span
                      className="flex items-center justify-center rounded-full shrink-0"
                      style={{ width: 36, height: 36, backgroundColor: "var(--color-resolved-bg)" }}
                    >
                      <MaterialIcon name="security" filled size={18} style={{ color: "var(--color-resolved)" }} />
                    </span>
                    <div>
                      <p className="text-sm font-medium" style={{ color: "var(--color-on-surface)" }}>
                        {log.staffName}
                      </p>
                      <p className="text-sm mt-1 leading-relaxed" style={{ color: "var(--color-on-surface-low)" }}>
                        {log.actionTaken}
                      </p>
                      <p className="text-xs mt-1" style={{ color: "var(--color-on-surface-faint)" }}>
                        {formatDate(log.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Meta */}
        <Card padding="md">
          <p className="text-xs" style={{ color: "var(--color-on-surface-faint)" }}>
            แจ้งเหตุเมื่อ: {formatDate(incident.createdAt)}
          </p>
          <p className="text-xs mt-1" style={{ color: "var(--color-on-surface-faint)" }}>
            อัปเดตล่าสุด: {formatDate(incident.updatedAt)}
          </p>
        </Card>
      </div>
    </AppShell>
  );
}
