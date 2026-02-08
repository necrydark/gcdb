import type { ReactNode } from "react"
import { Badge } from "@/src/components/ui/badge"

interface RewardItem {
  label: string
  description: string
}

interface AdvancementBadge {
  label: string
  icon: ReactNode
}

interface RewardsBadgeGridProps {
  rewards: RewardItem[]
  advancementTitle?: string
  advancementDescription?: string
  advancementBadges?: AdvancementBadge[]
}

export function RewardsBadgeGrid({
  rewards,
  advancementTitle = "Advancement Opportunities",
  advancementDescription,
  advancementBadges = [],
}: RewardsBadgeGridProps) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {rewards.map((reward) => (
          <div
            key={reward.label}
            className="text-center p-4 rounded-lg bg-secondary/50 border border-border/50"
          >
            <Badge className="bg-primary/20 text-purple-300 hover:bg-primary/30 border-0 mb-2">
              {reward.label}
            </Badge>
            <p className="text-sm text-muted-foreground">{reward.description}</p>
          </div>
        ))}
      </div>

      {(advancementDescription || advancementBadges.length > 0) && (
        <div className="text-center">
          <h3 className="font-semibold mb-2 text-foreground">
            {advancementTitle}
          </h3>
          {advancementDescription && (
            <p className="text-sm text-muted-foreground mb-4 max-w-xl mx-auto">
              {advancementDescription}
            </p>
          )}
          {advancementBadges.length > 0 && (
            <div className="flex justify-center gap-2 flex-wrap">
              {advancementBadges.map((badge) => (
                <Badge
                  key={badge.label}
                  variant="outline"
                  className="bg-transparent border-primary/30 text-purple-300"
                >
                  {badge.icon}
                  <span className="ml-1">{badge.label}</span>
                </Badge>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
