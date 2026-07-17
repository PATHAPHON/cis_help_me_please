/* ── Role ─────────────────────────────────────────────────────────────── */
export type Role = "user" | "staff" | "admin";

/* ── User ─────────────────────────────────────────────────────────────── */
export interface MockUser {
  id: string;
  name: string;
  phone: string;
  studentId?: string;
  residence: string;
  role: Role;
  email: string;
}

/* ── Incident ─────────────────────────────────────────────────────────── */
export type IncidentStatus = "pending" | "processing" | "resolved";

export type IncidentCategory =
  | "accident"
  | "sickness"
  | "violence"
  | "fight"
  | "fire"
  | "other";

export interface RescueLog {
  id: string;
  incidentId: string;
  staffId: string;
  staffName: string;
  actionTaken: string;
  createdAt: string; // ISO
}

export interface Incident {
  id: string;
  reporterId: string;
  reporterName: string;
  category: IncidentCategory;
  description: string;
  locationName: string;
  latitude?: number;
  longitude?: number;
  imageUrl?: string;
  status: IncidentStatus;
  createdAt: string; // ISO
  updatedAt: string; // ISO
  rescueLogs: RescueLog[];
}

/* ── Auth ─────────────────────────────────────────────────────────────── */
export interface AuthState {
  user: MockUser | null;
  role: Role | null;
  isLoggedIn: boolean;
}
