"use client";

import { useRouter } from "next/navigation";
import AppShell from "@/shared/components/AppShell";
import MaterialIcon from "@/shared/components/icons/MaterialIcon";
import { Avatar } from "@/shared/components/ui/index";
import PastelStatCard from "@/features/incidents/components/PastelStatCard";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useIncidents, ReportsSummaryCard } from "@/features/incidents";

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "สวัสดีตอนเช้า";
  if (h < 17) return "สวัสดีตอนบ่าย";
  return "สวัสดีตอนเย็น";
}

export default function HomePage() {
  const router = useRouter();
  const { user } = useAuth();
  const { getByReporter } = useIncidents();

  const myReports = user ? getByReporter(user.id) : [];
  const pendingCount = myReports.filter((i) => i.status === "pending").length;
  const processingCount = myReports.filter((i) => i.status === "processing").length;

  return (
    <AppShell>
      <div className="flex flex-col gap-4 px-4 pt-6 pb-4 fade-up mx-auto w-full max-w-[480px]">
        {/* Greeting header — avatar + text + action buttons */}
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <Avatar name={user?.name ?? "?"} size={44} />

          {/* Greeting text */}
          <div className="flex-1 min-w-0">
            <p
              className="text-xs"
              style={{ color: "var(--color-on-surface-low)" }}
            >
              {getGreeting()},
            </p>
            <p className="text-base font-bold text-on-surface truncate">
              {user?.name ?? "ผู้ใช้"}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => router.push("/my-reports")}
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
              onClick={() => router.push("/my-reports")}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-surface transition-all active:scale-90"
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
            </button>
          </div>
        </div>

        {/* Hero SOS Card */}
        <div
          className="relative rounded-3xl p-5 overflow-hidden"
          style={{ backgroundColor: "var(--color-card-green)" }}
        >
          <div className="flex gap-4">
            {/* Left content */}
            <div className="flex-1 flex flex-col justify-between min-h-[180px]">
              <span
                className="flex items-center justify-center w-11 h-11 rounded-full"
                style={{ backgroundColor: "rgba(255,255,255,0.7)" }}
              >
                <MaterialIcon
                  name="emergency"
                  size={22}
                  style={{ color: "var(--color-on-surface)" }}
                />
              </span>

              <div>
                <h2 className="text-xl font-bold text-on-surface mb-1">
                  แจ้งเหตุฉุกเฉิน
                </h2>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "var(--color-on-surface-mid)" }}
                >
                  กดปุ่มด้านล่างเพื่อแจ้ง
                  <br />
                  เหตุด่วนได้ทันที
                </p>
              </div>

              <button
                onClick={() => router.push("/report/new")}
                className="self-start mt-3 px-4 py-2 rounded-full border text-xs font-medium transition-all active:scale-95"
                style={{
                  borderColor: "var(--color-on-surface)",
                  color: "var(--color-on-surface)",
                  backgroundColor: "transparent",
                }}
              >
                แจ้งเลย
              </button>
            </div>

            {/* Right — emergency icon in white card */}
            <div
              className="flex items-center justify-center rounded-2xl shrink-0"
              style={{
                width: 140,
                height: 180,
                backgroundColor: "rgba(255,255,255,0.85)",
              }}
            >
              <MaterialIcon
                name="crisis_alert"
                filled
                size={72}
                style={{ color: "var(--color-error)" }}
              />
            </div>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 gap-3">
          <PastelStatCard
            variant="blue"
            label="รอดำเนินการ"
            value={pendingCount}
            unit="รายการ"
            icon="schedule"
          />
          <PastelStatCard
            variant="purple"
            label="กำลังช่วยเหลือ"
            value={processingCount}
            unit="รายการ"
            icon="directions_run"
          />
        </div>

        {/* Contact — reports */}
        <ReportsSummaryCard reports={myReports} />
      </div>
    </AppShell>
  );
}
