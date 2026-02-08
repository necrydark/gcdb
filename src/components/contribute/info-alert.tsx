import type { ReactNode } from "react"
import { Alert, AlertDescription } from "@/src/components/ui/alert"

interface InfoAlertProps {
  children: ReactNode
}

export function InfoAlert({ children }: InfoAlertProps) {
  return (
    <Alert className="bg-gradient-to-t from-card via-card to-muted/20 rounded-[5px] border-0 text-foreground">
      <AlertDescription className="text-sm leading-relaxed">
        {children}
      </AlertDescription>
    </Alert>
  )
}
