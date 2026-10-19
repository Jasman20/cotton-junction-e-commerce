import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "flat" | "interactive";
}

export const Card: React.FC<CardProps> = ({
  className,
  variant = "default",
  children,
  ...props
}) => {
  const baseStyles = "rounded-2xl transition-all duration-200 overflow-hidden";

  const variantStyles = {
    default: "bg-white border border-linen-200 shadow-subtle",
    elevated: "bg-white border border-linen-200 shadow-card hover:shadow-elevated",
    flat: "bg-linen-100 border border-linen-200/80",
    interactive:
      "bg-white border border-linen-200 shadow-subtle hover:shadow-card hover:border-forest-800/30 cursor-pointer active:scale-[0.99]",
  };

  return (
    <div className={cn(baseStyles, variantStyles[variant], className)} {...props}>
      {children}
    </div>
  );
};
