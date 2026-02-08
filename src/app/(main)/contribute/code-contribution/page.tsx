"use client"

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import {
  Award,
  Bug,
  CheckCircle,
  Code,
  Database,
  GitBranch,
  Plus,
  Rocket,
  Settings,
  Shield,
  Star,
  Terminal,
  Users,
  Zap,
} from "lucide-react"

const stack = [
  {
    name: "Frontend",
    icon: <Code className="h-4 w-4 text-purple-400" />,
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
  },
  {
    name: "Backend",
    icon: <Database className="h-4 w-4 text-purple-400" />,
    skills: ["Node.js", "PostgreSQL", "Prisma", "tRPC (Changing)", "NextAuth.js", "Stripe"],
  },
  {
    name: "Tools",
    icon: <Settings className="h-4 w-4 text-purple-400" />,
    skills: ["Git", "GitHub", "Vercel", "Docker (Adding)", "Jest (Adding)"],
  },
]

const contributions = [
  {
    name: "Bug Fixes",
    difficulty: "Good First Issue",
    icon: <Bug className="h-5 w-5 text-red-400" />,
    description: "Fix reported bugs and issues in the codebase. Great way to get familiar with the project.",
    tags: ["Frontend", "Backend"],
  },
  {
    name: "New Features",
    difficulty: "Medium",
    icon: <Plus className="h-5 w-5 text-emerald-400" />,
    description: "Implement new functionality and features requested by the community.",
    tags: ["Full Stack", "UI/UX"],
  },
  {
    name: "Performance",
    difficulty: "Advanced",
    icon: <Zap className="h-5 w-5 text-amber-400" />,
    description: "Optimize application performance, reduce load times and improve user experience.",
    tags: ["Optimization", "Database"],
  },
  {
    name: "Security",
    difficulty: "Critical",
    icon: <Shield className="h-5 w-5 text-blue-400" />,
    description: "Identify and fix security vulnerabilities, implement security best practices.",
    tags: ["Security", "Authentication"],
  },
]

