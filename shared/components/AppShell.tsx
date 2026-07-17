"use client";

import { ReactNode } from "react";
import { useAuth } from "@/shared/contexts/AuthContext";
import BottomNav, { NavItem } from "@/shared/components/ui/BottomNav";
import type { Role } from "@/shared/types";

const NAV_CONFIG: Record<Role, NavItem[]> = {
  user: [
    { label: "หน้าแรก", href: "/home", icon: "home", iconFilled: "home" },
    { label: "รายการของฉัน", href: "/my-reports", icon: "list_alt", iconFilled: "list_alt" },
    { label: "โปรไฟล์", href: "/profile", icon: "person", iconFilled: "person" },
  ],
  staff: [
    { label: "เหตุใหม่", href: "/incidents", icon: "notifications_active", iconFilled: "notifications_active" },
    { label: "แดชบอร์ด", href: "/dashboard", icon: "dashboard", iconFilled: "dashboard", primary: true },
    { label: "โปรไฟล์", href: "/profile", icon: "person", iconFilled: "person" },
  ],
  admin: [
    { label: "สถิติ", href: "/stats", icon: "bar_chart", iconFilled: "bar_chart" },
    { label: "ผู้ใช้", href: "/users", icon: "group", iconFilled: "group" },
    { label: "โปรไฟล์", href: "/profile", icon: "person", iconFilled: "person" },
  ],
};

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const { role } = useAuth();
  const navItems = role ? NAV_CONFIG[role] : [];

  return (
    <div className="flex flex-col w-full min-h-dvh">
      <main className="flex-1 pb-nav overflow-y-auto">
        {children}
      </main>
      {role && <BottomNav items={navItems} />}
    </div>
  );
}
