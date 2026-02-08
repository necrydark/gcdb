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
import {
  Award,
  BookOpen,
  CheckCircle,
  Database,
  Settings,
  TrendingUp,
  Users,
} from "lucide-react"

export default function DataEntryPage() {
  return (
    <div className="min-h-screen bg-background  pt-15">
      <BreadcrumbNav
        items={[
          { label: "Home", href: "/" },
          { label: "Contribute", href: "/contribute" },
          { label: "Data Entry" },
        ]}
      />

      <PageHero
        icon={<Database className="h-8 w-8 text-purple-400" />}
        title="Data Entry"
        description="Help us maintain the most accurate and up-to-date game database by contributing character stats, skills, and equipment information. Perfect for players who love attention to detail and want to help the community."
        badges={[
          { label: "Easy", variant: "filled" },
          { label: "Whenever You Can", variant: "outline" },
          { label: "Beginner", variant: "outline" },
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
                  icon: <CheckCircle className="h-4 w-4 text-emerald-500" />,
                  items: [
                    "Update character statistics and abilities",
                    "Add new character information",
                    "Verify existing data accuracy",
                    "Input holy relic details and stats",
                    "Update event information",
                  ],
                },
                {
                  title: "Skills You'll Develop",
                  icon: <TrendingUp className="h-4 w-4 text-amber-500" />,
                  items: [
                    "Data accuracy and verification",
                    "Database management basics",
                    "Quality assurance processes",
                    "Game mechanics expertise",
                    "Collaborative teamwork",
                  ],
                },
              ]}
            />
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
                  icon: <CheckCircle className="h-4 w-4 text-emerald-500" />,
                  items: [
                    "Active game account (any level)",
                    "Basic understanding of game mechanics",
                    "Attention to detail",
                    "Reliable internet connection",
                    "Commitment to accuracy",
                  ],
                },
                {
                  title: "Preferred",
                  icon: <TrendingUp className="h-4 w-4 text-amber-500" />,
                  items: [
                    "Experience with spreadsheets",
                    "Knowledge of multiple characters",
                    "Previous data entry experience",
                    "Understanding of game meta",
                    "Community involvement",
                  ],
                },
              ]}
            />
          </SectionCard>

          {/* How It Works */}
          <SectionCard
            icon={<Database className="h-5 w-5" />}
            title="How It Works"
          >
            <StepTimeline
              steps={[
                {
                  title: "Application & Training",
                  description:
                    "Submit your application and complete a brief training session to learn our data entry standards and tools.",
                },
                {
                  title: "Get Access to Tools",
                  description:
                    "Receive access to our contributor dashboard, data entry forms, and verification tools.",
                },
                {
                  title: "Start with Simple Tasks",
                  description:
                    "Begin with basic data verification tasks and gradually move to more complex data entry as you gain experience.",
                },
                {
                  title: "Review & Approval",
                  description:
                    "Your contributions are reviewed by experienced team members before being published to ensure accuracy.",
                },
              ]}
            />
          </SectionCard>

          {/* Tools & Resources */}
          <SectionCard
            icon={<BookOpen className="h-5 w-5" />}
            title="Tools & Resources"
          >
            <ChecklistGrid
              columns={[
                {
                  title: "You'll Have Access To",
                  icon: <CheckCircle className="h-4 w-4 text-emerald-500" />,
                  items: [
                    "Contributor dashboard",
                    "Data entry forms and templates",
                    "Character stat calculators",
                    "Image upload tools",
                    "Quality assurance checklists",
                  ],
                },
                {
                  title: "Support Available",
                  icon: <CheckCircle className="h-4 w-4 text-emerald-500" />,
                  items: [
                    "Dedicated Discord channel",
                    "Mentor assignment",
                    "Video tutorials",
                    "Weekly Q&A sessions",
                    "Documentation and guides",
                  ],
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
                  label: "Contributor Badge",
                  description: "Displayed on your profile",
                },
                {
                  label: "Early Access",
                  description: "New features before public release",
                },
                {
                  label: "Credits",
                  description: "Recognition in database credits",
                },
              ]}
              advancementDescription="Top contributors may be invited to join our core team as Data Moderators or Team Leaders."
              advancementBadges={[
                { label: "Data Moderator", icon: <Users className="h-3 w-3" /> },
                { label: "Team Leader", icon: <Users className="h-3 w-3" /> },
                { label: "Quality Assurance", icon: <Award className="h-3 w-3" /> },
              ]}
            />
          </SectionCard>

          {/* Code of Conduct */}
          <InfoAlert>
            <strong>Code of Conduct:</strong> All contributors must follow our
            code of conduct. We maintain a welcoming, inclusive environment for
            developers of all skill levels. Harassment, discrimination, or toxic
            behavior will not be tolerated.
          </InfoAlert>

          {/* CTA */}
          <CtaBanner
            icon={<Users className="h-8 w-8 text-purple-400" />}
            title="Ready to Start Contributing?"
            description="Join our team of data contributors and help build the most comprehensive game database. Your attention to detail will help thousands of players make better decisions."
            buttons={[
              { label: "Apply Now", href: "/" },
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