export default function CodeContributionPage() {
  return (
    <div className="min-h-screen bg-background pt-15">
      <BreadcrumbNav
        items={[
          { label: "Home", href: "/" },
          { label: "Contribute", href: "/contribute" },
          { label: "Code Contribution" },
        ]}
      />

      <PageHero
        icon={<Code className="h-8 w-8 text-purple-400" />}
        title="Code Contribution"
        description="Help build and improve our open-source tools, website and infrastructure. Perfect for developers who want to contribute their technical skills to create better tools for the community."
        badges={[
          { label: "Hard", variant: "filled" },
          { label: "Whenever You Can", variant: "outline" },
          { label: "Advanced", variant: "outline" },
        ]}
      />

      <main className="container mx-auto max-w-4xl px-4 py-10">
        <div className="flex flex-col gap-8">
          {/* Tech Stack */}
          <SectionCard
            icon={<Terminal className="h-5 w-5" />}
            title="Our Tech Stack"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {stack.map((s) => (
                <div
                  key={s.name}
                  className="border border-border/50 rounded-lg p-4 hover:border-primary transition-colors"
                >
                  <h3 className="font-semibold mb-3 flex items-center gap-2 text-foreground">
                    {s.icon}
                    {s.name}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {s.skills.map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="bg-transparent border-primary text-purple-300 text-xs"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Types of Contribution */}
          <SectionCard
            icon={<Terminal className="h-5 w-5" />}
            title="Types of Contribution"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {contributions.map((type) => (
                <div
                  key={type.name}
                  className="border border-border/50 rounded-lg p-4 hover:border-primary transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    {type.icon}
                    <h3 className="font-semibold text-foreground">
                      {type.name}
                    </h3>
                    <Badge
                      variant="outline"
                      className="bg-transparent border-primary/30 text-purple-300 text-xs ml-auto"
                    >
                      {type.difficulty}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {type.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {type.tags.map((tag) => (
                      <Badge
                        key={tag}
                        className="bg-primary/20 text-purple-300 hover:bg-primary/30 border-0 text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Development Workflow */}
          <SectionCard
            icon={<GitBranch className="h-5 w-5" />}
            title="Development Workflow"
          >
            <Tabs defaultValue="setup" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="setup">Setup</TabsTrigger>
                <TabsTrigger value="development">Development</TabsTrigger>
                <TabsTrigger value="submission">Submission</TabsTrigger>
              </TabsList>

              <TabsContent value="setup" className="mt-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">
                    Getting Started
                  </h3>
                  <div className="bg-secondary/50 rounded-lg p-4 font-mono text-sm">
                    <pre className="text-foreground/80">
                      <code>{`# Clone the repository
git clone https://github.com/necrydark/gcdb.git
cd holy-relics

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run the development server
npm run dev`}</code>
                    </pre>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-foreground">
                      Prerequisites:
                    </h4>
                    <ul className="text-sm space-y-1 ml-4 text-muted-foreground">
                      <li>Node.js 18+ and npm</li>
                      <li>PostgreSQL database (local or cloud)</li>
                      <li>Git configured with your GitHub account</li>
                      <li>IDE (VSCode Recommended)</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="development" className="mt-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">
                    Development Process
                  </h3>
                  <StepTimeline
                    steps={[
                      {
                        title: "Choose an Issue",
                        description:
                          'Browse our GitHub issues and pick one that matches your skill level. Look for "good first issue" labels if you\'re new.',
                      },
                      {
                        title: "Create a Branch",
                        description:
                          'Create a feature branch from main with a descriptive name like "fix/login-bug" or "feature/user-dashboard".',
                      },
                      {
                        title: "Implement Changes",
                        description:
                          "Write your code following our style guide and best practices. Make small, focused commits with clear messages.",
                      },
                      {
                        title: "Update Documentation",
                        description:
                          "Update relevant documentation, comments, and README files as needed for your changes.",
                      },
                    ]}
                  />
                </div>
              </TabsContent>

              <TabsContent value="submission" className="mt-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">
                    Submitting Your Contribution
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2 text-foreground">
                        Pull Request Template:
                      </h4>
                      <div className="bg-secondary/50 rounded-lg p-4 text-sm text-muted-foreground space-y-2">
                        <p>
                          <strong className="text-foreground">
                            Description:
                          </strong>{" "}
                          Brief description of changes
                        </p>
                        <p>
                          <strong className="text-foreground">
                            Type of Change:
                          </strong>{" "}
                          Bug fix / New feature / Performance / Documentation
                        </p>
                        <p>
                          <strong className="text-foreground">Testing:</strong>{" "}
                          How you tested your changes
                        </p>
                        <p>
                          <strong className="text-foreground">
                            Screenshots:
                          </strong>{" "}
                          If applicable, add screenshots
                        </p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2 text-foreground">
                        Review Process:
                      </h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>Automated checks run on your PR</li>
                        <li>Code review by maintainers</li>
                        <li>Address feedback and make changes</li>
                        <li>Final approval and merge</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </SectionCard>

          {/* Code Standards */}
          <SectionCard
            icon={<Settings className="h-5 w-5" />}
            title="Code Standards & Best Practices"
          >
            <ChecklistGrid
              columns={[
                {
                  title: "Code Quality",
                  icon: <CheckCircle className="h-4 w-4 text-emerald-500" />,
                  items: [
                    "Use TypeScript for type safety",
                    "Follow ESLint and Prettier configurations",
                    "Write self-documenting code with clear names",
                    "Keep functions small and focused",
                    "Use consistent error handling patterns",
                  ],
                },
                {
                  title: "Performance",
                  icon: <Zap className="h-4 w-4 text-amber-500" />,
                  items: [
                    "Optimize database queries and indexes",
                    "Use React best practices (memo, useMemo, etc.)",
                    "Implement proper caching strategies",
                    "Optimize images and assets",
                    "Monitor and measure performance impacts",
                  ],
                },
              ]}
            />
          </SectionCard>

          {/* Recognition */}
          <SectionCard
            icon={<Award className="h-5 w-5" />}
            title="Recognition & Career Growth"
          >
            <RewardsBadgeGrid
              rewards={[
                {
                  label: "Developer Badge",
                  description: "Displayed on your GitHub and profile",
                },
                {
                  label: "Contribution Stats",
                  description: "Track your impact and contributions",
                },
                {
                  label: "Open Source Credit",
                  description: "Build your open source portfolio",
                },
              ]}
              advancementDescription="Outstanding contributors may be invited to join our core development team with additional responsibilities and recognition."
              advancementBadges={[
                { label: "Core Maintainer", icon: <Star className="h-3 w-3" /> },
                { label: "Technical Lead", icon: <Users className="h-3 w-3" /> },
                { label: "Security Reviewer", icon: <Shield className="h-3 w-3" /> },
                { label: "DevOps Engineer", icon: <Rocket className="h-3 w-3" /> },
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
            icon={<Code className="h-8 w-8 text-purple-400" />}
            title="Ready to Start Coding?"
            description="Join our development team and help build the tools that thousands of gamers rely on. Your code can make a real difference in the gaming community while building your open source portfolio."
            buttons={[
              {
                label: "View on GitHub",
                href: "https://github.com/necrydark/gcdb",
              },
              {
                label: "Development Guidelines",
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
