import { BreadcrumbNav, CtaBanner } from "@/src/components/contribute";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  ArrowRight,
  ChevronRight,
  Heart,
  Lightbulb,
  Star,
  Users,
} from "lucide-react";
import Link from "next/link";

const contributionAreas = [
  {
    id: "data-entry",
    name: "Data Entry",
    description:
      "Help us keep character stats, skills, and equipment information up to date.",
    difficulty: "Easy",
  },
  {
    id: "guide-writing",
    name: "Guide Writing",
    description:
      "Create guides for characters, game mechanics, or events to help other players.",
    difficulty: "Medium",
  },
  {
    id: "code-contribution",
    name: "Code Contribution",
    description: "Contribute to our open-source tools and website on GitHub.",
    difficulty: "Hard",
  },
  {
    id: "content-creation",
    name: "Content Creation",
    description:
      "Create videos, infographics, or other visual content for the community.",
    difficulty: "Medium",
  },
];

const whyContribute = [
  {
    icon: <Star className="h-7 w-7 text-purple-400" />,
    title: "Build Your Portfolio",
    description:
      "Showcase your contributions on your profile. Great for demonstrating skills to potential employers or collaborators.",
  },
  {
    icon: <Users className="h-7 w-7 text-purple-400" />,
    title: "Join a Community",
    description:
      "Connect with like-minded individuals who share your passion for the game and helping others learn and improve.",
  },
  {
    icon: <Lightbulb className="h-7 w-7 text-purple-400" />,
    title: "Learn & Grow",
    description:
      "Develop new skills, learn from experienced contributors, and gain valuable experience in your chosen area.",
  },
];

function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case "Easy":
      return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
    case "Medium":
      return "bg-amber-500/15 text-amber-400 border-amber-500/30";
    case "Hard":
      return "bg-red-500/15 text-red-400 border-red-500/30";
    default:
      return "bg-primary/15 text-purple-300 border-primary/30";
  }
}

export default function ContributePage() {
  return (
    <div className="min-h-screen bg-background  pt-15">
      <BreadcrumbNav
        items={[{ label: "Home", href: "/" }, { label: "Contribute" }]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/50">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/60 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto max-w-4xl px-4 py-20 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Contribute
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join our thriving community of players, contributors, and
            enthusiasts
          </p>
        </div>
      </section>

      <main className="container mx-auto max-w-4xl px-4 py-10">
        <div className="flex flex-col gap-12">
          {/* Contribution Areas */}
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {contributionAreas.map((area) => (
                <Card
                  key={area.id}
                  className="overflow-hidden flex flex-col bg-gradient-to-t from-card via-card to-muted/20 rounded-[5px] border-0 group hover:ring-1 hover:ring-primary/20 transition-all"
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-foreground">
                        {area.name}
                      </CardTitle>
                      <Badge
                        variant="outline"
                        className={`bg-transparent text-xs ${getDifficultyColor(area.difficulty)}`}
                      >
                        {area.difficulty}
                      </Badge>
                    </div>
                    <CardDescription className="text-muted-foreground">
                      {area.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1" />
                  <CardFooter>
                    <Button
                      size="lg"
                      className="w-full transition-all duration-300 rounded-[5px]"
                      asChild
                    >
                      <Link href={`/contribute/${area.id}`}>
                        Get Started
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>

          {/* Why Contribute */}
          <section>
            <h2 className="text-3xl font-bold mb-6 text-center text-foreground">
              Why Contribute?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {whyContribute.map((item) => (
                <Card
                  key={item.title}
                  className="overflow-hidden bg-gradient-to-b from-card via-card to-muted/20 rounded-[5px] border-0"
                >
                  <CardHeader className="flex flex-col items-center gap-3 text-center">
                    <div className="bg-primary/15 border border-primary/20 p-3 rounded-xl">
                      {item.icon}
                    </div>
                    <CardTitle className="text-foreground text-lg">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* CTA */}
          <CtaBanner
            icon={<Heart className="h-8 w-8 text-purple-400" />}
            title="Ready to Make a Difference?"
            description="Join hundreds of contributors who are helping build the most comprehensive game database. Your expertise and passion can help thousands of players improve their gameplay."
            buttons={[
              {
                label: "Start Contributing",
                href: "/contribute",
                icon: <ArrowRight className="ml-2 h-5 w-5" />,
              },
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
  );
}
