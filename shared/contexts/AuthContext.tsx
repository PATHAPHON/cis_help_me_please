"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import type { MockUser, Role } from "@/shared/types";
import { MOCK_USERS } from "@/features/users/mock/seed-users";

interface AuthContextValue {
  user: MockUser | null;
  role: Role | null;
  isLoggedIn: boolean;
  loginAs: (role: Role) => void;
  logout: () => void;
  updateUserRole: (userId: string, newRole: Role) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const ROLE_REDIRECT: Record<Role, string> = {
  user: "/home",
  staff: "/dashboard",
  admin: "/stats",
};

const STORAGE_KEY = "cis_auth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<MockUser | null>(null);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as MockUser;
        setTimeout(() => {
          setUser(parsed);
        }, 0);
      }
    } catch {
      // ignore
    }
  }, []);

  const loginAs = useCallback(
    (role: Role) => {
      const found = MOCK_USERS.find((u) => u.role === role) ?? MOCK_USERS[0];
      setUser(found);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(found));
      router.push(ROLE_REDIRECT[role]);
    },
    [router]
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
    router.push("/login");
  }, [router]);

  const updateUserRole = useCallback((userId: string, newRole: Role) => {
    // In mock context: just used by Admin to change role display
    if (user?.id === userId) {
      const updated = { ...user, role: newRole };
      setUser(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role ?? null,
        isLoggedIn: !!user,
        loginAs,
        logout,
        updateUserRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
