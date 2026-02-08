"use client"

import {
  BreadcrumbNav,
  CtaBanner,
  PageHero,
  SectionCard,
} from "@/src/components/contribute"
import { Badge } from "@/src/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import {
  ArrowRight,
  Award,
  BookOpen,
  Camera,
  Edit,
  ExternalLink,
  Eye,
  Headphones,
  Instagram,
  Lightbulb,
  Mic,
  Palette,
  Play,
  Share2,
  Star,
  Target,
  Twitch,
  Twitter,
  Users,
  Video,
  Youtube,
  Zap,
} from "lucide-react"
import type { ReactNode } from "react"

interface ContentItem {
  icon: ReactNode
  title: string
  description: string
}

function ContentItemRow({ icon, title, description }: ContentItem) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 shrink-0">{icon}</span>
      <div>
        <p className="font-medium text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

function ToolRow({ icon, title, description }: ContentItem) {
  return (
    <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
      <span className="shrink-0">{icon}</span>
      <div>
        <p className="font-medium text-foreground text-sm">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

const overviewCards = [
  {
    icon: <Video className="h-7 w-7 text-red-400" />,
    title: "Video Tutorials",
    description: "Create step-by-step guides and educational content",
  },
  {
    icon: <Camera className="h-7 w-7 text-purple-400" />,
    title: "Live Streaming",
    description: "Host live sessions, Q&As, and interactive content",
  },
  {
    icon: <Share2 className="h-7 w-7 text-blue-400" />,
    title: "Social Content",
    description: "Share updates, tips, and community highlights",
  },
]

const creatorTiers = [
  {
    icon: <Video className="h-7 w-7 text-emerald-400" />,
    bg: "bg-emerald-500/15 border-emerald-500/20",
    title: "Emerging Creator",
    description: "New creators building their audience",
    range: "0-1K subscribers",
    perks: ["Emerging Creator Badge", "Emerging Creator Achievement"],
  },
  {
    icon: <Star className="h-7 w-7 text-blue-400" />,
    bg: "bg-blue-500/15 border-blue-500/20",
    title: "Rising Creator",
    description: "Growing creators with engaged audiences",
    range: "1K-10K subscribers",
    perks: ["Rising Creator Achievement", "Rising Creator Badge"],
  },
  {
    icon: <Award className="h-7 w-7 text-purple-400" />,
    bg: "bg-primary/15 border-primary/20",
    title: "Partner Creator",
    description: "Established creators and community leaders",
    range: "10K+ subscribers",
    perks: ["Partner Creator Badge", "Partner Creator Achievement"],
  },
]

export default function ContentCreationPage() {
  return (
    <div className="min-h-screen bg-background 
pt-15
    ">
      <BreadcrumbNav
        items={[
          { label: "Home", href: "/" },
          { label: "Contribute", href: "/contribute" },
          { label: "Content Creation" },
        ]}
      />

      <PageHero
        icon={<Video className="h-8 w-8 text-purple-400" />}
        title="Content Creation"
        description="Create engaging videos, streams, and tutorials to help the community grow."
        badges={[
          { label: "Video Production", variant: "filled" },
          { label: "Live Streaming", variant: "outline" },
          { label: "Tutorial Creation", variant: "outline" },
        ]}
      />

      <main className="container mx-auto max-w-4xl px-4 py-10">
        <div className="flex flex-col gap-8">
          {/* What is Content Creation */}
          <Card className="bg-gradient-to-t from-card via-card to-muted/20 rounded-[5px] border-0">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl text-foreground mb-2">
                What is Content Creation?
              </CardTitle>
              <CardDescription className="text-muted-foreground text-base max-w-2xl mx-auto">
                Content creators produce educational, entertaining, and engaging
                material that helps community members learn, improve their
                skills, and stay connected with the latest developments.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {overviewCards.map((card) => (
                  <div key={card.title} className="text-center">
                    <div className="bg-primary/15 border border-primary/20 p-3 rounded-xl w-14 h-14 mx-auto mb-3 flex items-center justify-center">
                      {card.icon}
                    </div>
                    <h3 className="font-semibold mb-1 text-foreground">
                      {card.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {card.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Content Types & Tools Tabs */}
          <SectionCard
            icon={<Video className="h-5 w-5" />}
            title="Content Types & Resources"
          >
            <Tabs defaultValue="types" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="types">Content Types</TabsTrigger>
                <TabsTrigger value="tools">Tools & Resources</TabsTrigger>
                <TabsTrigger value="distribution">Distribution</TabsTrigger>
              </TabsList>

              <TabsContent value="types" className="mt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2 text-foreground">
                      <Video className="h-4 w-4 text-red-400" />
                      Video Content
                    </h3>
                    <div className="space-y-3">
                      <ContentItemRow
                        icon={<Play className="h-4 w-4 text-blue-400" />}
                        title="Tutorial Videos"
                        description="Step-by-step guides for game mechanics and strategies"
                      />
                      <ContentItemRow
                        icon={<Eye className="h-4 w-4 text-emerald-400" />}
                        title="Gameplay Reviews"
                        description="Analysis of builds, strategies, and character performances"
                      />
                      <ContentItemRow
                        icon={<Lightbulb className="h-4 w-4 text-amber-400" />}
                        title="Tips & Tricks"
                        description="Quick tips and advanced techniques"
                      />
                      <ContentItemRow
                        icon={<Star className="h-4 w-4 text-purple-400" />}
                        title="Character Showcases"
                        description="Detailed character builds and optimization guides"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2 text-foreground">
                      <Camera className="h-4 w-4 text-purple-400" />
                      Live Content
                    </h3>
                    <div className="space-y-3">
                      <ContentItemRow
                        icon={<Users className="h-4 w-4 text-blue-400" />}
                        title="Community Streams"
                        description="Interactive gameplay sessions with community"
                      />
                      <ContentItemRow
                        icon={<Mic className="h-4 w-4 text-emerald-400" />}
                        title="Q&A Sessions"
                        description="Answer community questions and provide guidance"
                      />
                      <ContentItemRow
                        icon={<Target className="h-4 w-4 text-red-400" />}
                        title="Challenge Runs"
                        description="Attempt difficult challenges with community input"
                      />
                      <ContentItemRow
                        icon={<BookOpen className="h-4 w-4 text-amber-400" />}
                        title="Educational Workshops"
                        description="In-depth teaching sessions on complex topics"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="tools" className="mt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2 text-foreground">
                      <Edit className="h-4 w-4 text-blue-400" />
                      Production Tools
                    </h3>
                    <div className="space-y-3">
                      <ToolRow
                        icon={<Video className="h-4 w-4 text-red-400" />}
                        title="OBS Studio Pro License"
                        description="Professional streaming and recording"
                      />
                      <ToolRow
                        icon={<Edit className="h-4 w-4 text-purple-400" />}
                        title="Adobe Creative Suite"
                        description="Premiere Pro, After Effects, Photoshop"
                      />
                      <ToolRow
                        icon={<Mic className="h-4 w-4 text-emerald-400" />}
                        title="Audio Enhancement Tools"
                        description="Noise reduction and audio optimization"
                      />
                      <ToolRow
                        icon={<Palette className="h-4 w-4 text-amber-400" />}
                        title="Graphics & Assets Library"
                        description="Branded templates and visual assets"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2 text-foreground">
                      <Headphones className="h-4 w-4 text-emerald-400" />
                      Support & Training
                    </h3>
                    <div className="space-y-3">
                      <ToolRow
                        icon={<BookOpen className="h-4 w-4 text-blue-400" />}
                        title="Content Creation Masterclass"
                        description="Comprehensive video production training"
                      />
                      <ToolRow
                        icon={<Users className="h-4 w-4 text-purple-400" />}
                        title="Creator Mentorship Program"
                        description="One-on-one guidance from experienced creators"
                      />
                      <ToolRow
                        icon={<Share2 className="h-4 w-4 text-emerald-400" />}
                        title="Collaboration Network"
                        description="Connect with other creators for joint projects"
                      />
                      <ToolRow
                        icon={<Zap className="h-4 w-4 text-amber-400" />}
                        title="Technical Support"
                        description="24/7 help with tools and technical issues"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="distribution" className="mt-6">
                <div className="space-y-3">
                  {[
                    {
                      icon: <Youtube className="h-5 w-5 text-red-500" />,
                      name: "YouTube",
                      desc: "Long-form tutorials and guides",
                      badge: "Primary",
                    },
                    {
                      icon: <Twitch className="h-5 w-5 text-purple-400" />,
                      name: "Twitch",
                      desc: "Live streaming and community interaction",
                      badge: "Live",
                    },
                    {
                      icon: <Instagram className="h-5 w-5 text-pink-500" />,
                      name: "Instagram",
                      desc: "Short clips and community highlights",
                      badge: "Social",
                    },
                    {
                      icon: <Twitter className="h-5 w-5 text-blue-400" />,
                      name: "Twitter/X",
                      desc: "Quick tips and community updates",
                      badge: "Updates",
                    },
                  ].map((platform) => (
                    <div
                      key={platform.name}
                      className="flex items-center gap-3 p-3 border border-border/50 rounded-lg hover:border-primary transition-colors"
                    >
                      {platform.icon}
                      <div className="flex-1">
                        <p className="font-medium text-foreground">
                          {platform.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {platform.desc}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-transparent border-primary text-purple-300"
                      >
                        {platform.badge}
                      </Badge>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </SectionCard>

          {/* Creator Requirements */}
          <Card className="bg-gradient-to-t from-card via-card to-muted/20 rounded-[5px] border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-xl text-foreground">
                Creator Requirements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-lg text-foreground font-medium">
                Anyone can become a creator!
              </p>
            </CardContent>
          </Card>

          {/* Creator Tiers */}
          <SectionCard
            icon={<Award className="h-5 w-5" />}
            title="Creator Program Tiers"
          >
            <div className="grid md:grid-cols-3 gap-5">
              {creatorTiers.map((tier) => (
                <div key={tier.title} className="text-center">
                  <div
                    className={`${tier.bg} border p-3 rounded-xl w-14 h-14 mx-auto mb-3 flex items-center justify-center`}
                  >
                    {tier.icon}
                  </div>
                  <h3 className="font-semibold mb-1 text-foreground">
                    {tier.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {tier.description}
                  </p>
                  <Badge
                    variant="outline"
                    className="bg-transparent border-primary/30 text-purple-300 mb-3"
                  >
                    {tier.range}
                  </Badge>
                  <ul className="text-xs text-left mt-2 space-y-1 text-muted-foreground">
                    {tier.perks.map((perk) => (
                      <li key={perk} className="flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-primary/60" />
                        {perk}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* CTA */}
          <CtaBanner
            icon={<Video className="h-8 w-8 text-purple-400" />}
            title="Ready to Create Amazing Content?"
            description="Join our creator program and help educate, entertain, and inspire the community."
            buttons={[
              {
                label: "Apply to Create",
                href: "/contribute",
                icon: <ArrowRight className="ml-2 h-4 w-4" />,
              },
              {
                label: "View Creator Guidelines",
                href: "/contribute/guidelines",
                variant: "outline",
                icon: <ExternalLink className="ml-2 h-4 w-4" />,
              },
            ]}
            footnote="Creator applications are reviewed bi-weekly. Portfolio review takes 3-5 business days."
          />
        </div>
      </main>
    </div>
  )
}
