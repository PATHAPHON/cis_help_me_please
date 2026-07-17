import type { IncidentCategory } from "@/shared/types";

export const categoryMeta: Record<
  IncidentCategory,
  { label: string; icon: string; color: string; bg: string }
> = {
  accident: {
    label: "อุบัติเหตุ",
    icon: "personal_injury",
    color: "var(--color-accident)",
    bg: "#fff3e0",
  },
  sickness: {
    label: "เจ็บป่วย",
    icon: "local_hospital",
    color: "var(--color-sickness)",
    bg: "#fce8e6",
  },
  violence: {
    label: "ความรุนแรง",
    icon: "warning",
    color: "var(--color-violence)",
    bg: "#ede7f6",
  },
  fight: {
    label: "ทะเลาะวิวาท",
    icon: "groups",
    color: "var(--color-fight)",
    bg: "#ffebee",
  },
  fire: {
    label: "เพลิงไหม้",
    icon: "local_fire_department",
    color: "var(--color-fire)",
    bg: "#fbe9e7",
  },
  other: {
    label: "อื่นๆ",
    icon: "help",
    color: "var(--color-other)",
    bg: "#f1f3f4",
  },
};
