"use client";

import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  className,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal-950/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet Content */}
      <div
        className={cn(
          "relative z-50 flex max-h-[90vh] w-full max-w-xl flex-col rounded-t-3xl bg-linen-50 p-6 shadow-elevated transition-transform animate-in slide-in-from-bottom duration-300",
          className
        )}
        role="dialog"
        aria-modal="true"
      >
        {/* Grab Handle */}
        <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-charcoal-300" />

        {/* Header */}
        {(title || description) && (
          <div className="mb-4 flex items-start justify-between border-b border-linen-200 pb-3">
            <div>
              {title && (
                <h3 className="font-serif text-2xl font-bold text-charcoal-900">
                  {title}
                </h3>
              )}
              {description && (
                <p className="mt-1 text-[14px] text-charcoal-600">{description}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-linen-200 text-charcoal-600 focus:outline-none focus:ring-2 focus:ring-forest-800"
              aria-label="Close drawer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* Scrollable Body */}
        <div className="overflow-y-auto pb-6">{children}</div>
      </div>
    </div>
  );
};
