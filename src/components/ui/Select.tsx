import React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, id, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-[15px] font-medium text-charcoal-800"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          <select
            id={selectId}
            ref={ref}
            className={cn(
              "w-full min-h-[48px] appearance-none rounded-xl border bg-white px-4 py-3 pr-10 text-[16px] text-charcoal-900 transition-colors focus:border-forest-800 focus:outline-none focus:ring-2 focus:ring-forest-800/20 disabled:bg-linen-100 disabled:opacity-60",
              error ? "border-red-500 focus:border-red-500" : "border-linen-300",
              className
            )}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-3.5 flex items-center text-charcoal-500">
            <ChevronDown className="h-5 w-5" />
          </div>
        </div>
        {error && <p className="text-[13px] font-medium text-red-600">{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";
