import React from "react";
import { Button } from "./Button";

export interface EmptyStateProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center rounded-2xl bg-linen-100/60 border border-linen-200">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-forest-100 text-forest-800 mb-4">
        <Icon className="h-8 w-8" />
      </div>
      <h3 className="font-serif text-xl font-bold text-charcoal-900 mb-2">
        {title}
      </h3>
      <p className="max-w-sm text-[15px] text-charcoal-600 mb-6 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="primary" size="md">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
