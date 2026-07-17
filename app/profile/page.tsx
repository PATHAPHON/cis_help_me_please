"use client";

import AppShell from "@/shared/components/AppShell";
import Button from "@/shared/components/ui/Button";
import { Avatar } from "@/shared/components/ui/index";
import MaterialIcon from "@/shared/components/icons/MaterialIcon";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useIncidents } from "@/features/incidents/hooks/useIncidents";
import { roleMeta } from "@/features/users/utils/roleMeta";

// Pastel bg per role (for hero card)
const ROLE_HERO_BG: Record<string, string> = {
  user: "var(--color-card-blue)",
  staff: "var(--color-card-green)",
  admin: "var(--color-card-purple)",
};

const ROLE_HERO_ICON: Record<string, string> = {
  user: "person",
  staff: "security",
  admin: "admin_panel_settings",
};

export default function ProfilePage() {
  const { user, role, logout } = useAuth();
  const { getByReporter } = useIncidents();

  if (!user || !role) {
    return (
      <AppShell>
        <div className="flex flex-col items-center justify-center py-20">
          <p style={{ color: "var(--color-on-surface-low)" }}>กรุณาเข้าสู่ระบบ</p>
        </div>
      </AppShell>
    );
  }

  const meta = roleMeta[role];
  const myReports = role === "user" ? getByReporter(user.id) : [];
  const resolvedCount = myReports.filter((i) => i.status === "resolved").length;

  const infItems = [
    { icon: "phone", label: "เบอร์โทรศัพท์", value: user.phone },
    user.studentId
      ? { icon: "badge", label: "รหัสนักศึกษา/บุคลากร", value: user.studentId }
      : null,
    { icon: "apartment", label: "ที่พัก / หน่วยงาน", value: user.residence },
    { icon: "email", label: "อีเมล", value: user.email },
  ].filter(Boolean) as { icon: string; label: string; value: string }[];

  const menuItems = [
    { icon: "notifications", label: "การแจ้งเตือน" },
    { icon: "security", label: "ความปลอดภัย" },
    { icon: "help", label: "ช่วยเหลือ / ติดต่อ" },
    { icon: "info", label: "เกี่ยวกับแอป" },
  ];

  return (
    <AppShell>
      <div className="flex flex-col gap-4 px-4 pt-6 pb-4 fade-up mx-auto w-full max-w-[480px]">

        {/* Hero profile card — pastel per role */}
        <div
          className="relative rounded-3xl p-5 overflow-hidden"
          style={{ backgroundColor: ROLE_HERO_BG[role] }}
        >
          <div className="flex gap-4">
            <div className="flex-1 flex flex-col justify-between min-h-[160px]">
              <span
                className="flex items-center justify-center w-11 h-11 rounded-full"
                style={{ backgroundColor: "rgba(255,255,255,0.7)" }}
              >
                <MaterialIcon
                  name={ROLE_HERO_ICON[role]}
                  filled
                  size={22}
                  style={{ color: "var(--color-on-surface)" }}
                />
              </span>

              <div>
                <span
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium mb-2"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.7)",
                    color: meta.color,
                  }}
                >
                  <MaterialIcon name={meta.icon} size={12} filled style={{ color: meta.color }} />
                  {meta.label}
                </span>
                <h2 className="text-xl font-bold text-on-surface leading-tight">
                  {user.name}
                </h2>
                <p
                  className="text-xs mt-1"
                  style={{ color: "var(--color-on-surface-mid)" }}
                >
                  {user.email}
                </p>
              </div>
            </div>

            {/* Avatar in white box */}
            <div
              className="flex items-center justify-center rounded-2xl shrink-0"
              style={{
                width: 110,
                height: 160,
                backgroundColor: "rgba(255,255,255,0.85)",
              }}
            >
              <Avatar name={user.name} size={72} />
            </div>
          </div>
        </div>

        {/* Stats (user only) */}
        {role === "user" && (
          <div className="grid grid-cols-2 gap-3">
            <div
              className="flex flex-col gap-3 rounded-3xl p-4 min-h-[100px]"
              style={{ backgroundColor: "var(--color-card-blue)" }}
            >
              <span
                className="flex items-center justify-center w-9 h-9 rounded-full"
                style={{ backgroundColor: "rgba(255,255,255,0.7)" }}
              >
                <MaterialIcon
                  name="report"
                  filled
                  size={18}
                  style={{ color: "var(--color-on-surface)" }}
                />
              </span>
              <div>
                <p
                  className="text-2xl font-bold leading-none"
                  style={{ color: "var(--color-on-surface)" }}
                >
                  {myReports.length}
                </p>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: "var(--color-on-surface-mid)" }}
                >
                  รายการแจ้งเหตุ
                </p>
              </div>
            </div>
            <div
              className="flex flex-col gap-3 rounded-3xl p-4 min-h-[100px]"
              style={{ backgroundColor: "var(--color-card-green)" }}
            >
              <span
                className="flex items-center justify-center w-9 h-9 rounded-full"
                style={{ backgroundColor: "rgba(255,255,255,0.7)" }}
              >
                <MaterialIcon
                  name="check_circle"
                  filled
                  size={18}
                  style={{ color: "var(--color-on-surface)" }}
                />
              </span>
              <div>
                <p
                  className="text-2xl font-bold leading-none"
                  style={{ color: "var(--color-on-surface)" }}
                >
                  {resolvedCount}
                </p>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: "var(--color-on-surface-mid)" }}
                >
                  ได้รับการช่วยเหลือ
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Info card */}
        <div
          className="rounded-3xl bg-surface p-5"
          style={{
            boxShadow: "0 1px 3px rgba(0,0,0,.06), 0 1px 2px rgba(0,0,0,.04)",
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <MaterialIcon
              name="person"
              size={16}
              style={{ color: "var(--color-on-surface-low)" }}
            />
            <p
              className="text-sm font-semibold"
              style={{ color: "var(--color-on-surface)" }}
            >
              ข้อมูลส่วนตัว
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {infItems.map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <span
                  className="flex items-center justify-center rounded-2xl shrink-0"
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: "var(--color-surface-variant)",
                  }}
                >
                  <MaterialIcon
                    name={item.icon}
                    size={18}
                    style={{ color: "var(--color-on-surface-low)" }}
                  />
                </span>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-[11px]"
                    style={{ color: "var(--color-on-surface-faint)" }}
                  >
                    {item.label}
                  </p>
                  <p
                    className="text-sm truncate"
                    style={{ color: "var(--color-on-surface)" }}
                  >
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Settings menu card */}
        <div
          className="rounded-3xl bg-surface overflow-hidden"
          style={{
            boxShadow: "0 1px 3px rgba(0,0,0,.06), 0 1px 2px rgba(0,0,0,.04)",
          }}
        >
          {menuItems.map((item, idx) => (
            <button
              key={item.label}
              className="flex items-center gap-3 w-full px-5 py-4 transition-colors active:bg-surface-variant text-left"
              style={{
                borderBottom:
                  idx < menuItems.length - 1
                    ? "1px solid var(--color-outline)"
                    : "none",
              }}
            >
              <span
                className="flex items-center justify-center rounded-2xl shrink-0"
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: "var(--color-surface-variant)",
                }}
              >
                <MaterialIcon
                  name={item.icon}
                  size={18}
                  style={{ color: "var(--color-on-surface-low)" }}
                />
              </span>
              <span
                className="text-sm flex-1"
                style={{ color: "var(--color-on-surface)" }}
              >
                {item.label}
              </span>
              <MaterialIcon
                name="chevron_right"
                size={18}
                style={{ color: "var(--color-on-surface-faint)" }}
              />
            </button>
          ))}
        </div>

        {/* Logout button — outlined rounded-full */}
        <button
          onClick={logout}
          className="flex items-center justify-center gap-2 w-full py-4 rounded-3xl border-2 text-sm font-semibold transition-all active:scale-[0.98]"
          style={{
            borderColor: "var(--color-error)",
            color: "var(--color-error)",
            backgroundColor: "transparent",
          }}
        >
          <MaterialIcon name="logout" size={20} style={{ color: "var(--color-error)" }} />
          ออกจากระบบ
        </button>

      </div>
    </AppShell>
  );
}
