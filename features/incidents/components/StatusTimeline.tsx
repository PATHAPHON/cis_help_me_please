import MaterialIcon from "@/shared/components/icons/MaterialIcon";
import type { IncidentStatus } from "@/shared/types";

const STATUS_STEPS: { status: IncidentStatus; label: string; icon: string }[] = [
  { status: "pending",    label: "รับเรื่องแล้ว",    icon: "schedule" },
  { status: "processing", label: "กำลังดำเนินการ",  icon: "directions_run" },
  { status: "resolved",   label: "ช่วยเหลือสำเร็จ", icon: "check_circle" },
];

const STATUS_ORDER: Record<IncidentStatus, number> = {
  pending: 0,
  processing: 1,
  resolved: 2,
};

interface StatusTimelineProps {
  currentStatus: IncidentStatus;
}

export default function StatusTimeline({ currentStatus }: StatusTimelineProps) {
  const currentStep = STATUS_ORDER[currentStatus];

  return (
    <div className="flex flex-col gap-0">
      {STATUS_STEPS.map((step, idx) => {
        const stepOrder = STATUS_ORDER[step.status];
        const isDone    = stepOrder < currentStep;
        const isCurrent = stepOrder === currentStep;
        const isPending = stepOrder > currentStep;
        const isLast    = idx === STATUS_STEPS.length - 1;

        return (
          <div key={step.status} className="flex gap-4">
            {/* Dot + connector line */}
            <div className="flex flex-col items-center" style={{ width: 28 }}>
              <span
                className="flex items-center justify-center rounded-full shrink-0"
                style={{
                  width: 28,
                  height: 28,
                  backgroundColor: isPending
                    ? "var(--color-surface-variant)"
                    : isCurrent
                    ? "var(--color-primary-light)"
                    : "var(--color-resolved-bg)",
                  border: isCurrent
                    ? "2px solid var(--color-primary)"
                    : "2px solid transparent",
                }}
              >
                <MaterialIcon
                  name={isDone ? "check" : step.icon}
                  filled={!isPending}
                  size={14}
                  style={{
                    color: isPending
                      ? "var(--color-outline-strong)"
                      : isCurrent
                      ? "var(--color-primary)"
                      : "var(--color-resolved)",
                  }}
                />
              </span>

              {!isLast && (
                <div
                  className="w-0.5 flex-1 min-h-[24px]"
                  style={{
                    backgroundColor: isDone
                      ? "var(--color-resolved)"
                      : "var(--color-outline)",
                  }}
                />
              )}
            </div>

            {/* Label */}
            <div className="pb-5">
              <p
                className="text-sm font-medium leading-7"
                style={{
                  color: isPending
                    ? "var(--color-on-surface-faint)"
                    : isCurrent
                    ? "var(--color-primary)"
                    : "var(--color-resolved)",
                }}
              >
                {step.label}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
