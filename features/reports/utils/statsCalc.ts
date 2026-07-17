import type { Incident } from "@/shared/types";

export interface CategoryStat {
  category: string;
  count: number;
  pct: number;
}

export interface StatusStat {
  status: string;
  count: number;
  pct: number;
}

/** Average response time in minutes (resolved only) */
export function calcAvgResponseMins(incidents: Incident[]): number {
  const resolved = incidents.filter((i) => i.status === "resolved");
  if (resolved.length === 0) return 0;
  const totalMs = resolved.reduce(
    (sum, i) =>
      sum + (new Date(i.updatedAt).getTime() - new Date(i.createdAt).getTime()),
    0
  );
  return Math.floor(totalMs / resolved.length / 60000);
}

/** Count per category, sorted descending */
export function calcCategoryStats(incidents: Incident[]): CategoryStat[] {
  const map: Record<string, number> = {};
  for (const inc of incidents) {
    map[inc.category] = (map[inc.category] ?? 0) + 1;
  }
  const total = incidents.length || 1;
  return Object.entries(map)
    .map(([category, count]) => ({
      category,
      count,
      pct: Math.round((count / total) * 100),
    }))
    .sort((a, b) => b.count - a.count);
}

/** Count per status */
export function calcStatusStats(incidents: Incident[]): StatusStat[] {
  const total = incidents.length || 1;
  return (["pending", "processing", "resolved"] as const).map((status) => {
    const count = incidents.filter((i) => i.status === status).length;
    return { status, count, pct: Math.round((count / total) * 100) };
  });
}
