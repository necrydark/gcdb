import type { ReactNode } from "react"
import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface PageHeroBadge {
  label: string
  variant?: "filled" | "outline"
}

interface PageHeroProps {
  icon: ReactNode
  title: string
  description: string
  badges?: PageHeroBadge[]
  backHref?: string
  backLabel?: string
}

export function PageHero({
  icon,
  title,
  description,
  badges = [],
  backHref = "/contribute",
  backLabel = "Back to Contribute",
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border/50">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-primary/60 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-4xl px-4 py-16 relative z-10">
        <Button
          variant="ghost"
          className="mb-8 rounded-[5px] text-muted-foreground hover:text-foreground hover:bg-secondary"
          asChild
        >
          <Link href={backHref}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {backLabel}
          </Link>
        </Button>

        <div className="flex items-start gap-5">
          <div className="bg-primary/50 border border-primary/20 p-4 rounded-xl shrink-0">
            {icon}
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground text-balance">
              {title}
            </h1>
            <p className="mt-3 text-lg text-muted-foreground leading-relaxed max-w-2xl">
              {description}
            </p>
            {badges.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mt-5">
                {badges.map((badge) =>
                  badge.variant === "outline" ? (
                    <Badge
                      key={badge.label}
                      variant="outline"
                      className="bg-transparent border-primary/30 text-purple-300"
                    >
                      {badge.label}
                    </Badge>
                  ) : (
                    <Badge
                      key={badge.label}
                      className="bg-primary text-primary-foreground hover:bg-primary/80 border-0"
                    >
                      {badge.label}
                    </Badge>
                  ),
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
