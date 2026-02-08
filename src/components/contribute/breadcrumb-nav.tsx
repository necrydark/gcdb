import Link from "next/link";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbNavProps{
    items: BreadcrumbItem[]
}

export function BreadcrumbNav({items}: BreadcrumbNavProps) {
  return (
    <nav className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto max-w-4xl px-4 py-3">
        <div className="flex items-center gap-2 text-sm">
          {items.map((item, i) => (
            <span key={item.label} className="flex items-center gap-2">
              {i > 0 && (
                <span className="text-muted-foreground/50">/</span>
              )}
              {item.href ? (
                <Link
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-foreground font-medium">
                  {item.label}
                </span>
              )}
            </span>
          ))}
        </div>
      </div>
    </nav>
  )
}