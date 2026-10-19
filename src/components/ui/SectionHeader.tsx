import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  actionText?: string;
  actionHref?: string;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  badge,
  actionText,
  actionHref,
  className,
}) => {
  return (
    <div className={cn("flex items-end justify-between mb-4 sm:mb-6", className)}>
      <div className="space-y-1">
        {badge && (
          <span className="inline-block text-[12px] font-bold uppercase tracking-wider text-terracotta-500">
            {badge}
          </span>
        )}
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900 tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-[15px] sm:text-[16px] text-charcoal-600">
            {subtitle}
          </p>
        )}
      </div>
      {actionText && actionHref && (
        <Link
          href={actionHref}
          className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-forest-800 hover:text-forest-900 transition-colors shrink-0 group ml-3"
        >
          <span>{actionText}</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
};
