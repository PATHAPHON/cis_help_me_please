"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "filled" | "tonal" | "outlined" | "text" | "icon";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  children: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  filled:
    "bg-primary text-on-primary hover:brightness-95 active:brightness-90 shadow-sm",
  tonal:
    "bg-primary-light text-primary hover:brightness-95 active:brightness-90",
  outlined:
    "border border-outline text-primary bg-transparent hover:bg-primary-light active:bg-primary-light",
  text: "text-primary bg-transparent hover:bg-primary-light active:bg-primary-light",
  icon: "text-on-surface-low bg-transparent hover:bg-surface-variant active:bg-surface-variant rounded-full",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-4 text-xs gap-1",
  md: "h-10 px-5 text-sm gap-2",
  lg: "h-12 px-6 text-base gap-2",
};

export default function Button({
  variant = "filled",
  size = "md",
  fullWidth = false,
  loading = false,
  disabled,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const isIcon = variant === "icon";

  return (
    <button
      disabled={disabled || loading}
      className={[
        "inline-flex items-center justify-center font-medium transition-all select-none",
        "focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2",
        "disabled:opacity-40 disabled:pointer-events-none",
        isIcon ? "w-10 h-10 p-0" : `rounded-full ${sizeStyles[size]}`,
        variantStyles[variant],
        fullWidth ? "w-full" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {loading ? (
        <span
          className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
          aria-label="กำลังโหลด"
        />
      ) : (
        children
      )}
    </button>
  );
}
