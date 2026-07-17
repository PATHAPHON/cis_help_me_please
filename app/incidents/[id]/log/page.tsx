"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/shared/components/ui/Button";
import { TextField } from "@/shared/components/ui/index";
import MaterialIcon from "@/shared/components/icons/MaterialIcon";
import { useIncidents } from "@/features/incidents/hooks/useIncidents";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { categoryMeta } from "@/features/incidents/utils/categoryMeta";

export default function RescueLogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { user } = useAuth();
  const { getById, addRescueLog, updateStatus } = useIncidents();

  const [action, setAction] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const incident = getById(id);

  if (!incident) return null;

  const catM = categoryMeta[incident.category];

  const handleSave = async () => {
    if (!action.trim()) {
      setError("กรุณากรอกรายละเอียดการดำเนินการ");
      return;
    }
    if (!user) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));

    addRescueLog({
      incidentId: id,
      staffId: user.id,
      staffName: user.name,
      actionTaken: action.trim(),
    });
    updateStatus(id, "resolved");
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col min-h-dvh bg-surface">
      <main className="flex-1 px-4 py-5 flex flex-col gap-5 fade-up">
        {/* Incident summary */}
        <div
          className="flex items-center gap-3 p-4 rounded-2xl"
          style={{ backgroundColor: catM.bg }}
        >
          <MaterialIcon name={catM.icon} filled size={28} style={{ color: catM.color }} />
          <div>
            <p className="font-semibold text-sm" style={{ color: catM.color }}>
              {catM.label}
            </p>
            <p className="text-xs" style={{ color: "var(--color-on-surface-low)" }}>
              {incident.locationName}
            </p>
          </div>
        </div>

        {/* Map preview */}
        {incident.latitude && incident.longitude && (
          <div className="rounded-2xl overflow-hidden" style={{ height: 180 }}>
            <iframe
              title={`แผนที่: ${incident.locationName}`}
              src={`https://maps.google.com/maps?q=${incident.latitude},${incident.longitude}&z=17&output=embed`}
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        )}

        {/* Form */}
        <TextField
          label="รายละเอียดการดำเนินการ *"
          placeholder="เช่น เดินทางถึงจุดเกิดเหตุ ปฐมพยาบาลเบื้องต้น นำส่งห้องพยาบาล..."
          multiline
          rows={6}
          value={action}
          onChange={(e) => {
            setAction((e.target as HTMLTextAreaElement).value);
            setError("");
          }}
          error={error}
        />

        {/* Info */}
        <div
          className="flex items-start gap-3 p-4 rounded-xl"
          style={{ backgroundColor: "var(--color-resolved-bg)" }}
        >
          <MaterialIcon name="info" size={20} style={{ color: "var(--color-resolved)" }} />
          <p className="text-sm leading-relaxed" style={{ color: "var(--color-resolved)" }}>
            บันทึกนี้จะเปลี่ยนสถานะเหตุการณ์เป็น <strong>เสร็จสิ้น</strong> และส่งแจ้งเตือนไปยังผู้แจ้งเหตุ
          </p>
        </div>

        <Button
          variant="filled"
          size="lg"
          fullWidth
          loading={loading}
          onClick={handleSave}
          style={{ backgroundColor: "var(--color-resolved)" }}
        >
          <MaterialIcon name="check_circle" size={20} />
          บันทึกและปิดงาน
        </Button>
      </main>
    </div>
  );
}
