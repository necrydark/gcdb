"use client"

import React from "react"

import {
  BreadcrumbNav,
  CtaBanner,
  InfoAlert,
  PageHero,
  SectionCard,
  StepTimeline,
} from "@/src/components/contribute"
import { Alert, AlertDescription } from "@/src/components/ui/alert"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card"
import { Separator } from "@/src/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import {
  AlertTriangle,
  BookOpen,
  CheckCircle,
  Code,
  FileText,
  Palette,
  Shield,
  Star,
  Target,
  Users,
} from "lucide-react"
import Link from "next/link"

function GuidelineSection({
  icon,
  title,
  items,
}: {
  icon: React.ReactNode
  title: string
  items: string[]
}) {
  return (
    <div>
      <h3 className="font-semibold mb-3 flex items-center gap-2 text-foreground">
        {icon}
        {title}
      </h3>
      <ul className="space-y-2 ml-6 text-sm text-muted-foreground">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="w-1 h-1 rounded-full bg-muted-foreground mt-2 shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function ChecklistSection({
  title,
  items,
}: {
  title: string
  items: string[]
}) {
  return (
    <div>
      <h3 className="font-semibold mb-3 text-foreground">{title}</h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
            <span className="text-sm text-foreground">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function BulletSection({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="font-semibold mb-3 text-foreground">{title}</h3>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="w-1 h-1 rounded-full bg-muted-foreground mt-2 shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function GuidelinesPage() {
  return (
    <div className="min-h-screen bg-background  pt-15">
      <BreadcrumbNav
        items={[
          { label: "Home", href: "/" },
          { label: "Contribute", href: "/contribute" },
          { label: "Guidelines" },
        ]}
      />

      <PageHero
        icon={<FileText className="h-8 w-8 text-purple-400" />}
        title="Contribution Guidelines"
        description="These guidelines ensure quality, consistency, and a positive experience for all contributors and users of our database. Please read them carefully before starting your contribution journey."
        badges={[]}
      />

      <main className="container mx-auto max-w-4xl px-4 py-10">
        <div className="flex flex-col gap-8">
          {/* Quick note */}
          <InfoAlert>
            <strong>New to contributing?</strong> Start with our{" "}
            <Link
              href="/contribute"
              className="text-purple-300 hover:underline"
            >
              contribution overview
            </Link>{" "}
            to understand the different ways you can help, then return here for
            detailed guidelines.
          </InfoAlert>

          {/* Guidelines Tabs */}
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 mb-4">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="data">Data Entry</TabsTrigger>
              <TabsTrigger value="guides">Guides</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
              <TabsTrigger value="moderation">Moderation</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
            </TabsList>

            {/* General */}
            <TabsContent value="general">
              <Card className="bg-gradient-to-t from-card via-card to-muted/20 rounded-[5px] border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Target className="h-5 w-5" />
                    General Guidelines
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Core principles that apply to all types of contributions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <GuidelineSection
                    icon={
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                    }
                    title="Quality Standards"
                    items={[
                      "All information must be accurate and verifiable in-game",
                      "Double-check your work before submitting",
                      "Use official sources when possible",
                      "Test strategies and builds personally when applicable",
                      "Keep content up-to-date with the latest game version",
                    ]}
                  />
                  <Separator className="bg-border/50" />
                  <GuidelineSection
                    icon={<Users className="h-4 w-4 text-blue-400" />}
                    title="Community Standards"
                    items={[
                      "Be respectful and professional in all interactions",
                      "Give constructive feedback when reviewing others' work",
                      "Credit other contributors when building on their work",
                      "Help newcomers learn our processes and standards",
                      "Report issues or concerns to moderators promptly",
                    ]}
                  />
                  <Separator className="bg-border/50" />
                  <GuidelineSection
                    icon={<Shield className="h-4 w-4 text-amber-500" />}
                    title="Prohibited Content"
                    items={[
                      "Cheating methods, exploits, or hacks",
                      "Copyrighted content without permission",
                      "Misleading or false information",
                      "Personal attacks or harassment",
                      "Spam or promotional content",
                      "Content that violates game terms of service",
                    ]}
                  />
                  <Alert className="bg-red-500/10 border-red-500/20 text-foreground">
                    <AlertTriangle className="h-4 w-4 text-red-400" />
                    <AlertDescription className="text-sm text-muted-foreground">
                      Violations of these guidelines may result in warnings,
                      temporary suspension, or permanent removal from the
                      contributor program, depending on severity.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Data Entry */}
            <TabsContent value="data">
              <Card className="bg-gradient-to-t from-card via-card to-muted/20 rounded-[5px] border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Users className="h-5 w-5" />
                    Data Entry Guidelines
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Specific standards for database contributions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ChecklistSection
                    title="Data Accuracy"
                    items={[
                      "Verify all statistics in-game before submitting",
                      "Use the latest game version for all data",
                      "Include source screenshots when possible",
                      "Follow naming conventions exactly as they appear in-game",
                    ]}
                  />
                  <BulletSection
                    title="Formatting Standards"
                    items={[
                      "Use consistent number formatting (no extra spaces or characters)",
                      "Follow the established template for each data type",
                      "Include all required fields, mark optional fields clearly",
                      "Use proper capitalization and spelling",
                    ]}
                  />
                  <BulletSection
                    title="Image Requirements"
                    items={[
                      "High resolution (minimum 1080p for screenshots)",
                      "Clear, unobstructed view of relevant information",
                      "No UI overlays that block important data",
                      "Consistent lighting and visual settings",
                    ]}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Guide Writing */}
            <TabsContent value="guides">
              <Card className="bg-gradient-to-t from-card via-card to-muted/20 rounded-[5px] border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <BookOpen className="h-5 w-5" />
                    Guide Writing Guidelines
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Standards for creating high-quality guides
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ChecklistSection
                    title="Content Structure"
                    items={[
                      "Start with a clear introduction and overview",
                      "Use logical section headings and subheadings",
                      "Include a table of contents for longer guides",
                      "End with a conclusion and key takeaways",
                    ]}
                  />
                  <BulletSection
                    title="Writing Style"
                    items={[
                      "Write in clear, concise language",
                      "Use active voice when possible",
                      "Explain technical terms and abbreviations",
                      "Write for your target audience (beginner, intermediate, advanced)",
                      "Use bullet points and numbered lists for clarity",
                    ]}
                  />
                  <BulletSection
                    title="Visual Elements"
                    items={[
                      "Include relevant screenshots and images",
                      "Use tables for statistical comparisons",
                      "Add diagrams for complex strategies",
                      "Ensure all images have descriptive alt text",
                    ]}
                  />
                  <BulletSection
                    title="SEO and Discoverability"
                    items={[
                      "Use descriptive, keyword-rich titles",
                      "Include relevant tags and categories",
                      "Write compelling meta descriptions",
                      "Link to related guides and resources",
                    ]}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Code */}
            <TabsContent value="code">
              <Card className="bg-gradient-to-t from-card via-card to-muted/20 rounded-[5px] border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Code className="h-5 w-5" />
                    Code Contribution Guidelines
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Standards for technical contributions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ChecklistSection
                    title="Code Quality"
                    items={[
                      "Follow existing code style and conventions",
                      "Write clear, self-documenting code",
                      "Include comments for complex logic",
                      "Test your changes thoroughly",
                    ]}
                  />
                  <BulletSection
                    title="Pull Request Process"
                    items={[
                      "Create feature branches from the main branch",
                      "Write descriptive commit messages",
                      "Include tests for new functionality",
                      "Update documentation as needed",
                      "Request review from appropriate team members",
                    ]}
                  />
                  <BulletSection
                    title="Security Considerations"
                    items={[
                      "Never commit sensitive information (API keys, passwords)",
                      "Validate all user inputs",
                      "Follow security best practices",
                      "Report security vulnerabilities privately",
                    ]}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Moderation */}
            <TabsContent value="moderation">
              <Card className="bg-gradient-to-t from-card via-card to-muted/20 rounded-[5px] border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Shield className="h-5 w-5" />
                    Moderation Guidelines
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Standards for community moderation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ChecklistSection
                    title="Moderation Principles"
                    items={[
                      "Be fair, consistent, and impartial",
                      "Explain decisions clearly and respectfully",
                      "Focus on behavior, not personal characteristics",
                      "Escalate complex situations to senior moderators",
                    ]}
                  />
                  <BulletSection
                    title="Response Guidelines"
                    items={[
                      "Respond to reports within 24 hours",
                      "Document all moderation actions",
                      "Provide warnings before taking punitive action",
                      "Offer appeals process for all decisions",
                    ]}
                  />
                  <BulletSection
                    title="Conflict Resolution"
                    items={[
                      "Listen to all parties involved",
                      "Seek to understand underlying issues",
                      "Mediate rather than dictate when possible",
                      "Follow up to ensure resolution",
                    ]}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Content */}
            <TabsContent value="content">
              <Card className="bg-gradient-to-t from-card via-card to-muted/20 rounded-[5px] border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Palette className="h-5 w-5" />
                    Content Creation Guidelines
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Standards for visual and multimedia content
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ChecklistSection
                    title="Visual Standards"
                    items={[
                      "Maintain consistent branding and style",
                      "Use high-quality images and graphics",
                      "Ensure accessibility with alt text and captions",
                      "Optimize file sizes for web delivery",
                    ]}
                  />
                  <BulletSection
                    title="Video Content"
                    items={[
                      "Minimum 1080p resolution for tutorials",
                      "Clear audio with minimal background noise",
                      "Include closed captions when possible",
                      "Keep videos focused and well-paced",
                    ]}
                  />
                  <BulletSection
                    title="Copyright and Attribution"
                    items={[
                      "Only use content you have rights to",
                      "Properly attribute third-party assets",
                      "Respect game developer intellectual property",
                      "Provide source links when required",
                    ]}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Review Process */}
          <SectionCard
            icon={<Star className="h-5 w-5" />}
            title="Review and Approval Process"
          >
            <StepTimeline
              steps={[
                {
                  title: "Initial Submission",
                  description:
                    "Submit your contribution through the appropriate channel (dashboard, GitHub, etc.)",
                },
                {
                  title: "Automated Checks",
                  description:
                    "Basic formatting, quality, and guideline compliance checks are performed automatically.",
                },
                {
                  title: "Peer Review",
                  description:
                    "Experienced contributors review content for accuracy, quality, and adherence to guidelines.",
                },
                {
                  title: "Final Approval",
                  description:
                    "Team leads provide final approval and the content is published to the database.",
                },
              ]}
            />
            <Alert className="mt-6 bg-amber-500/10 border-amber-500/20 text-foreground">
              <AlertTriangle className="h-4 w-4 text-amber-400" />
              <AlertDescription className="text-sm text-muted-foreground">
                The review process typically takes 24-48 hours for most
                contributions. Complex submissions may take longer. You will
                receive notifications about the status of your submissions.
              </AlertDescription>
            </Alert>
          </SectionCard>

          {/* Getting Help */}
          <SectionCard
            icon={<BookOpen className="h-5 w-5" />}
            title="Getting Help"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider text-muted-foreground">
                  Documentation
                </h3>
                <ul className="space-y-2">
                  {[
                    {
                      href: "/contribute/tutorials",
                      label: "Video tutorials and walkthroughs",
                    },
                    {
                      href: "/contribute/templates",
                      label: "Templates and examples",
                    },
                    { href: "/contribute/faq", label: "Contributor FAQ" },
                    {
                      href: "/contribute/style-guide",
                      label: "Style guide and formatting",
                    },
                  ].map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-purple-300 hover:underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider text-muted-foreground">
                  Community Support
                </h3>
                <ul className="space-y-2">
                  {[
                    {
                      href: "https://discord.gg/contributors",
                      label: "Contributors Discord channel",
                    },
                    {
                      href: "/community/mentorship",
                      label: "Mentorship program",
                    },
                    {
                      href: "/contribute/office-hours",
                      label: "Weekly office hours",
                    },
                    {
                      href: "/contact",
                      label: "Direct support contact",
                    },
                  ].map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-purple-300 hover:underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </SectionCard>

          {/* CTA */}
          <CtaBanner
            icon={<FileText className="h-8 w-8 text-purple-400" />}
            title="Ready to Get Started?"
            description="Now that you understand our guidelines, you're ready to start contributing! Choose your area of interest and begin making a difference in our community."
            buttons={[
              {
                label: "Choose Your Contribution Area",
                href: "/contribute",
              },
              {
                label: "Apply To Contribute",
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
