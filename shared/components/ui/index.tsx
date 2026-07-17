"use client";

import { ReactNode } from "react";
import MaterialIcon from "@/shared/components/icons/MaterialIcon";

/* ─── FAB ────────────────────────────────────────────────────────────── */
interface FABProps {
  icon: string;
  label?: string;
  onClick?: () => void;
  extended?: boolean;
}

export function FAB({ icon, label, onClick, extended = false }: FABProps) {
  return (
    <button
      onClick={onClick}
      className={[
        "flex items-center justify-center gap-2 font-medium text-sm",
        "shadow-lg active:scale-95 transition-all select-none",
        extended ? "px-5 h-14 rounded-2xl" : "w-14 h-14 rounded-2xl",
      ].join(" ")}
      style={{
        backgroundColor: "var(--color-primary)",
        color: "var(--color-on-primary)",
        boxShadow: "var(--shadow-md)",
      }}
      aria-label={label || icon}
    >
      <MaterialIcon name={icon} filled size={24} />
      {extended && label && <span>{label}</span>}
    </button>
  );
}

/* ─── Chip ───────────────────────────────────────────────────────────── */
interface ChipProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  icon?: string;
}

export function Chip({ label, selected = false, onClick, icon }: ChipProps) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1 h-8 px-4 rounded-full border text-sm font-medium transition-all shrink-0"
      style={{
        backgroundColor: selected
          ? "var(--color-primary-light)"
          : "var(--color-surface)",
        borderColor: selected
          ? "var(--color-primary)"
          : "var(--color-outline)",
        color: selected
          ? "var(--color-primary)"
          : "var(--color-on-surface-low)",
      }}
    >
      {icon && (
        <MaterialIcon
          name={icon}
          size={16}
          filled={selected}
          style={{
            color: selected
              ? "var(--color-primary)"
              : "var(--color-on-surface-low)",
          }}
        />
      )}
      {label}
    </button>
  );
}

/* ─── StatusBadge ────────────────────────────────────────────────────── */
type Status = "pending" | "processing" | "resolved";

const statusConfig: Record<
  Status,
  { label: string; bg: string; color: string; icon: string }
> = {
  pending: {
    label: "รอดำเนินการ",
    bg: "var(--color-pending-bg)",
    color: "var(--color-pending)",
    icon: "schedule",
  },
  processing: {
    label: "กำลังดำเนินการ",
    bg: "var(--color-processing-bg)",
    color: "var(--color-processing)",
    icon: "directions_run",
  },
  resolved: {
    label: "เสร็จสิ้น",
    bg: "var(--color-resolved-bg)",
    color: "var(--color-resolved)",
    icon: "check_circle",
  },
};

interface StatusBadgeProps {
  status: Status;
  size?: "sm" | "md";
}

export function StatusBadge({ status, size = "md" }: StatusBadgeProps) {
  const cfg = statusConfig[status];
  const isSmall = size === "sm";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-medium ${
        isSmall ? "px-2 py-0.5 text-[11px]" : "px-3 py-1 text-xs"
      }`}
      style={{ backgroundColor: cfg.bg, color: cfg.color }}
    >
      <MaterialIcon
        name={cfg.icon}
        size={isSmall ? 12 : 14}
        filled
        style={{ color: cfg.color }}
      />
      {cfg.label}
    </span>
  );
}

/* ─── TextField ──────────────────────────────────────────────────────── */
interface TextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  error?: string;
  multiline?: boolean;
  rows?: number;
  leadingIcon?: string;
  trailingIcon?: string;
  onTrailingClick?: () => void;
}

export function TextField({
  label,
  error,
  multiline = false,
  rows = 4,
  leadingIcon,
  trailingIcon,
  onTrailingClick,
  className = "",
  ...props
}: TextFieldProps) {
  const baseInputClass = [
    "w-full bg-surface-variant rounded-xl px-4 py-3 text-sm text-on-surface",
    "border border-transparent focus:border-primary focus:outline-none transition-colors",
    "placeholder:text-on-surface-faint",
    leadingIcon ? "pl-10" : "",
    trailingIcon ? "pr-10" : "",
    error ? "border-error" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="flex flex-col gap-1 w-full">
      <label
        className="text-xs font-medium"
        style={{ color: error ? "var(--color-error)" : "var(--color-on-surface-low)" }}
      >
        {label}
      </label>
      <div className="relative">
        {leadingIcon && (
          <MaterialIcon
            name={leadingIcon}
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: "var(--color-on-surface-faint)" }}
          />
        )}
        {multiline ? (
          <textarea
            rows={rows}
            className={baseInputClass}
            style={{ resize: "none" }}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            className={baseInputClass}
            {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
        {trailingIcon && (
          <button
            type="button"
            onClick={onTrailingClick}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <MaterialIcon
              name={trailingIcon}
              size={18}
              style={{ color: "var(--color-on-surface-faint)" }}
            />
          </button>
        )}
      </div>
      {error && (
        <span
          className="text-xs"
          style={{ color: "var(--color-error)" }}
        >
          {error}
        </span>
      )}
    </div>
  );
}

/* ─── Avatar ─────────────────────────────────────────────────────────── */
interface AvatarProps {
  name: string;
  size?: number;
  imageUrl?: string;
}

const AVATAR_COLORS = [
  "#1a73e8",
  "#1e8e3e",
  "#e8710a",
  "#d93025",
  "#7c4dff",
];

export function Avatar({ name, size = 40, imageUrl }: AvatarProps) {
  const initial = name.charAt(0).toUpperCase();
  const colorIndex =
    name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) %
    AVATAR_COLORS.length;
  const bg = AVATAR_COLORS[colorIndex];

  if (imageUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={imageUrl}
        alt={name}
        width={size}
        height={size}
        className="rounded-full object-cover shrink-0"
      />
    );
  }

  return (
    <span
      className="rounded-full flex items-center justify-center shrink-0 font-medium text-white"
      style={{
        width: size,
        height: size,
        backgroundColor: bg,
        fontSize: size * 0.4,
      }}
      aria-label={name}
    >
      {initial}
    </span>
  );
}

/* ─── EmptyState ─────────────────────────────────────────────────────── */
interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({
  icon = "inbox",
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 px-8 text-center">
      <MaterialIcon
        name={icon}
        size={56}
        style={{ color: "var(--color-outline-strong)" }}
      />
      <p
        className="text-base font-medium"
        style={{ color: "var(--color-on-surface-mid)" }}
      >
        {title}
      </p>
      {description && (
        <p
          className="text-sm leading-relaxed"
          style={{ color: "var(--color-on-surface-faint)" }}
        >
          {description}
        </p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

/* ─── LoadingSkeleton ────────────────────────────────────────────────── */
interface SkeletonProps {
  className?: string;
  lines?: number;
}

export function Skeleton({ className = "", lines = 1 }: SkeletonProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-lg"
          style={{
            height: 16,
            width: i === lines - 1 && lines > 1 ? "60%" : "100%",
            backgroundColor: "var(--color-surface-variant)",
          }}
        />
      ))}
    </div>
  );
}

/* ─── Divider ────────────────────────────────────────────────────────── */
export function Divider({ className = "" }: { className?: string }) {
  return (
    <hr
      className={`border-0 h-px ${className}`}
      style={{ backgroundColor: "var(--color-outline)" }}
    />
  );
}
