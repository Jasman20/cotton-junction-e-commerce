import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "whatsapp" | "amber";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 select-none active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-800 focus-visible:ring-offset-2";

    const variantStyles = {
      primary:
        "bg-forest-800 text-white hover:bg-forest-900 active:bg-forest-950 shadow-subtle hover:shadow-card",
      secondary:
        "bg-linen-100 text-charcoal-900 hover:bg-linen-200 border border-charcoal-200",
      outline:
        "border-2 border-forest-800 text-forest-800 hover:bg-forest-50 active:bg-forest-100",
      ghost:
        "text-charcoal-800 hover:bg-linen-100 active:bg-linen-200",
      whatsapp:
        "bg-[#1B5E20] text-white hover:bg-[#144718] shadow-subtle hover:shadow-card",
      amber:
        "bg-amber-500 text-charcoal-950 font-semibold hover:bg-amber-600 shadow-subtle hover:shadow-card",
    };

    const sizeStyles = {
      sm: "min-h-[40px] px-4 py-2 text-[15px] gap-1.5",
      md: "min-h-[48px] px-6 py-3 text-[16px] gap-2", // Minimum 48px touch target
      lg: "min-h-[54px] px-8 py-3.5 text-[17px] gap-2.5",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
        ) : (
          leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && (
          <span className="inline-flex shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
