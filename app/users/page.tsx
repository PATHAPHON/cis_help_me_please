"use client";

import { useState } from "react";

import AppShell from "@/shared/components/AppShell";
import { Avatar, Chip } from "@/shared/components/ui/index";
import MaterialIcon from "@/shared/components/icons/MaterialIcon";
import { MOCK_USERS } from "@/features/users/mock/seed-users";
import { roleMeta } from "@/features/users/utils/roleMeta";
import type { Role, MockUser } from "@/shared/types";

const ROLES: Role[] = ["user", "staff", "admin"];

// Pastel bg per role
const ROLE_CARD_BG: Record<Role, string> = {
  user: "var(--color-card-blue)",
  staff: "var(--color-card-green)",
  admin: "var(--color-card-purple)",
};

export default function UsersPage() {

  const [users, setUsers] = useState<MockUser[]>(MOCK_USERS);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<Role | "all">("all");

  const handleRoleChange = (userId: string, newRole: Role) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );
    setEditingId(null);
  };

  const filteredUsers =
    filter === "all" ? users : users.filter((u) => u.role === filter);

  return (
    <AppShell>
      <div className="flex flex-col h-full mx-auto w-full max-w-[480px]">
        {/* Fixed top section */}
        <div className="flex flex-col gap-4 px-4 pt-6 pb-3 fade-up shrink-0">
        {/* Header — title + count */}
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-xs" style={{ color: "var(--color-on-surface-low)" }}>
              จัดการสมาชิก
            </p>
            <p className="text-base font-bold text-on-surface truncate">
              ผู้ใช้ทั้งหมด
            </p>
          </div>

          <span
            className="flex items-center justify-center w-10 h-10 rounded-full shrink-0"
            style={{
              backgroundColor: "var(--color-primary-light)",
              color: "var(--color-primary)",
              boxShadow: "0 1px 3px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.05)",
            }}
          >
            <MaterialIcon name="group" filled size={20} />
          </span>
        </div>

        {/* Hero card — total users */}
        <div
          className="relative rounded-3xl p-5 overflow-hidden"
          style={{ backgroundColor: "var(--color-card-green)" }}
        >
          <div className="flex gap-4">
            <div className="flex-1 flex flex-col justify-between min-h-[140px]">
              <span
                className="flex items-center justify-center w-11 h-11 rounded-full"
                style={{ backgroundColor: "rgba(255,255,255,0.7)" }}
              >
                <MaterialIcon
                  name="groups"
                  size={22}
                  style={{ color: "var(--color-on-surface)" }}
                />
              </span>

              <div>
                <p
                  className="text-xs font-medium mb-1"
                  style={{ color: "var(--color-on-surface-mid)" }}
                >
                  จำนวนผู้ใช้ในระบบ
                </p>
                <h2 className="text-3xl font-bold text-on-surface leading-none">
                  {users.length}
                  <span
                    className="text-sm font-normal ml-1"
                    style={{ color: "var(--color-on-surface-low)" }}
                  >
                    คน
                  </span>
                </h2>
              </div>
            </div>

            <div
              className="flex items-center justify-center rounded-2xl shrink-0"
              style={{
                width: 110,
                height: 140,
                backgroundColor: "rgba(255,255,255,0.85)",
              }}
            >
              <MaterialIcon
                name="diversity_3"
                filled
                size={60}
                style={{ color: "var(--color-resolved)" }}
              />
            </div>
          </div>
        </div>

        {/* Role summary — pastel stat cards (3 cols) */}
        <div className="grid grid-cols-3 gap-3">
          {ROLES.map((r) => {
            const meta = roleMeta[r];
            const count = users.filter((u) => u.role === r).length;
            const active = filter === r;
            return (
              <button
                key={r}
                onClick={() => setFilter(active ? "all" : r)}
                className="flex flex-col gap-2 rounded-3xl p-3 min-h-[110px] transition-all active:scale-[0.97] text-left"
                style={{
                  backgroundColor: ROLE_CARD_BG[r],
                  outline: active ? `2px solid ${meta.color}` : "none",
                  outlineOffset: "-2px",
                }}
              >
                <span
                  className="flex items-center justify-center w-8 h-8 rounded-full"
                  style={{ backgroundColor: "rgba(255,255,255,0.7)" }}
                >
                  <MaterialIcon
                    name={meta.icon}
                    filled
                    size={16}
                    style={{ color: meta.color }}
                  />
                </span>
                <p
                  className="text-[11px] font-medium leading-tight"
                  style={{ color: "var(--color-on-surface-mid)" }}
                >
                  {meta.label}
                </p>
                <p
                  className="text-2xl font-bold leading-none"
                  style={{ color: "var(--color-on-surface)" }}
                >
                  {count}
                </p>
              </button>
            );
          })}
        </div>
        </div>

        {/* Filter indicator */}
        {filter !== "all" && (
          <div className="flex items-center justify-between px-4 pb-2 shrink-0">
            <p
              className="text-xs"
              style={{ color: "var(--color-on-surface-low)" }}
            >
              แสดง {filteredUsers.length} คน · กรอง: {roleMeta[filter].label}
            </p>
            <button
              onClick={() => setFilter("all")}
              className="text-xs font-medium"
              style={{ color: "var(--color-primary)" }}
            >
              ล้าง
            </button>
          </div>
        )}

        {/* Scrollable user list */}
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          <div className="flex flex-col gap-3">
          {filteredUsers.map((u) => {
            const meta = roleMeta[u.role];
            const isEditing = editingId === u.id;

            return (
              <div
                key={u.id}
                className="rounded-3xl bg-surface p-4"
                style={{
                  boxShadow: "0 1px 3px rgba(0,0,0,.06), 0 1px 2px rgba(0,0,0,.04)",
                }}
              >
                <div className="flex items-start gap-3">
                  <Avatar name={u.name} size={44} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-semibold text-sm text-on-surface truncate">
                          {u.name}
                        </p>
                        <p
                          className="text-xs mt-0.5 truncate"
                          style={{ color: "var(--color-on-surface-faint)" }}
                        >
                          {u.phone}
                        </p>
                        {u.studentId && (
                          <p
                            className="text-xs"
                            style={{ color: "var(--color-on-surface-faint)" }}
                          >
                            รหัส: {u.studentId}
                          </p>
                        )}
                      </div>

                      <button
                        onClick={() => setEditingId(isEditing ? null : u.id)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium shrink-0 transition-all active:scale-95"
                        style={{
                          backgroundColor: ROLE_CARD_BG[u.role],
                          color: meta.color,
                        }}
                      >
                        <MaterialIcon
                          name={meta.icon}
                          size={14}
                          style={{ color: meta.color }}
                        />
                        {meta.label}
                        <MaterialIcon
                          name={isEditing ? "expand_less" : "expand_more"}
                          size={14}
                          style={{ color: meta.color }}
                        />
                      </button>
                    </div>

                    <p
                      className="text-xs mt-2 truncate flex items-center gap-1"
                      style={{ color: "var(--color-on-surface-faint)" }}
                    >
                      <MaterialIcon
                        name="apartment"
                        size={12}
                        style={{ color: "var(--color-on-surface-faint)" }}
                      />
                      {u.residence}
                    </p>

                    {isEditing && (
                      <div className="flex gap-2 mt-3 flex-wrap">
                        {ROLES.map((r) => (
                          <Chip
                            key={r}
                            label={roleMeta[r].label}
                            selected={u.role === r}
                            onClick={() => handleRoleChange(u.id, r)}
                            icon={roleMeta[r].icon}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {filteredUsers.length === 0 && (
            <div
              className="rounded-3xl p-8 text-center"
              style={{ backgroundColor: "var(--color-surface-variant)" }}
            >
              <MaterialIcon
                name="person_off"
                size={40}
                style={{ color: "var(--color-on-surface-faint)" }}
              />
              <p
                className="text-sm mt-2"
                style={{ color: "var(--color-on-surface-faint)" }}
              >
                ไม่มีผู้ใช้ในกลุ่มนี้
              </p>
            </div>
          )}
        </div>
        </div>
      </div>
    </AppShell>
  );
}
