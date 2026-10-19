import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-[15px] font-medium text-charcoal-800"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="pointer-events-none absolute left-3.5 flex items-center text-charcoal-500">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            type={type}
            disabled={disabled}
            className={cn(
              "w-full min-h-[48px] rounded-xl border bg-white px-4 py-3 text-[16px] text-charcoal-900 transition-colors placeholder:text-charcoal-400 focus:border-forest-800 focus:outline-none focus:ring-2 focus:ring-forest-800/20 disabled:bg-linen-100 disabled:opacity-60",
              leftIcon && "pl-11",
              rightIcon && "pr-11",
              error ? "border-red-500 focus:border-red-500 focus:ring-red-200" : "border-linen-300",
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3.5 flex items-center text-charcoal-500">
              {rightIcon}
            </div>
          )}
        </div>
        {error ? (
          <p className="text-[13px] font-medium text-red-600">{error}</p>
        ) : helperText ? (
          <p className="text-[13px] text-charcoal-500">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
