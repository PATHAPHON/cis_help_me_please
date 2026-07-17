"use client";

import { useState } from "react";
import { Avatar, Chip, Divider } from "@/shared/components/ui";
import MaterialIcon from "@/shared/components/icons/MaterialIcon";
import { roleMeta } from "@/features/users/utils/roleMeta";
import type { MockUser, Role } from "@/shared/types";

interface UserCardProps {
  user: MockUser;
  onRoleChange?: (userId: string, newRole: Role) => void;
  editable?: boolean;
}

const ROLES: Role[] = ["user", "staff", "admin"];

export default function UserCard({
  user,
  onRoleChange,
  editable = false,
}: UserCardProps) {
  const [editing, setEditing] = useState(false);
  const meta = roleMeta[user.role];

  return (
    <div className="flex items-start gap-3 p-4">
      <Avatar name={user.name} size={44} />

      <div className="flex-1 min-w-0">
        {/* Name + role badge */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="font-medium text-sm truncate" style={{ color: "var(--color-on-surface)" }}>
              {user.name}
            </p>
            <p className="text-xs mt-0.5 truncate" style={{ color: "var(--color-on-surface-faint)" }}>
              {user.phone}
            </p>
            {user.studentId && (
              <p className="text-xs" style={{ color: "var(--color-on-surface-faint)" }}>
                รหัส: {user.studentId}
              </p>
            )}
          </div>

          {editable ? (
            <button
              onClick={() => setEditing((e) => !e)}
              className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium shrink-0"
              style={{
                backgroundColor: "var(--color-surface-variant)",
                color: meta.color,
              }}
            >
              <MaterialIcon name={meta.icon} size={14} style={{ color: meta.color }} />
              {meta.label}
              <MaterialIcon
                name={editing ? "expand_less" : "expand_more"}
                size={14}
                style={{ color: "var(--color-on-surface-faint)" }}
              />
            </button>
          ) : (
            <span
              className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium shrink-0"
              style={{ backgroundColor: "var(--color-surface-variant)", color: meta.color }}
            >
              <MaterialIcon name={meta.icon} size={14} style={{ color: meta.color }} />
              {meta.label}
            </span>
          )}
        </div>

        {/* Residence */}
        <p className="text-xs mt-1 truncate" style={{ color: "var(--color-on-surface-faint)" }}>
          <MaterialIcon name="apartment" size={11} className="mr-0.5" style={{ color: "var(--color-on-surface-faint)" }} />
          {user.residence}
        </p>

        {/* Inline role selector */}
        {editing && onRoleChange && (
          <div className="flex gap-2 mt-3 flex-wrap">
            {ROLES.map((r) => (
              <Chip
                key={r}
                label={roleMeta[r].label}
                selected={user.role === r}
                icon={roleMeta[r].icon}
                onClick={() => {
                  onRoleChange(user.id, r);
                  setEditing(false);
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
