interface TimelineStep {
  title: string
  description: string
}

interface StepTimelineProps {
  steps: TimelineStep[]
}

export function StepTimeline({ steps }: StepTimelineProps) {
  return (
    <div className="relative">
      {/* Connecting line */}
      <div className="absolute left-4 top-4 bottom-4 w-px bg-gradient-to-b from-primary/60 via-primary/30 to-transparent pointer-events-none" />

      <div className="space-y-6">
        {steps.map((step, i) => (
          <div key={step.title} className="flex items-start gap-4 relative">
            <div className="relative z-10 bg-primary/20 border border-primary/30 text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm shrink-0">
              {i + 1}
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{step.title}</h3>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
