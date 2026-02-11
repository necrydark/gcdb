import type { ReactNode } from "react";

interface GuidelineItemProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function GuidelineItem({
  icon,
  title,
  description,
}: GuidelineItemProps) {
  return (
    <div className="flex gap-4 p-4 rounded-lg bg-secondary/40 border border-border/40">
      <div className="shrink-0 mt-0.5">{icon}</div>
      <div>
        <h3 className="font-semibold text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
