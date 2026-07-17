import Card from "@/shared/components/ui/Card";
import MaterialIcon from "@/shared/components/icons/MaterialIcon";

interface KPICardProps {
  label: string;
  value: number | string;
  icon: string;
  color: string;
  bg: string;
  subLabel?: string;
}

export default function KPICard({
  label,
  value,
  icon,
  color,
  bg,
  subLabel,
}: KPICardProps) {
  return (
    <Card elevated padding="md">
      <div className="flex items-center gap-3">
        <span
          className="flex items-center justify-center rounded-xl shrink-0"
          style={{ width: 44, height: 44, backgroundColor: bg }}
        >
          <MaterialIcon name={icon} filled size={24} style={{ color }} />
        </span>
        <div className="min-w-0">
          <p className="text-2xl font-bold leading-tight" style={{ color }}>
            {value}
          </p>
          <p className="text-xs" style={{ color: "var(--color-on-surface-faint)" }}>
            {label}
          </p>
          {subLabel && (
            <p className="text-[10px] mt-0.5 truncate" style={{ color: "var(--color-on-surface-faint)" }}>
              {subLabel}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
