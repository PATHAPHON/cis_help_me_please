"use client";

import MaterialIcon from "@/shared/components/icons/MaterialIcon";
import type { Role } from "@/shared/types";

interface LoginRoleCardProps {
  role: Role;
  label: string;
  subtitle: string;
  icon: string;
  color: string;
  bg: string;
  onClick: () => void;
}

export default function LoginRoleCard({
  label,
  subtitle,
  icon,
  color,
  bg,
  onClick,
}: LoginRoleCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-4 p-4 rounded-2xl border transition-all active:scale-[0.98] w-full"
      style={{
        backgroundColor: "var(--color-surface)",
        borderColor: "var(--color-outline)",
      }}
    >
      <span
        className="flex items-center justify-center rounded-xl shrink-0"
        style={{ width: 52, height: 52, backgroundColor: bg }}
      >
        <MaterialIcon name={icon} filled size={28} style={{ color }} />
      </span>

      <span className="flex flex-col items-start gap-0.5">
        <span
          className="text-base font-medium"
          style={{ color: "var(--color-on-surface)" }}
        >
          {label}
        </span>
        <span className="text-sm" style={{ color: "var(--color-on-surface-low)" }}>
          {subtitle}
        </span>
      </span>

      <MaterialIcon
        name="chevron_right"
        size={20}
        className="ml-auto"
        style={{ color: "var(--color-on-surface-faint)" }}
      />
    </button>
  );
}
