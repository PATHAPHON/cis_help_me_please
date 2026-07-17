import type { Role } from "@/shared/types";

export const roleMeta: Record<
  Role,
  { label: string; icon: string; color: string }
> = {
  user: {
    label: "ผู้แจ้งเหตุ",
    icon: "person",
    color: "var(--color-primary)",
  },
  staff: {
    label: "เจ้าหน้าที่",
    icon: "security",
    color: "var(--color-resolved)",
  },
  admin: {
    label: "ผู้ดูแลระบบ",
    icon: "admin_panel_settings",
    color: "var(--color-violence)",
  },
};
