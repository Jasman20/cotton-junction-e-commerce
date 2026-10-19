import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "cotton" | "amber" | "terracotta" | "surplus" | "sample" | "outline";
  size?: "sm" | "md";
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "default",
  size = "md",
  children,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center font-medium rounded-full select-none transition-colors";

  const variantStyles = {
    default: "bg-linen-200 text-charcoal-800",
    cotton: "bg-forest-100 text-forest-800 border border-forest-200/50",
    amber: "bg-amber-400 text-charcoal-950 font-semibold shadow-xs",
    terracotta: "bg-terracotta-500 text-white shadow-xs",
    surplus: "bg-amber-100 text-amber-900 border border-amber-300 font-medium",
    sample: "bg-charcoal-900/80 text-linen-50 backdrop-blur-xs text-[11px]",
    outline: "border border-charcoal-300 text-charcoal-700 bg-transparent",
  };

  const sizeStyles = {
    sm: "px-2.5 py-0.5 text-[12px] tracking-wide",
    md: "px-3.5 py-1 text-[13px] tracking-wide",
  };

  return (
    <span
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      {...props}
    >
      {children}
    </span>
  );
};
