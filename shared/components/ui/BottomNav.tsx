"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import MaterialIcon from "@/shared/components/icons/MaterialIcon";

export interface NavItem {
  label: string;
  href: string;
  icon: string;
  iconFilled?: string;
  primary?: boolean;
}

interface BottomNavProps {
  items: NavItem[];
}

export default function BottomNav({ items }: BottomNavProps) {
  const pathname = usePathname();

  return (
    <div
      className="fixed bottom-0 left-1/2 -translate-x-1/2 z-40 w-full max-w-[480px] flex justify-center pointer-events-none"
      style={{ paddingBottom: "var(--safe-bottom)" }}
    >
      <nav
        className="flex items-center gap-4 pointer-events-auto mx-auto mb-3 h-16 rounded-full bg-surface px-5"
        style={{
          boxShadow: "0 4px 20px rgba(0,0,0,.08), 0 1px 4px rgba(0,0,0,.05)",
        }}
      >
        {items.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center justify-center w-12 h-12 rounded-full transition-all"
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
              style={{
                backgroundColor: isActive
                  ? "var(--color-nav-dark)"
                  : "transparent",
              }}
            >
              <MaterialIcon
                name={isActive && item.iconFilled ? item.iconFilled : item.icon}
                filled={isActive}
                size={24}
                style={{
                  color: isActive
                    ? "#ffffff"
                    : "var(--color-on-surface-low)",
                }}
              />
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
