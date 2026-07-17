"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import type {
  Incident,
  IncidentStatus,
  IncidentCategory,
  RescueLog,
} from "@/shared/types";
import { SEED_INCIDENTS } from "@/features/incidents/mock/seed-incidents";

interface CreateIncidentInput {
  reporterId: string;
  reporterName: string;
  category: IncidentCategory;
  description: string;
  locationName: string;
  latitude?: number;
  longitude?: number;
  imageUrl?: string;
}

interface AddRescueLogInput {
  incidentId: string;
  staffId: string;
  staffName: string;
  actionTaken: string;
}

interface IncidentsContextValue {
  incidents: Incident[];
  getById: (id: string) => Incident | undefined;
  getByReporter: (reporterId: string) => Incident[];
  createIncident: (input: CreateIncidentInput) => Incident;
  updateStatus: (id: string, status: IncidentStatus) => void;
  addRescueLog: (input: AddRescueLogInput) => void;
}

const IncidentsContext = createContext<IncidentsContextValue | null>(null);

export function IncidentsProvider({ children }: { children: ReactNode }) {
  const [incidents, setIncidents] = useState<Incident[]>(SEED_INCIDENTS);

  const getById = useCallback(
    (id: string) => incidents.find((i) => i.id === id),
    [incidents]
  );

  const getByReporter = useCallback(
    (reporterId: string) =>
      incidents.filter((i) => i.reporterId === reporterId),
    [incidents]
  );

  const createIncident = useCallback(
    (input: CreateIncidentInput): Incident => {
      const now = new Date().toISOString();
      const newIncident: Incident = {
        id: `i${Date.now()}`,
        ...input,
        status: "pending",
        createdAt: now,
        updatedAt: now,
        rescueLogs: [],
      };
      setIncidents((prev) => [newIncident, ...prev]);
      return newIncident;
    },
    []
  );

  const updateStatus = useCallback(
    (id: string, status: IncidentStatus) => {
      setIncidents((prev) =>
        prev.map((i) =>
          i.id === id
            ? { ...i, status, updatedAt: new Date().toISOString() }
            : i
        )
      );
    },
    []
  );

  const addRescueLog = useCallback(
    ({ incidentId, staffId, staffName, actionTaken }: AddRescueLogInput) => {
      const log: RescueLog = {
        id: `rl${Date.now()}`,
        incidentId,
        staffId,
        staffName,
        actionTaken,
        createdAt: new Date().toISOString(),
      };
      setIncidents((prev) =>
        prev.map((i) =>
          i.id === incidentId
            ? {
                ...i,
                rescueLogs: [...i.rescueLogs, log],
                updatedAt: new Date().toISOString(),
              }
            : i
        )
      );
    },
    []
  );

  return (
    <IncidentsContext.Provider
      value={{
        incidents,
        getById,
        getByReporter,
        createIncident,
        updateStatus,
        addRescueLog,
      }}
    >
      {children}
    </IncidentsContext.Provider>
  );
}

export function useIncidents(): IncidentsContextValue {
  const ctx = useContext(IncidentsContext);
  if (!ctx)
    throw new Error("useIncidents must be used within IncidentsProvider");
  return ctx;
}
