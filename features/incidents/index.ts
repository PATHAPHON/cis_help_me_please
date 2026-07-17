// features/incidents — Public API
export { default as IncidentCard }    from "./components/IncidentCard";
export { default as ReportsSummaryCard } from "./components/ReportsSummaryCard";
export { default as StatusTimeline }  from "./components/StatusTimeline";
export { default as CategoryGrid }    from "./components/CategoryGrid";
export { useIncidents }               from "./hooks/useIncidents";
export { categoryMeta }               from "./utils/categoryMeta";
export { statusMeta }                 from "./utils/statusMeta";
export { SEED_INCIDENTS }             from "./mock/seed-incidents";
export type { Incident, IncidentStatus, IncidentCategory, RescueLog } from "./types";
