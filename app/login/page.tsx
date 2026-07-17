"use client";

import Link from "next/link";
import MaterialIcon from "@/shared/components/icons/MaterialIcon";
import { useAuth } from "@/features/auth/hooks/useAuth";
import type { Role } from "@/shared/types";

const ROLE_OPTIONS: {
  role: Role;
  label: string;
  subtitle: string;
  icon: string;
  color: string;
  variant: "blue" | "green" | "purple";
}[] = [
  {
    role: "user",
    label: "ผู้แจ้งเหตุ",
    subtitle: "นักศึกษา / บุคลากรทั่วไป",
    icon: "person",
    color: "var(--color-primary)",
    variant: "blue",
  },
  {
    role: "staff",
    label: "เจ้าหน้าที่",
    subtitle: "หน่วยระงับเหตุและช่วยเหลือ",
    icon: "security",
    color: "var(--color-resolved)",
    variant: "green",
  },
  {
    role: "admin",
    label: "ผู้ดูแลระบบ",
    subtitle: "ฝ่ายตรวจสอบและแอดมินระบบ",
    icon: "admin_panel_settings",
    color: "var(--color-violence)",
    variant: "purple",
  },
];

const bgStyles: Record<string, string> = {
  blue: "var(--color-card-blue)",
  green: "var(--color-card-green)",
  purple: "var(--color-card-purple)",
};

export default function LoginPage() {
  const { loginAs } = useAuth();

  return (
    <main className="flex flex-col gap-5 px-4 pt-8 pb-6 fade-up mx-auto w-full">


      {/* Login Welcome Hero Card - matching SOS green card format, but with key/lock visuals */}
      <div
        className="relative rounded-3xl p-5 overflow-hidden"
        style={{ backgroundColor: "var(--color-card-blue)" }}
      >
        <div className="flex gap-4">
          {/* Left content */}
          <div className="flex-1 flex flex-col justify-between min-h-[140px]">
            <span
              className="flex items-center justify-center w-11 h-11 rounded-full"
              style={{ backgroundColor: "rgba(255,255,255,0.7)" }}
            >
              <MaterialIcon
                name="vpn_key"
                filled
                size={22}
                style={{ color: "var(--color-primary)" }}
              />
            </span>

            <div>
              <h2 className="text-xl font-bold text-on-surface mb-1">
                เข้าสู่ระบบ
              </h2>
              <p
                className="text-xs leading-relaxed"
                style={{ color: "var(--color-on-surface-mid)" }}
              >
                กรุณาเลือกบทบาทของคุณ
                <br />
                เพื่อเข้าใช้งานระบบที่เกี่ยวข้อง
              </p>
            </div>
          </div>

          {/* Right — login icon in white card */}
          <div
            className="flex items-center justify-center rounded-2xl shrink-0"
            style={{
              width: 110,
              height: 140,
              backgroundColor: "rgba(255,255,255,0.85)",
            }}
          >
            <MaterialIcon
              name="lock"
              filled
              size={56}
              style={{ color: "var(--color-primary)" }}
            />
          </div>
        </div>
      </div>

      {/* Role cards styled as Pastel Cards */}
      <div className="flex flex-col gap-3 mt-1">
        <p className="text-xs font-bold px-1" style={{ color: "var(--color-on-surface-low)" }}>
          เลือกประเภทผู้ใช้งาน
        </p>
        {ROLE_OPTIONS.map((opt) => (
          <button
            key={opt.role}
            onClick={() => loginAs(opt.role)}
            className="flex items-center gap-4 p-4 rounded-3xl transition-all active:scale-[0.98] text-left cursor-pointer"
            style={{
              backgroundColor: bgStyles[opt.variant],
            }}
          >
            {/* White circle icon container */}
            <span
              className="flex items-center justify-center w-12 h-12 rounded-full shrink-0"
              style={{ backgroundColor: "rgba(255,255,255,0.75)" }}
            >
              <MaterialIcon
                name={opt.icon}
                filled
                size={24}
                style={{ color: opt.color }}
              />
            </span>

            {/* Title & Subtitle */}
            <div className="flex-1 min-w-0">
              <p
                className="text-sm font-bold truncate"
                style={{ color: "var(--color-on-surface)" }}
              >
                {opt.label}
              </p>
              <p
                className="text-xs truncate mt-0.5"
                style={{ color: "var(--color-on-surface-mid)" }}
              >
                {opt.subtitle}
              </p>
            </div>

            {/* Chevron Right */}
            <span
              className="flex items-center justify-center w-8 h-8 rounded-full"
              style={{ backgroundColor: "rgba(255,255,255,0.4)" }}
            >
              <MaterialIcon
                name="chevron_right"
                size={20}
                style={{ color: "var(--color-on-surface)" }}
              />
            </span>
          </button>
        ))}
      </div>

      {/* Register link */}
      <p
        className="text-xs text-center mt-6"
        style={{ color: "var(--color-on-surface-low)" }}
      >
        ยังไม่มีบัญชีสมาชิก?{" "}
        <Link
          href="/register"
          className="font-bold underline"
          style={{ color: "var(--color-primary)" }}
        >
          สมัครสมาชิกที่นี่
        </Link>
      </p>
    </main>
  );
}
