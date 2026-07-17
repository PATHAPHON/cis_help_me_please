"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/shared/components/AppShell";
import MaterialIcon from "@/shared/components/icons/MaterialIcon";
import { Avatar } from "@/shared/components/ui/index";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useIncidents } from "@/features/incidents/hooks/useIncidents";
import { MOCK_USERS } from "@/features/users/mock/seed-users";
import HeroSummaryCard from "@/features/incidents/components/HeroSummaryCard";
import PastelStatCard from "@/features/incidents/components/PastelStatCard";
import ContactCard from "@/features/users/components/ContactCard";
import { categoryMeta } from "@/features/incidents/utils/categoryMeta";

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "สวัสดีตอนเช้า";
  if (h < 17) return "สวัสดีตอนบ่าย";
  return "สวัสดีตอนเย็น";
}

// ── Demo notification data ──
const DEMO_NOTIFICATION = {
  category: "accident" as const,
  title: "แจ้งเหตุฉุกเฉินใหม่",
  location: "อาคาร A ชั้น 2 ห้อง 201",
  description: "นักศึกษาหกล้ม บาดเจ็บบริเวณข้อเท้า ต้องการความช่วยเหลือด่วน",
  reporter: "ณัฐพงษ์ ใจดี",
  time: "เมื่อสักครู่",
};

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { incidents } = useIncidents();
  const [showNotifPopup, setShowNotifPopup] = useState(false);

  // Sort by newest first
  const sorted = [...incidents].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const latestIncident = sorted[0] ?? null;

  // Stats
  const pendingCount = incidents.filter((i) => i.status === "pending").length;
  const processingCount = incidents.filter((i) => i.status === "processing").length;

  // On-duty staff (first staff in mock)
  const onDutyStaff = MOCK_USERS.find((u) => u.role === "staff")!;

  const meta = categoryMeta[DEMO_NOTIFICATION.category];

  // Auto-dismiss toast after 3.5s
  useEffect(() => {
    if (!showNotifPopup) return;
    const t = setTimeout(() => setShowNotifPopup(false), 3500);
    return () => clearTimeout(t);
  }, [showNotifPopup]);

  return (
    <AppShell>
      <div className="flex flex-col gap-4 px-4 pt-6 pb-4 fade-up mx-auto w-full max-w-[480px]">
        {/* Greeting header — avatar + text + action buttons */}
        <div className="flex items-center gap-3">
          <Avatar name={user?.name ?? "?"} size={44} />

          <div className="flex-1 min-w-0">
            <p className="text-xs" style={{ color: "var(--color-on-surface-low)" }}>
              {getGreeting()},
            </p>
            <p className="text-base font-bold text-on-surface truncate">
              {user?.name ?? "เจ้าหน้าที่"}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => router.push("/incidents")}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-surface transition-all active:scale-90"
              style={{
                boxShadow: "0 1px 3px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.05)",
              }}
              aria-label="ค้นหา"
            >
              <MaterialIcon
                name="search"
                size={20}
                style={{ color: "var(--color-on-surface)" }}
              />
            </button>
            <button
              onClick={() => setShowNotifPopup(true)}
              className="relative flex items-center justify-center w-10 h-10 rounded-full bg-surface transition-all active:scale-90"
              style={{
                boxShadow: "0 1px 3px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.05)",
              }}
              aria-label="การแจ้งเตือน"
            >
              <MaterialIcon
                name="notifications"
                size={20}
                style={{ color: "var(--color-on-surface)" }}
              />
              <span
                className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
                style={{ backgroundColor: "var(--color-error)" }}
              />
            </button>
          </div>
        </div>

        {/* Hero Summary Card */}
        <HeroSummaryCard
          latestIncident={latestIncident}
          onDetailClick={() => {
            if (latestIncident) {
              router.push(`/incidents/${latestIncident.id}`);
            } else {
              router.push("/incidents");
            }
          }}
        />

        {/* Stat Cards — 2 columns */}
        <div className="grid grid-cols-2 gap-3">
          <PastelStatCard
            variant="blue"
            label="รอรับเรื่อง"
            value={pendingCount}
            unit="รายการ"
            icon="schedule"
          />
          <PastelStatCard
            variant="purple"
            label="กำลังดำเนินการ"
            value={processingCount}
            unit="รายการ"
            icon="directions_run"
          />
        </div>

        {/* Contact Card */}
        <ContactCard
          user={onDutyStaff}
          onCall={() => {
            window.location.href = `tel:${onDutyStaff.phone.replace(/-/g, "")}`;
          }}
          onChat={() => {
            alert(`เปิดแชทกับ ${onDutyStaff.name}`);
          }}
        />
      </div>

      {/* ── Notification Toast (top, auto-dismiss) ─────── */}
      {showNotifPopup && (
        <div
          className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
          style={{ paddingTop: "calc(0.75rem + env(safe-area-inset-top, 0px))" }}
        >
          <button
            onClick={() => {
              setShowNotifPopup(false);
              router.push("/incidents");
            }}
            className="pointer-events-auto w-full max-w-[480px] text-left rounded-2xl overflow-hidden active:scale-[0.98] transition-transform"
            style={{
              backgroundColor: "var(--color-surface)",
              boxShadow: "0 8px 24px rgba(0,0,0,.15), 0 2px 6px rgba(0,0,0,.08)",
              animation: "slideDownFade 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <div className="flex items-start gap-3 p-3.5">
              {/* Icon */}
              <span
                className="flex items-center justify-center rounded-2xl shrink-0"
                style={{
                  width: 44,
                  height: 44,
                  backgroundColor: meta.color,
                }}
              >
                <MaterialIcon
                  name={meta.icon}
                  filled
                  size={24}
                  style={{ color: "white" }}
                />
              </span>

              {/* Text */}
              <div className="flex-1 min-w-0 pt-0.5">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span
                    className="text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-full"
                    style={{
                      backgroundColor: "var(--color-error)",
                      color: "white",
                    }}
                  >
                    ด่วน
                  </span>
                  <span
                    className="text-[11px]"
                    style={{ color: "var(--color-on-surface-faint)" }}
                  >
                    {DEMO_NOTIFICATION.time}
                  </span>
                </div>
                <p className="text-sm font-bold text-on-surface leading-tight mb-0.5 truncate">
                  🚨 {DEMO_NOTIFICATION.title}
                </p>
                <p
                  className="text-xs leading-snug line-clamp-2"
                  style={{ color: "var(--color-on-surface-mid)" }}
                >
                  {DEMO_NOTIFICATION.location} — {DEMO_NOTIFICATION.description}
                </p>
              </div>

              {/* Close */}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  setShowNotifPopup(false);
                }}
                className="flex items-center justify-center w-7 h-7 rounded-full shrink-0"
                style={{ backgroundColor: "var(--color-surface-variant)" }}
                aria-label="ปิด"
              >
                <MaterialIcon
                  name="close"
                  size={14}
                  style={{ color: "var(--color-on-surface-low)" }}
                />
              </span>
            </div>

            {/* Progress bar (auto-dismiss visual) */}
            <div
              className="h-1"
              style={{
                backgroundColor: meta.color,
                animation: "shrinkWidth 3.5s linear forwards",
                transformOrigin: "left",
              }}
            />
          </button>
        </div>
      )}

      <style jsx global>{`
        @keyframes slideDownFade {
          from { opacity: 0; transform: translateY(-20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shrinkWidth {
          from { transform: scaleX(1); }
          to   { transform: scaleX(0); }
        }
      `}</style>
    </AppShell>
  );
}
