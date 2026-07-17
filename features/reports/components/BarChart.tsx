import MaterialIcon from "@/shared/components/icons/MaterialIcon";

interface BarChartRow {
  label: string;
  icon: string;
  iconColor: string;
  iconBg: string;
  value: number;
  maxValue: number;
  barColor: string;
  displayValue?: string;
}

interface BarChartProps {
  title: string;
  rows: BarChartRow[];
}

export default function BarChart({ title, rows }: BarChartProps) {
  return (
    <div>
      <p className="text-sm font-medium mb-4" style={{ color: "var(--color-on-surface-mid)" }}>
        {title}
      </p>
      <div className="flex flex-col gap-3">
        {rows.map((row) => {
          const pct = row.maxValue > 0 ? (row.value / row.maxValue) * 100 : 0;
          return (
            <div key={row.label} className="flex items-center gap-3">
              {/* Icon */}
              <span
                className="flex items-center justify-center rounded-lg shrink-0"
                style={{ width: 32, height: 32, backgroundColor: row.iconBg }}
              >
                <MaterialIcon
                  name={row.icon}
                  filled
                  size={16}
                  style={{ color: row.iconColor }}
                />
              </span>

              {/* Bar */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span
                    className="text-xs font-medium"
                    style={{ color: "var(--color-on-surface-mid)" }}
                  >
                    {row.label}
                  </span>
                  <span
                    className="text-xs font-bold"
                    style={{ color: row.barColor }}
                  >
                    {row.displayValue ?? row.value}
                  </span>
                </div>
                <div
                  className="w-full rounded-full overflow-hidden"
                  style={{ height: 8, backgroundColor: "var(--color-surface-variant)" }}
                >
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${pct}%`, backgroundColor: row.barColor }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
