import { CSSProperties } from "react";

interface MaterialIconProps {
  name: string;
  filled?: boolean;
  size?: number | string;
  className?: string;
  style?: CSSProperties;
  "aria-hidden"?: boolean;
  "aria-label"?: string;
}

/**
 * Wrapper for Material Symbols Rounded icon font.
 * Usage: <MaterialIcon name="emergency" filled />
 */
export default function MaterialIcon({
  name,
  filled = false,
  size = 24,
  className = "",
  style,
  "aria-hidden": ariaHidden = true,
  "aria-label": ariaLabel,
}: MaterialIconProps) {
  const sizeStr = typeof size === "number" ? `${size}px` : size;

  return (
    <span
      className={`material-symbols-rounded${filled ? " filled" : ""} select-none ${className}`}
      style={{
        fontSize: sizeStr,
        lineHeight: 1,
        ...style,
      }}
      aria-hidden={ariaHidden}
      aria-label={ariaLabel}
      role={ariaLabel ? "img" : undefined}
    >
      {name}
    </span>
  );
}
