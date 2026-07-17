"use client";

import { ReactNode } from "react";
import MaterialIcon from "@/shared/components/icons/MaterialIcon";
import { useRouter } from "next/navigation";

interface AppBarProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  trailing?: ReactNode;
  transparent?: boolean;
}

export default function AppBar({
  title,
  showBack = false,
  onBack,
  trailing,
  transparent = false,
}: AppBarProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <header
      className="sticky top-0 z-40 flex items-center gap-1 px-2 w-full"
      style={{
        height: "var(--top-bar-height)",
        backgroundColor: transparent ? "transparent" : "var(--color-surface)",
        borderBottom: transparent
          ? "none"
          : "1px solid var(--color-outline)",
      }}
    >
      {showBack && (
        <button
          onClick={handleBack}
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-surface-variant active:bg-surface-variant transition-colors shrink-0"
          aria-label="ย้อนกลับ"
        >
          <MaterialIcon
            name="arrow_back"
            size={24}
            style={{ color: "var(--color-on-surface)" }}
          />
        </button>
      )}

      <h1
        className="flex-1 text-lg font-medium truncate px-2"
        style={{ color: "var(--color-on-surface)" }}
      >
        {title}
      </h1>

      {trailing && <div className="flex items-center shrink-0">{trailing}</div>}
    </header>
  );
}
