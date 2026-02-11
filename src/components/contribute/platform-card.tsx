import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { ExternalLink, Users } from "lucide-react";
import type { ReactNode } from "react";

interface PlatformCardProps {
  name: string;
  description: string;
  icon: ReactNode;
  url: string;
  memberCount: string | undefined;
  cta: string;
  accentColor: string;
  subscribers?: string | undefined;
  features: string[];
}

export function PlatformCard({
  name,
  description,
  icon,
  url,
  memberCount,
  cta,
  accentColor,
  features,
  subscribers,
}: PlatformCardProps) {
  return (
    <Card className="overflow-hidden rounded-[5px] border-0 flex flex-col bg-gradient-to-t from-card via-card to-muted/20 hover:border-border/80 transition-all duration-300 group">
      <CardHeader className={`${accentColor} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-foreground/5 group-hover:bg-foreground/10 transition-colors duration-300" />
        <div className="relative flex items-center gap-3">
          <div className="p-2.5 bg-background/15 rounded-lg backdrop-blur-sm">
            {icon}
          </div>
          <div>
            <CardTitle className="text-lg text-white">{name}</CardTitle>
            <div className="flex items-center text-sm text-white/80 mt-0.5">
              <Users className="h-3.5 w-3.5 mr-1" />
              {memberCount && <span>{memberCount}</span>}
              {subscribers && <span>{subscribers}</span>}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-5 flex-grow">
        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
          {description}
        </p>
        <div className="space-y-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            {"What you'll find"}
          </h4>
          <div className="grid grid-cols-2 gap-1.5">
            {features.map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-2 text-sm text-foreground"
              >
                <div className="w-1 h-1 bg-primary rounded-full shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="mt-auto pt-4 pb-5">
        <Button
          size="lg"
          className="w-full rounded-[5px] transition-all duration-300"
          asChild
        >
          <a href={url} target="_blank" rel="noopener noreferrer">
            {cta}
            <ExternalLink className="ml-2 w-4 h-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
