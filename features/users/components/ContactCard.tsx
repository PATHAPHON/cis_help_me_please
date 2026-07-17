"use client";

import { Avatar } from "@/shared/components/ui/index";
import MaterialIcon from "@/shared/components/icons/MaterialIcon";
import type { MockUser } from "@/shared/types";

interface ContactCardProps {
  user: MockUser;
  onCall?: () => void;
  onChat?: () => void;
}

export default function ContactCard({ user, onCall, onChat }: ContactCardProps) {
  return (
    <div
      className="flex items-center gap-3 rounded-3xl px-4 py-3"
      style={{ backgroundColor: "var(--color-card-yellow)" }}
    >
      {/* Avatar */}
      <Avatar name={user.name} size={48} />

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-on-surface truncate">{user.name}</p>
        <p className="text-xs" style={{ color: "var(--color-on-surface-mid)" }}>
          หัวหน้าเวรรักษาความปลอดภัย
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onCall}
          className="flex items-center justify-center w-10 h-10 rounded-full transition-all active:scale-90"
          style={{ backgroundColor: "rgba(255,255,255,0.7)" }}
          aria-label="โทร"
        >
          <MaterialIcon name="call" size={20} style={{ color: "var(--color-on-surface)" }} />
        </button>
        <button
          onClick={onChat}
          className="flex items-center justify-center w-10 h-10 rounded-full transition-all active:scale-90"
          style={{ backgroundColor: "rgba(255,255,255,0.7)" }}
          aria-label="แชท"
        >
          <MaterialIcon name="chat_bubble" size={20} style={{ color: "var(--color-on-surface)" }} />
        </button>
      </div>
    </div>
  );
}
