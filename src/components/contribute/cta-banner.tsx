import type { ReactNode } from "react"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent } from "@/src/components/ui/card"
import Link from "next/link"

interface CtaButton {
  label: string
  href: string
  variant?: "default" | "outline"
  icon?: ReactNode
}

interface CtaBannerProps {
  icon: ReactNode
  title: string
  description: string
  buttons: CtaButton[]
  footnote?: string
}

export function CtaBanner({
  icon,
  title,
  description,
  buttons,
  footnote,
}: CtaBannerProps) {
  return (
    <Card className="relative overflow-hidden rounded-[5px] border-0">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-purple-700/15 to-purple-900/20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

      <CardContent className="relative z-10 pt-8 pb-8 text-center">
        <div className="inline-flex items-center justify-center p-3 rounded-xl bg-primary/15 border border-primary/20 mb-5">
          {icon}
        </div>
        <h2 className="text-2xl font-bold mb-3 text-foreground">{title}</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {buttons.map((btn) =>
            btn.variant === "outline" ? (
              <Button
                key={btn.label}
                size="lg"
                variant="outline"
                className="rounded-[5px] bg-transparent hover:text-foreground text-foreground border-primary/70 hover:bg-primary/50 hover:border-primary/60"
                asChild
              >
                <Link href={btn.href}>
                  {btn.label}
                  {btn.icon}
                </Link>
              </Button>
            ) : (
              <Button
                key={btn.label}
                size="lg"
                className="rounded-[5px] transition-all duration-300"
                asChild
              >
                <Link href={btn.href}>
                  {btn.label}
                  {btn.icon}
                </Link>
              </Button>
            ),
          )}
        </div>
        {footnote && (
          <p className="text-xs text-muted-foreground mt-4">{footnote}</p>
        )}
      </CardContent>
    </Card>
  )
}
