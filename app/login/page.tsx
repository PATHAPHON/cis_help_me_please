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
  bg: string;
}[] = [
  {
    role: "user",
    label: "ผู้แจ้งเหตุ",
    subtitle: "นักศึกษา / บุคลากร",
    icon: "person",
    color: "#1a73e8",
    bg: "#e8f0fe",
  },
  {
    role: "staff",
    label: "เจ้าหน้าที่",
    subtitle: "เจ้าหน้าที่ช่วยเหลือ",
    icon: "security",
    color: "#1e8e3e",
    bg: "#e6f4ea",
  },
  {
    role: "admin",
    label: "ผู้ดูแลระบบ",
    subtitle: "ผู้บริหาร / แอดมิน",
    icon: "admin_panel_settings",
    color: "#7c4dff",
    bg: "#ede7f6",
  },
];

export default function LoginPage() {
  const { loginAs } = useAuth();

  return (
    <main className="flex flex-col min-h-dvh bg-surface px-6 py-10 fade-up">
      {/* Header */}
      <div className="flex flex-col items-center gap-3 mb-10">
        <div
          className="flex items-center justify-center rounded-2xl"
          style={{ width: 72, height: 72, backgroundColor: "#e8f0fe" }}
        >
          <MaterialIcon
            name="emergency"
            filled
            size={40}
            style={{ color: "#1a73e8" }}
          />
        </div>
        <h1
          className="text-2xl font-medium text-center"
          style={{ color: "var(--color-on-surface)" }}
        >
          CIS Help Me Please
        </h1>
        <p
          className="text-sm text-center"
          style={{ color: "var(--color-on-surface-low)" }}
        >
          เลือกบทบาทของคุณเพื่อเข้าใช้งาน
        </p>
      </div>

      {/* Role cards */}
      <div className="flex flex-col gap-3">
        {ROLE_OPTIONS.map((opt) => (
          <button
            key={opt.role}
            onClick={() => loginAs(opt.role)}
            className="flex items-center gap-4 p-4 rounded-2xl border transition-all active:scale-[0.98]"
            style={{
              backgroundColor: "var(--color-surface)",
              borderColor: "var(--color-outline)",
            }}
          >
            <span
              className="flex items-center justify-center rounded-xl shrink-0"
              style={{ width: 52, height: 52, backgroundColor: opt.bg }}
            >
              <MaterialIcon
                name={opt.icon}
                filled
                size={28}
                style={{ color: opt.color }}
              />
            </span>
            <span className="flex flex-col items-start gap-0.5">
              <span
                className="text-base font-medium"
                style={{ color: "var(--color-on-surface)" }}
              >
                {opt.label}
              </span>
              <span
                className="text-sm"
                style={{ color: "var(--color-on-surface-low)" }}
              >
                {opt.subtitle}
              </span>
            </span>
            <MaterialIcon
              name="chevron_right"
              size={20}
              className="ml-auto"
              style={{ color: "var(--color-on-surface-faint)" }}
            />
          </button>
        ))}
      </div>

      {/* Register link */}
      <p
        className="text-sm text-center mt-8"
        style={{ color: "var(--color-on-surface-low)" }}
      >
        ยังไม่มีบัญชี?{" "}
        <Link
          href="/register"
          className="font-medium"
          style={{ color: "var(--color-primary)" }}
        >
          สมัครสมาชิก
        </Link>
      </p>
    </main>
  );
}
