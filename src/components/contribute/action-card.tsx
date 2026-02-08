import type { ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"

interface SectionCardProps {
  icon: ReactNode
  title: string
  children: ReactNode
}

export function SectionCard({ icon, title, children }: SectionCardProps) {
  return (
    <Card className="bg-gradient-to-t from-card via-card to-muted/20 rounded-[5px] border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}
