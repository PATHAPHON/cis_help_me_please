import type { IncidentStatus } from "@/shared/types";

export const statusMeta: Record<
  IncidentStatus,
  { label: string; icon: string; color: string; bg: string }
> = {
  pending: {
    label: "รอดำเนินการ",
    icon: "schedule",
    color: "var(--color-pending)",
    bg: "var(--color-pending-bg)",
  },
  processing: {
    label: "กำลังดำเนินการ",
    icon: "directions_run",
    color: "var(--color-processing)",
    bg: "var(--color-processing-bg)",
  },
  resolved: {
    label: "เสร็จสิ้น",
    icon: "check_circle",
    color: "var(--color-resolved)",
    bg: "var(--color-resolved-bg)",
  },
};
