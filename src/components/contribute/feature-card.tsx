import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/src/components/ui/card";
import type { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  iconBgClass: string;
  title: string;
  description: string;
}

export function FeatureCard({
  icon,
  iconBgClass,
  title,
  description,
}: FeatureCardProps) {
  return (
    <Card className="bg-gradient-to-t from-card via-card to-muted/20 rounded-[5px] border-0 hover:ring-1 hover:ring-border/60 transition-all duration-300 group">
      <CardHeader className="text-center pb-2">
        <div
          className={`mx-auto p-3 rounded-lg mb-2 ${iconBgClass} transition-all duration-300 group-hover:scale-110`}
        >
          {icon}
        </div>
        <CardTitle className="text-base text-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-center pt-0">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
