import { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  elevated?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const paddingStyles = {
  none: "",
  sm: "p-3",
  md: "p-4",
  lg: "p-5",
};

export default function Card({
  children,
  elevated = false,
  padding = "md",
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      className={[
        "bg-surface rounded-xl",
        elevated ? "shadow-sm" : "border border-outline",
        paddingStyles[padding],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={
        elevated
          ? { boxShadow: "var(--shadow-sm)" }
          : { borderColor: "var(--color-outline)" }
      }
      {...props}
    >
      {children}
    </div>
  );
}
