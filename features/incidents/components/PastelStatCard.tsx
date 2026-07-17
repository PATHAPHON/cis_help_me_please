import MaterialIcon from "@/shared/components/icons/MaterialIcon";

type CardVariant = "blue" | "purple" | "green" | "yellow";

const variantStyles: Record<CardVariant, string> = {
  blue: "var(--color-card-blue)",
  purple: "var(--color-card-purple)",
  green: "var(--color-card-green)",
  yellow: "var(--color-card-yellow)",
};

interface PastelStatCardProps {
  label: string;
  value: number | string;
  unit?: string;
  icon: string;
  variant: CardVariant;
}

export default function PastelStatCard({
  label,
  value,
  unit,
  icon,
  variant,
}: PastelStatCardProps) {
  return (
    <div
      className="flex flex-col gap-3 rounded-3xl p-4 min-h-[140px]"
      style={{ backgroundColor: variantStyles[variant] }}
    >
      {/* Icon badge */}
      <span
        className="flex items-center justify-center w-10 h-10 rounded-full"
        style={{ backgroundColor: "rgba(255,255,255,0.7)" }}
      >
        <MaterialIcon name={icon} size={20} style={{ color: "var(--color-on-surface)" }} />
      </span>

      {/* Label */}
      <p className="text-xs font-medium" style={{ color: "var(--color-on-surface-mid)" }}>
        {label}
      </p>

      {/* Value */}
      <p className="text-3xl font-bold leading-none" style={{ color: "var(--color-on-surface)" }}>
        {value}
        {unit && (
          <span className="text-sm font-normal ml-0.5" style={{ color: "var(--color-on-surface-low)" }}>
            {unit}
          </span>
        )}
      </p>
    </div>
  );
}
