import type { ReactNode } from "react"

interface ChecklistColumn {
  title: string
  icon: ReactNode
  iconColor?: string
  items: string[]
}

interface ChecklistGridProps {
  columns: ChecklistColumn[]
}

export function ChecklistGrid({ columns }: ChecklistGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {columns.map((col) => (
        <div key={col.title}>
          <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider text-muted-foreground">
            {col.title}
          </h3>
          <ul className="space-y-2.5">
            {col.items.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-0.5 shrink-0">{col.icon}</span>
                <span className="text-sm text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
