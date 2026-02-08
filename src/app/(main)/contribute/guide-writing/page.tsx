import {
  BreadcrumbNav,
  ChecklistGrid,
  CtaBanner,
  InfoAlert,
  PageHero,
  RewardsBadgeGrid,
  SectionCard,
  StepTimeline,
} from "@/src/components/contribute"
import { Badge } from "@/src/components/ui/badge"
import {
  Award,
  BookOpen,
  CheckCircle,
  Medal,
  PenTool,
  Settings,
  Shield,
  Star,
  TrendingUp,
  Users,
} from "lucide-react"

export default function GuideWritingPage() {
  return (
    <div className="min-h-screen bg-background  pt-15">
      <BreadcrumbNav
        items={[
          { label: "Home", href: "/" },
          { label: "Contribute", href: "/contribute" },
          { label: "Guide Writing" },
        ]}
      />

      <PageHero
        icon={<PenTool className="h-8 w-8 text-purple-400" />}
        title="Guide Writing"
        description="Share your expertise by creating comprehensive guides that help players master characters, game mechanics, and strategies. Perfect for experienced players who love teaching and helping others improve."
        badges={[
          { label: "Medium Commitment", variant: "filled" },
          { label: "Whenever You Can", variant: "outline" },
          { label: "Intermediate", variant: "outline" },
        ]}
      />

      <main className="container mx-auto max-w-4xl px-4 py-10">
        <div className="flex flex-col gap-8">
          {/* What You'll Do */}
          <SectionCard
            icon={<Settings className="h-5 w-5" />}
            title="What You'll Do"
          >
            <ChecklistGrid
              columns={[
                {
                  title: "Primary Tasks",
                  icon: (
                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                  ),
                  items: [
                    "Write character build guides",
                    "Create beginner tutorials",
                    "Document game mechanics",
                    "Update existing guides",
                    "Create event walkthroughs",
                  ],
                },
                {
                  title: "Skills You'll Develop",
                  icon: (
                    <TrendingUp className="h-4 w-4 text-amber-500" />
                  ),
                  items: [
                    "Technical writing skills",
                    "Content strategy and planning",
                    "SEO and content optimization",
                    "Community engagement",
                    "Educational content creation",
                  ],
                },
              ]}
            />
          </SectionCard>

          {/* Guide Types */}
          <SectionCard
            icon={<PenTool className="h-5 w-5" />}
            title="Guides You Can Write"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  name: "Character Guides",
                  desc: "In-depth analysis of characters including builds, team compositions, and usage strategies.",
                  tag: "High Demand",
                },
                {
                  name: "Beginner Tutorials",
                  desc: "Step-by-step guides for new players covering basic mechanics and progression.",
                  tag: "Always Needed",
                },
                {
                  name: "Advanced Strategies",
                  desc: "Complex tactics for experienced players including PvP strategies and optimization.",
                  tag: "Expert Level",
                },
                {
                  name: "Event Guides",
                  desc: "Timely guides for limited events, including rewards and optimal strategies.",
                  tag: "Time Sensitive",
                },
                {
                  name: "Meta Analysis",
                  desc: "Current meta breakdowns, tier lists, and competitive analysis.",
                  tag: "Regular Updates",
                },
                {
                  name: "Resource Guides",
                  desc: "Farming guides, resource management, and efficiency optimization.",
                  tag: "Evergreen Content",
                },
              ].map((guide) => (
                <div
                  key={guide.name}
                  className="border border-border/50 rounded-lg p-4 hover:border-primary transition-colors group"
                >
                  <h3 className="font-semibold mb-1.5 text-foreground group-hover:text-purple-300 transition-colors">
                    {guide.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {guide.desc}
                  </p>
                  <Badge
                    variant="outline"
                    className="bg-transparent text-xs border-primary text-purple-300"
                  >
                    {guide.tag}
                  </Badge>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Requirements */}
          <SectionCard
            icon={<Settings className="h-5 w-5" />}
            title="Requirements"
          >
            <ChecklistGrid
              columns={[
                {
                  title: "Required",
                  icon: (
                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                  ),
                  items: [
                    "Strong game knowledge and experience",
                    "Good writing and communication skills",
                    "Ability to explain complex concepts clearly",
                    "Commitment to accuracy and quality",
                    "Portfolio of 2-3 sample guides",
                  ],
                },
                {
                  title: "Preferred",
                  icon: (
                    <TrendingUp className="h-4 w-4 text-amber-500" />
                  ),
                  items: [
                    "Previous writing or content creation experience",
                    "Understanding of SEO and content optimization",
                    "Experience with Markdown or similar formats",
                    "Active community participation",
                    "Knowledge of current meta and trends",
                  ],
                },
              ]}
            />
          </SectionCard>

          {/* Writing Process */}
          <SectionCard
            icon={<PenTool className="h-5 w-5" />}
            title="Writing Process"
          >
            <StepTimeline
              steps={[
                {
                  title: "Topic Selection & Approval",
                  description:
                    "Choose a topic from our priority list or propose your own. Get approval from the editorial team before starting.",
                },
                {
                  title: "Research & Outline",
                  description:
                    "Conduct thorough research, test strategies in-game, and create a detailed outline following our guide template.",
                },
                {
                  title: "Writing & Formatting",
                  description:
                    "Write your guide using our content management system, including screenshots, tables, and proper formatting.",
                },
                {
                  title: "Review & Publication",
                  description:
                    "Submit for editorial review, make revisions if needed, and celebrate when your guide goes live!",
                },
              ]}
            />
          </SectionCard>

          {/* Recognition & Rewards */}
          <SectionCard
            icon={<Award className="h-5 w-5" />}
            title="Recognition & Rewards"
          >
            <RewardsBadgeGrid
              rewards={[
                {
                  label: "Author Badge",
                  description: "Displayed on your profile and Discord",
                },
                {
                  label: "Guide Analytics",
                  description: "Track views, likes, and engagement",
                },
                {
                  label: "Community Recognition",
                  description: "Featured author spotlights",
                },
              ]}
              advancementTitle="Performance Rewards"
              advancementDescription="Top-performing guides and authors receive special recognition and advancement opportunities."
              advancementBadges={[
                {
                  label: "Featured Guide",
                  icon: <Star className="h-3 w-3" />,
                },
                {
                  label: "Community Featured",
                  icon: <Users className="h-3 w-3" />,
                },
                {
                  label: "Security Reviewer",
                  icon: <Shield className="h-3 w-3" />,
                },
                {
                  label: "Guide Of The Month",
                  icon: <Medal className="h-3 w-3" />,
                },
              ]}
            />
          </SectionCard>

          {/* Code of Conduct */}
          <InfoAlert>
            <strong>Code of Conduct:</strong> All contributors must follow our
            code of conduct. We maintain a welcoming, inclusive environment for
            contributors of all skill levels. Harassment, discrimination, or
            toxic behavior will not be tolerated.
          </InfoAlert>

          {/* CTA */}
          <CtaBanner
            icon={<BookOpen className="h-8 w-8 text-purple-400" />}
            title="Ready to Share Your Expertise?"
            description="Join our team of guide writers and help educate the community. Your knowledge and writing skills can help thousands of players improve their gameplay and enjoy the game more."
            buttons={[
              { label: "Apply as Guide Writer", href: "/" },
              {
                label: "Read Guidelines",
                href: "/contribute/guidelines",
                variant: "outline",
              },
            ]}
          />
        </div>
      </main>
    </div>
  )
}
